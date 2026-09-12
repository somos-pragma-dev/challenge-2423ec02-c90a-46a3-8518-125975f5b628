import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, combineLatest, filter } from 'rxjs';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { AuthActions } from '@core/state/auth/auth.actions';
import { ProfileActions } from '@core/state/profile/profile.actions';
import { TransactionActions } from '@core/state/transaction/transaction.actions';
import { AuthSelectors } from '@core/state/auth/auth.selectors';
import { ProfileSelectors } from '@core/state/profile/profile.selectors';
import { TransactionSelectors } from '@core/state/transaction/transaction.selectors';
import { User } from '@core/models/auth.model';
import { Profile } from '@core/models/profile.model';
import { Transaction } from '@core/models/transaction.model';

interface DashboardState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  profile: Profile | null;
  transactions: Transaction[];
  recentTransactions: Transaction[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent, ErrorMessageComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();

  readonly dashboardState = signal<DashboardState>({
    isLoading: true,
    error: null,
    user: null,
    profile: null,
    transactions: [],
    recentTransactions: []
  });

  readonly isLoading = computed(() => this.dashboardState().isLoading);
  readonly error = computed(() => this.dashboardState().error);
  readonly user = computed(() => this.dashboardState().user);
  readonly profile = computed(() => this.dashboardState().profile);
  readonly transactions = computed(() => this.dashboardState().transactions);
  readonly recentTransactions = computed(() => this.dashboardState().recentTransactions);

  readonly hasUser = computed(() => this.dashboardState().user !== null);
  readonly hasProfile = computed(() => this.dashboardState().profile !== null);
  readonly hasTransactions = computed(() => this.dashboardState().transactions.length > 0);
  readonly hasError = computed(() => this.dashboardState().error !== null);

  readonly userFullName = computed(() => {
    const user = this.dashboardState().user;
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`.trim();
  });

  readonly userInitials = computed(() => {
    const user = this.dashboardState().user;
    if (!user) return '';
    const first = user.firstName?.charAt(0) || '';
    const last = user.lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  });

  readonly profileCompletion = computed(() => {
    const profile = this.dashboardState().profile;
    if (!profile) return 0;
    let completed = 0;
    const total = 5;
    if (profile.email) completed++;
    if (profile.phone) completed++;
    if (profile.address) completed++;
    if (profile.preferences) completed++;
    if (profile.notifications) completed++;
    return Math.round((completed / total) * 100);
  });

  readonly totalBalance = computed(() => {
    const transactions = this.dashboardState().transactions;
    return transactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0) -
    transactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  readonly transactionCount = computed(() => this.dashboardState().transactions.length);
  readonly pendingCount = computed(() => 
    this.dashboardState().transactions.filter(t => t.status === 'pending').length
  );

  readonly lastTransactionDate = computed(() => {
    const transactions = this.dashboardState().transactions;
    if (transactions.length === 0) return null;
    const sorted = [...transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted[0].date;
  });

  readonly transactionsByType = computed(() => {
    const transactions = this.dashboardState().transactions;
    return {
      credit: transactions.filter(t => t.type === 'credit').length,
      debit: transactions.filter(t => t.type === 'debit').length,
      transfer: transactions.filter(t => t.type === 'transfer').length
    };
  });

  ngOnInit(): void {
    this.initializeDashboard();
    this.subscribeToStateChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeDashboard(): void {
    this.store.dispatch(AuthActions.loadUser());
    this.store.dispatch(ProfileActions.loadProfile());
    this.store.dispatch(TransactionActions.loadTransactions());
  }

  private subscribeToStateChanges(): void {
    combineLatest([
      this.store.select(AuthSelectors.selectUser),
      this.store.select(AuthSelectors.selectIsAuthenticated),
      this.store.select(AuthSelectors.selectAuthLoading),
      this.store.select(AuthSelectors.selectAuthError)
    ]).pipe(
      takeUntil(this.destroy$),
      filter(([user]) => user !== undefined)
    ).subscribe(([user, isAuthenticated, loading, error]) => {
      this.updateState('user', user);
      this.updateState('isLoading', loading);
      if (error) {
        this.updateState('error', error);
      }
    });

    combineLatest([
      this.store.select(ProfileSelectors.selectProfile),
      this.store.select(ProfileSelectors.selectProfileLoading),
      this.store.select(ProfileSelectors.selectProfileError)
    ]).pipe(
      takeUntil(this.destroy$),
      filter(([profile]) => profile !== undefined)
    ).subscribe(([profile, loading, error]) => {
      this.updateState('profile', profile);
      if (loading) {
        this.updateState('isLoading', true);
      }
      if (error) {
        this.updateState('error', error);
      }
    });

    combineLatest([
      this.store.select(TransactionSelectors.selectAllTransactions),
      this.store.select(TransactionSelectors.selectTransactionLoading),
      this.store.select(TransactionSelectors.selectTransactionError)
    ]).pipe(
      takeUntil(this.destroy$),
      filter(([transactions]) => transactions !== undefined)
    ).subscribe(([transactions, loading, error]) => {
      const recent = this.getRecentTransactions(transactions);
      this.updateState('transactions', transactions);
      this.updateState('recentTransactions', recent);
      if (!loading && !error) {
        this.updateState('isLoading', false);
      }
      if (error) {
        this.updateState('error', error);
      }
    });
  }

  private getRecentTransactions(transactions: Transaction[]): Transaction[] {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }

  private updateState<K extends keyof DashboardState>(key: K, value: DashboardState[K]): void {
    this.dashboardState.update(state => ({
      ...state,
      [key]: value
    }));
  }

  refreshData(): void {
    this.dashboardState.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));
    this.initializeDashboard();
  }

  retryLoad(): void {
    this.dashboardState.update(state => ({
      ...state,
      error: null
    }));
    this.refreshData();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }

  formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }

  formatDateShort(date: string | Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  }

  getTransactionStatusClass(status: string): string {
    const statusClasses: Record<string, string> = {
      completed: 'status--completed',
      pending: 'status--pending',
      failed: 'status--failed',
      cancelled: 'status--cancelled'
    };
    return statusClasses[status] || '';
  }

  getTransactionTypeLabel(type: string): string {
    const typeLabels: Record<string, string> = {
      credit: 'Ingreso',
      debit: 'Gasto',
      transfer: 'Transferencia',
      payment: 'Pago'
    };
    return typeLabels[type] || type;
  }

  onTransactionClick(transaction: Transaction): void {
    console.log('Transacción seleccionada:', transaction.id);
  }

  onProfileEdit(): void {
    console.log('Editar perfil');
  }

  onViewAllTransactions(): void {
    console.log('Ver todas las transacciones');
  }
}
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState, TRANSACTION_FEATURE_KEY } from './transaction.reducer';
import { Transaction } from '../../models/transaction.model';

export const selectTransactionState = createFeatureSelector<TransactionState>(TRANSACTION_FEATURE_KEY);

export const selectAllTransactions = createSelector(
  selectTransactionState,
  (state: TransactionState): Transaction[] => state.ids
    .map(id => state.entities[id])
    .filter((transaction): transaction is Transaction => transaction !== undefined);
);

export const selectTransactionById = (transactionId: string) => createSelector(
  selectTransactionState,
  (state: TransactionState): Transaction | undefined => state.entities[transactionId]
);

export const selectTransactionsLoading = createSelector(
  selectTransactionState,
  (state: TransactionState): boolean => state.loading;
);

export const selectTransactionsError = createSelector(
  selectTransactionState,
  (state: TransactionState): string | null => state.error;
);

export const selectTransactionsLoaded = createSelector(
  selectTransactionState,
  (state: TransactionState): boolean => state.loaded;
);

export const selectPendingTransactions = createSelector(
  selectAllTransactions,
  (transactions: Transaction[]): Transaction[] => transactions.filter(t => t.status === 'pending')
);

export const selectCompletedTransactions = createSelector(
  selectAllTransactions,
  (transactions: Transaction[]): Transaction[] => transactions.filter(t => t.status === 'completed')
);

export const selectFailedTransactions = createSelector(
  selectAllTransactions,
  (transactions: Transaction[]): Transaction[] => transactions.filter(t => t.status === 'failed')
);

export const selectTransactionsByDateRange = (startDate: Date, endDate: Date) => createSelector(
  selectAllTransactions,
  (transactions: Transaction[]): Transaction[] => transactions.filter(t => {
    const transactionDate = new Date(t.createdAt);
    return transactionDate >= startDate && transactionDate <= endDate;
  })
);

export const selectTotalAmount = createSelector(
  selectCompletedTransactions,
  (transactions: Transaction[]): number => transactions.reduce((total, t) => total + t.amount, 0)
);

export const selectTransactionCount = createSelector(
  selectTransactionState,
  (state: TransactionState): number => state.ids.length
);

export const selectRecentTransactions = createSelector(
  selectAllTransactions,
  (transactions: Transaction[]): Transaction[] => {
    const sorted = [...transactions].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sorted.slice(0, 10);
  }
);
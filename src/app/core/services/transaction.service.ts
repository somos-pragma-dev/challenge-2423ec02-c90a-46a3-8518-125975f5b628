import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, timeout, finalize } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface Transaction {
  id: string;
  transactionReference: string;
  customerId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: Money;
  description: string;
  category: string;
  merchant?: MerchantInfo;
  paymentMethod: PaymentMethod;
  flags: TransactionFlags;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  settledAt?: string;
  processedAt?: string;
}

export type TransactionType = 'PAYMENT' | 'REFUND' | 'TRANSFER' | 'WITHDRAWAL' | 'DEPOSIT' | 'FEE' | 'INTEREST';

export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REVERSED';

export interface Money {
  amount: number;
  currency: string;
  formatted: string;
}

export interface MerchantInfo {
  id: string;
  name: string;
  category: string;
  location?: string;
  logoUrl?: string;
}

export interface PaymentMethod {
  type: 'CARD' | 'BANK_TRANSFER' | 'WALLET' | 'CASH' | 'CRYPTO';
  last4?: string;
  brand?: string;
  bankName?: string;
  walletProvider?: string;
}

export interface TransactionFlags {
  isSuspicious: boolean;
  requiresReview: boolean;
  isInternational: boolean;
  isRecurring: boolean;
  hasDispute: boolean;
}

export interface TransactionListRequest {
  customerId: string;
  page?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: 'createdAt' | 'amount' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface TransactionListResponse {
  transactions: Transaction[];
  pagination: PaginationInfo;
  summary: TransactionSummary;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TransactionSummary {
  totalAmount: Money;
  byType: Record<TransactionType, Money>;
  byStatus: Record<TransactionStatus, number>;
}

export interface CreateTransactionRequest {
  customerId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  category: string;
  paymentMethodId: string;
  metadata?: Record<string, unknown>;
  idempotencyKey?: string;
}

export interface TransactionResponse {
  transaction: Transaction;
  status: string;
  message: string;
}

export interface TransactionFilter {
  types?: TransactionType[];
  statuses?: TransactionStatus[];
  categories?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/transactions`;
  private readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  getTransactions(request: TransactionListRequest): Observable<TransactionListResponse> {
    this.validateTransactionRequest(request);

    let params = new HttpParams()
      .set('page', (request.page || 1).toString())
      .set('pageSize', (request.pageSize || 20).toString());

    if (request.startDate) {
      params = params.set('startDate', request.startDate);
    }
    if (request.endDate) {
      params = params.set('endDate', request.endDate);
    }
    if (request.type) {
      params = params.set('type', request.type);
    }
    if (request.status) {
      params = params.set('status', request.status);
    }
    if (request.category) {
      params = params.set('category', request.category);
    }
    if (request.minAmount !== undefined) {
      params = params.set('minAmount', request.minAmount.toString());
    }
    if (request.maxAmount !== undefined) {
      params = params.set('maxAmount', request.maxAmount.toString());
    }
    if (request.sortBy) {
      params = params.set('sortBy', request.sortBy);
    }
    if (request.sortOrder) {
      params = params.set('sortOrder', request.sortOrder);
    }

    return this.http.get<TransactionListResponse>(
      `${this.apiUrl}/customers/${request.customerId}`,
      {
        headers: this.defaultHeaders,
        params,
        observe: 'response'
      }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      map(response => {
        if (!response.body) {
          throw new Error('Empty response body');
        }
        return response.body;
      }),
      retry({
        count: environment.retryAttempts || 2,
        delay: environment.retryDelay || 1000
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getTransactionById(transactionId: string, customerId: string): Observable<Transaction> {
    if (!transactionId || transactionId.trim().length === 0) {
      return throwError(() => new Error('Transaction ID is required'));
    }
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    const params = new HttpParams().set('includes', 'merchant,paymentMethod,flags');

    return this.http.get<Transaction>(
      `${this.apiUrl}/${transactionId}/customers/${customerId}`,
      {
        headers: this.defaultHeaders,
        params
      }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  createTransaction(request: CreateTransactionRequest): Observable<TransactionResponse> {
    this.validateCreateRequest(request);

    const headers = request.idempotencyKey
      ? this.defaultHeaders.set('Idempotency-Key', request.idempotencyKey)
      : this.defaultHeaders.set('Idempotency-Key', this.generateIdempotencyKey(request));

    return this.http.post<TransactionResponse>(
      `${this.apiUrl}`,
      request,
      { headers }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      map(response => {
        if (!response) {
          throw new Error('Empty response body');
        }
        return response;
      }),
      catchError(this.handleError.bind(this))
    );
  }

  cancelTransaction(transactionId: string, customerId: string, reason?: string): Observable<TransactionResponse> {
    if (!transactionId || transactionId.trim().length === 0) {
      return throwError(() => new Error('Transaction ID is required'));
    }
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    return this.http.post<TransactionResponse>(
      `${this.apiUrl}/${transactionId}/cancel`,
      { customerId, reason }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  getTransactionStats(customerId: string, period: 'day' | 'week' | 'month' | 'year'): Observable<TransactionSummary> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    const params = new HttpParams()
      .set('customerId', customerId)
      .set('period', period);

    return this.http.get<TransactionSummary>(
      `${this.apiUrl}/stats`,
      {
        headers: this.defaultHeaders,
        params
      }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  exportTransactions(
    customerId: string,
    format: 'csv' | 'pdf' | 'json',
    filters?: TransactionFilter
  ): Observable<Blob> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    let params = new HttpParams()
      .set('customerId', customerId)
      .set('format', format);

    if (filters) {
      if (filters.dateRange) {
        params = params.set('startDate', filters.dateRange.start);
        params = params.set('endDate', filters.dateRange.end);
      }
      if (filters.types?.length) {
        params = params.set('types', filters.types.join(','));
      }
      if (filters.statuses?.length) {
        params = params.set('statuses', filters.statuses.join(','));
      }
    }

    const headers = this.defaultHeaders.set('Accept', this.getAcceptHeader(format));

    return this.http.get(
      `${this.apiUrl}/export`,
      {
        headers,
        params,
        responseType: 'blob'
      }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  private validateTransactionRequest(request: TransactionListRequest): void {
    if (!request.customerId || request.customerId.trim().length === 0) {
      throw new Error('Customer ID is required');
    }
    if (request.page !== undefined && request.page < 1) {
      throw new Error('Page must be greater than 0');
    }
    if (request.pageSize !== undefined && (request.pageSize < 1 || request.pageSize > 100)) {
      throw new Error('PageSize must be between 1 and 100');
    }
  }

  private validateCreateRequest(request: CreateTransactionRequest): void {
    if (!request.customerId) {
      throw new Error('Customer ID is required');
    }
    if (!request.type) {
      throw new Error('Transaction type is required');
    }
    if (request.amount === undefined || request.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    if (!request.currency || request.currency.trim().length === 0) {
      throw new Error('Currency is required');
    }
  }

  private generateIdempotencyKey(data: CreateTransactionRequest): string {
    const content = `${data.customerId}${data.type}${data.amount}${data.currency}${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `txn_${Math.abs(hash).toString(36)}_${Date.now()}`;
  }

  private getAcceptHeader(format: 'csv' | 'pdf' | 'json'): string {
    switch (format) {
      case 'csv':
        return 'text/csv';
      case 'pdf':
        return 'application/pdf';
      case 'json':
        return 'application/json';
      default:
        return 'application/octet-stream';
    }
  }

  private handleError(error: unknown): Observable<never> {
    if (error instanceof Error) {
      if (error.name === 'TimeoutError') {
        console.error('[TransactionService] Request timeout exceeded');
        return throwError(() => new Error('La solicitud ha excedido el tiempo máximo de espera'));
      }
      console.error('[TransactionService] Error:', error.message);
      return throwError(() => error);
    }

    console.error('[TransactionService] Unknown error:', error);
    return throwError(() => new Error('Ha ocurrido un error inesperado al procesar la transacción'));
  }
}
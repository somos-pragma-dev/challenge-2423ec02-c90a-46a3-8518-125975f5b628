import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Transaction, TransactionFilter, TransactionSummary } from '../../models/transaction.model';
import * as TransactionActions from './transaction.actions';

export interface TransactionState extends EntityState<Transaction> {
  selectedTransactionId: string | null;
  loading: boolean;
  error: string | null;
  filter: TransactionFilter | null;
  summary: TransactionSummary | null;
  lastUpdated: string | null;
  exportLoading: boolean;
  exportError: string | null;
  pendingApprovalCount: number;
  operationInProgress: boolean;
}

export const transactionAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({
  selectId: (transaction: Transaction) => transaction.id,
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

export const initialTransactionState: TransactionState = transactionAdapter.getInitialState({
  selectedTransactionId: null,
  loading: false,
  error: null,
  filter: null,
  summary: null,
  lastUpdated: null,
  exportLoading: false,
  exportError: null,
  pendingApprovalCount: 0,
  operationInProgress: false,
});

export const transactionReducer = createReducer(
  initialTransactionState,

  on(TransactionActions.loadTransactions, (state, { filter }) => ({
    ...state,
    loading: true,
    error: null,
    filter: filter || state.filter,
  })),

  on(TransactionActions.loadTransactionsSuccess, (state, { transactions, summary }) =>
    transactionAdapter.setAll(transactions, {
      ...state,
      loading: false,
      error: null,
      summary: summary || state.summary,
      lastUpdated: new Date().toISOString(),
    })
  ),

  on(TransactionActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransactionActions.loadTransactionById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TransactionActions.loadTransactionByIdSuccess, (state, { transaction }) =>
    transactionAdapter.upsertOne(transaction, {
      ...state,
      loading: false,
      selectedTransactionId: transaction.id,
    })
  ),

  on(TransactionActions.loadTransactionByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransactionActions.createTransaction, (state) => ({
    ...state,
    loading: true,
    error: null,
    operationInProgress: true,
  })),

  on(TransactionActions.createTransactionSuccess, (state, { transaction }) =>
    transactionAdapter.addOne(transaction, {
      ...state,
      loading: false,
      operationInProgress: false,
      selectedTransactionId: transaction.id,
    })
  ),

  on(TransactionActions.createTransactionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    operationInProgress: false,
  })),

  on(TransactionActions.updateTransaction, (state) => ({
    ...state,
    loading: true,
    error: null,
    operationInProgress: true,
  })),

  on(TransactionActions.updateTransactionSuccess, (state, { transaction }) =>
    transactionAdapter.updateOne(
      { id: transaction.id, changes: transaction },
      {
        ...state,
        loading: false,
        operationInProgress: false,
      }
    )
  ),

  on(TransactionActions.updateTransactionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    operationInProgress: false,
  })),

  on(TransactionActions.deleteTransaction, (state) => ({
    ...state,
    loading: true,
    error: null,
    operationInProgress: true,
  })),

  on(TransactionActions.deleteTransactionSuccess, (state, { transactionId }) =>
    transactionAdapter.removeOne(transactionId, {
      ...state,
      loading: false,
      operationInProgress: false,
      selectedTransactionId:
        state.selectedTransactionId === transactionId ? null : state.selectedTransactionId,
    })
  ),

  on(TransactionActions.deleteTransactionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    operationInProgress: false,
  })),

  on(TransactionActions.clearTransactions, (state) =>
    transactionAdapter.removeAll({
      ...state,
      selectedTransactionId: null,
      loading: false,
      error: null,
      filter: null,
      summary: null,
    })
  ),

  on(TransactionActions.setTransactionFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),

  on(TransactionActions.clearTransactionFilter, (state) => ({
    ...state,
    filter: null,
  })),

  on(TransactionActions.exportTransactions, (state) => ({
    ...state,
    exportLoading: true,
    exportError: null,
  })),

  on(TransactionActions.exportTransactionsSuccess, (state, { downloadUrl }) => ({
    ...state,
    exportLoading: false,
  })),

  on(TransactionActions.exportTransactionsFailure, (state, { error }) => ({
    ...state,
    exportLoading: false,
    exportError: error,
  })),

  on(TransactionActions.selectTransaction, (state, { transactionId }) => ({
    ...state,
    selectedTransactionId: transactionId,
  })),

  on(TransactionActions.deselectTransaction, (state) => ({
    ...state,
    selectedTransactionId: null,
  })),

  on(TransactionActions.loadPendingTransactions, (state) => ({
    ...state,
    loading: true,
  })),

  on(TransactionActions.loadPendingTransactionsSuccess, (state, { transactions }) =>
    transactionAdapter.upsertMany(transactions, {
      ...state,
      loading: false,
      pendingApprovalCount: transactions.length,
    })
  ),

  on(TransactionActions.loadPendingTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransactionActions.approveTransaction, (state) => ({
    ...state,
    operationInProgress: true,
  })),

  on(TransactionActions.approveTransactionSuccess, (state, { transaction }) =>
    transactionAdapter.updateOne(
      { id: transaction.id, changes: transaction },
      {
        ...state,
        operationInProgress: false,
        pendingApprovalCount: Math.max(0, state.pendingApprovalCount - 1),
      }
    )
  ),

  on(TransactionActions.approveTransactionFailure, (state, { error }) => ({
    ...state,
    operationInProgress: false,
    error,
  })),

  on(TransactionActions.rejectTransaction, (state) => ({
    ...state,
    operationInProgress: true,
  })),

  on(TransactionActions.rejectTransactionSuccess, (state, { transaction }) =>
    transactionAdapter.updateOne(
      { id: transaction.id, changes: transaction },
      {
        ...state,
        operationInProgress: false,
        pendingApprovalCount: Math.max(0, state.pendingApprovalCount - 1),
      }
    )
  ),

  on(TransactionActions.rejectTransactionFailure, (state, { error }) => ({
    ...state,
    operationInProgress: false,
    error,
  }))
);
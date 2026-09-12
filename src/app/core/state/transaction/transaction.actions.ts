import { createAction, props } from '@ngrx/store';
import { Transaction, TransactionFilter, TransactionSummary } from '../../models/transaction.model';

export const loadTransactions = createAction(
  '[Transaction] Load Transactions',
  props<{ filter?: TransactionFilter }>()
);

export const loadTransactionsSuccess = createAction(
  '[Transaction] Load Transactions Success',
  props<{ transactions: Transaction[]; summary?: TransactionSummary }>()
);

export const loadTransactionsFailure = createAction(
  '[Transaction] Load Transactions Failure',
  props<{ error: string }>()
);

export const loadTransactionById = createAction(
  '[Transaction] Load Transaction By Id',
  props<{ transactionId: string }>()
);

export const loadTransactionByIdSuccess = createAction(
  '[Transaction] Load Transaction By Id Success',
  props<{ transaction: Transaction }>()
);

export const loadTransactionByIdFailure = createAction(
  '[Transaction] Load Transaction By Id Failure',
  props<{ error: string }>()
);

export const createTransaction = createAction(
  '[Transaction] Create Transaction',
  props<{ transaction: Partial<Transaction> }>()
);

export const createTransactionSuccess = createAction(
  '[Transaction] Create Transaction Success',
  props<{ transaction: Transaction }>()
);

export const createTransactionFailure = createAction(
  '[Transaction] Create Transaction Failure',
  props<{ error: string }>()
);

export const updateTransaction = createAction(
  '[Transaction] Update Transaction',
  props<{ transactionId: string; changes: Partial<Transaction> }>()
);

export const updateTransactionSuccess = createAction(
  '[Transaction] Update Transaction Success',
  props<{ transaction: Transaction }>()
);

export const updateTransactionFailure = createAction(
  '[Transaction] Update Transaction Failure',
  props<{ error: string }>()
);

export const deleteTransaction = createAction(
  '[Transaction] Delete Transaction',
  props<{ transactionId: string }>()
);

export const deleteTransactionSuccess = createAction(
  '[Transaction] Delete Transaction Success',
  props<{ transactionId: string }>()
);

export const deleteTransactionFailure = createAction(
  '[Transaction] Delete Transaction Failure',
  props<{ error: string }>()
);

export const clearTransactions = createAction('[Transaction] Clear Transactions');

export const setTransactionFilter = createAction(
  '[Transaction] Set Filter',
  props<{ filter: TransactionFilter }>()
);

export const clearTransactionFilter = createAction('[Transaction] Clear Filter');

export const retryLoadTransactions = createAction(
  '[Transaction] Retry Load Transactions',
  props<{ filter?: TransactionFilter }>()
);

export const exportTransactions = createAction(
  '[Transaction] Export Transactions',
  props<{ format: 'csv' | 'pdf' | 'excel' }>()
);

export const exportTransactionsSuccess = createAction(
  '[Transaction] Export Transactions Success',
  props<{ downloadUrl: string }>()
);

export const exportTransactionsFailure = createAction(
  '[Transaction] Export Transactions Failure',
  props<{ error: string }>()
);

export const selectTransaction = createAction(
  '[Transaction] Select Transaction',
  props<{ transactionId: string }>()
);

export const deselectTransaction = createAction('[Transaction] Deselect Transaction');

export const loadPendingTransactions = createAction('[Transaction] Load Pending Transactions');

export const loadPendingTransactionsSuccess = createAction(
  '[Transaction] Load Pending Transactions Success',
  props<{ transactions: Transaction[] }>()
);

export const loadPendingTransactionsFailure = createAction(
  '[Transaction] Load Pending Transactions Failure',
  props<{ error: string }>()
);

export const approveTransaction = createAction(
  '[Transaction] Approve Transaction',
  props<{ transactionId: string }>()
);

export const approveTransactionSuccess = createAction(
  '[Transaction] Approve Transaction Success',
  props<{ transaction: Transaction }>()
);

export const approveTransactionFailure = createAction(
  '[Transaction] Approve Transaction Failure',
  props<{ error: string }>()
);

export const rejectTransaction = createAction(
  '[Transaction] Reject Transaction',
  props<{ transactionId: string; reason: string }>()
);

export const rejectTransactionSuccess = createAction(
  '[Transaction] Reject Transaction Success',
  props<{ transaction: Transaction }>()
);

export const rejectTransactionFailure = createAction(
  '[Transaction] Reject Transaction Failure',
  props<{ error: string }>()
);
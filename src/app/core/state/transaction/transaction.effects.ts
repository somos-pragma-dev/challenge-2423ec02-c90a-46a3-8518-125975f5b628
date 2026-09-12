import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import * as TransactionActions from './transaction.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TransactionEffects {
  private readonly actions$ = inject(Actions);
  private readonly transactionService = inject(TransactionService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactions),
      mergeMap(() =>
        this.transactionService.getTransactions().pipe(
          map(transactions => TransactionActions.loadTransactionsSuccess({ transactions })),
          catchError(error =>
            of(TransactionActions.loadTransactionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadTransactionById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactionById),
      mergeMap(action =>
        this.transactionService.getTransactionById(action.transactionId).pipe(
          map(transaction => TransactionActions.loadTransactionByIdSuccess({ transaction })),
          catchError(error =>
            of(TransactionActions.loadTransactionByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.createTransaction),
      mergeMap(action =>
        this.transactionService.createTransaction(action.transaction).pipe(
          map(createdTransaction => 
            TransactionActions.createTransactionSuccess({ transaction: createdTransaction })
          ),
          catchError(error =>
            of(TransactionActions.createTransactionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.updateTransaction),
      mergeMap(action =>
        this.transactionService.updateTransaction(action.transactionId, action.changes).pipe(
          map(updatedTransaction =>
            TransactionActions.updateTransactionSuccess({ transaction: updatedTransaction })
          ),
          catchError(error =>
            of(TransactionActions.updateTransactionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.deleteTransaction),
      mergeMap(action =>
        this.transactionService.deleteTransaction(action.transactionId).pipe(
          map(() => TransactionActions.deleteTransactionSuccess({ transactionId: action.transactionId })),
          catchError(error =>
            of(TransactionActions.deleteTransactionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  handleTransactionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TransactionActions.createTransactionSuccess,
        TransactionActions.updateTransactionSuccess,
        TransactionActions.deleteTransactionSuccess
      ),
      tap(action => {
        let message = 'Operación completada';
        if (TransactionActions.createTransactionSuccess.is(action)) {
          message = 'Transacción creada correctamente';
        } else if (TransactionActions.updateTransactionSuccess.is(action)) {
          message = 'Transacción actualizada correctamente';
        } else if (TransactionActions.deleteTransactionSuccess.is(action)) {
          message = 'Transacción eliminada correctamente';
        }
        this.snackBar.open(message, 'Cerrar', { duration: 3000 });
      }),
      switchMap(() =>
        this.actions$.pipe(
          ofType(TransactionActions.loadTransactions)
        )
      )
    ), { dispatch: false }
  );

  handleTransactionFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TransactionActions.loadTransactionsFailure,
        TransactionActions.createTransactionFailure,
        TransactionActions.updateTransactionFailure,
        TransactionActions.deleteTransactionFailure
      ),
      tap(action => {
        this.snackBar.open(`Error: ${action.error}`, 'Cerrar', { duration: 5000 });
      })
    ), { dispatch: false }
  );
}
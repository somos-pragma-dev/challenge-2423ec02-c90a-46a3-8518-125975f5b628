import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import { map, exhaustMap, catchError, tap, withLatestFrom, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { selectAuthToken, selectRefreshToken, selectSessionExpiresAt } from './auth.selectors';
import { AppState } from '../app.state';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly store = inject(Store<AppState>);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              user: response.user,
              token: response.token,
              refreshToken: response.refreshToken,
            })
          ),
          catchError((error) =>
            of(AuthActions.loginFailure({
              error: error.message || 'Error en el inicio de sesión',
            }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          this.authService.storeTokens(user.id);
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess()))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess, AuthActions.logoutFailure, AuthActions.refreshTokenFailure),
        tap(() => {
          this.authService.clearTokens();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(
        this.store.select(selectRefreshToken),
        this.store.select(selectAuthToken)
      ),
      switchMap(([action, refreshToken, currentToken]) => {
        if (!refreshToken) {
          return of(AuthActions.refreshTokenFailure({ error: 'No hay token de refresh' }));
        }
        return this.authService.refreshToken(refreshToken).pipe(
          map((response) =>
            AuthActions.refreshTokenSuccess({
              token: response.token,
              refreshToken: response.refreshToken,
            })
          ),
          catchError((error) =>
            of(AuthActions.refreshTokenFailure({
              error: error.message || 'Error al refresh token',
            }))
          )
        );
      })
    )
  );

  refreshTokenSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.refreshTokenSuccess),
        tap(({ token }) => {
          this.authService.updateStoredToken(token);
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      exhaustMap(({ user }) =>
        this.authService.updateProfile(user).pipe(
          map((updatedUser) =>
            AuthActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error) =>
            of(AuthActions.updateUserFailure({
              error: error.message || 'Error al actualizar perfil',
            }))
          )
        )
      )
    )
  );

  autoRefreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.refreshTokenSuccess),
      withLatestFrom(this.store.select(selectSessionExpiresAt)),
      switchMap(([_, expiresAt]) => {
        if (!expiresAt) {
          return of(AuthActions.checkSessionTimeout());
        }
        const bufferTime = 5 * 60 * 1000;
        const timeUntilExpiry = expiresAt - Date.now() - bufferTime;
        if (timeUntilExpiry <= 0) {
          return of(AuthActions.refreshToken());
        }
        return timer(timeUntilExpiry).pipe(
          map(() => AuthActions.refreshToken()),
          takeUntil(this.actions$.pipe(ofType(AuthActions.logout)))
        );
      })
    )
  );

  checkSessionTimeout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkSessionTimeout),
      withLatestFrom(
        this.store.select(selectSessionExpiresAt),
        this.store.select(selectIsAuthenticated)
      ),
      switchMap(([_, expiresAt, isAuthenticated]) => {
        if (!isAuthenticated || !expiresAt) {
          return [];
        }
        if (Date.now() >= expiresAt) {
          return of(AuthActions.logout());
        }
        return [];
      })
    )
  );
}
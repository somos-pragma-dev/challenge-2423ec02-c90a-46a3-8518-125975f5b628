import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectRefreshToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.refreshToken
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectLastActivity = createSelector(
  selectAuthState,
  (state: AuthState) => state.lastActivity
);

export const selectSessionExpiresAt = createSelector(
  selectAuthState,
  (state: AuthState) => state.sessionExpiresAt
);

export const selectUserFullName = createSelector(
  selectCurrentUser,
  (user) => user ? `${user.firstName} ${user.lastName}` : null
);

export const selectUserEmail = createSelector(
  selectCurrentUser,
  (user) => user?.email ?? null
);

export const selectUserRole = createSelector(
  selectCurrentUser,
  (user) => user?.role ?? null
);

export const selectUserPermissions = createSelector(
  selectCurrentUser,
  (user) => user?.permissions ?? []
);

export const selectHasPermission = (permission: string) =>
  createSelector(
    selectUserPermissions,
    (permissions) => permissions.includes(permission)
  );

export const selectIsSessionValid = createSelector(
  selectAuthState,
  (state: AuthState) => {
    if (!state.sessionExpiresAt) {
      return false;
    }
    return Date.now() < state.sessionExpiresAt;
  }
);

export const selectAuthStatus = createSelector(
  selectIsAuthenticated,
  selectAuthIsLoading,
  selectAuthError,
  (isAuthenticated, isLoading, error) => ({
    isAuthenticated,
    isLoading,
    error,
  })
);

export const selectAuthUserAndToken = createSelector(
  selectCurrentUser,
  selectAuthToken,
  (user, token) => ({ user, token })
);
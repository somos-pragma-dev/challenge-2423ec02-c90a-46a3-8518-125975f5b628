import { createReducer, on } from '@ngrx/store';
import { AuthUser, AuthToken } from '../../models/auth.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: AuthUser | null;
  token: AuthToken | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: number | null;
  sessionExpiresAt: number | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  lastActivity: null,
  sessionExpiresAt: null,
};

export const authReducer = createReducer(
  initialAuthState,
  
  on(AuthActions.login, (state): AuthState => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  
  on(AuthActions.loginSuccess, (state, { user, token, refreshToken }): AuthState => ({
    ...state,
    user,
    token,
    refreshToken,
    isAuthenticated: true,
    isLoading: false,
    error: null,
    lastActivity: Date.now(),
    sessionExpiresAt: token?.expiresAt ?? null,
  })),
  
  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
  })),
  
  on(AuthActions.logout, (state): AuthState => ({
    ...state,
    isLoading: true,
  })),
  
  on(AuthActions.logoutSuccess, (): AuthState => initialAuthState),
  
  on(AuthActions.logoutFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error,
  })),
  
  on(AuthActions.refreshToken, (state): AuthState => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  
  on(AuthActions.refreshTokenSuccess, (state, { token, refreshToken }): AuthState => ({
    ...state,
    token,
    refreshToken,
    isLoading: false,
    lastActivity: Date.now(),
    sessionExpiresAt: token?.expiresAt ?? null,
  })),
  
  on(AuthActions.refreshTokenFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
  })),
  
  on(AuthActions.updateUser, (state, { user }): AuthState => ({
    ...state,
    user,
  })),
  
  on(AuthActions.updateUserSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
    error: null,
  })),
  
  on(AuthActions.updateUserFailure, (state, { error }): AuthState => ({
    ...state,
    error,
  })),
  
  on(AuthActions.setAuthenticated, (state, { user, token }): AuthState => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    isLoading: false,
    lastActivity: Date.now(),
    sessionExpiresAt: token?.expiresAt ?? null,
  })),
  
  on(AuthActions.clearAuthError, (state): AuthState => ({
    ...state,
    error: null,
  })),
  
  on(AuthActions.updateLastActivity, (state): AuthState => ({
    ...state,
    lastActivity: Date.now(),
  })),
  
  on(AuthActions.checkSessionTimeout, (state): AuthState => {
    if (!state.sessionExpiresAt) {
      return state;
    }
    const now = Date.now();
    if (now >= state.sessionExpiresAt) {
      return {
        ...initialAuthState,
        error: 'Sesión expirada por inactividad',
      };
    }
    return state;
  })
);

export const AUTH_STATE_KEY = 'auth';
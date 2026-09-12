import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthState } from './auth/auth.reducer';
import { ProfileState } from './profile/profile.reducer';
import { TransactionState } from './transaction/transaction.reducer';
import { environment } from '@env/environment';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
  transactions: TransactionState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: null as unknown as ActionReducerMap<AuthState>,
  profile: null as unknown as ActionReducerMap<ProfileState>,
  transactions: null as unknown as ActionReducerMap<TransactionState>,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

export interface StateSelectors<T> {
  selectCurrentState: (state: AppState) => T | undefined;
  selectIsLoading: (state: AppState) => boolean;
  selectError: (state: AppState) => string | null;
  selectLastUpdated: (state: AppState) => Date | null;
}

export const createStateSelectors = <T>(
  featureKey: keyof AppState
): StateSelectors<T> => ({
  selectCurrentState: (state: AppState) => {
    const featureState = state[featureKey];
    return featureState as T | undefined;
  },
  selectIsLoading: (state: AppState) => {
    const featureState = state[featureKey];
    return 'isLoading' in featureState ? (featureState as Record<string, unknown>).isLoading as boolean : false;
  },
  selectError: (state: AppState) => {
    const featureState = state[featureKey];
    return 'error' in featureState ? (featureState as Record<string, unknown>).error as string | null : null;
  },
  selectLastUpdated: (state: AppState) => {
    const featureState = state[featureKey];
    return 'lastUpdated' in featureState ? (featureState as Record<string, unknown>).lastUpdated as Date | null : null;
  },
});

export interface StateEffects {
  dispatch: boolean;
  useEffectsErrorHandler?: boolean;
}

export const defaultStateEffects: StateEffects = {
  dispatch: true,
  useEffectsErrorHandler: true,
};

export interface StateConfig {
  enableDevTools: boolean;
  maxAge?: number;
  hydrationEnabled: boolean;
  persistenceEnabled: boolean;
  persistenceKey: string;
}

export const STATE_CONFIG: StateConfig = {
  enableDevTools: !environment.production,
  maxAge: 50,
  hydrationEnabled: false,
  persistenceEnabled: true,
  persistenceKey: 'portal_autogestion_state',
};

export interface StatePersistenceService {
  saveState: (state: Partial<AppState>) => void;
  loadState: () => Partial<AppState> | null;
  clearState: () => void;
  setWhitelist: (keys: (keyof AppState)[]) => void;
  setBlacklist: (keys: (keyof AppState)[]) => void;
}

export interface StateManager {
  dispatch: (action: import('./auth/auth.actions').AuthActionTypes) => void;
  select: <T>(selector: (state: AppState) => T) => import('rxjs').Observable<T>;
  getState: () => AppState;
  resetState: (feature?: keyof AppState) => void;
}

export interface RootState {
  auth: AuthState;
  profile: ProfileState;
  transactions: TransactionState;
}

export type RootStateKeyType = keyof RootState;

export const STATE_KEYS: RootStateKeyType[] = ['auth', 'profile', 'transactions'];

export interface StateMetadata {
  key: RootStateKeyType;
  reducerPath: string;
  stateKey: string;
  persistenceEnabled: boolean;
  cacheEnabled: boolean;
  cacheDuration?: number;
}

export const STATE_METADATA: Record<RootStateKeyType, StateMetadata> = {
  auth: {
    key: 'auth',
    reducerPath: 'auth',
    stateKey: 'auth',
    persistenceEnabled: true,
    cacheEnabled: false,
  },
  profile: {
    key: 'profile',
    reducerPath: 'profile',
    stateKey: 'profile',
    persistenceEnabled: false,
    cacheEnabled: true,
    cacheDuration: 300000,
  },
  transactions: {
    key: 'transactions',
    reducerPath: 'transactions',
    stateKey: 'transactions',
    persistenceEnabled: false,
    cacheEnabled: true,
    cacheDuration: 60000,
  },
};

export const selectAuthState = (state: AppState): AuthState | undefined => state.auth;
export const selectProfileState = (state: AppState): ProfileState | undefined => state.profile;
export const selectTransactionsState = (state: AppState): TransactionState | undefined => state.transactions;

export const selectIsAnyLoading = (state: AppState): boolean => {
  const authState = state.auth;
  const profileState = state.profile;
  const transactionsState = state.transactions;
  
  const authLoading = authState && 'isLoading' in authState ? (authState as Record<string, unknown>).isLoading as boolean : false;
  const profileLoading = profileState && 'isLoading' in profileState ? (profileState as Record<string, unknown>).isLoading as boolean : false;
  const transactionsLoading = transactionsState && 'isLoading' in transactionsState ? (transactionsState as Record<string, unknown>).isLoading as boolean : false;
  
  return authLoading || profileLoading || transactionsLoading;
};

export const selectAnyError = (state: AppState): string | null => {
  const authState = state.auth;
  const profileState = state.profile;
  const transactionsState = state.transactions;
  
  const authError = authState && 'error' in authState ? (authState as Record<string, unknown>).error as string | null : null;
  const profileError = profileState && 'error' in profileState ? (profileState as Record<string, unknown>).error as string | null : null;
  const transactionsError = transactionsState && 'error' in transactionsState ? (transactionsState as Record<string, unknown>).error as string | null : null;
  
  return authError || profileError || transactionsError;
};

export const APP_INITIAL_STATE: AppState = {
  auth: {} as AuthState,
  profile: {} as ProfileState,
  transactions: {} as TransactionState,
};
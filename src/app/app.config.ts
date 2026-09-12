import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';

import { routes } from './app.routes';
import { authReducer } from './core/state/auth/auth.reducer';
import { profileReducer } from './core/state/profile/profile.reducer';
import { transactionReducer } from './core/state/transaction/transaction.reducer';
import { AuthEffects } from './core/state/auth/auth.effects';
import { ProfileEffects } from './core/state/profile/profile.effects';
import { TransactionEffects } from './core/state/transaction/transaction.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { RootState, StatePersistenceConfig } from './core/state/index';

const DEFAULT_PERSISTENCE_CONFIG: StatePersistenceConfig = {
  blacklist: ['router']
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    provideStore<RootState>({
      auth: authReducer,
      profile: profileReducer,
      transactions: transactionReducer
    }),
    provideEffects([AuthEffects, ProfileEffects, TransactionEffects]),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    })
  ]
};

if (typeof window !== 'undefined') {
  const persistedState = localStorage.getItem('appState');
  if (persistedState) {
    try {
      const parsedState = JSON.parse(persistedState);
      console.log('Estado persistido cargado:', {
        hasAuth: !!parsedState.auth,
        hasProfile: !!parsedState.profile,
        hasTransactions: !!parsedState.transactions
      });
    } catch (error) {
      console.error('Error al cargar el estado persistido:', error);
    }
  }
}
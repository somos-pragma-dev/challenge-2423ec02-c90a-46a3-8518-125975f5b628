/**
 * Índice centralizado de exportación para todos los módulos de estado NgRx.
 * Provee acceso unificado a acciones, reducers, selectores y efectos.
 * 
 * Módulos de estado disponibles:
 * - auth: Gestión de autenticación y sesión de usuario
 * - profile: Datos del perfil del cliente
 * - transaction: Operaciones y historial de transacciones
 * 
 * Este archivo facilita las importaciones en toda la aplicación,
 * reduciendo el acoplamiento entre módulos de estado.
 */

export * from './auth/auth.actions';
export * from './auth/auth.reducer';
export * from './auth/auth.selectors';
export * from './auth/auth.effects';

export * from './profile/profile.actions';
export * from './profile/profile.reducer';
export * from './profile/profile.selectors';
export * from './profile/profile.effects';

export * from './transaction/transaction.actions';
export * from './transaction/transaction.reducer';
export * from './transaction/transaction.selectors';
export * from './transaction/transaction.effects';

export { AppState } from './app.state';

/**
 * Tipo que representa la estructura completa del estado de la aplicación.
 * Utilizado para tipar el Store de NgRx en toda la aplicación.
 */
export type { RootState } from './app.state';

/**
 * Interfaz que define la configuración de persistencia de estado.
 * Permite restaurar el estado desde localStorage al iniciar la aplicación.
 */
export interface StatePersistenceConfig {
  key: string;
  storage: Storage;
  serialize: (state: RootState) => string;
  deserialize: (state: string) => Partial<RootState>;
  blacklist?: (keyof RootState)[];
  whitelist?: (keyof RootState)[];
}

/**
 * Configuración predeterminada para persistencia de estado.
 * Persiste el estado de autenticación en sessionStorage.
 */
export const defaultPersistenceConfig: StatePersistenceConfig = {
  key: 'portal_autogestion_state',
  storage: sessionStorage,
  serialize: (state) => JSON.stringify({
    auth: state.auth,
    profile: state.profile
  }),
  deserialize: (state) => {
    try {
      return JSON.parse(state);
    } catch {
      return {};
    }
  },
  whitelist: ['auth', 'profile']
};

/**
 * Utilidad para limpiar todo el estado persistido.
 * Útil para cerrar sesión completamente.
 */
export function clearPersistedState(config: StatePersistenceConfig): void {
  config.storage.removeItem(config.key);
}

/**
 * Utilidad para guardar el estado actual en el almacenamiento configurado.
 * Útil para depuración o recuperación ante errores.
 */
export function persistState(state: RootState, config: StatePersistenceConfig): void {
  try {
    const serialized = config.serialize(state);
    config.storage.setItem(config.key, serialized);
  } catch (error) {
    console.error('Error al persistir estado:', error);
  }
}
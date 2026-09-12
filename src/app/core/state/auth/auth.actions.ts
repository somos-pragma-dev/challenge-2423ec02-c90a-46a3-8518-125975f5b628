import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/auth.model';

/**
 * Grupo de acciones para la gestión de autenticación.
 * Define todas las operaciones relacionadas con login, logout y gestión de sesión.
 * 
 * Acciones disponibles:
 * - login: Inicia el proceso de autenticación con credenciales
 * - loginSuccess: Autenticación exitosa con token y datos de usuario
 * - loginFailure: Error en autenticación con mensaje de error
 * - logout: Cierra la sesión actual del usuario
 * - logoutSuccess: Confirmación de cierre de sesión
 * - restoreSession: Restaura sesión desde token persistido
 * - refreshToken: Renueva el token de acceso
 * - refreshTokenSuccess: Token renovado exitosamente
 * - refreshTokenFailure: Error al renovar token
 * - updateProfile: Actualiza información del perfil del usuario
 * - updateProfileSuccess: Perfil actualizado exitosamente
 * - updateProfileFailure: Error al actualizar perfil
 */
export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': emptyProps(),
    'Login With Credentials': props<{ email: string; password: string }>(),
    'Login Success': props<{ token: string; user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Restore Session': props<{ token: string; user: User }>(),
    'Refresh Token': emptyProps(),
    'Refresh Token Success': props<{ token: string }>(),
    'Refresh Token Failure': props<{ error: string }>(),
    'Update Profile': props<{ profile: Partial<User> }>(),
    'Update Profile Success': props<{ user: User }>(),
    'Update Profile Failure': props<{ error: string }>(),
    'Clear Error': emptyProps(),
    'Set Loading': props<{ loading: boolean }>(),
    'Validate Token': props<{ token: string }>(),
    'Validate Token Success': props<{ user: User }>(),
    'Validate Token Failure': props<{ error: string }>()
  }
});

/**
 * Acción para iniciar sesión con recordatorio de credenciales.
 * Incluye opción para mantener la sesión activa.
 */
export const AuthLoginWithRemember = createActionGroup({
  source: 'Auth',
  events: {
    'Login With Remember': props<{ 
      email: string; 
      password: string; 
      rememberMe: boolean 
    }>()
  }
});

/**
 * Acciones para manejo de tokens JWT.
 * Incluye rotación y revocación de tokens.
 */
export const TokenActions = createActionGroup({
  source: 'Auth/Token',
  events: {
    'Store Token': props<{ token: string }>(),
    'Remove Token': emptyProps(),
    'Revoke Token': props<{ token: string }>(),
    'Revoke Token Success': emptyProps(),
    'Revoke Token Failure': props<{ error: string }>()
  }
});

/**
 * Tipos de acciones para uso en Effects y Reducers.
 * Facilita el tipado estricto de las acciones de autenticación.
 */
export type AuthActionTypes = 
  | typeof AuthActions
  | typeof AuthLoginWithRemember
  | typeof TokenActions;
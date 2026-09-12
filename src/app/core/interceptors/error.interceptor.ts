import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError, catchError } from 'rxjs';
import * as AuthActions from '../state/auth/auth.actions';

export interface ErrorResponse {
  status: number;
  message: string;
  code?: string;
  timestamp?: string;
}

const ERROR_MESSAGES: Record<number, string> = {
  400: 'Solicitud incorrecta. Verifique los datos ingresados.',
  401: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
  403: 'No tiene permiso para realizar esta acción.',
  404: 'Recurso no encontrado.',
  409: 'Conflicto de datos. El recurso ya existe o fue modificado.',
  422: 'Datos inválidos. Complete todos los campos requeridos.',
  429: 'Demasiadas solicitudes. Espere un momento e intente nuevamente.',
  500: 'Error interno del servidor. Intente más tarde.',
  502: 'Servicio no disponible. Intente más tarde.',
  503: 'Mantenimiento en progreso. Intente más tarde.'
};

export function getErrorMessage(status: number, defaultMessage?: string): string {
  return ERROR_MESSAGES[status] || defaultMessage || 'Ha ocurrido un error inesperado.';
}

function isAuthError(status: number): boolean {
  return status === 401 || status === 403;
}

function shouldRetry(status: number): boolean {
  return status === 0 || status === 503 || status === 502;
}

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const store = inject(Store);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorResponse: ErrorResponse = {
        status: error.status,
        message: getErrorMessage(error.status, error.message),
        code: error.error?.code,
        timestamp: new Date().toISOString()
      };

      console.error('Error HTTP interceptado:', {
        url: req.url,
        method: req.method,
        status: errorResponse.status,
        message: errorResponse.message,
        timestamp: errorResponse.timestamp
      });

      if (isAuthError(error.status)) {
        store.dispatch(AuthActions.logout());
        
        if (error.status === 401) {
          console.warn('Token expirado o inválido. Redirigiendo al login.');
        } else if (error.status === 403) {
          console.warn('Acceso denegado. El usuario no tiene permisos.');
        }
      }

      if (shouldRetry(error.status)) {
        console.warn('Error de conexión. Considere implementar lógica de reintento.');
      }

      return throwError(() => errorResponse);
    })
  );
};
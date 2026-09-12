import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthToken } from '../state/auth/auth.selectors';

const PUBLIC_API_ENDPOINTS = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/public'
];

function isPublicEndpoint(url: string): boolean {
  return PUBLIC_API_ENDPOINTS.some(endpoint => url.includes(endpoint));
}

function addAuthHeader(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const store = inject(Store);
  
  if (isPublicEndpoint(req.url)) {
    return next(req);
  }

  let token: string | null = null;
  
  store.select(selectAuthToken).subscribe(authToken => {
    token = authToken;
  }).unsubscribe();

  if (!token) {
    return next(req);
  }

  const authReq = addAuthHeader(req, token);
  
  return next(authReq);
};
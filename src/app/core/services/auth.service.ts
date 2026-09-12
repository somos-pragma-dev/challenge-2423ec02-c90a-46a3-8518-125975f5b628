import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, timer } from 'rxjs';
import { map, catchError, tap, switchMap, shareReplay } from 'rxjs/operators';
import { environment } from '@env/environment';
import { User, LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  
  public readonly token$ = this.tokenSubject.asObservable();
  public readonly user$ = this.userSubject.asObservable();
  public readonly isAuthenticated$ = this.token$.pipe(
    map(token => !!token)
  );

  constructor() {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const userJson = localStorage.getItem('auth_user');
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        this.tokenSubject.next(token);
        this.userSubject.next(user);
      } catch (error) {
        this.clearStorage();
      }
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, { headers }).pipe(
      map(response => {
        this.handleAuthResponse(response);
        return response.user;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => new Error(error.error?.message || 'Error de autenticación'));
      })
    );
  }

  logout(): Observable<void> {
    const token = this.tokenSubject.value;
    
    if (!token) {
      this.clearAuth();
      return new Observable(observer => {
        observer.next();
        observer.complete();
      });
    }

    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => this.clearAuth()),
      catchError(() => {
        this.clearAuth();
        return new Observable(observer => {
          observer.next();
          observer.complete();
        });
      })
    );
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const currentToken = this.tokenSubject.value;
    
    if (!currentToken) {
      return throwError(() => new Error('No hay token para refresh'));
    }

    const request: RefreshTokenRequest = { refreshToken: currentToken };

    return this.http.post<RefreshTokenResponse>(`${this.apiUrl}/refresh`, request).pipe(
      map(response => {
        this.handleTokenRefresh(response);
        return response;
      }),
      catchError(error => {
        this.clearAuth();
        return throwError(() => new Error('Sesión expirada'));
      })
    );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.tokenSubject.value && !!this.userSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.userSubject.value;
    return user?.roles?.includes(role) ?? false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.userSubject.value;
    if (!user?.roles) return false;
    return roles.some(role => user.roles.includes(role));
  }

  private handleAuthResponse(response: LoginResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_user', JSON.stringify(response.user));
    this.tokenSubject.next(response.token);
    this.userSubject.next(response.user);
  }

  private handleTokenRefresh(response: RefreshTokenResponse): void {
    localStorage.setItem('auth_token', response.token);
    this.tokenSubject.next(response.token);
  }

  private clearAuth(): void {
    this.clearStorage();
    this.tokenSubject.next(null);
    this.userSubject.next(null);
  }

  private clearStorage(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  validateSession(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => observer.next(false));
    }

    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/validate`, {}).pipe(
      map(response => response.valid),
      catchError(() => {
        this.clearAuth();
        return new Observable(observer => observer.next(false));
      })
    );
  }

  requestPasswordReset(email: string): Observable<void> {
    const params = new HttpParams().set('email', email);
    return this.http.post<void>(`${this.apiUrl}/password-reset`, {}, { params });
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    const body = { token, newPassword };
    return this.http.post<void>(`${this.apiUrl}/password-reset/confirm`, body);
  }
}
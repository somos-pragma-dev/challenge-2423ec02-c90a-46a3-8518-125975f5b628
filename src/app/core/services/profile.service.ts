import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry, shareReplay, timeout } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface Profile {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: Address;
  preferences: UserPreferences;
  kycStatus: KycStatus;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'system';
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
  transactions: boolean;
  security: boolean;
}

export type KycStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'NOT_STARTED';

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: Address;
  preferences?: Partial<UserPreferences>;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  profile: Profile;
  idempotencyKey: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: ValidationError[];
  };
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/profile`;
  private readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  getProfile(customerId: string): Observable<Profile> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    const params = new HttpParams()
      .set('includes', 'preferences,address,kyc')
      .set('version', 'v2');

    return this.http.get<Profile>(`${this.apiUrl}/customers/${customerId}`, {
      headers: this.defaultHeaders,
      params,
      observe: 'response'
    }).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      map(response => {
        if (!response.body) {
          throw new Error('Empty response body');
        }
        return response.body;
      }),
      retry({
        count: environment.retryAttempts || 2,
        delay: environment.retryDelay || 1000
      }),
      catchError(this.handleError.bind(this)),
      shareReplay(1)
    );
  }

  updateProfile(customerId: string, updates: UpdateProfileRequest, idempotencyKey?: string): Observable<ProfileUpdateResponse> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    if (!updates || Object.keys(updates).length === 0) {
      return throwError(() => new Error('At least one field must be provided for update'));
    }

    const headers = this.defaultHeaders.set('Idempotency-Key', idempotencyKey || this.generateIdempotencyKey(updates));

    return this.http.patch<ProfileUpdateResponse>(
      `${this.apiUrl}/customers/${customerId}`,
      updates,
      { headers }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      map(response => {
        if (!response) {
          throw new Error('Empty response body');
        }
        return response;
      }),
      catchError(this.handleError.bind(this))
    );
  }

  uploadProfileImage(customerId: string, file: File): Observable<{ imageUrl: string }> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    if (!file || file.size === 0) {
      return throwError(() => new Error('File is required'));
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return throwError(() => new Error('Invalid file type. Allowed: JPEG, PNG, WebP'));
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return throwError(() => new Error('File size exceeds 5MB limit'));
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', 'profile');

    const headers = this.defaultHeaders.delete('Content-Type');

    return this.http.post<{ imageUrl: string }>(
      `${this.apiUrl}/customers/${customerId}/image`,
      formData,
      { headers }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  verifyProfileOwnership(customerId: string, verificationCode: string): Observable<{ verified: boolean }> {
    if (!customerId || !verificationCode) {
      return throwError(() => new Error('Customer ID and verification code are required'));
    }

    return this.http.post<{ verified: boolean }>(
      `${this.apiUrl}/customers/${customerId}/verify`,
      { code: verificationCode }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  resendVerificationEmail(customerId: string): Observable<{ sent: boolean }> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    return this.http.post<{ sent: boolean }>(
      `${this.apiUrl}/customers/${customerId}/resend-verification`,
      {}
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  private generateIdempotencyKey(data: UpdateProfileRequest): string {
    const content = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `idem_${Date.now()}_${Math.abs(hash).toString(36)}`;
  }

  private handleError(error: unknown): Observable<never> {
    if (error instanceof Error) {
      if (error.name === 'TimeoutError') {
        console.error('[ProfileService] Request timeout exceeded');
        return throwError(() => new Error('La solicitud ha excedido el tiempo máximo de espera'));
      }
      console.error('[ProfileService] Error:', error.message);
      return throwError(() => error);
    }

    const httpError = error as ApiErrorResponse;
    if (httpError.error) {
      console.error('[ProfileService] API Error:', httpError.error);
      return throwError(() => new Error(httpError.error.message));
    }

    console.error('[ProfileService] Unknown error:', error);
    return throwError(() => new Error('Ha ocurrido un error inesperado al procesar tu solicitud'));
  }
}
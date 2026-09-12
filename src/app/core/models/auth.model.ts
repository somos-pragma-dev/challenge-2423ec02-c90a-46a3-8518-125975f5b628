export interface UserCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer' | 'JWT';
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  roles: UserRole[];
  permissions: string[];
  lastLoginAt?: string;
  createdAt: string;
  isActive: boolean;
  emailVerified: boolean;
  TwoFactorEnabled: boolean;
}

export type UserRole = 'CLIENT' | 'ADMIN' | 'SUPER_ADMIN' | 'SUPPORT';

export interface RefreshTokenRequest {
  refreshToken: string;
  grantType: 'refresh_token';
}

export interface TokenPayload {
  sub: string;
  email: string;
  roles: UserRole[];
  permissions: string[];
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_DISABLED'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  | 'REFRESH_TOKEN_EXPIRED'
  | 'SESSION_TIMEOUT'
  | 'MAX_SESSIONS_REACHED'
  | 'REQUIRED_2FA'
  | 'INVALID_2FA_CODE'
  | 'NETWORK_ERROR';

export interface SessionInfo {
  sessionId: string;
  deviceId: string;
  deviceName: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  startedAt: string;
  lastActivityAt: string;
  isCurrentSession: boolean;
}

export interface LogoutRequest {
  token: string;
  revokeAllSessions?: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}
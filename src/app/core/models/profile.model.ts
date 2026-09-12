export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileStatus;
  avatarUrl?: string;
  documentType?: DocumentType;
  documentNumber?: string;
  nationality?: string;
  birthDate?: Date;
  occupation?: string;
  monthlyIncome?: number;
  riskProfile?: RiskProfile;
  kycStatus: KycStatus;
  lastLoginAt?: Date;
  failedLoginAttempts: number;
  accountLocked: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  marketingConsent: boolean;
  dataProcessingConsent: boolean;
}

export interface Address {
  street: string;
  streetNumber: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  addressType: AddressType;
}

export type AddressType = 'residential' | 'commercial' | 'billing' | 'shipping';

export type DocumentType = 'dni' | 'passport' | 'driver_license' | 'national_id';

export type ProfileStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification' | 'blocked';

export type KycStatus = 'not_started' | 'in_progress' | 'pending_review' | 'approved' | 'rejected' | 'expired';

export type RiskProfile = 'conservative' | 'moderate' | 'aggressive' | 'none';

export interface UserPreferences {
  language: string;
  currency: string;
  timezone: string;
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'system';
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  sessionTimeout: number;
  defaultDashboard: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  transactionAlerts: boolean;
  securityAlerts: boolean;
  marketingCommunications: boolean;
  productUpdates: boolean;
  weeklyDigest: boolean;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: Partial<Address>;
  preferences?: Partial<UserPreferences>;
  marketingConsent?: boolean;
  dataProcessingConsent?: boolean;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  updatedProfile: Profile;
  timestamp: Date;
}

export interface ProfileValidationError {
  field: string;
  message: string;
  code: ValidationErrorCode;
}

export type ValidationErrorCode = 
  | 'REQUIRED_FIELD'
  | 'INVALID_FORMAT'
  | 'DUPLICATE_VALUE'
  | 'MAX_LENGTH_EXCEEDED'
  | 'MIN_LENGTH_NOT_MET'
  | 'INVALID_PHONE'
  | 'INVALID_EMAIL'
  | 'INVALID_DOCUMENT'
  | 'INVALID_ADDRESS'
  | 'AGE_RESTRICTION'
  | 'COUNTRY_RESTRICTION';

export interface ProfileListItem {
  id: string;
  email: string;
  fullName: string;
  status: ProfileStatus;
  avatarUrl?: string;
  lastLoginAt?: Date;
}

export interface ProfileSearchCriteria {
  query?: string;
  status?: ProfileStatus[];
  kycStatus?: KycStatus[];
  createdAfter?: Date;
  createdBefore?: Date;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProfileSearchResponse {
  items: ProfileListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const PROFILE_INITIAL_STATE: Partial<Profile> = {
  status: 'pending_verification',
  kycStatus: 'not_started',
  failedLoginAttempts: 0,
  accountLocked: false,
  emailVerified: false,
  phoneVerified: false,
  marketingConsent: false,
  dataProcessingConsent: false,
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'es',
  currency: 'EUR',
  timezone: 'Europe/Madrid',
  notifications: {
    email: true,
    sms: false,
    push: true,
    transactionAlerts: true,
    securityAlerts: true,
    marketingCommunications: false,
    productUpdates: false,
    weeklyDigest: false,
  },
  theme: 'system',
  twoFactorEnabled: false,
  biometricEnabled: false,
  sessionTimeout: 1800,
  defaultDashboard: 'overview',
};
// TODO: Import shared user types when available
// import { User, UserRole, UserPreferences, NotificationPreferences, UserAuthInfo } from '../../shared/types/user';

// Mobile-specific user interface extending the shared User type
export interface MobileUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  dateOfBirth: Date;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  profilePictureUrl: string;
  deviceToken: string;
  lastSyncTimestamp: Date;
}

// Enum for user roles (placeholder, should be imported from shared types)
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
}

// Mobile-specific user preferences interface
export interface MobileUserPreferences {
  userId: string;
  notificationPreferences: MobileNotificationPreferences;
  language: string;
  timezone: string;
  themePreference: string;
  fontSizePreference: string;
}

// Mobile-specific notification preferences interface
export interface MobileNotificationPreferences {
  email: boolean;
  sms: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

// Mobile-specific user authentication information interface
export interface MobileUserAuthInfo {
  userId: string;
  lastLogin: Date;
  failedLoginAttempts: number;
  mfaEnabled: boolean;
  mfaType: string;
  biometricAuthEnabled: boolean;
  rememberMeToken: string;
}

// TODO: Remove this comment when shared types are available and imported
// This file extends and adapts shared user types for mobile-specific use.
// Ensure compatibility with the API and backend services when implementing.

/**
 * Human tasks:
 * 1. Review and validate the MobileUser interface properties to ensure all required mobile-specific fields are included
 * 2. Confirm that the MobileNotificationPreferences interface covers all necessary mobile notification options
 * 3. Verify if additional mobile-specific user types or interfaces are needed for specific features
 * 4. Ensure that the mobile-specific types are compatible with the API and backend services
 */
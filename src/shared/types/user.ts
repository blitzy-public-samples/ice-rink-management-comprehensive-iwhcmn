/**
 * This file defines the user-related types for the Ice Rink Management and Booking System.
 * It contains interfaces and types that represent user data structures, roles, and preferences.
 */

/**
 * Enum representing the possible roles a user can have in the system
 */
export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  RinkManager = 'RinkManager',
  Staff = 'Staff',
  Coach = 'Coach',
  Customer = 'Customer',
}

/**
 * Interface representing a user in the system
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  dateOfBirth: Date;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface representing notification preferences for a user
 */
export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  pushNotifications: boolean;
}

/**
 * Interface representing user preferences
 */
export interface UserPreferences {
  userId: string;
  notificationPreferences: NotificationPreferences;
  language: string;
  timezone: string;
}

/**
 * Interface representing user authentication information
 */
export interface UserAuthInfo {
  userId: string;
  passwordHash: string;
  lastLogin: Date;
  failedLoginAttempts: number;
  mfaEnabled: boolean;
  mfaType: string;
}

// Human tasks:
// TODO: Review and validate the User interface properties to ensure all required fields are included
// TODO: Confirm that the UserRole enum covers all necessary roles for the system
// TODO: Verify if additional user-related types or interfaces are needed for specific features
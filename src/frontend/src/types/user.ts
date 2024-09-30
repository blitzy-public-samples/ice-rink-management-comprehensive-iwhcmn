import { UserRole } from '../../shared/types/user';

/**
 * Interface representing the user state in the frontend application
 */
export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Type definition for the user context used in React components
 */
export type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
};

/**
 * Interface representing the data structure for user forms (registration, profile update)
 */
export interface UserFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  role: UserRole;
}

/**
 * Interface representing a user in the frontend application
 * This is a placeholder and should be updated to match the backend User type
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  role: UserRole;
}

// TODO: Import or define the UserRole type if not available in shared types
// export enum UserRole {
//   CUSTOMER = 'CUSTOMER',
//   STAFF = 'STAFF',
//   ADMIN = 'ADMIN',
// }

/**
 * Human Tasks:
 * 1. Review and confirm that all necessary frontend-specific user types are included
 * 2. Ensure that the UserFormData interface includes all fields required for user registration and profile updates
 * 3. Verify that the UserContextType includes all necessary methods for user management in the frontend
 */
// Central file for exporting all types used in the Ice Rink Management and Booking System mobile application

// Import types from other files
import * as BookingTypes from './booking';
import * as RinkTypes from './rink';
import * as EquipmentTypes from './equipment';
import * as UserTypes from './user';

// Re-export all imported types
export * from './booking';
export * from './rink';
export * from './equipment';
export * from './user';

// Define any additional types that might be needed across the application

// Example of a generic API response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Example of a pagination type that could be used across different list views
export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Add any other shared types or interfaces here

// Example of a type for handling different user roles
export enum UserRole {
  Customer = 'customer',
  Staff = 'staff',
  Coach = 'coach',
  RinkManager = 'rink_manager',
  SuperAdmin = 'super_admin',
}

// Example of a type for handling different booking statuses
export enum BookingStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

// Example of a type for handling different payment methods
export enum PaymentMethod {
  CreditCard = 'credit_card',
  DebitCard = 'debit_card',
  Cash = 'cash',
  OnlinePayment = 'online_payment',
}

// Example of a type for handling different equipment categories
export enum EquipmentCategory {
  Skates = 'skates',
  Helmets = 'helmets',
  Pads = 'pads',
  Sticks = 'sticks',
  Other = 'other',
}

// Add any other enums or utility types that might be used across the application

// Commented list of human tasks
/*
Human Tasks:
1. [Required] Ensure that all necessary types are defined in the respective files (booking.ts, rink.ts, equipment.ts, user.ts) and exported here
2. [Optional] Review and update types as the mobile application requirements evolve
*/
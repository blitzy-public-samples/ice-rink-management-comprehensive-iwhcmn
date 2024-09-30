/**
 * Defines TypeScript types and interfaces related to ice rinks in the Ice Rink Management and Booking System mobile application
 */

/**
 * Interface representing an ice rink in the system
 */
export interface RinkType {
  id: string;
  name: string;
  address: string;
  capacity: number;
  contactInfo: string;
  isOpen: boolean;
}

/**
 * Interface representing the schedule of an ice rink
 */
export interface RinkScheduleType {
  rinkId: string;
  date: Date;
  timeSlots: TimeSlotType[];
}

/**
 * Interface representing a time slot for an ice rink
 */
export interface TimeSlotType {
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  price: number;
}

/**
 * Interface representing filters for searching rinks
 */
export interface RinkFilterType {
  name?: string;
  location?: string;
  date?: Date;
  minCapacity?: number;
  isOpen?: boolean;
}

/**
 * Human tasks:
 * TODO: Review and update rink types as needed based on specific mobile app requirements
 * TODO: Ensure consistency with backend API and database schema for rink-related data
 * TODO: Consider adding validation rules or utility types for rink-related operations
 * TODO: Implement geolocation types if needed for rink location services
 */
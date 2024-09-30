import { RinkType } from './rink';
import { EquipmentType } from './equipment';
import { UserType } from './user';

/**
 * Enum representing the possible statuses of a booking
 */
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

/**
 * Interface representing a booking in the system
 */
export interface BookingType {
  id: string;
  user: UserType;
  rink: RinkType;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  totalPrice: number;
  rentedEquipment: EquipmentType[];
}

/**
 * Interface representing the input for creating a new booking
 */
export interface CreateBookingInputType {
  userId: string;
  rinkId: string;
  startTime: Date;
  endTime: Date;
  equipmentIds: string[];
}

/**
 * Interface representing the input for updating an existing booking
 */
export interface UpdateBookingInputType {
  bookingId: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  equipmentIds: string[];
}

// Human tasks:
// TODO: Review and update booking types as needed based on specific mobile app requirements
// TODO: Ensure consistency with backend API and database schema for booking-related data
// TODO: Consider adding validation rules or utility types for booking-related operations
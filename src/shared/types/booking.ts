// Import the User type from the user module
// Note: The User type is not available, so we'll use a placeholder type
import { User } from './user';

/**
 * Enum representing the possible statuses of a booking
 */
export enum BookingStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled',
  Completed = 'Completed'
}

/**
 * Interface representing a booking in the system
 */
export interface Booking {
  id: string;
  userId: string;
  rinkId: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface representing equipment rental associated with a booking
 */
export interface EquipmentRental {
  id: string;
  bookingId: string;
  equipmentId: string;
  quantity: number;
  price: number;
}

/**
 * Interface extending Booking with additional details
 */
export interface BookingWithDetails {
  booking: Booking;
  user: User; // Note: This type is not available, so it might need to be defined or imported
  equipmentRentals: EquipmentRental[];
}

/**
 * Data Transfer Object for creating a new booking
 */
export interface CreateBookingDTO {
  userId: string;
  rinkId: string;
  startTime: Date;
  endTime: Date;
  equipmentRentals: Array<{ equipmentId: string; quantity: number }>;
}

/**
 * Data Transfer Object for updating an existing booking
 */
export interface UpdateBookingDTO {
  id: string;
  startTime?: Date;
  endTime?: Date;
  status?: BookingStatus;
  equipmentRentals?: Array<{ equipmentId: string; quantity: number }>;
}

// Human tasks:
// TODO: Review and validate the Booking interface properties to ensure all required fields are included
// TODO: Confirm that the BookingStatus enum covers all necessary statuses for the system
// TODO: Verify if additional booking-related types or interfaces are needed for specific features
// TODO: Ensure that the CreateBookingDTO and UpdateBookingDTO contain all necessary fields for their respective operations
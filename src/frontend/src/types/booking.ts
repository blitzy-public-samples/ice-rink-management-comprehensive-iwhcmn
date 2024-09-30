// This file defines TypeScript interfaces and types related to bookings in the Ice Rink Management and Booking System.
// It includes types for booking creation, retrieval, and management.

// Import dependencies
// Note: These imports are commented out as the files don't exist yet.
// import { Rink } from './rink';
// import { User } from './user';
// import { Equipment } from './equipment';

// Enum representing the possible statuses of a booking
export enum BookingStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Completed = 'completed'
}

// Interface representing a booking in the system
export interface Booking {
  id: string;
  userId: string;
  rinkId: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  totalPrice: number;
  equipmentRentals: EquipmentRental[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface representing an equipment rental associated with a booking
export interface EquipmentRental {
  id: string;
  bookingId: string;
  equipmentId: string;
  quantity: number;
}

// Data transfer object for creating a new booking
export interface CreateBookingDTO {
  userId: string;
  rinkId: string;
  startTime: Date;
  endTime: Date;
  equipmentRentals: CreateEquipmentRentalDTO[];
}

// Data transfer object for creating a new equipment rental
export interface CreateEquipmentRentalDTO {
  equipmentId: string;
  quantity: number;
}

// Data transfer object for updating an existing booking
export interface UpdateBookingDTO {
  id: string;
  startTime?: Date;
  endTime?: Date;
  status?: BookingStatus;
  equipmentRentals?: UpdateEquipmentRentalDTO[];
}

// Data transfer object for updating an existing equipment rental
export interface UpdateEquipmentRentalDTO {
  id: string;
  quantity: number;
}

// Extended booking type with related entity details
// Note: This type is commented out as it depends on types from other files that don't exist yet.
// export type BookingWithDetails = Booking & {
//   user: User;
//   rink: Rink;
//   equipmentRentals: (EquipmentRental & { equipment: Equipment })[];
// };

// TODO: Review and validate the booking types and interfaces to ensure they meet all business requirements
// TODO: Confirm that all necessary fields are included in the Booking and related interfaces
// TODO: Verify that the BookingStatus enum covers all possible booking states required by the system
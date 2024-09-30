/**
 * This file defines TypeScript interfaces and types related to ice rinks in the Ice Rink Management and Booking System.
 * These types are used across the application to ensure type safety and consistency when working with rink-related data.
 */

/**
 * Enum representing the possible statuses of an ice rink
 */
export enum RinkStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  CLOSED = 'CLOSED'
}

/**
 * Enum representing the types of ice time slots
 */
export enum SlotType {
  PUBLIC_SKATING = 'PUBLIC_SKATING',
  HOCKEY = 'HOCKEY',
  FIGURE_SKATING = 'FIGURE_SKATING',
  LESSONS = 'LESSONS',
  PRIVATE_EVENT = 'PRIVATE_EVENT'
}

/**
 * Enum representing the possible statuses of an ice time slot
 */
export enum SlotStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  RESERVED = 'RESERVED',
  CANCELLED = 'CANCELLED'
}

/**
 * Interface representing an ice rink in the system
 */
export interface Rink {
  id: string;
  name: string;
  address: string;
  capacity: number;
  contactInfo: string;
  status: RinkStatus;
}

/**
 * Interface representing an available time slot for an ice rink
 */
export interface IceSlot {
  id: string;
  rinkId: string;
  startTime: Date;
  endTime: Date;
  slotType: SlotType;
  price: number;
  status: SlotStatus;
}

// Human tasks:
// TODO: Review and validate the Rink interface properties to ensure all necessary fields are included
// TODO: Confirm that the IceSlot interface covers all required information for scheduling and booking
// TODO: Verify that the RinkStatus, SlotType, and SlotStatus enums include all possible values needed for the system
// TODO: Consider adding additional types or interfaces if needed for more complex rink-related operations
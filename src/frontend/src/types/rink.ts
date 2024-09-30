/**
 * This file defines TypeScript interfaces and types related to ice rinks
 * for the frontend of the Ice Rink Management and Booking System.
 */

/**
 * Represents an ice rink in the system
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
 * Represents the schedule for an ice rink
 */
export interface RinkSchedule {
  rinkId: string;
  slots: IceSlot[];
}

/**
 * Represents a bookable time slot for an ice rink
 */
export interface IceSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  price: number;
  status: SlotStatus;
  type: SlotType;
}

/**
 * Enum representing the possible statuses of an ice rink
 */
export enum RinkStatus {
  Active = 'active',
  Maintenance = 'maintenance',
  Closed = 'closed',
}

/**
 * Enum representing the possible statuses of an ice slot
 */
export enum SlotStatus {
  Available = 'available',
  Booked = 'booked',
  Blocked = 'blocked',
}

/**
 * Enum representing the possible types of ice slots
 */
export enum SlotType {
  Public = 'public',
  Private = 'private',
  Event = 'event',
  Lesson = 'lesson',
}

// Human tasks:
// TODO: Review and confirm that all necessary properties for Rink, RinkSchedule, and IceSlot interfaces are included
// TODO: Verify that the RinkStatus, SlotStatus, and SlotType enums cover all possible scenarios
// TODO: Consider adding any additional rink-related types or interfaces that may be needed for the frontend
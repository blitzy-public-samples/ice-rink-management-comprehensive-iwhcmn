/**
 * This file defines TypeScript types and interfaces related to equipment
 * in the Ice Rink Management and Booking System. It contains type definitions
 * for equipment items, their properties, and related operations.
 */

/**
 * Represents an equipment item in the ice rink
 */
export interface Equipment {
  /** Unique identifier for the equipment */
  id: string;

  /** Name of the equipment */
  name: string;

  /** Type of the equipment */
  type: EquipmentType;

  /** Total quantity of this equipment available */
  quantity: number;

  /** Current status of the equipment */
  status: EquipmentStatus;

  /** ID of the rink where this equipment is located */
  rinkId: string;
}

/**
 * Enum representing different types of equipment
 */
export enum EquipmentType {
  SKATES = 'SKATES',
  HELMETS = 'HELMETS',
  PUCKS = 'PUCKS',
  STICKS = 'STICKS',
  PROTECTIVE_GEAR = 'PROTECTIVE_GEAR',
  MAINTENANCE_EQUIPMENT = 'MAINTENANCE_EQUIPMENT'
}

/**
 * Enum representing the status of equipment
 */
export enum EquipmentStatus {
  AVAILABLE = 'AVAILABLE',
  IN_USE = 'IN_USE',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  OUT_OF_ORDER = 'OUT_OF_ORDER'
}

/**
 * Represents an equipment rental transaction
 */
export interface EquipmentRental {
  /** Unique identifier for the rental */
  id: string;

  /** ID of the rented equipment */
  equipmentId: string;

  /** ID of the user renting the equipment */
  userId: string;

  /** ID of the associated booking, if any */
  bookingId: string;

  /** Quantity of equipment rented */
  quantity: number;

  /** Start time of the rental */
  startTime: Date;

  /** End time of the rental */
  endTime: Date;

  /** Current status of the rental */
  status: RentalStatus;
}

/**
 * Enum representing the status of an equipment rental
 */
export enum RentalStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

/**
 * Human tasks:
 * TODO: Review and confirm the equipment types and statuses are comprehensive for the ice rink management system
 * TODO: Verify if additional properties are needed for the Equipment or EquipmentRental types
 * TODO: Consider adding validation rules or constraints for equipment quantities and rental durations
 */
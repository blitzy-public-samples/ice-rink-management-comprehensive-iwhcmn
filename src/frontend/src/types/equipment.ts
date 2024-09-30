/**
 * This file defines the TypeScript interfaces and types related to equipment
 * in the Ice Rink Management and Booking System. It includes types for
 * equipment items, rental information, and equipment-related operations.
 */

/**
 * Represents an equipment item in the system
 */
export interface Equipment {
  id: string;
  name: string;
  type: string;
  description: string;
  quantity: number;
  availableQuantity: number;
  rentalPrice: number;
  status: EquipmentStatus;
}

/**
 * Represents an equipment rental transaction
 */
export interface EquipmentRental {
  id: string;
  equipmentId: string;
  userId: string;
  bookingId: string;
  quantity: number;
  startTime: Date;
  endTime: Date;
  totalPrice: number;
  status: RentalStatus;
}

/**
 * Enum representing the possible statuses of an equipment item
 */
export enum EquipmentStatus {
  Available = 'available',
  InUse = 'inUse',
  UnderMaintenance = 'underMaintenance',
  OutOfStock = 'outOfStock',
}

/**
 * Enum representing the possible statuses of an equipment rental
 */
export enum RentalStatus {
  Pending = 'pending',
  Active = 'active',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

/**
 * Enum representing the types of equipment available
 */
export enum EquipmentType {
  Skates = 'skates',
  Helmet = 'helmet',
  Gloves = 'gloves',
  Pads = 'pads',
  Stick = 'stick',
  Other = 'other',
}

// Human tasks (commented as requested):
/**
 * TODO: Human tasks
 * 1. Review and confirm that all necessary equipment-related types are included (Required)
 * 2. Ensure that the equipment types align with the actual inventory of the ice rink (Required)
 * 3. Consider adding any additional properties or types specific to the ice rink's equipment management needs (Optional)
 */
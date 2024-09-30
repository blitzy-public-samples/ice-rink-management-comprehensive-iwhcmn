// Import shared types if they become available in the future
// import { Equipment, EquipmentType, EquipmentStatus, EquipmentRental, RentalStatus } from '../../shared/types/equipment';

// Define shared types here until they are available from the shared module
export enum EquipmentType {
  SKATES = 'SKATES',
  HELMET = 'HELMET',
  PADS = 'PADS',
  STICK = 'STICK',
  // Add other equipment types as needed
}

export enum EquipmentStatus {
  AVAILABLE = 'AVAILABLE',
  IN_USE = 'IN_USE',
  MAINTENANCE = 'MAINTENANCE',
  // Add other statuses as needed
}

export enum RentalStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  // Add other rental statuses as needed
}

/**
 * Represents equipment in the mobile application.
 * Extends the shared Equipment type with mobile-specific properties.
 */
export interface MobileEquipment {
  id: string;
  name: string;
  type: EquipmentType;
  quantity: number;
  status: EquipmentStatus;
  rinkId: string;
  imageUrl: string;
  description: string;
}

/**
 * Represents an equipment rental in the mobile application.
 * Extends the shared EquipmentRental type with mobile-specific properties.
 */
export interface MobileEquipmentRental {
  id: string;
  equipmentId: string;
  userId: string;
  bookingId: string;
  quantity: number;
  startTime: Date;
  endTime: Date;
  status: RentalStatus;
  qrCode: string;
  mobileNotifications: boolean;
}

/**
 * Defines options for filtering equipment in the mobile app.
 */
export interface EquipmentFilterOptions {
  type?: EquipmentType[];
  status?: EquipmentStatus[];
  availableOnly?: boolean;
}

// Human tasks:
// TODO: Review and confirm if the mobile-specific properties added to MobileEquipment and MobileEquipmentRental are sufficient for the mobile app requirements
// TODO: Verify if additional mobile-specific types or interfaces are needed for equipment management in the mobile app
// TODO: Consider adding validation or constraint types for equipment-related inputs in the mobile app
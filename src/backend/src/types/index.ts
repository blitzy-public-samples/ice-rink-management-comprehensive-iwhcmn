// This file serves as the main entry point for type definitions in the backend.
// It imports and re-exports types from other type definition files to provide
// a centralized access point for all backend-related types.

// TODO: Uncomment these imports once the respective files are created
// import * as ServiceTypes from './services';
// import * as JobTypes from './jobs';
// import * as IntegrationTypes from './integrations';

// Re-export types
// export { ServiceTypes, JobTypes, IntegrationTypes };

// Placeholder type exports
// These will be replaced with actual type exports once the files are created

export type PlaceholderServiceType = {
  // Add placeholder service types here
};

export type PlaceholderJobType = {
  // Add placeholder job types here
};

export type PlaceholderIntegrationType = {
  // Add placeholder integration types here
};

// Project-specific global types
export type IceRinkId = string;
export type UserId = string;
export type BookingId = string;

export interface IceRink {
  id: IceRinkId;
  name: string;
  address: string;
  capacity: number;
  // Add more properties as needed
}

export interface User {
  id: UserId;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'staff' | 'admin';
  // Add more properties as needed
}

export interface Booking {
  id: BookingId;
  userId: UserId;
  rinkId: IceRinkId;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  // Add more properties as needed
}

// Add more project-specific types as needed

/**
 * TODO: Review and confirm the structure of imported types from services.ts, jobs.ts, and integrations.ts once they are created
 * TODO: Add any additional project-specific global types that are not covered by the imported modules
 */
/**
 * src/api/models/index.ts
 * 
 * This file serves as the central point for exporting all database models
 * used in the Ice Rink Management and Booking System. It imports individual
 * model files and re-exports them for easy access throughout the application.
 */

// Import individual model files
import { User } from './User';
import { Booking } from './Booking';
import { Rink } from './Rink';
import { Equipment } from './Equipment';

// Re-export models
export {
  User,
  Booking,
  Rink,
  Equipment
};

// Export default object with all models
export default {
  User,
  Booking,
  Rink,
  Equipment
};

/**
 * Human Tasks:
 * 1. Ensure that all individual model files (User.ts, Booking.ts, Rink.ts, Equipment.ts) are created and properly implemented
 * 2. Review and confirm that all necessary models for the Ice Rink Management and Booking System are included in this index file
 */
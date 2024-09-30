/**
 * Index file that exports all controllers for the Ice Rink Management and Booking System API
 * This file serves as a central point for importing controllers throughout the application.
 */

// Import controllers
import * as authController from './authController';
import * as userController from './userController';
import * as bookingController from './bookingController';
import * as rinkController from './rinkController';
import * as equipmentController from './equipmentController';

// Export controllers
export {
  authController,
  userController,
  bookingController,
  rinkController,
  equipmentController,
};

// TODO: Implement individual controller files:
// - authController.ts
// - userController.ts
// - bookingController.ts
// - rinkController.ts
// - equipmentController.ts

// TODO: Review and finalize the structure of controller exports once individual files are implemented

/**
 * This index file allows for easier imports in other parts of the application.
 * Instead of importing each controller separately, you can import them all from this file:
 * 
 * import { authController, userController, ... } from './controllers';
 * 
 * This approach provides better organization and makes it easier to manage imports
 * as the number of controllers grows.
 */
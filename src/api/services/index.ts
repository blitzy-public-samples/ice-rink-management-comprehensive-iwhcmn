/**
 * This file serves as the main entry point for all service modules in the API.
 * It exports all services to be used throughout the application.
 */

// Import all service modules
import * as authService from './authService';
import * as bookingService from './bookingService';
import * as emailService from './emailService';
import * as paymentService from './paymentService';

// Export all services
export {
  authService,
  bookingService,
  emailService,
  paymentService
};

// TODO: Ensure that all imported services are correctly implemented in their respective files
// TODO: Review and update service exports as new services are added to the application

/**
 * This file allows for centralized management of all services.
 * By importing and re-exporting services here, we can:
 * 1. Easily manage dependencies between services
 * 2. Provide a single point of entry for all service-related functionality
 * 3. Simplify imports in other parts of the application
 * 
 * When adding new services:
 * 1. Create the service file (e.g., newService.ts) in the services directory
 * 2. Import the service in this file
 * 3. Add the service to the exports
 * 
 * Example:
 * import * as newService from './newService';
 * export { ..., newService };
 */
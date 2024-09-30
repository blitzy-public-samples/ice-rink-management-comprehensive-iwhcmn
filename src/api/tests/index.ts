// src/api/tests/index.ts

// Import test suites
import * as authControllerTests from './unit/authController.test';
import * as userControllerTests from './unit/userController.test';
import * as bookingControllerTests from './unit/bookingController.test';
import * as authIntegrationTests from './integration/auth.test';
import * as bookingsIntegrationTests from './integration/bookings.test';

// Export all test suites
export {
  authControllerTests,
  userControllerTests,
  bookingControllerTests,
  authIntegrationTests,
  bookingsIntegrationTests,
};

// TODO: Implement the following human tasks:
// 1. Implement unit and integration test files for auth, user, and booking controllers
// 2. Set up test environment and configuration
// 3. Implement additional test files for other controllers and services as they are developed

/**
 * This file serves as the entry point for all API tests in the Ice Rink Management and Booking System.
 * It imports and exports all test suites to provide a centralized location for running tests.
 * 
 * As the system grows, additional test suites should be imported and exported here.
 * This structure allows for easy organization and execution of all tests from a single point.
 * 
 * To run all tests, you can use a test runner like Jest and point it to this file.
 * Example: jest src/api/tests/index.ts
 * 
 * Make sure to keep this file updated as new test suites are added to the project.
 */

// Example of how to add a new test suite:
// import * as newControllerTests from './unit/newController.test';
// export { newControllerTests };
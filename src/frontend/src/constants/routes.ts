/**
 * This file defines the constant route paths used throughout the frontend application
 * of the Ice Rink Management and Booking System. It provides a centralized location
 * for managing and maintaining all route strings, ensuring consistency across the application.
 */

// Public routes
export const HOME = '/'
export const LOGIN = '/login'
export const REGISTER = '/register'

// User routes
export const DASHBOARD = '/dashboard'
export const BOOKINGS = '/bookings'
export const BOOKING_DETAILS = '/bookings/:id'
export const RINKS = '/rinks'
export const RINK_DETAILS = '/rinks/:id'
export const EQUIPMENT = '/equipment'
export const EQUIPMENT_DETAILS = '/equipment/:id'
export const PROFILE = '/profile'

// Admin routes
export const ADMIN = '/admin'
export const ADMIN_USERS = '/admin/users'
export const ADMIN_RINKS = '/admin/rinks'
export const ADMIN_EQUIPMENT = '/admin/equipment'
export const ADMIN_REPORTS = '/admin/reports'

/**
 * Helper function to generate a booking details route with a specific ID
 * @param id - The booking ID
 * @returns The booking details route with the specified ID
 */
export const getBookingDetailsRoute = (id: string): string => `/bookings/${id}`

/**
 * Helper function to generate a rink details route with a specific ID
 * @param id - The rink ID
 * @returns The rink details route with the specified ID
 */
export const getRinkDetailsRoute = (id: string): string => `/rinks/${id}`

/**
 * Helper function to generate an equipment details route with a specific ID
 * @param id - The equipment ID
 * @returns The equipment details route with the specified ID
 */
export const getEquipmentDetailsRoute = (id: string): string => `/equipment/${id}`

// TODO: Review and confirm that all necessary routes for the Ice Rink Management and Booking System are included
// TODO: Ensure that the route naming conventions are consistent and follow the project's guidelines
// TODO: Consider adding comments to explain the purpose of each route if not self-evident
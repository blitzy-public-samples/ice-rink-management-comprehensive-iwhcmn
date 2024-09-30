import { Router } from 'express';
import {
  createBooking,
  getBooking,
  updateBooking,
  cancelBooking,
  getUserBookings,
  getRinkBookings
} from '../controllers/bookingController';
import authMiddleware from '../middleware/auth';

const router = Router();

// Create a new booking
router.post('/', authMiddleware, createBooking);

// Get a specific booking by ID
router.get('/:id', authMiddleware, getBooking);

// Update an existing booking
router.put('/:id', authMiddleware, updateBooking);

// Cancel an existing booking
router.post('/:id/cancel', authMiddleware, cancelBooking);

// Get all bookings for the authenticated user
router.get('/user', authMiddleware, getUserBookings);

// Get all bookings for a specific rink within a date range
router.get('/rink', authMiddleware, getRinkBookings);

// Human tasks (commented)
/*
TODO: Implement rate limiting middleware for booking routes (Required)
TODO: Add routes for bulk booking operations (Optional)
TODO: Implement role-based access control for certain booking operations (Required)
*/

export default router;
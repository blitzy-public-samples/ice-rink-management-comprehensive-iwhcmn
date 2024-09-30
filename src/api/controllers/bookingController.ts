import { Request, Response } from 'express';
import { ApiResponse, PaginatedResponse, ErrorResponse } from '../types/index';
import BookingModel from '../models/Booking';
import { Booking } from '../../shared/types/booking';
import validationMiddleware from '../middleware/validation';

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingData: Booking = req.body;
    const newBooking = await BookingModel.createBooking(bookingData);
    const response: ApiResponse<Booking> = {
      success: true,
      data: newBooking,
      message: 'Booking created successfully',
    };
    res.status(201).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to create booking',
      message: error.message,
    };
    res.status(500).json(errorResponse);
  }
};

export const getBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = req.params.id;
    const booking = await BookingModel.findBookingById(bookingId);
    if (booking) {
      const response: ApiResponse<Booking> = {
        success: true,
        data: booking,
        message: 'Booking retrieved successfully',
      };
      res.status(200).json(response);
    } else {
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Booking not found',
        message: `No booking found with id ${bookingId}`,
      };
      res.status(404).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to retrieve booking',
      message: error.message,
    };
    res.status(500).json(errorResponse);
  }
};

export const updateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = req.params.id;
    const updateData: Partial<Booking> = req.body;
    const updatedBooking = await BookingModel.updateBooking(bookingId, updateData);
    if (updatedBooking) {
      const response: ApiResponse<Booking> = {
        success: true,
        data: updatedBooking,
        message: 'Booking updated successfully',
      };
      res.status(200).json(response);
    } else {
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Booking not found',
        message: `No booking found with id ${bookingId}`,
      };
      res.status(404).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to update booking',
      message: error.message,
    };
    res.status(500).json(errorResponse);
  }
};

export const cancelBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = req.params.id;
    const cancelledBooking = await BookingModel.cancelBooking(bookingId);
    if (cancelledBooking) {
      const response: ApiResponse<Booking> = {
        success: true,
        data: cancelledBooking,
        message: 'Booking cancelled successfully',
      };
      res.status(200).json(response);
    } else {
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Booking not found',
        message: `No booking found with id ${bookingId}`,
      };
      res.status(404).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to cancel booking',
      message: error.message,
    };
    res.status(500).json(errorResponse);
  }
};

export const getUserBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id; // Assuming user ID is available from authentication middleware
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { bookings, total } = await BookingModel.findBookingsByUser(userId, page, limit);
    const response: PaginatedResponse<Booking> = {
      success: true,
      data: bookings,
      message: 'User bookings retrieved successfully',
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to retrieve user bookings',
      message: error.message,
    };
    res.status(500).json(errorResponse);
  }
};

export const getRinkBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const rinkId = req.params.rinkId;
    const startDate = new Date(req.query.startDate as string);
    const endDate = new Date(req.query.endDate as string);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { bookings, total } = await BookingModel.findBookingsByRink(rinkId, startDate, endDate, page, limit);
    const response: PaginatedResponse<Booking> = {
      success: true,
      data: bookings,
      message: 'Rink bookings retrieved successfully',
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'Failed to retrieve rink bookings',
      message: error.message,
    };
    res.status(500).json(errorResponse);
  }
};

// TODO: Implement rate limiting for booking creation and updates
// TODO: Add support for bulk booking operations
// TODO: Implement more advanced filtering and sorting options for booking queries
// TODO: Add support for booking notifications (e.g., confirmation emails, reminders)

export default {
  createBooking: [validationMiddleware('createBookingSchema'), createBooking],
  getBooking,
  updateBooking: [validationMiddleware('updateBookingSchema'), updateBooking],
  cancelBooking,
  getUserBookings,
  getRinkBookings: [validationMiddleware('getRinkBookingsSchema'), getRinkBookings],
};
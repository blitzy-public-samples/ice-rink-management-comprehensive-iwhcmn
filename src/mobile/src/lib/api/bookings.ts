import axios from 'axios';
import { BookingType, CreateBookingInputType, UpdateBookingInputType } from '../../types/booking';
import api from '../api';

// TODO: Implement error handling for API requests
// TODO: Add authentication token to API requests
// TODO: Implement request caching for improved performance
// TODO: Add unit tests for API functions

/**
 * Fetches all bookings for the current user
 * @returns A promise that resolves to an array of BookingType objects
 */
export const getBookings = async (): Promise<BookingType[]> => {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

/**
 * Fetches a specific booking by its ID
 * @param id The ID of the booking to fetch
 * @returns A promise that resolves to a BookingType object
 */
export const getBookingById = async (id: string): Promise<BookingType> => {
  try {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching booking with id ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new booking
 * @param bookingData The data for the new booking
 * @returns A promise that resolves to the created BookingType object
 */
export const createBooking = async (bookingData: CreateBookingInputType): Promise<BookingType> => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Updates an existing booking
 * @param bookingData The updated booking data
 * @returns A promise that resolves to the updated BookingType object
 */
export const updateBooking = async (bookingData: UpdateBookingInputType): Promise<BookingType> => {
  try {
    const response = await api.put(`/bookings/${bookingData.bookingId}`, bookingData);
    return response.data;
  } catch (error) {
    console.error(`Error updating booking with id ${bookingData.bookingId}:`, error);
    throw error;
  }
};

/**
 * Cancels an existing booking
 * @param id The ID of the booking to cancel
 * @returns A promise that resolves when the booking is successfully cancelled
 */
export const cancelBooking = async (id: string): Promise<void> => {
  try {
    await api.delete(`/bookings/${id}`);
  } catch (error) {
    console.error(`Error cancelling booking with id ${id}:`, error);
    throw error;
  }
};
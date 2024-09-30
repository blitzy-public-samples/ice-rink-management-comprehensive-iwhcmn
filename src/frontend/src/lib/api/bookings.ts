import { Booking, CreateBookingDTO, UpdateBookingDTO, BookingWithDetails } from '../../types/booking';
import { api } from './index';

/**
 * Creates a new booking
 * @param bookingData The data for creating a new booking
 * @returns A promise that resolves to the created booking
 */
export const createBooking = async (bookingData: CreateBookingDTO): Promise<Booking> => {
  try {
    const response = await api.post<Booking>('/api/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Retrieves a list of bookings
 * @param filters Optional filters for the bookings
 * @returns A promise that resolves to an array of bookings
 */
export const getBookings = async (filters?: object): Promise<Booking[]> => {
  try {
    const response = await api.get<Booking[]>('/api/bookings', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

/**
 * Retrieves a specific booking by its ID
 * @param id The ID of the booking to retrieve
 * @returns A promise that resolves to the booking with detailed information
 */
export const getBookingById = async (id: string): Promise<BookingWithDetails> => {
  try {
    const response = await api.get<BookingWithDetails>(`/api/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking details:', error);
    throw error;
  }
};

/**
 * Updates an existing booking
 * @param bookingData The data for updating the booking
 * @returns A promise that resolves to the updated booking
 */
export const updateBooking = async (bookingData: UpdateBookingDTO): Promise<Booking> => {
  try {
    const response = await api.put<Booking>(`/api/bookings/${bookingData.id}`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

/**
 * Deletes a booking
 * @param id The ID of the booking to delete
 * @returns A promise that resolves when the booking is deleted
 */
export const deleteBooking = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/bookings/${id}`);
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};

/**
 * Retrieves bookings for a specific user
 * @param userId The ID of the user
 * @param filters Optional filters for the bookings
 * @returns A promise that resolves to an array of bookings for the user
 */
export const getUserBookings = async (userId: string, filters?: object): Promise<Booking[]> => {
  try {
    const response = await api.get<Booking[]>(`/api/users/${userId}/bookings`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};

/**
 * Retrieves bookings for a specific rink
 * @param rinkId The ID of the rink
 * @param filters Optional filters for the bookings
 * @returns A promise that resolves to an array of bookings for the rink
 */
export const getRinkBookings = async (rinkId: string, filters?: object): Promise<Booking[]> => {
  try {
    const response = await api.get<Booking[]>(`/api/rinks/${rinkId}/bookings`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching rink bookings:', error);
    throw error;
  }
};

// TODO: Implement error handling for API requests
// TODO: Add input validation for function parameters
// TODO: Implement request cancellation using axios CancelToken
// TODO: Add unit tests for each API function
// TODO: Implement request/response interceptors for common operations (e.g., adding authentication headers)
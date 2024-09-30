import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Booking, CreateBookingDTO, UpdateBookingDTO, BookingWithDetails } from '../types/booking';
import apiClient from '../api/apiClient';

interface UseBookingResult {
  bookings: BookingWithDetails[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  createBooking: (booking: CreateBookingDTO) => Promise<void>;
  updateBooking: (id: string, booking: UpdateBookingDTO) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
}

export const useBooking = (): UseBookingResult => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Assuming we have a bookings slice in our Redux store
  const bookings = useSelector((state: any) => state.bookings.items);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<BookingWithDetails[]>('/bookings');
      dispatch({ type: 'bookings/setBookings', payload: response.data });
    } catch (err) {
      setError('Failed to fetch bookings. Please try again.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const createBooking = useCallback(async (booking: CreateBookingDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<BookingWithDetails>('/bookings', booking);
      dispatch({ type: 'bookings/addBooking', payload: response.data });
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error('Error creating booking:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const updateBooking = useCallback(async (id: string, booking: UpdateBookingDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put<BookingWithDetails>(`/bookings/${id}`, booking);
      dispatch({ type: 'bookings/updateBooking', payload: response.data });
    } catch (err) {
      setError('Failed to update booking. Please try again.');
      console.error('Error updating booking:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const cancelBooking = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/bookings/${id}`);
      dispatch({ type: 'bookings/removeBooking', payload: id });
    } catch (err) {
      setError('Failed to cancel booking. Please try again.');
      console.error('Error cancelling booking:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBooking,
    cancelBooking,
  };
};

// Human tasks:
// TODO: Implement error handling and validation for booking operations
// TODO: Add unit tests for the useBooking hook
// TODO: Consider implementing caching mechanism for fetched bookings
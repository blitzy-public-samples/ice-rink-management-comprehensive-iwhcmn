import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Booking, CreateBookingDTO, UpdateBookingDTO, BookingWithDetails } from '../types/booking';
import api from '../lib/api';

interface UseBookingsReturn {
  bookings: BookingWithDetails[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  createBooking: (booking: CreateBookingDTO) => Promise<Booking>;
  updateBooking: (id: string, booking: UpdateBookingDTO) => Promise<Booking>;
  deleteBooking: (id: string) => Promise<void>;
}

export const useBookings = (): UseBookingsReturn => {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch bookings. Please try again later.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (booking: CreateBookingDTO): Promise<Booking> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/bookings', booking);
      setBookings(prevBookings => [...prevBookings, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create booking. Please try again later.');
      console.error('Error creating booking:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBooking = useCallback(async (id: string, booking: UpdateBookingDTO): Promise<Booking> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/bookings/${id}`, booking);
      setBookings(prevBookings =>
        prevBookings.map(b => (b.id === id ? { ...b, ...response.data } : b))
      );
      return response.data;
    } catch (err) {
      setError('Failed to update booking. Please try again later.');
      console.error('Error updating booking:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBooking = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(prevBookings => prevBookings.filter(b => b.id !== id));
    } catch (err) {
      setError('Failed to delete booking. Please try again later.');
      console.error('Error deleting booking:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
  };
};

// Human tasks:
// TODO: Implement error handling and retry logic for API calls
// TODO: Add pagination support for fetching bookings
// TODO: Implement caching mechanism to improve performance
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookingType, CreateBookingInputType, UpdateBookingInputType } from '../types/booking';
import api from '../lib/api';

const useBookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  // Assuming we have a bookings slice in our Redux store
  const bookingsState = useSelector((state: any) => state.bookings);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getBookings();
      setBookings(response.data);
      dispatch({ type: 'bookings/setBookings', payload: response.data });
    } catch (err) {
      setError('Failed to fetch bookings. Please try again.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const createBooking = useCallback(async (bookingData: CreateBookingInputType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.createBooking(bookingData);
      setBookings(prevBookings => [...prevBookings, response.data]);
      dispatch({ type: 'bookings/addBooking', payload: response.data });
      return response.data;
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error('Error creating booking:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const updateBooking = useCallback(async (bookingId: string, bookingData: UpdateBookingInputType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.updateBooking(bookingId, bookingData);
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId ? response.data : booking
        )
      );
      dispatch({ type: 'bookings/updateBooking', payload: response.data });
      return response.data;
    } catch (err) {
      setError('Failed to update booking. Please try again.');
      console.error('Error updating booking:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const cancelBooking = useCallback(async (bookingId: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.cancelBooking(bookingId);
      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
      dispatch({ type: 'bookings/removeBooking', payload: bookingId });
    } catch (err) {
      setError('Failed to cancel booking. Please try again.');
      console.error('Error canceling booking:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

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
    cancelBooking,
  };
};

export default useBookings;

// Human tasks:
// TODO: Implement error handling and retry logic for API calls
// TODO: Add pagination support for fetching bookings
// TODO: Implement caching mechanism for bookings data
// TODO: Add unit tests for the useBookings hook
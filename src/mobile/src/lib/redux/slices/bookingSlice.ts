import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingType, CreateBookingInputType, UpdateBookingInputType } from '../../../types/booking';
import { getBookings, getBookingById, createBooking, updateBooking, cancelBooking } from '../../api/bookings';

interface BookingState {
  bookings: BookingType[];
  selectedBooking: BookingType | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<BookingType[]>) => {
      state.bookings = action.payload;
    },
    setSelectedBooking: (state, action: PayloadAction<BookingType>) => {
      state.selectedBooking = action.payload;
    },
    addBooking: (state, action: PayloadAction<BookingType>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<BookingType>) => {
      const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setBookings,
  setSelectedBooking,
  addBooking,
  updateBooking,
  removeBooking,
  setLoading,
  setError,
} = bookingSlice.actions;

// Async thunks
export const fetchBookings = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const bookings = await getBookings();
    dispatch(setBookings(bookings));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const fetchBookingById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const booking = await getBookingById(id);
    dispatch(setSelectedBooking(booking));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const createNewBooking = (bookingData: CreateBookingInputType) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const newBooking = await createBooking(bookingData);
    dispatch(addBooking(newBooking));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const updateExistingBooking = (bookingData: UpdateBookingInputType) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const updatedBooking = await updateBooking(bookingData);
    dispatch(updateBooking(updatedBooking));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const cancelExistingBooking = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await cancelBooking(id);
    dispatch(removeBooking(id));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default bookingSlice.reducer;

// Human tasks:
// TODO: Implement error handling for async thunks
// TODO: Add unit tests for reducers and async thunks
// TODO: Optimize state updates for large numbers of bookings
// TODO: Implement selectors for efficient state access
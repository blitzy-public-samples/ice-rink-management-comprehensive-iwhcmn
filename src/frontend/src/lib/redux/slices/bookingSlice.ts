import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Booking, CreateBookingDTO, UpdateBookingDTO, BookingStatus } from '../../../types/booking';

// Define the state type for the booking slice
interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

// Async thunk for fetching all bookings
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    // TODO: Implement API call to fetch all bookings
    const response = await fetch('/api/bookings');
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    return response.json() as Promise<Booking[]>;
  }
);

// Async thunk for creating a new booking
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData: CreateBookingDTO) => {
    // TODO: Implement API call to create a new booking
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return response.json() as Promise<Booking>;
  }
);

// Async thunk for updating an existing booking
export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async (bookingData: UpdateBookingDTO) => {
    // TODO: Implement API call to update the booking
    const response = await fetch(`/api/bookings/${bookingData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error('Failed to update booking');
    }
    return response.json() as Promise<Booking>;
  }
);

// Async thunk for cancelling a booking
export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId: string) => {
    // TODO: Implement API call to cancel the booking
    const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
    return response.json() as Promise<Booking>;
  }
);

// Create the booking slice
const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBookingInState: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(b => b.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      });
  },
});

// Export actions and reducer
export const {
  setBookings,
  addBooking,
  updateBookingInState,
  removeBooking,
  setLoading,
  setError,
} = bookingSlice.actions;

export default bookingSlice.reducer;

// Pending human tasks:
// TODO: Implement error handling for API calls in async thunks
// TODO: Add unit tests for reducers and async thunks
// TODO: Optimize state updates for large numbers of bookings
// TODO: Implement caching mechanism for fetched bookings
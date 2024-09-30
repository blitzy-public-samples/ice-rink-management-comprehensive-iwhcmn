import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Assuming these types are defined elsewhere in the project
interface Rink {
  id: string;
  name: string;
  // Add other rink properties as needed
}

interface RinkSchedule {
  rinkId: string;
  // Add other schedule properties as needed
}

interface IceSlot {
  id: string;
  startTime: string;
  endTime: string;
  // Add other ice slot properties as needed
}

enum RinkStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  MAINTENANCE = 'MAINTENANCE',
}

enum SlotStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  BLOCKED = 'BLOCKED',
}

enum SlotType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  LESSON = 'LESSON',
}

// Define the state type for the rink slice
interface RinkState {
  rinks: Rink[];
  currentRink: Rink | null;
  rinkSchedules: { [rinkId: string]: RinkSchedule };
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: RinkState = {
  rinks: [],
  currentRink: null,
  rinkSchedules: {},
  loading: false,
  error: null,
};

// Create async thunks for fetching rinks and rink schedules
export const fetchRinks = createAsyncThunk<Rink[]>(
  'rinks/fetchRinks',
  async () => {
    // Implement API call to fetch all rinks
    const response = await fetch('/api/rinks');
    if (!response.ok) {
      throw new Error('Failed to fetch rinks');
    }
    return response.json();
  }
);

export const fetchRinkSchedule = createAsyncThunk<RinkSchedule, string>(
  'rinks/fetchRinkSchedule',
  async (rinkId) => {
    // Implement API call to fetch the schedule for the specified rink
    const response = await fetch(`/api/rinks/${rinkId}/schedule`);
    if (!response.ok) {
      throw new Error('Failed to fetch rink schedule');
    }
    return response.json();
  }
);

// Create the rink slice
const rinkSlice = createSlice({
  name: 'rinks',
  initialState,
  reducers: {
    setCurrentRink: (state, action: PayloadAction<Rink>) => {
      state.currentRink = action.payload;
    },
    clearCurrentRink: (state) => {
      state.currentRink = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRinks.fulfilled, (state, action) => {
        state.loading = false;
        state.rinks = action.payload;
      })
      .addCase(fetchRinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch rinks';
      })
      .addCase(fetchRinkSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRinkSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.rinkSchedules[action.meta.arg] = action.payload;
      })
      .addCase(fetchRinkSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch rink schedule';
      });
  },
});

// Export actions and reducer
export const { setCurrentRink, clearCurrentRink } = rinkSlice.actions;
export const rinkReducer = rinkSlice.reducer;

// Export selector functions
export const selectAllRinks = (state: { rinks: RinkState }) => state.rinks.rinks;
export const selectCurrentRink = (state: { rinks: RinkState }) => state.rinks.currentRink;
export const selectRinkSchedule = (state: { rinks: RinkState }, rinkId: string) =>
  state.rinks.rinkSchedules[rinkId];
export const selectRinkLoading = (state: { rinks: RinkState }) => state.rinks.loading;
export const selectRinkError = (state: { rinks: RinkState }) => state.rinks.error;

export default rinkSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Equipment, EquipmentRental } from '../../../types/equipment';
import { 
  getEquipmentList, 
  getAvailableEquipment, 
  createEquipmentRental, 
  updateEquipmentRental, 
  cancelEquipmentRental 
} from '../../api/equipment';

// Define the state type
interface EquipmentState {
  equipmentList: Equipment[];
  availableEquipment: Equipment[];
  rentals: EquipmentRental[];
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: EquipmentState = {
  equipmentList: [],
  availableEquipment: [],
  rentals: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchEquipmentList = createAsyncThunk(
  'equipment/fetchEquipmentList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEquipmentList();
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchAvailableEquipment = createAsyncThunk(
  'equipment/fetchAvailableEquipment',
  async ({ startTime, endTime }: { startTime: Date; endTime: Date }, { rejectWithValue }) => {
    try {
      const response = await getAvailableEquipment(startTime, endTime);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createRental = createAsyncThunk(
  'equipment/createRental',
  async (rentalData: Omit<EquipmentRental, 'id'>, { rejectWithValue }) => {
    try {
      const response = await createEquipmentRental(rentalData);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateRental = createAsyncThunk(
  'equipment/updateRental',
  async ({ id, updateData }: { id: string; updateData: Partial<EquipmentRental> }, { rejectWithValue }) => {
    try {
      const response = await updateEquipmentRental(id, updateData);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const cancelRental = createAsyncThunk(
  'equipment/cancelRental',
  async (id: string, { rejectWithValue }) => {
    try {
      await cancelEquipmentRental(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create the equipment slice
const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setEquipmentList: (state, action: PayloadAction<Equipment[]>) => {
      state.equipmentList = action.payload;
    },
    setAvailableEquipment: (state, action: PayloadAction<Equipment[]>) => {
      state.availableEquipment = action.payload;
    },
    addRental: (state, action: PayloadAction<EquipmentRental>) => {
      state.rentals.push(action.payload);
    },
    updateRentalInState: (state, action: PayloadAction<EquipmentRental>) => {
      const index = state.rentals.findIndex(rental => rental.id === action.payload.id);
      if (index !== -1) {
        state.rentals[index] = action.payload;
      }
    },
    removeRental: (state, action: PayloadAction<string>) => {
      state.rentals = state.rentals.filter(rental => rental.id !== action.payload);
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
      .addCase(fetchEquipmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEquipmentList.fulfilled, (state, action) => {
        state.loading = false;
        state.equipmentList = action.payload;
      })
      .addCase(fetchEquipmentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAvailableEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.availableEquipment = action.payload;
      })
      .addCase(fetchAvailableEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRental.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals.push(action.payload);
      })
      .addCase(createRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRental.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rentals.findIndex(rental => rental.id === action.payload.id);
        if (index !== -1) {
          state.rentals[index] = action.payload;
        }
      })
      .addCase(updateRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelRental.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals = state.rentals.filter(rental => rental.id !== action.payload);
      })
      .addCase(cancelRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setEquipmentList,
  setAvailableEquipment,
  addRental,
  updateRentalInState,
  removeRental,
  setLoading,
  setError,
} = equipmentSlice.actions;

// Export reducer
export default equipmentSlice.reducer;

// Export selectors
export const selectEquipmentList = (state: { equipment: EquipmentState }) => state.equipment.equipmentList;
export const selectAvailableEquipment = (state: { equipment: EquipmentState }) => state.equipment.availableEquipment;
export const selectRentals = (state: { equipment: EquipmentState }) => state.equipment.rentals;
export const selectEquipmentLoading = (state: { equipment: EquipmentState }) => state.equipment.loading;
export const selectEquipmentError = (state: { equipment: EquipmentState }) => state.equipment.error;

// Human tasks:
// TODO: Implement proper error handling in async thunks and reducers
// TODO: Add any additional equipment-specific actions or selectors that may be needed for the ice rink management system
// TODO: Optimize state updates for large equipment lists if performance issues arise
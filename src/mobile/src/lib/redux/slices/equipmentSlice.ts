import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types based on the specification
interface MobileEquipment {
  id: string;
  name: string;
  type: string;
  quantity: number;
  // Add other relevant fields
}

interface MobileEquipmentRental {
  id: string;
  equipmentId: string;
  userId: string;
  startTime: string;
  endTime: string;
  quantity: number;
  // Add other relevant fields
}

interface EquipmentFilterOptions {
  type?: string;
  availability?: boolean;
  // Add other relevant filter options
}

interface EquipmentState {
  equipment: MobileEquipment[];
  rentals: MobileEquipmentRental[];
  loading: boolean;
  error: string | null;
}

const initialState: EquipmentState = {
  equipment: [],
  rentals: [],
  loading: false,
  error: null,
};

// Async thunk for fetching equipment
export const fetchEquipment = createAsyncThunk<
  MobileEquipment[],
  EquipmentFilterOptions,
  { rejectValue: string }
>('equipment/fetchEquipment', async (filterOptions, { rejectWithValue }) => {
  try {
    // TODO: Implement API call to fetch equipment data
    // const response = await api.getEquipment(filterOptions);
    // return response.data;
    
    // Placeholder return
    return [];
  } catch (error) {
    return rejectWithValue('Failed to fetch equipment');
  }
});

// Async thunk for renting equipment
export const rentEquipment = createAsyncThunk<
  MobileEquipmentRental,
  { equipmentId: string; quantity: number; startTime: string; endTime: string },
  { rejectValue: string }
>('equipment/rentEquipment', async (rentalData, { rejectWithValue }) => {
  try {
    // TODO: Implement API call to rent equipment
    // const response = await api.rentEquipment(rentalData);
    // return response.data;
    
    // Placeholder return
    return {
      id: 'placeholder-id',
      ...rentalData,
      userId: 'placeholder-user-id',
    };
  } catch (error) {
    return rejectWithValue('Failed to rent equipment');
  }
});

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setEquipment: (state, action: PayloadAction<MobileEquipment[]>) => {
      state.equipment = action.payload;
    },
    addRental: (state, action: PayloadAction<MobileEquipmentRental>) => {
      state.rentals.push(action.payload);
    },
    updateEquipmentQuantity: (state, action: PayloadAction<{ equipmentId: string; quantity: number }>) => {
      const equipment = state.equipment.find(e => e.id === action.payload.equipmentId);
      if (equipment) {
        equipment.quantity = action.payload.quantity;
      }
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
      .addCase(fetchEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.equipment = action.payload;
      })
      .addCase(fetchEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An error occurred';
      })
      .addCase(rentEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rentEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals.push(action.payload);
        const equipment = state.equipment.find(e => e.id === action.payload.equipmentId);
        if (equipment) {
          equipment.quantity -= action.payload.quantity;
        }
      })
      .addCase(rentEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An error occurred';
      });
  },
});

export const {
  setEquipment,
  addRental,
  updateEquipmentQuantity,
  setLoading,
  setError,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;

// Pending human tasks:
// TODO: Implement unit tests for the equipmentSlice reducers and async thunks
// TODO: Review and optimize the state structure for equipment and rentals if needed
// TODO: Consider adding additional actions for updating rental status or cancelling rentals
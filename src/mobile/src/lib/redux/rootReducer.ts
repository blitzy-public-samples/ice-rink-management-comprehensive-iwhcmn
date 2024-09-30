import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import bookingReducer from '../slices/bookingSlice';
import rinkReducer from '../slices/rinkSlice';
import equipmentReducer from '../slices/equipmentSlice';

// Combine all individual reducers into a single root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  rink: rinkReducer,
  equipment: equipmentReducer,
});

// Export the combined root reducer
export default rootReducer;

// Define the RootState type for use in the application
export type RootState = ReturnType<typeof rootReducer>;

// Human tasks:
// TODO: Ensure that all necessary reducers are imported and combined
// TODO: Verify that the RootState type is correctly defined and exported
// TODO: Consider adding comments to explain the purpose of each reducer in the root reducer
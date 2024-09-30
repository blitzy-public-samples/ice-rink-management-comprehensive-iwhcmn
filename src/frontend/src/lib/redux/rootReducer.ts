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

// Export the root reducer
export default rootReducer;

// Export the RootState type, which represents the state shape of the entire Redux store
export type RootState = ReturnType<typeof rootReducer>;
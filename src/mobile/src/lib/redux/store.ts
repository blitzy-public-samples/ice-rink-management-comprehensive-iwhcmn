import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

// Configure and export the Redux store
export const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
};

// Create the store instance
const store = configureAppStore();

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Human tasks:
// TODO: Ensure that the Redux DevTools are properly set up in the development environment
// TODO: Consider adding additional middleware if required (e.g., for API calls or logging)
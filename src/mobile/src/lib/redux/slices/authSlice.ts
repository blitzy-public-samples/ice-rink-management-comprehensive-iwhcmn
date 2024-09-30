import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types for MobileUser and MobileUserAuthInfo
interface MobileUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface MobileUserAuthInfo {
  token: string;
  expiresAt: number;
}

// Define the shape of the authentication state
interface AuthState {
  user: MobileUser | null;
  authInfo: MobileUserAuthInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  authInfo: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunk for user login
export const login = createAsyncThunk<MobileUser, { email: string; password: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // TODO: Implement actual API call to login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for user logout
export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Implement actual API call to logout
      const response = await fetch('/api/logout', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for refreshing the authentication token
export const refreshToken = createAsyncThunk<void, void>(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      // TODO: Implement actual API call to refresh token
      const response = await fetch('/api/refresh-token', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      // TODO: Update the authInfo with the new token
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<MobileUser>) => {
      state.user = action.payload;
    },
    setAuthInfo: (state, action: PayloadAction<MobileUserAuthInfo>) => {
      state.authInfo = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.authInfo = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        // TODO: Set authInfo when available from the API response
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.authInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.isLoading = false;
        // TODO: Update authInfo when available from the API response
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setAuthInfo, setIsAuthenticated, setError, clearAuth } = authSlice.actions;

export default authSlice.reducer;

// Commented list of human tasks
/*
Human tasks:
1. Implement proper error handling and error messages for authentication failures (Required)
2. Ensure that the authentication state is properly persisted for app restarts (Required)
3. Implement secure storage for authentication tokens (Critical)
4. Add additional authentication methods if required (e.g., social media login) (Optional)
*/
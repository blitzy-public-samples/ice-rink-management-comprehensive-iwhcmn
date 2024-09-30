import { useState, useEffect, useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MobileUser, MobileUserAuthInfo } from '../types/user';
import { login, logout, register, refreshToken, isAuthenticated } from '../utils/auth';
import { AuthContext } from '../context/AuthContext';

interface AuthState {
  user: MobileUser | null;
  loading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: MobileUserAuthInfo) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const useAuth = (): AuthState & AuthActions => {
  const [user, setUser] = useState<MobileUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await login(email, password);
      setUser(userData);
      dispatch({ type: 'SET_USER', payload: userData });
      authContext.setAuthState({ isAuthenticated: true, user: userData });
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  }, [dispatch, authContext]);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await logout();
      setUser(null);
      dispatch({ type: 'CLEAR_USER' });
      authContext.setAuthState({ isAuthenticated: false, user: null });
    } catch (err) {
      setError(err.message || 'An error occurred during logout');
    } finally {
      setLoading(false);
    }
  }, [dispatch, authContext]);

  const handleRegister = useCallback(async (userData: MobileUserAuthInfo) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await register(userData);
      setUser(newUser);
      dispatch({ type: 'SET_USER', payload: newUser });
      authContext.setAuthState({ isAuthenticated: true, user: newUser });
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  }, [dispatch, authContext]);

  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const isAuth = await isAuthenticated();
      if (isAuth) {
        const userData = await refreshToken();
        setUser(userData);
        dispatch({ type: 'SET_USER', payload: userData });
        authContext.setAuthState({ isAuthenticated: true, user: userData });
      } else {
        setUser(null);
        dispatch({ type: 'CLEAR_USER' });
        authContext.setAuthState({ isAuthenticated: false, user: null });
      }
    } catch (err) {
      setError(err.message || 'An error occurred while checking authentication status');
      setUser(null);
      dispatch({ type: 'CLEAR_USER' });
      authContext.setAuthState({ isAuthenticated: false, user: null });
    } finally {
      setLoading(false);
    }
  }, [dispatch, authContext]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    user,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    checkAuthStatus,
  };
};

export default useAuth;

// TODO: Implement proper error handling and user feedback for authentication operations
// TODO: Add support for biometric authentication if required
// TODO: Implement token refresh logic to handle expired tokens
// TODO: Add unit tests for the useAuth hook
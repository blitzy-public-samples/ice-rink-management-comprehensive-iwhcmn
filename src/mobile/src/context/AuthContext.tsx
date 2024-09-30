import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, logout, register } from '../lib/api/auth';

// Define types
interface MobileUser {
  // Add user properties here
  id: string;
  email: string;
  name: string;
  // Add other relevant user properties
}

interface MobileUserAuthInfo {
  // Add auth info properties here
  token: string;
  // Add other relevant auth info properties
}

interface AuthContextType {
  user: MobileUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: Partial<MobileUser>) => Promise<void>;
  updateUser: (userData: Partial<MobileUser>) => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MobileUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing authentication on component mount
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          // Validate token with the API
          // If valid, set user state and isAuthenticated to true
          // For now, we'll assume it's valid
          setUser({ id: '1', email: 'user@example.com', name: 'John Doe' }); // Replace with actual user data
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginHandler = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await login(email, password);
      setUser(userData);
      setIsAuthenticated(true);
      await AsyncStorage.setItem('authToken', userData.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      await logout();
      setUser(null);
      setIsAuthenticated(false);
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerHandler = async (userData: Partial<MobileUser>) => {
    setIsLoading(true);
    try {
      const newUser = await register(userData);
      setUser(newUser);
      setIsAuthenticated(true);
      await AsyncStorage.setItem('authToken', newUser.token);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserHandler = async (userData: Partial<MobileUser>) => {
    setIsLoading(true);
    try {
      // Call the update user API function
      // For now, we'll just update the local state
      setUser(prevUser => ({ ...prevUser, ...userData } as MobileUser));
    } catch (error) {
      console.error('User update error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login: loginHandler,
    logout: logoutHandler,
    register: registerHandler,
    updateUser: updateUserHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the AuthContext for any future use
export default AuthContext;

// Human tasks (commented)
/*
TODO: Implement proper error handling for authentication operations
TODO: Add support for biometric authentication if required
TODO: Implement token refresh mechanism to maintain user session
TODO: Review and enhance security measures for token storage in AsyncStorage
*/
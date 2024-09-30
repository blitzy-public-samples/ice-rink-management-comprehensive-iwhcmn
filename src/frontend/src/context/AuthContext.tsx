import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContextType, UserState, User } from '../types/user';
import { login, logout, updateUser } from '../lib/api/auth';

// Create the AuthContext
export const AuthContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = (): UserContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userState, setUserState] = useState<UserState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check for existing user session on mount
    // This implementation depends on how you're storing the user session
    // For example, you might check localStorage or send a request to validate a token
    const checkUserSession = async () => {
      try {
        // Implement your session checking logic here
        // For now, we'll just set loading to false
        setUserState(prevState => ({ ...prevState, loading: false }));
      } catch (error) {
        setUserState(prevState => ({ ...prevState, loading: false, error: error as Error }));
      }
    };

    checkUserSession();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      setUserState(prevState => ({ ...prevState, loading: true, error: null }));
      const user = await login(email, password);
      setUserState(prevState => ({ ...prevState, user, loading: false }));
    } catch (error) {
      setUserState(prevState => ({ ...prevState, loading: false, error: error as Error }));
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      setUserState({ user: null, loading: false, error: null });
    } catch (error) {
      setUserState(prevState => ({ ...prevState, error: error as Error }));
    }
  };

  const handleUpdateUser = async (userData: Partial<User>): Promise<void> => {
    try {
      setUserState(prevState => ({ ...prevState, loading: true, error: null }));
      const updatedUser = await updateUser(userData);
      setUserState(prevState => ({ ...prevState, user: updatedUser, loading: false }));
    } catch (error) {
      setUserState(prevState => ({ ...prevState, loading: false, error: error as Error }));
    }
  };

  const contextValue: UserContextType = {
    ...userState,
    login: handleLogin,
    logout: handleLogout,
    updateUser: handleUpdateUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Human tasks (commented as requested)
/*
Human tasks:
1. Implement proper error handling and user feedback for authentication operations (Required)
2. Add additional authentication features like password reset and email verification if required (Optional)
3. Implement token refresh mechanism to maintain user sessions (Required)
4. Review and enhance security measures for storing authentication tokens (Required)
*/
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createAppTheme, COLORS, FONTS, SPACING } from '../styles/theme';

// Define the shape of the theme context value
interface ThemeContextValue {
  theme: ReturnType<typeof createAppTheme>;
  toggleTheme: () => void;
}

// Define the props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Create the context with an undefined default value
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Custom hook to access the theme context
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Create the theme based on the current mode
  const theme = createAppTheme(isDarkMode ? 'dark' : 'light');

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Create the context value object
  const contextValue: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Export constants from the theme for easy access
export { COLORS, FONTS, SPACING };

// List of human tasks (commented)
/*
Human tasks:
1. Implement dark theme color scheme in the theme.ts file (Required)
2. Test theme toggling functionality across different components (Required)
3. Ensure that the theme respects user's system preferences for light/dark mode (Optional)
*/
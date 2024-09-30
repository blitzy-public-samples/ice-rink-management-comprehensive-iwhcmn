import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { theme } from '../styles/theme';

// Define the shape of our theme
type Theme = typeof theme;

// Create the context with a default value
const ThemeContext = React.createContext<Theme | null>(null);

// Props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme);

  useEffect(() => {
    // Update the theme based on the device's color scheme
    // Note: This assumes that the theme object has a 'dark' property
    // You may need to adjust this based on your actual theme structure
    setCurrentTheme(colorScheme === 'dark' ? theme.dark : theme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export the context for any advanced use cases
export { ThemeContext };

// Human tasks (commented as requested):
/*
TODO: Implement dark mode theme variations in the theme.ts file
TODO: Add functionality to allow users to manually override the system color scheme
*/
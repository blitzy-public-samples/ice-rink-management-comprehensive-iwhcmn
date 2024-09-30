import { DefaultTheme } from '@react-navigation/native';

// Color palette for the application
const colors = {
  primary: '#0B3D91',
  secondary: '#A5D8FF',
  accent: '#FF3131',
  background: '#F4F4F4',
  text: '#333333',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#CCCCCC',
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
};

// Typography styles for the application
const typography = {
  fontFamily: {
    regular: 'Montserrat-Regular',
    bold: 'Montserrat-Bold',
  },
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  fontWeight: {
    regular: '400',
    bold: '700',
  },
};

// Spacing constants for consistent layout
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Border radius constants for UI elements
const borderRadius = {
  small: 4,
  medium: 8,
  large: 16,
  round: 9999,
};

// Define the custom theme object
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  typography,
  spacing,
  borderRadius,
};

// Export the theme object as the default export
export default theme;

// For TypeScript support, extend the default theme type
declare global {
  namespace ReactNavigation {
    interface Theme extends typeof theme {}
  }
}
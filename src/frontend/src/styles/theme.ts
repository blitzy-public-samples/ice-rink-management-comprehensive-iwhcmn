import { createTheme } from '@mui/material/styles';

// Color constants used throughout the application
const COLORS = {
  primary: {
    main: '#0B3D91',
    light: '#3D69B6',
    dark: '#082A64',
  },
  secondary: {
    main: '#A5D8FF',
    light: '#D6EBFF',
    dark: '#74A7CC',
  },
  accent: '#FF3131',
  background: {
    default: '#F4F4F4',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
  },
};

// Font family definitions
const FONTS = {
  heading: 'Montserrat, sans-serif',
  body: 'Open Sans, sans-serif',
};

// Base spacing unit in pixels
const SPACING = 8;

/**
 * Creates and returns the Material-UI theme object for the application
 * @returns {object} Material-UI theme object
 */
const createAppTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: COLORS.primary.main,
        light: COLORS.primary.light,
        dark: COLORS.primary.dark,
      },
      secondary: {
        main: COLORS.secondary.main,
        light: COLORS.secondary.light,
        dark: COLORS.secondary.dark,
      },
      background: {
        default: COLORS.background.default,
        paper: COLORS.background.paper,
      },
      text: {
        primary: COLORS.text.primary,
        secondary: COLORS.text.secondary,
      },
    },
    typography: {
      fontFamily: FONTS.body,
      h1: {
        fontFamily: FONTS.heading,
      },
      h2: {
        fontFamily: FONTS.heading,
      },
      h3: {
        fontFamily: FONTS.heading,
      },
      h4: {
        fontFamily: FONTS.heading,
      },
      h5: {
        fontFamily: FONTS.heading,
      },
      h6: {
        fontFamily: FONTS.heading,
      },
    },
    spacing: SPACING,
    components: {
      // Override default component styles as needed
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: SPACING / 2,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: SPACING,
          },
        },
      },
    },
  });
};

export { createAppTheme, COLORS, FONTS, SPACING };

// Human tasks:
// TODO: Review and adjust color scheme to ensure it meets accessibility standards (WCAG 2.1 Level AA)
// TODO: Confirm that the chosen fonts are properly licensed for use in the application
// TODO: Test the theme across different browsers and devices to ensure consistent rendering
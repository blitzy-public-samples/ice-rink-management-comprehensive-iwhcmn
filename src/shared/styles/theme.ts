import { createTheme } from '@mui/material/styles';

// Define the main theme object for the application
const theme = createTheme({
  palette: {
    primary: {
      main: '#0B3D91',
      light: '#3D6EB9',
      dark: '#082B6B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A5D8FF',
      light: '#D8EEFF',
      dark: '#74A7CC',
      contrastText: '#000000',
    },
    error: {
      main: '#FF3131',
      light: '#FF6B6B',
      dark: '#CC0000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F4F4F4',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Open Sans', sans-serif",
    h1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    },
    body1: {
      fontFamily: "'Open Sans', sans-serif",
    },
    body2: {
      fontFamily: "'Open Sans', sans-serif",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      },
    },
  },
});

export default theme;
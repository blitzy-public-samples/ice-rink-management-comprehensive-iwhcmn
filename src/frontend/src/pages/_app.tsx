import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createAppTheme } from '../styles/theme';
import styles from '../styles/globals.css';
import { store, persistor } from '../lib/redux/store';
import ErrorBoundary from '../components/ErrorBoundary';
import Head from 'next/head';

// Create the application theme
const theme = createAppTheme();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ice Rink Management and Booking System</title>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;

// Human tasks:
// 1. Ensure that all necessary global providers are included (e.g., for internationalization, if required)
// 2. Implement and test error boundaries for graceful error handling
// 3. Set up proper meta tags and SEO optimization in the _document.tsx file
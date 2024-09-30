import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../../../components/Layout/Header';
import { UserState } from '../../../types/user';
import { AuthContext } from '../../../context/AuthContext';

// Helper function to render the component with necessary providers
const renderWithProviders = (
  ui: React.ReactElement,
  initialState = {}
) => {
  const store = configureStore({
    reducer: {
      // Add your reducers here
    },
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('Header component', () => {
  test('renders the header with title', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Ice Rink Management')).toBeInTheDocument();
  });

  test('displays login and register buttons when user is not authenticated', () => {
    const authContextValue = {
      isAuthenticated: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
    };

    renderWithProviders(
      <AuthContext.Provider value={authContextValue}>
        <Header />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('displays navigation links and logout button when user is authenticated', () => {
    const authContextValue = {
      isAuthenticated: true,
      user: { id: '1', name: 'Test User' } as UserState,
      login: jest.fn(),
      logout: jest.fn(),
    };

    renderWithProviders(
      <AuthContext.Provider value={authContextValue}>
        <Header />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Bookings')).toBeInTheDocument();
    expect(screen.getByText('Rinks')).toBeInTheDocument();
    expect(screen.getByText('Equipment')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('calls handleLogout when logout button is clicked', () => {
    const mockDispatch = jest.fn();
    const authContextValue = {
      isAuthenticated: true,
      user: { id: '1', name: 'Test User' } as UserState,
      login: jest.fn(),
      logout: jest.fn(),
    };

    renderWithProviders(
      <AuthContext.Provider value={authContextValue}>
        <Header />
      </AuthContext.Provider>
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(authContextValue.logout).toHaveBeenCalled();
  });

  test('renders correctly on mobile devices', () => {
    // Mock a mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    // Trigger the window resize event
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<Header />);

    // Check if the menu icon is visible
    expect(screen.getByLabelText('menu')).toBeInTheDocument();

    // Check if the title is still visible
    expect(screen.getByText('Ice Rink Management')).toBeInTheDocument();
  });
});

// Human tasks:
// TODO: Implement tests for accessibility compliance
// TODO: Add tests for different user roles if applicable
// TODO: Implement tests for error handling scenarios
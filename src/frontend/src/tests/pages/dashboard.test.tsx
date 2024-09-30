import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
import Dashboard from '../../pages/dashboard';
import { useAuth } from '../../hooks/useAuth';
import { useBookings } from '../../hooks/useBookings';
import { useRinks } from '../../hooks/useRinks';
import { useEquipment } from '../../hooks/useEquipment';

// Mock the custom hooks
jest.mock('../../hooks/useAuth');
jest.mock('../../hooks/useBookings');
jest.mock('../../hooks/useRinks');
jest.mock('../../hooks/useEquipment');

describe('Dashboard component', () => {
  const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer' };
  const mockBookings = [{ id: '1', date: '2023-05-01', time: '10:00', rinkId: '1' }];
  const mockRinks = [{ id: '1', name: 'Ice Rink 1', location: 'City Center' }];
  const mockEquipment = [{ id: '1', name: 'Ice Skates', available: 10 }];

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser, isLoading: false });
    (useBookings as jest.Mock).mockReturnValue({ bookings: mockBookings, isLoading: false });
    (useRinks as jest.Mock).mockReturnValue({ rinks: mockRinks, isLoading: false });
    (useEquipment as jest.Mock).mockReturnValue({ equipment: mockEquipment, isLoading: false });
  });

  it('renders the dashboard with user information', async () => {
    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
    });
  });

  it('displays recent bookings', async () => {
    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Recent Bookings/i)).toBeInTheDocument();
      expect(screen.getByText(/2023-05-01/)).toBeInTheDocument();
    });
  });

  it('shows available rinks', async () => {
    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Available Rinks/i)).toBeInTheDocument();
      expect(screen.getByText(/Ice Rink 1/)).toBeInTheDocument();
    });
  });

  it('displays equipment information', async () => {
    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Equipment/i)).toBeInTheDocument();
      expect(screen.getByText(/Ice Skates/)).toBeInTheDocument();
    });
  });

  it('handles loading state', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, isLoading: true });
    (useBookings as jest.Mock).mockReturnValue({ bookings: [], isLoading: true });
    (useRinks as jest.Mock).mockReturnValue({ rinks: [], isLoading: true });
    (useEquipment as jest.Mock).mockReturnValue({ equipment: [], isLoading: true });

    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </MockedProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('handles error state', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, isLoading: false, error: 'Auth error' });
    (useBookings as jest.Mock).mockReturnValue({ bookings: [], isLoading: false, error: 'Booking error' });
    (useRinks as jest.Mock).mockReturnValue({ rinks: [], isLoading: false, error: 'Rink error' });
    (useEquipment as jest.Mock).mockReturnValue({ equipment: [], isLoading: false, error: 'Equipment error' });

    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });
});

// Pending human tasks:
// - Implement tests for user-specific dashboard views based on roles (admin, staff, customer)
// - Add tests for accessibility features of the dashboard
// - Create tests for data refresh functionality once implemented
// - Implement tests for analytics tracking on the dashboard
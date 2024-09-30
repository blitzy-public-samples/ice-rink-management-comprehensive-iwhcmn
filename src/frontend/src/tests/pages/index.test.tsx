import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import HomePage from '../../pages/index';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../hooks/useBookings';
import { useRinks } from '../../hooks/useRinks';
import { useEquipment } from '../../hooks/useEquipment';

// Mock the custom hooks
jest.mock('../../context/AuthContext');
jest.mock('../../hooks/useBookings');
jest.mock('../../hooks/useRinks');
jest.mock('../../hooks/useEquipment');

describe('HomePage', () => {
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
  const mockUseBookings = useBookings as jest.MockedFunction<typeof useBookings>;
  const mockUseRinks = useRinks as jest.MockedFunction<typeof useRinks>;
  const mockUseEquipment = useEquipment as jest.MockedFunction<typeof useEquipment>;

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      error: null,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    });

    mockUseBookings.mockReturnValue({
      bookings: [],
      loading: false,
      error: null,
      createBooking: jest.fn(),
      updateBooking: jest.fn(),
      deleteBooking: jest.fn(),
    });

    mockUseRinks.mockReturnValue({
      rinks: [],
      loading: false,
      error: null,
      getRinkDetails: jest.fn(),
    });

    mockUseEquipment.mockReturnValue({
      equipment: [],
      loading: false,
      error: null,
      rentEquipment: jest.fn(),
    });
  });

  it('renders the HomePage component', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <HomePage />
        </MockedProvider>
      );
    });

    expect(screen.getByText(/Welcome to Ice Rink Management/i)).toBeInTheDocument();
  });

  it('displays loading state', async () => {
    mockUseAuth.mockReturnValue({
      ...mockUseAuth(),
      loading: true,
    });

    await act(async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <HomePage />
        </MockedProvider>
      );
    });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays error state', async () => {
    mockUseAuth.mockReturnValue({
      ...mockUseAuth(),
      error: new Error('Authentication error'),
    });

    await act(async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <HomePage />
        </MockedProvider>
      );
    });

    expect(screen.getByText(/Error: Authentication error/i)).toBeInTheDocument();
  });

  it('displays content for authenticated user', async () => {
    mockUseAuth.mockReturnValue({
      ...mockUseAuth(),
      user: { id: '1', name: 'John Doe', email: 'john@example.com' },
    });

    mockUseBookings.mockReturnValue({
      ...mockUseBookings(),
      bookings: [{ id: '1', rinkId: '1', date: '2023-05-01', time: '14:00' }],
    });

    mockUseRinks.mockReturnValue({
      ...mockUseRinks(),
      rinks: [{ id: '1', name: 'Main Rink', location: 'City Center' }],
    });

    mockUseEquipment.mockReturnValue({
      ...mockUseEquipment(),
      equipment: [{ id: '1', name: 'Skates', available: 10 }],
    });

    await act(async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <HomePage />
        </MockedProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Your Bookings/i)).toBeInTheDocument();
      expect(screen.getByText(/Available Rinks/i)).toBeInTheDocument();
      expect(screen.getByText(/Equipment Rentals/i)).toBeInTheDocument();
    });
  });

  it('displays login/register options for unauthenticated user', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <HomePage />
        </MockedProvider>
      );
    });

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  // Add more test cases here to cover different scenarios and edge cases
});

// Implement the pending human tasks as additional test cases
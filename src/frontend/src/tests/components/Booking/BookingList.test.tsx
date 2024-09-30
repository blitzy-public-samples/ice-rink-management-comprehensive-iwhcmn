import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BookingList } from '../../../components/Booking/BookingList';
import { useBookings } from '../../../hooks/useBookings';
import { Booking, BookingStatus } from '../../../types/booking';

// Mock the useBookings hook
jest.mock('../../../hooks/useBookings');

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: '1',
    userId: 'user1',
    rinkId: 'rink1',
    startTime: new Date('2023-05-01T10:00:00'),
    endTime: new Date('2023-05-01T11:00:00'),
    status: BookingStatus.CONFIRMED,
    totalPrice: 50,
  },
  {
    id: '2',
    userId: 'user2',
    rinkId: 'rink1',
    startTime: new Date('2023-05-01T11:00:00'),
    endTime: new Date('2023-05-01T12:00:00'),
    status: BookingStatus.PENDING,
    totalPrice: 50,
  },
];

describe('BookingList Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  it('renders the booking list correctly', async () => {
    // Mock the useBookings hook to return our mock data
    (useBookings as jest.Mock).mockReturnValue({
      bookings: mockBookings,
      isLoading: false,
      error: null,
    });

    render(<BookingList />);

    // Wait for the component to render
    await waitFor(() => {
      expect(screen.getByText('Booking List')).toBeInTheDocument();
    });

    // Check if both bookings are rendered
    expect(screen.getByText('Booking #1')).toBeInTheDocument();
    expect(screen.getByText('Booking #2')).toBeInTheDocument();

    // Check if the booking details are correctly displayed
    expect(screen.getByText('Status: Confirmed')).toBeInTheDocument();
    expect(screen.getByText('Status: Pending')).toBeInTheDocument();
  });

  it('displays a loading state', () => {
    (useBookings as jest.Mock).mockReturnValue({
      bookings: [],
      isLoading: true,
      error: null,
    });

    render(<BookingList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays an error message when loading fails', () => {
    (useBookings as jest.Mock).mockReturnValue({
      bookings: [],
      isLoading: false,
      error: 'Failed to load bookings',
    });

    render(<BookingList />);

    expect(screen.getByText('Error: Failed to load bookings')).toBeInTheDocument();
  });

  it('allows filtering bookings by status', async () => {
    (useBookings as jest.Mock).mockReturnValue({
      bookings: mockBookings,
      isLoading: false,
      error: null,
    });

    render(<BookingList />);

    // Wait for the component to render
    await waitFor(() => {
      expect(screen.getByText('Booking List')).toBeInTheDocument();
    });

    // Filter by confirmed status
    fireEvent.click(screen.getByText('Filter by Status'));
    fireEvent.click(screen.getByText('Confirmed'));

    // Check if only the confirmed booking is displayed
    expect(screen.getByText('Booking #1')).toBeInTheDocument();
    expect(screen.queryByText('Booking #2')).not.toBeInTheDocument();
  });

  // Add more test cases here as needed
});

// Commented list of human tasks
/*
Human tasks:
1. Implement additional test cases for edge cases and error scenarios (Required)
2. Add integration tests with actual API calls (mocked) (Optional)
3. Implement snapshot testing for the BookingList component (Optional)
*/
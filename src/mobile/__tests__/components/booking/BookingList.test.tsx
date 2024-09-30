import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import { BookingList } from '../../../src/components/booking/BookingList';
import { BookingType } from '../../../src/types/booking';
import { useBookings } from '../../../src/hooks/useBookings';

jest.mock('../../../src/hooks/useBookings');

const mockUseBookings = useBookings as jest.MockedFunction<typeof useBookings>;

describe('BookingList', () => {
  const mockNavigation: any = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner when fetching bookings', () => {
    mockUseBookings.mockReturnValue({
      bookings: [],
      loading: true,
      error: null,
      fetchBookings: jest.fn(),
      cancelBooking: jest.fn(),
    });

    const { getByTestId } = render(<BookingList navigation={mockNavigation} />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders error message when there\'s an error fetching bookings', () => {
    mockUseBookings.mockReturnValue({
      bookings: [],
      loading: false,
      error: 'Error fetching bookings',
      fetchBookings: jest.fn(),
      cancelBooking: jest.fn(),
    });

    const { getByText } = render(<BookingList navigation={mockNavigation} />);
    expect(getByText('Error fetching bookings')).toBeTruthy();
  });

  it('renders message when there are no bookings', () => {
    mockUseBookings.mockReturnValue({
      bookings: [],
      loading: false,
      error: null,
      fetchBookings: jest.fn(),
      cancelBooking: jest.fn(),
    });

    const { getByText } = render(<BookingList navigation={mockNavigation} />);
    expect(getByText('No bookings found')).toBeTruthy();
  });

  it('renders list of bookings when available', () => {
    const mockBookings: BookingType[] = [
      { id: '1', rinkName: 'Rink 1', date: '2023-05-01', time: '10:00 AM' },
      { id: '2', rinkName: 'Rink 2', date: '2023-05-02', time: '2:00 PM' },
    ];

    mockUseBookings.mockReturnValue({
      bookings: mockBookings,
      loading: false,
      error: null,
      fetchBookings: jest.fn(),
      cancelBooking: jest.fn(),
    });

    const { getByText } = render(<BookingList navigation={mockNavigation} />);
    expect(getByText('Rink 1')).toBeTruthy();
    expect(getByText('Rink 2')).toBeTruthy();
  });

  it('handles booking item press', () => {
    const mockBookings: BookingType[] = [
      { id: '1', rinkName: 'Rink 1', date: '2023-05-01', time: '10:00 AM' },
    ];

    mockUseBookings.mockReturnValue({
      bookings: mockBookings,
      loading: false,
      error: null,
      fetchBookings: jest.fn(),
      cancelBooking: jest.fn(),
    });

    const { getByText } = render(<BookingList navigation={mockNavigation} />);
    fireEvent.press(getByText('Rink 1'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('BookingDetailsScreen', { bookingId: '1' });
  });
});

// TODO: Implement tests for pull-to-refresh functionality
// TODO: Add tests for pagination or infinite scrolling if implemented
// TODO: Create tests for sorting and filtering options if added to the component
// TODO: Ensure all edge cases and error scenarios are covered in the test suite
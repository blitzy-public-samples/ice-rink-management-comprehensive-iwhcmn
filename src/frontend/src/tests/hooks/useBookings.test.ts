import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import useBookings from '../../hooks/useBookings';
import { Booking, CreateBookingDTO, UpdateBookingDTO } from '../../types/booking';

// Mock the API client
jest.mock('../../lib/api/bookings', () => ({
  getBookings: jest.fn(),
  createBooking: jest.fn(),
  updateBooking: jest.fn(),
  deleteBooking: jest.fn(),
}));

describe('useBookings hook', () => {
  let mockStore;
  let mockApi;

  beforeEach(() => {
    // Create a mock store
    mockStore = configureStore({
      reducer: {
        bookings: (state = [], action) => state,
      },
    });

    // Create a mock API
    mockApi = new MockAdapter(require('../../lib/api/bookings').default);
  });

  afterEach(() => {
    mockApi.reset();
    jest.clearAllMocks();
  });

  it('should fetch bookings', async () => {
    const mockBookings: Booking[] = [
      { id: '1', userId: 'user1', rinkId: 'rink1', startTime: new Date(), endTime: new Date(), status: 'confirmed' },
      { id: '2', userId: 'user2', rinkId: 'rink2', startTime: new Date(), endTime: new Date(), status: 'pending' },
    ];

    mockApi.onGet('/bookings').reply(200, mockBookings);

    const { result, waitForNextUpdate } = renderHook(() => useBookings(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    expect(result.current.bookings).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.bookings).toEqual(mockBookings);
    expect(result.current.isLoading).toBe(false);
  });

  it('should create a booking', async () => {
    const newBooking: CreateBookingDTO = {
      userId: 'user1',
      rinkId: 'rink1',
      startTime: new Date(),
      endTime: new Date(),
    };

    const createdBooking: Booking = {
      ...newBooking,
      id: '3',
      status: 'confirmed',
    };

    mockApi.onPost('/bookings').reply(201, createdBooking);

    const { result, waitForNextUpdate } = renderHook(() => useBookings(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    act(() => {
      result.current.createBooking(newBooking);
    });

    await waitForNextUpdate();

    expect(result.current.bookings).toContainEqual(createdBooking);
  });

  it('should update a booking', async () => {
    const updatedBooking: UpdateBookingDTO = {
      id: '1',
      status: 'cancelled',
    };

    mockApi.onPut('/bookings/1').reply(200, updatedBooking);

    const { result, waitForNextUpdate } = renderHook(() => useBookings(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    act(() => {
      result.current.updateBooking(updatedBooking);
    });

    await waitForNextUpdate();

    expect(result.current.bookings.find(booking => booking.id === '1')?.status).toBe('cancelled');
  });

  it('should delete a booking', async () => {
    const bookingId = '1';

    mockApi.onDelete(`/bookings/${bookingId}`).reply(204);

    const { result, waitForNextUpdate } = renderHook(() => useBookings(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    act(() => {
      result.current.deleteBooking(bookingId);
    });

    await waitForNextUpdate();

    expect(result.current.bookings.find(booking => booking.id === bookingId)).toBeUndefined();
  });

  it('should handle errors when fetching bookings', async () => {
    mockApi.onGet('/bookings').reply(500, { message: 'Server error' });

    const { result, waitForNextUpdate } = renderHook(() => useBookings(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await waitForNextUpdate();

    expect(result.current.error).toBe('Failed to fetch bookings');
  });

  // Add more test cases for error handling scenarios
});

// Implement test cases for error handling scenarios
// TODO: Add test cases for pagination functionality once implemented
// TODO: Consider adding performance tests for the caching mechanism once implemented
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from '@reduxjs/toolkit';
import DashboardScreen from '../../src/screens/DashboardScreen';
import { BookingType, RinkType, EquipmentType } from '../../src/types';
import * as useBookingsHook from '../../src/hooks/useBookings';
import * as useRinksHook from '../../src/hooks/useRinks';
import * as useEquipmentHook from '../../src/hooks/useEquipment';

// Mock the hooks
jest.mock('../../src/hooks/useBookings');
jest.mock('../../src/hooks/useRinks');
jest.mock('../../src/hooks/useEquipment');

const Stack = createStackNavigator();

describe('DashboardScreen', () => {
  // Helper function to set up the component for testing
  const setup = () => {
    const store = configureStore({
      reducer: {
        // Add your reducers here
      },
    });

    return render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  };

  // Mock implementation of useBookings hook
  const mockUseBookings = (mockData: Partial<ReturnType<typeof useBookingsHook.useBookings>>) => {
    (useBookingsHook.useBookings as jest.Mock).mockReturnValue({
      bookings: [],
      loading: false,
      error: null,
      ...mockData,
    });
  };

  // Mock implementation of useRinks hook
  const mockUseRinks = (mockData: Partial<ReturnType<typeof useRinksHook.useRinks>>) => {
    (useRinksHook.useRinks as jest.Mock).mockReturnValue({
      rinks: [],
      loading: false,
      error: null,
      ...mockData,
    });
  };

  // Mock implementation of useEquipment hook
  const mockUseEquipment = (mockData: Partial<ReturnType<typeof useEquipmentHook.useEquipment>>) => {
    (useEquipmentHook.useEquipment as jest.Mock).mockReturnValue({
      equipment: [],
      loading: false,
      error: null,
      ...mockData,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dashboard screen', () => {
    const { getByText } = setup();
    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('displays loading state when fetching data', () => {
    mockUseBookings({ loading: true });
    mockUseRinks({ loading: true });
    mockUseEquipment({ loading: true });

    const { getByTestId } = setup();
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('displays error message when fetching data fails', () => {
    const errorMessage = 'Failed to fetch data';
    mockUseBookings({ error: errorMessage });
    mockUseRinks({ error: errorMessage });
    mockUseEquipment({ error: errorMessage });

    const { getByText } = setup();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('displays recent bookings', async () => {
    const mockBookings: BookingType[] = [
      { id: '1', rinkId: '1', userId: '1', startTime: new Date(), endTime: new Date(), status: 'confirmed' },
      { id: '2', rinkId: '2', userId: '1', startTime: new Date(), endTime: new Date(), status: 'pending' },
    ];
    mockUseBookings({ bookings: mockBookings });

    const { getByText } = setup();
    await waitFor(() => {
      expect(getByText('Recent Bookings')).toBeTruthy();
      expect(getByText('Booking #1')).toBeTruthy();
      expect(getByText('Booking #2')).toBeTruthy();
    });
  });

  it('displays available rinks', async () => {
    const mockRinks: RinkType[] = [
      { id: '1', name: 'Rink A', location: 'City A', capacity: 100 },
      { id: '2', name: 'Rink B', location: 'City B', capacity: 150 },
    ];
    mockUseRinks({ rinks: mockRinks });

    const { getByText } = setup();
    await waitFor(() => {
      expect(getByText('Available Rinks')).toBeTruthy();
      expect(getByText('Rink A')).toBeTruthy();
      expect(getByText('Rink B')).toBeTruthy();
    });
  });

  it('displays available equipment', async () => {
    const mockEquipment: EquipmentType[] = [
      { id: '1', name: 'Skates', type: 'rental', quantity: 50 },
      { id: '2', name: 'Helmets', type: 'rental', quantity: 30 },
    ];
    mockUseEquipment({ equipment: mockEquipment });

    const { getByText } = setup();
    await waitFor(() => {
      expect(getByText('Available Equipment')).toBeTruthy();
      expect(getByText('Skates')).toBeTruthy();
      expect(getByText('Helmets')).toBeTruthy();
    });
  });

  it('navigates to booking screen when "Book Now" is pressed', () => {
    const { getByText } = setup();
    const bookNowButton = getByText('Book Now');
    fireEvent.press(bookNowButton);
    // Add assertion for navigation to booking screen
  });

  // Add more test cases as needed
});

// Implement comprehensive test cases for all dashboard functionalities
// Add test cases for error handling and loading states
// Implement integration tests with actual API calls (using MSW or similar)
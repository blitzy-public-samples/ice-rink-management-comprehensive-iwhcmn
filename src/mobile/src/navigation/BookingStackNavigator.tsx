import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import the screen components
import BookingsScreen from '../screens/BookingsScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';

// Define the param list for the BookingStack
export type BookingStackParamList = {
  Bookings: undefined;
  BookingDetails: { bookingId: string };
};

const Stack = createStackNavigator<BookingStackParamList>();

const BookingStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Bookings" 
        component={BookingsScreen} 
        options={{ title: 'My Bookings' }}
      />
      <Stack.Screen 
        name="BookingDetails" 
        component={BookingDetailsScreen} 
        options={{ title: 'Booking Details' }}
      />
    </Stack.Navigator>
  );
};

export default BookingStackNavigator;

// TODO: Implement proper typing for navigation params
// TODO: Add additional screens for creating and editing bookings
// TODO: Implement deep linking for booking screens
// TODO: Set up analytics tracking for screen navigation
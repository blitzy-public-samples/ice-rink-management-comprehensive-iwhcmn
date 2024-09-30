import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { BookingType } from '../../types/booking';
import { useBookings } from '../../hooks/useBookings';
import Button from '../common/Button';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

// Helper function to format date strings
const formatDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const BookingDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { getBookingById, cancelBooking } = useBookings();
  const [booking, setBooking] = useState<BookingType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract bookingId from route params
  const bookingId = route.params?.bookingId;

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const bookingDetails = await getBookingById(bookingId);
        setBooking(bookingDetails);
        setError(null);
      } catch (err) {
        setError('Failed to fetch booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, getBookingById]);

  const handleCancelBooking = async () => {
    try {
      await cancelBooking(bookingId);
      Alert.alert('Success', 'Booking cancelled successfully');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to cancel booking. Please try again.');
    }
  };

  const handleModifyBooking = () => {
    navigation.navigate('ModifyBooking', { bookingId });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Booking not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Booking Details</Text>
        <Text style={styles.detail}>Booking ID: {booking.id}</Text>
        <Text style={styles.detail}>Rink: {booking.rinkName}</Text>
        <Text style={styles.detail}>Date: {formatDate(new Date(booking.startTime))}</Text>
        <Text style={styles.detail}>Duration: {booking.duration} minutes</Text>
        <Text style={styles.detail}>Status: {booking.status}</Text>
        <Text style={styles.detail}>Price: ${booking.price.toFixed(2)}</Text>
      </Card>
      <View style={styles.buttonContainer}>
        <Button title="Modify Booking" onPress={handleModifyBooking} />
        <Button title="Cancel Booking" onPress={handleCancelBooking} variant="danger" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default BookingDetails;
```

This implementation of the BookingDetails component follows the specifications provided in the JSON representation. Here's a breakdown of the key features:

1. The component uses React hooks (useState, useEffect) and React Navigation hooks (useRoute, useNavigation) for state management and navigation.
2. It fetches booking details using the `useBookings` hook and displays them in a card layout.
3. The component handles loading and error states appropriately.
4. It provides functionality to cancel and modify bookings.
5. The date formatting is handled by a helper function `formatDate`.
6. The component uses common UI components like Button, Card, and LoadingSpinner.

Note that I've made some assumptions about the structure of the BookingType and the interfaces of the common components. You may need to adjust these based on your actual implementations.

Human Tasks:
```
// Human tasks:
// TODO: Implement actual API integration for booking cancellation
// TODO: Design and implement the booking modification screen
// TODO: Add localization support for text content
// TODO: Implement additional features like sharing booking details or adding to calendar
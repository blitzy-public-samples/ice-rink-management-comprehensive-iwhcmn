import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BookingType } from '../types/booking';
import { useBookings } from '../hooks/useBookings';
import BookingList from '../components/booking/BookingList';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BookingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { bookings, loading, error, fetchBookings } = useBookings();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBookings().finally(() => setRefreshing(false));
  }, [fetchBookings]);

  const handleCreateBooking = () => {
    navigation.navigate('CreateBooking');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
        <Button title="Retry" onPress={fetchBookings} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BookingList
        bookings={bookings}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Button title="Create Booking" onPress={handleCreateBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
  },
});

export default BookingsScreen;

// Human tasks:
// TODO: Implement error handling and retry logic for failed API requests
// TODO: Add pagination or infinite scrolling for large numbers of bookings
// TODO: Implement sorting and filtering options for the booking list
// TODO: Add analytics tracking for user interactions on the Bookings screen
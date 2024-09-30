import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BookingType } from '../../types/booking';
import { useBookings } from '../../hooks/useBookings';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

const BookingList: React.FC = () => {
  const { bookings, loading, error } = useBookings();

  const renderBookingItem = ({ item }: { item: BookingType }) => {
    const { id, date, time, rinkName, duration } = item;
    const formattedDate = new Date(date).toLocaleDateString();
    const formattedTime = new Date(`${date}T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <TouchableOpacity onPress={() => handleBookingPress(id)}>
        <Card>
          <Text style={styles.rinkName}>{rinkName}</Text>
          <Text style={styles.dateTime}>{`${formattedDate} at ${formattedTime}`}</Text>
          <Text style={styles.duration}>{`Duration: ${duration} minutes`}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  const handleBookingPress = (bookingId: string) => {
    // TODO: Implement navigation to BookingDetailsScreen
    console.log(`Navigate to booking details for ID: ${bookingId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading bookings. Please try again.</Text>
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No bookings found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookings}
      renderItem={renderBookingItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  rinkName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 2,
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default BookingList;

// TODO: Implement navigation to BookingDetailsScreen when a booking item is pressed
// TODO: Add pull-to-refresh functionality for the booking list
// TODO: Implement pagination or infinite scrolling for large lists of bookings
// TODO: Add sorting and filtering options for the booking list
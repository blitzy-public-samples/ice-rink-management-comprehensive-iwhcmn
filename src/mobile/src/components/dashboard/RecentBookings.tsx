import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { BookingType } from '../../types/booking';
import { useBookings } from '../../hooks/useBookings';
import { Card } from '../common/Card';
import { LoadingSpinner } from '../common/LoadingSpinner';

// Assuming BookingType interface
interface BookingType {
  id: string;
  rinkName: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: string;
}

const RecentBookings: React.FC = () => {
  const { bookings, loading, error } = useBookings();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading bookings. Please try again later.</Text>
      </View>
    );
  }

  const renderBookingItem = ({ item }: { item: BookingType }) => (
    <Card style={styles.bookingCard}>
      <Text style={styles.rinkName}>{item.rinkName}</Text>
      <Text style={styles.bookingDate}>
        {format(new Date(item.date), 'MMMM d, yyyy')}
      </Text>
      <Text style={styles.bookingTime}>
        {`${item.startTime} - ${item.endTime}`}
      </Text>
      <Text style={[styles.bookingStatus, { color: getStatusColor(item.status) }]}>
        {item.status}
      </Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Bookings</Text>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return '#4CAF50';
    case 'pending':
      return '#FFC107';
    case 'cancelled':
      return '#F44336';
    default:
      return '#000000';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bookingCard: {
    marginBottom: 12,
    padding: 16,
  },
  rinkName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 16,
    marginBottom: 2,
  },
  bookingTime: {
    fontSize: 14,
    marginBottom: 4,
  },
  bookingStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
  },
});

export default RecentBookings;

// Human tasks:
// 1. Implement error handling for failed booking data fetching (Required)
// 2. Add pull-to-refresh functionality for updating the recent bookings list (Optional)
// 3. Implement navigation to booking details screen when a booking item is tapped (Required)
// 4. Optimize performance for large lists of bookings (e.g., implement virtualization) (Optional)
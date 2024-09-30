import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { format } from 'date-fns';
import { BookingType } from '../../types';
import { useBookings } from '../../hooks/useBookings';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

const UpcomingEvents: React.FC = () => {
  // Use the useBookings hook to fetch upcoming bookings
  const { bookings, loading, error } = useBookings();

  // Function to render individual event items in the FlatList
  const renderEventItem = ({ item }: { item: BookingType }) => (
    <Card>
      <Text style={styles.date}>{format(new Date(item.date), 'MMMM d, yyyy')}</Text>
      <Text style={styles.time}>{`${format(new Date(item.startTime), 'h:mm a')} - ${format(new Date(item.endTime), 'h:mm a')}`}</Text>
      <Text style={styles.rinkName}>{item.rinkName}</Text>
      {item.additionalInfo && <Text style={styles.additionalInfo}>{item.additionalInfo}</Text>}
    </Card>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error loading upcoming events. Please try again.</Text>;
  }

  if (bookings.length === 0) {
    return <Text style={styles.noEventsText}>No upcoming events.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      <FlatList
        data={bookings}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  rinkName: {
    fontSize: 14,
    marginTop: 4,
  },
  additionalInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
};

export default UpcomingEvents;

// Human tasks:
// 1. Implement error handling for failed API requests in the useBookings hook (Required)
// 2. Add pull-to-refresh functionality for updating the list of upcoming events (Optional)
// 3. Implement navigation to a detailed view when an event is tapped (Optional)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BookingType } from '../../types';

interface OverviewCardProps {
  recentBookings: BookingType[];
  totalRevenue: number;
  upcomingBookingsCount: number;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  recentBookings,
  totalRevenue,
  upcomingBookingsCount,
}) => {
  // Calculate relevant statistics
  const totalBookings = recentBookings.length;
  const averageRevenue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Overview</Text>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Total Bookings:</Text>
        <Text style={styles.statValue}>{totalBookings}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Total Revenue:</Text>
        <Text style={styles.statValue}>${totalRevenue.toFixed(2)}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Average Revenue per Booking:</Text>
        <Text style={styles.statValue}>${averageRevenue.toFixed(2)}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Upcoming Bookings:</Text>
        <Text style={styles.statValue}>{upcomingBookingsCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OverviewCard;

// TODO: Implement responsive design to ensure the OverviewCard looks good on various mobile screen sizes
// TODO: Add accessibility features such as proper labeling for screen readers
// TODO: Consider adding animations or transitions to enhance user experience
// TODO: Implement unit tests for the OverviewCard component
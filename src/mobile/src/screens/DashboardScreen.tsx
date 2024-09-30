import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BookingType, RinkType, EquipmentType } from '../types';
import OverviewCard from '../components/dashboard/OverviewCard';
import RecentBookings from '../components/dashboard/RecentBookings';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import useBookings from '../hooks/useBookings';
import useRinks from '../hooks/useRinks';
import useEquipment from '../hooks/useEquipment';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  // Custom hooks for fetching data
  const { bookings, isLoadingBookings, refetchBookings } = useBookings();
  const { rinks, isLoadingRinks, refetchRinks } = useRinks();
  const { equipment, isLoadingEquipment, refetchEquipment } = useEquipment();

  // Calculate total revenue from bookings
  const calculateTotalRevenue = (bookings: BookingType[]): number => {
    return bookings.reduce((total, booking) => total + booking.totalPrice, 0);
  };

  // Refresh function to update dashboard data
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchBookings(), refetchRinks(), refetchEquipment()]);
    setRefreshing(false);
  }, [refetchBookings, refetchRinks, refetchEquipment]);

  // Loading state
  if (isLoadingBookings || isLoadingRinks || isLoadingEquipment) {
    return <LoadingSpinner />;
  }

  // Error handling
  if (!bookings || !rinks || !equipment) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading dashboard data. Please try again.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <OverviewCard
        totalBookings={bookings.length}
        totalRevenue={calculateTotalRevenue(bookings)}
        activeRinks={rinks.filter((rink: RinkType) => rink.status === 'active').length}
        availableEquipment={equipment.filter((item: EquipmentType) => item.status === 'available').length}
      />
      <RecentBookings bookings={bookings.slice(0, 5)} onViewAll={() => navigation.navigate('Bookings')} />
      <UpcomingEvents events={bookings.filter((booking: BookingType) => new Date(booking.startTime) > new Date()).slice(0, 5)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default DashboardScreen;
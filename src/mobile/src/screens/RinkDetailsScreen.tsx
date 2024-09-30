import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RinkType, RinkScheduleType, TimeSlotType } from '../types/rink';
import { useRinks } from '../hooks/useRinks';
import RinkSchedule from '../components/rink/RinkSchedule';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

type RinkDetailsRouteProp = RouteProp<{ RinkDetails: { rinkId: string } }, 'RinkDetails'>;

const RinkDetailsScreen: React.FC = () => {
  const route = useRoute<RinkDetailsRouteProp>();
  const navigation = useNavigation();
  const { rinkId } = route.params;
  const { getRinkDetails, getRinkSchedule } = useRinks();
  const [rink, setRink] = useState<RinkType | null>(null);
  const [schedule, setSchedule] = useState<RinkScheduleType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRinkDetails = async () => {
      try {
        setLoading(true);
        const rinkDetails = await getRinkDetails(rinkId);
        const rinkSchedule = await getRinkSchedule(rinkId);
        setRink(rinkDetails);
        setSchedule(rinkSchedule);
      } catch (error) {
        console.error('Error fetching rink details:', error);
        // TODO: Implement error handling
      } finally {
        setLoading(false);
      }
    };

    fetchRinkDetails();
  }, [rinkId, getRinkDetails, getRinkSchedule]);

  const handleBooking = (timeSlot: TimeSlotType) => {
    // TODO: Implement booking functionality
    console.log('Booking time slot:', timeSlot);
    navigation.navigate('BookingForm', { rinkId, timeSlot });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!rink) {
    return (
      <View style={styles.container}>
        <Text>Rink not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{rink.name}</Text>
      <Text style={styles.info}>Address: {rink.address}</Text>
      <Text style={styles.info}>Capacity: {rink.capacity}</Text>
      <Text style={styles.info}>Contact: {rink.contactInfo}</Text>

      <Text style={styles.sectionTitle}>Schedule</Text>
      {schedule ? (
        <RinkSchedule schedule={schedule} onBookTimeSlot={handleBooking} />
      ) : (
        <Text>No schedule available</Text>
      )}

      <Button title="Back to Rinks" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
});

export default RinkDetailsScreen;

// TODO: Implement error handling for failed rink data fetching
// TODO: Add accessibility features to the screen components
// TODO: Optimize performance for large schedules or frequent updates
// TODO: Implement caching strategy for rink details to reduce API calls
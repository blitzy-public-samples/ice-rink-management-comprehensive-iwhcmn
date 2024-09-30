import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Define types here since we couldn't fetch them from external files
type TimeSlotType = {
  id: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  price: number;
};

type RinkScheduleType = {
  date: Date;
  timeSlots: TimeSlotType[];
};

type RinkScheduleProps = {
  schedule: RinkScheduleType;
  onTimeSlotPress: (timeSlot: TimeSlotType) => void;
};

const formatTime = (date: Date): string => {
  // TODO: Implement actual date formatting logic
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const RinkSchedule: React.FC<RinkScheduleProps> = ({ schedule, onTimeSlotPress }) => {
  const renderTimeSlot = ({ item }: { item: TimeSlotType }) => (
    <TouchableOpacity
      style={[styles.timeSlot, !item.isAvailable && styles.unavailable]}
      onPress={() => onTimeSlotPress(item)}
      disabled={!item.isAvailable}
    >
      <Text style={styles.time}>
        {formatTime(item.startTime)} - {formatTime(item.endTime)}
      </Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Text style={styles.availability}>
        {item.isAvailable ? 'Available' : 'Booked'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {schedule.date.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <FlatList
        data={schedule.timeSlots}
        renderItem={renderTimeSlot}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  timeSlot: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  unavailable: {
    opacity: 0.5,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#007AFF',
  },
  availability: {
    fontSize: 14,
    color: '#4CAF50',
  },
});

export default RinkSchedule;

// TODO: Implement actual date formatting logic in formatTime function
// TODO: Add localization support for date and time formatting
// TODO: Implement error handling for invalid or missing schedule data
// TODO: Add accessibility features to the component
// TODO: Optimize FlatList performance for large schedules
// TODO: Add pull-to-refresh functionality for updating the schedule
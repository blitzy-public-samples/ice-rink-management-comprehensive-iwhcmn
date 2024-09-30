import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Assuming the structure of RinkType based on the component requirements
interface RinkType {
  id: string;
  name: string;
  address: string;
  capacity: number;
  contactInfo: string;
  isOpen: boolean;
}

const RinkDetails: React.FC = () => {
  const route = useRoute();
  const rink = route.params?.rink as RinkType;

  if (!rink) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Rink data not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{rink.name}</Text>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoText}>{rink.address}</Text>
        <Text style={styles.infoLabel}>Capacity:</Text>
        <Text style={styles.infoText}>{rink.capacity} people</Text>
        <Text style={styles.infoLabel}>Contact Info:</Text>
        <Text style={styles.infoText}>{rink.contactInfo}</Text>
        <Text style={styles.infoLabel}>Status:</Text>
        <Text style={[styles.infoText, rink.isOpen ? styles.openStatus : styles.closedStatus]}>
          {rink.isOpen ? 'Open' : 'Closed'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  openStatus: {
    color: 'green',
  },
  closedStatus: {
    color: 'red',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RinkDetails;

// Human tasks:
// 1. Implement actual API integration to fetch rink details if not passed via route params (Required)
// 2. Add loading state while fetching rink details (Required)
// 3. Implement error handling for API failures (Required)
// 4. Design and implement UI for rink details according to the app's design system (Required)
// 5. Add functionality to book the rink or view available time slots (Required)
// 6. Implement map integration to show rink location (Optional)
// 7. Add image carousel for rink photos (Optional)
// 8. Implement user reviews and ratings for the rink (Optional)
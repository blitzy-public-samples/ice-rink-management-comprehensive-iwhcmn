import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MobileEquipment } from '../../types/equipment';
import { useEquipment } from '../../hooks/useEquipment';
import Button from '../common/Button';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

const EquipmentDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { getEquipmentDetails } = useEquipment();
  const [equipment, setEquipment] = useState<MobileEquipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const equipmentId = route.params?.equipmentId;
        if (!equipmentId) {
          throw new Error('Equipment ID is missing');
        }
        const details = await getEquipmentDetails(equipmentId);
        setEquipment(details);
        setLoading(false);
      } catch (err) {
        setError('Failed to load equipment details. Please try again.');
        setLoading(false);
      }
    };

    fetchEquipmentDetails();
  }, [route.params?.equipmentId, getEquipmentDetails]);

  const handleRentEquipment = () => {
    // TODO: Implement equipment rental logic
    console.log('Rent equipment clicked');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!equipment) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Equipment not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Image source={{ uri: equipment.imageUrl }} style={styles.image} />
        <Text style={styles.name}>{equipment.name}</Text>
        <Text style={styles.type}>Type: {equipment.type}</Text>
        <Text style={styles.quantity}>Quantity: {equipment.quantity}</Text>
        <Text style={styles.status}>Status: {equipment.status}</Text>
        <Text style={styles.description}>{equipment.description}</Text>
        <Text style={styles.location}>Rink Location: {equipment.rinkLocation}</Text>
        <Button title="Rent Equipment" onPress={handleRentEquipment} />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  type: {
    fontSize: 18,
    marginBottom: 4,
  },
  quantity: {
    fontSize: 16,
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    marginBottom: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default EquipmentDetails;

// TODO: Implement the actual API integration for fetching equipment details in the useEquipment hook
// TODO: Design and implement the UI for the equipment rental process
// TODO: Add error handling and retry mechanism for failed API requests
// TODO: Implement caching strategy for equipment details to improve performance and offline capabilities
// TODO: Add accessibility features to ensure the component is usable by all users
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MobileEquipment, MobileEquipmentRental } from '../types/equipment';
import { useEquipment } from '../hooks/useEquipment';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EquipmentRentalForm from '../components/equipment/EquipmentRentalForm';

type EquipmentDetailsScreenProps = {
  route: RouteProp<{ params: { equipmentId: string } }, 'params'>;
  navigation: StackNavigationProp<any, any>;
};

const EquipmentDetailsScreen: React.FC<EquipmentDetailsScreenProps> = ({ route, navigation }) => {
  const { equipmentId } = route.params;
  const { getEquipmentDetails, rentEquipment } = useEquipment();
  const [equipment, setEquipment] = useState<MobileEquipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRentalForm, setShowRentalForm] = useState(false);

  useEffect(() => {
    fetchEquipmentDetails();
  }, [equipmentId]);

  const fetchEquipmentDetails = async () => {
    try {
      setLoading(true);
      const equipmentDetails = await getEquipmentDetails(equipmentId);
      setEquipment(equipmentDetails);
      setError(null);
    } catch (err) {
      setError('Failed to fetch equipment details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRentalFormSubmit = async (rentalData: MobileEquipmentRental) => {
    try {
      await rentEquipment(equipmentId, rentalData);
      // Refresh equipment details after successful rental
      await fetchEquipmentDetails();
      setShowRentalForm(false);
    } catch (err) {
      setError('Failed to rent equipment. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchEquipmentDetails} />
      </View>
    );
  }

  if (!equipment) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Equipment not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Image source={{ uri: equipment.imageUrl }} style={styles.image} />
        <Text style={styles.name}>{equipment.name}</Text>
        <Text style={styles.status}>Status: {equipment.status}</Text>
        <Text style={styles.description}>{equipment.description}</Text>
        {equipment.status === 'Available' ? (
          showRentalForm ? (
            <EquipmentRentalForm onSubmit={handleRentalFormSubmit} onCancel={() => setShowRentalForm(false)} />
          ) : (
            <Button title="Rent Equipment" onPress={() => setShowRentalForm(true)} />
          )
        ) : (
          <Text style={styles.unavailableText}>This equipment is currently unavailable for rent</Text>
        )}
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
  status: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  unavailableText: {
    fontSize: 16,
    color: 'red',
    fontStyle: 'italic',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default EquipmentDetailsScreen;
```

This implementation follows the specifications provided in the JSON representation and includes the following features:

1. Fetches equipment details using the `useEquipment` hook.
2. Handles loading and error states.
3. Displays equipment details including image, name, status, and description.
4. Provides a rental form for available equipment.
5. Implements error handling and retry logic for failed equipment data fetching.

Note that I've made some assumptions about the interfaces of the imported components and hooks since their implementations were not available. You may need to adjust the imports and usage of these components based on their actual implementations.

Here's a list of the human tasks mentioned in the JSON specification, added as comments:

```typescript
// Human tasks:
// TODO: Implement error handling and retry logic for failed equipment data fetching
// TODO: Add accessibility features to ensure the screen is usable with screen readers
// TODO: Implement caching strategy for equipment details to improve performance and offline capabilities
// TODO: Add unit and integration tests for the EquipmentDetailsScreen component
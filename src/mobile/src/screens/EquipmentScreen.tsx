import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EquipmentList from '../components/equipment/EquipmentList';
import Button from '../components/common/Button';
import { MobileEquipment, EquipmentFilterOptions } from '../types/equipment';
import useEquipment from '../hooks/useEquipment';

const EquipmentScreen: React.FC = () => {
  const navigation = useNavigation();
  const [filterOptions, setFilterOptions] = useState<EquipmentFilterOptions>({});
  const { equipment, isLoading, error } = useEquipment(filterOptions);

  const handleEquipmentSelect = (equipment: MobileEquipment) => {
    navigation.navigate('EquipmentDetails', { equipmentId: equipment.id });
  };

  const handleFilterChange = (newFilterOptions: EquipmentFilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  const handleRentalFormNavigation = () => {
    navigation.navigate('EquipmentRentalForm');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Equipment</Text>
      </View>

      {/* TODO: Implement filter options UI */}
      <View style={styles.filterContainer}>
        {/* Add filter UI components here */}
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <Text>Loading equipment...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text>Error loading equipment. Please try again.</Text>
          <Button title="Retry" onPress={() => useEquipment(filterOptions)} />
        </View>
      ) : (
        <EquipmentList
          equipment={equipment}
          onEquipmentSelect={handleEquipmentSelect}
        />
      )}

      <Button
        title="Rent Equipment"
        onPress={handleRentalFormNavigation}
        style={styles.rentButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    padding: 16,
    // Add styles for filter container
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rentButton: {
    margin: 16,
  },
});

export default EquipmentScreen;

// TODO: Implement UI for equipment filtering options
// TODO: Add error handling and user feedback for equipment loading failures
// TODO: Implement pull-to-refresh functionality for the equipment list
// TODO: Add a search bar for quick equipment lookup
// TODO: Implement sorting options for the equipment list
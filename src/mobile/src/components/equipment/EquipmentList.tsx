import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MobileEquipment, EquipmentFilterOptions } from '../../types/equipment';
import { useEquipment } from '../../hooks/useEquipment';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

interface EquipmentListProps {
  filterOptions?: EquipmentFilterOptions;
  onEquipmentSelect: (equipment: MobileEquipment) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ filterOptions, onEquipmentSelect }) => {
  const { equipment, loading, error } = useEquipment(filterOptions);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading equipment: {error.message}</Text>
      </View>
    );
  }

  if (!equipment || equipment.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No equipment available</Text>
      </View>
    );
  }

  const renderEquipmentItem = ({ item }: { item: MobileEquipment }) => (
    <TouchableOpacity onPress={() => onEquipmentSelect(item)}>
      <Card style={styles.card}>
        <View style={styles.equipmentInfo}>
          <Text style={styles.equipmentName}>{item.name}</Text>
          <Text style={styles.equipmentType}>{item.type}</Text>
          <Text style={styles.equipmentStatus}>Status: {item.status}</Text>
          <Text style={styles.equipmentQuantity}>Available: {item.availableQuantity}</Text>
        </View>
        {item.imageUrl && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={equipment}
      renderItem={renderEquipmentItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  equipmentType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  equipmentStatus: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  equipmentQuantity: {
    fontSize: 14,
    color: '#444',
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginLeft: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default EquipmentList;

// Human tasks:
// 1. Implement actual API integration for fetching equipment data in the useEquipment hook (Required)
// 2. Design and implement the UI for equipment filtering options (Required)
// 3. Add accessibility features to the EquipmentList component (Optional)
// 4. Implement pagination or infinite scrolling for large equipment lists (Optional)
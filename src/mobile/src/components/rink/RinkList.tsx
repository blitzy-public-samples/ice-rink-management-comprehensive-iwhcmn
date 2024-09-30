import React, { useState, useCallback } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';

// Assuming these types are defined elsewhere in the project
interface RinkType {
  id: string;
  name: string;
  address: string;
  capacity: number;
  isOpen: boolean;
}

interface RinkFilterType {
  // Define filter properties here
  // For example: isOpen?: boolean;
}

interface RinkListProps {
  rinks: RinkType[];
  onRinkSelect: (rink: RinkType) => void;
  filters?: RinkFilterType;
}

const RinkList: React.FC<RinkListProps> = ({ rinks, onRinkSelect, filters }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Implement the refresh logic here
    // For example: fetchRinks().then(() => setRefreshing(false));
    setTimeout(() => setRefreshing(false), 2000); // Simulating API call
  }, []);

  const filteredRinks = filters
    ? rinks.filter((rink) => {
        // Implement filtering logic based on the filters object
        // For example: return filters.isOpen ? rink.isOpen : true;
        return true; // Placeholder, replace with actual filtering logic
      })
    : rinks;

  const renderRinkItem = ({ item }: { item: RinkType }) => (
    <TouchableOpacity style={styles.rinkItem} onPress={() => onRinkSelect(item)}>
      <Text style={styles.rinkName}>{item.name}</Text>
      <Text style={styles.rinkAddress}>{item.address}</Text>
      <Text style={styles.rinkCapacity}>Capacity: {item.capacity}</Text>
      <Text style={[styles.rinkStatus, item.isOpen ? styles.open : styles.closed]}>
        {item.isOpen ? 'Open' : 'Closed'}
      </Text>
    </TouchableOpacity>
  );

  if (filteredRinks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No rinks available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredRinks}
      renderItem={renderRinkItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  rinkItem: {
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
  rinkName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rinkAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  rinkCapacity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  rinkStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  open: {
    color: '#4CAF50',
  },
  closed: {
    color: '#F44336',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default RinkList;

// Human tasks:
// 1. Implement actual API integration to fetch rink data
// 2. Design and implement UI/UX for the RinkList component
// 3. Add error handling for API requests and data loading
// 4. Implement pagination or infinite scrolling for large lists of rinks
// 5. Add accessibility features to the RinkList component
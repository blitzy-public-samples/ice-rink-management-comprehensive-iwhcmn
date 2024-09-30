import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRinks } from '../hooks/useRinks';
import { RinkList } from '../components/rink/RinkList';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// Placeholder types (to be replaced with actual types from rink.ts)
type RinkType = any;
type RinkFilterType = {
  name?: string;
  location?: string;
};

type RinksScreenProps = {
  navigation: any; // Replace with proper navigation type when available
};

export const RinksScreen: React.FC<RinksScreenProps> = ({ navigation }) => {
  const [filters, setFilters] = useState<RinkFilterType>({});
  const { rinks, loading, error, fetchRinks } = useRinks();

  useEffect(() => {
    fetchRinks();
  }, []);

  const handleFilterChange = (key: keyof RinkFilterType, value: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  };

  const applyFilters = () => {
    fetchRinks(filters);
  };

  const renderRinkItem = ({ item }: { item: RinkType }) => (
    <RinkList rink={item} onPress={() => navigation.navigate('RinkDetails', { rinkId: item.id })} />
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Retry" onPress={fetchRinks} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ice Rinks</Text>
      <View style={styles.filterContainer}>
        <Input
          placeholder="Search by name"
          value={filters.name}
          onChangeText={(value) => handleFilterChange('name', value)}
        />
        <Input
          placeholder="Search by location"
          value={filters.location}
          onChangeText={(value) => handleFilterChange('location', value)}
        />
        <Button title="Apply Filters" onPress={applyFilters} />
      </View>
      <FlatList
        data={rinks}
        renderItem={renderRinkItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

// Commented list of human tasks
/*
Human tasks:
1. Implement geolocation functionality to sort rinks by proximity to user (Optional)
2. Add pull-to-refresh functionality for the rink list (Required)
3. Implement caching mechanism for rink data to improve performance (Required)
4. Add accessibility features to ensure the screen is usable by all users (Required)
*/
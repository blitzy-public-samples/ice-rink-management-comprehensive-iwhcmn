import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { MobileUser } from '../../types/user';

const Header: React.FC = () => {
  const navigation = useNavigation();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ice Rink Management</Text>
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
          <Text style={styles.navItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Bookings' as never)}>
          <Text style={styles.navItem}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={isAuthenticated ? handleLogout : () => navigation.navigate('Login' as never)}>
          <Text style={styles.navItem}>{isAuthenticated ? 'Logout' : 'Login'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.userInfo}>
        {isAuthenticated ? `Welcome, ${(user as MobileUser).firstName}` : 'Guest'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B3D91',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navContainer: {
    flexDirection: 'row',
  },
  navItem: {
    color: '#FFFFFF',
    marginLeft: 15,
  },
  userInfo: {
    color: '#A5D8FF',
    fontSize: 14,
  },
});

export default Header;

// Human tasks:
// 1. Implement proper navigation structure using React Navigation (Required)
// 2. Add icons to navigation items for better visual representation (Optional)
// 3. Implement a dropdown or side menu for additional navigation options on smaller screens (Optional)
// 4. Ensure the header component is accessible, with proper contrast ratios and touch target sizes (Required)
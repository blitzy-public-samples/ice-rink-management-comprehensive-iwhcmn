import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { MobileUser } from '../../types/user';

const Sidebar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    navigation.navigate('Login' as never);
  };

  const navItems = [
    { name: 'Dashboard', icon: 'home-outline', route: 'Dashboard' },
    { name: 'Bookings', icon: 'calendar-outline', route: 'Bookings' },
    { name: 'Rinks', icon: 'ice-cream-outline', route: 'Rinks' },
    { name: 'Equipment', icon: 'hockey-sticks-outline', route: 'Equipment' },
    { name: 'Profile', icon: 'person-outline', route: 'Profile' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>
          {isAuthenticated ? `${(user as MobileUser).firstName} ${(user as MobileUser).lastName}` : 'Guest'}
        </Text>
        <Text style={styles.userEmail}>
          {isAuthenticated ? (user as MobileUser).email : 'Please log in'}
        </Text>
      </View>
      <View style={styles.navContainer}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.route as never)}
          >
            <Ionicons name={item.icon as any} size={24} color="#0B3D91" />
            <Text style={styles.navText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={isAuthenticated ? handleLogout : () => navigation.navigate('Login' as never)}
      >
        <Text style={styles.logoutButtonText}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    marginBottom: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B3D91',
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  navContainer: {
    marginBottom: 30,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  navText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333333',
  },
  logoutButton: {
    backgroundColor: '#FF3131',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Sidebar;

// Human tasks:
// 1. Implement proper navigation structure using React Navigation (Required)
// 2. Add custom icons for ice rink-related navigation items (Optional)
// 3. Implement a collapsible sidebar for better space management on smaller screens (Optional)
// 4. Ensure the sidebar component is accessible, with proper contrast ratios and touch target sizes (Required)
// 5. Add user role-based conditional rendering for navigation items (Required)
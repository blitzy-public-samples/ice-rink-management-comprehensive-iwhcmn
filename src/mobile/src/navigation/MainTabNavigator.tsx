import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Assuming these components exist in their respective files
import { BookingStackNavigator } from './BookingStackNavigator';
import { RinkStackNavigator } from './RinkStackNavigator';
import { EquipmentStackNavigator } from './EquipmentStackNavigator';
import { ProfileScreen } from '../screens/ProfileScreen';

// Importing theme (assuming it exists)
import { theme } from '../styles/theme';

// Define the param list for type checking
export type MainTabParamList = {
  Bookings: undefined;
  Rinks: undefined;
  Equipment: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Rinks') {
            iconName = focused ? 'ice-cream' : 'ice-cream-outline';
          } else if (route.name === 'Equipment') {
            iconName = focused ? 'hockey-sticks' : 'hockey-sticks-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'alert-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Bookings" component={BookingStackNavigator} />
      <Tab.Screen name="Rinks" component={RinkStackNavigator} />
      <Tab.Screen name="Equipment" component={EquipmentStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Accessibility features
const accessibilityFeatures = `
TODO: Implement accessibility features for tab navigation
- Add proper aria-labels to tab buttons
- Ensure proper focus management
- Implement voice-over support
`;

// Optional tasks
const optionalTasks = `
TODO (Optional):
- Add badges or notifications to tab icons if needed
- Consider implementing a custom tab bar component for more advanced styling
`;

// Add comments for human tasks
/**
 * @accessibility
 * ${accessibilityFeatures}
 * 
 * @optional
 * ${optionalTasks}
 */
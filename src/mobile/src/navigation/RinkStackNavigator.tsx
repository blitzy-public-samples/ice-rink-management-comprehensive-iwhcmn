import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RinksScreen from '../screens/RinksScreen';
import RinkDetailsScreen from '../screens/RinkDetailsScreen';
import { theme } from '../styles/theme';

// Define the param list for type safety
export type RinkStackParamList = {
  RinksList: undefined;
  RinkDetails: { rinkId: string };
};

const Stack = createStackNavigator<RinkStackParamList>();

const RinkStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="RinksList"
        component={RinksScreen}
        options={{ title: 'Rinks' }}
      />
      <Stack.Screen
        name="RinkDetails"
        component={RinkDetailsScreen}
        options={({ route }) => ({ 
          title: `Rink Details`,
          // You can customize the header title based on the rink name if available
          // title: route.params.rinkName || 'Rink Details',
        })}
      />
    </Stack.Navigator>
  );
};

export default RinkStackNavigator;

// TODO: Implement custom transitions between screens if needed
// TODO: Add error handling for invalid rink IDs in the RinkDetails route
// TODO: Consider adding a search functionality in the header of RinksScreen
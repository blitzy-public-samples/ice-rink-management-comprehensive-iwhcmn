import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// TODO: Import these components once they are implemented
// import AuthNavigator from './AuthNavigator';
// import MainTabNavigator from './MainTabNavigator';

// Define the root stack parameter list
type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // TODO: Implement a splash screen or loading indicator
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

// TODO: Implement error boundary to handle navigation errors gracefully

// TODO: Implement deep linking configuration if required

/**
 * Human tasks:
 * 1. Implement a splash screen or loading indicator for the initial authentication check (Required)
 * 2. Add error boundary to handle navigation errors gracefully (Required)
 * 3. Implement deep linking configuration if required (Optional)
 */
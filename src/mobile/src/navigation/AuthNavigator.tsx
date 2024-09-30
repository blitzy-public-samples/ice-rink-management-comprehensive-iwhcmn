import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screen components
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Define the authentication stack parameter list
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Create a stack navigator
const Stack = createStackNavigator<AuthStackParamList>();

/**
 * AuthNavigator component for handling navigation between login and registration screens
 * in the Ice Rink Management and Booking System mobile application
 */
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

// TODO: Implement a ForgotPasswordScreen and add it to the AuthNavigator
// TODO: Add custom transition animations between screens if needed
// TODO: Implement deep linking for authentication screens
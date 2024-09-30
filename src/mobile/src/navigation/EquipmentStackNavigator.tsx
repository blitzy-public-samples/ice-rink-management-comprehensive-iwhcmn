import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screen components
import EquipmentScreen from '../screens/EquipmentScreen';
import EquipmentDetailsScreen from '../screens/EquipmentDetailsScreen';
import EquipmentRentalFormScreen from '../screens/EquipmentRentalFormScreen';

// Define the parameter list for the Equipment stack
export type EquipmentStackParamList = {
  EquipmentList: undefined;
  EquipmentDetails: { equipmentId: string };
  EquipmentRentalForm: { equipmentId: string };
};

const Stack = createStackNavigator<EquipmentStackParamList>();

const EquipmentStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="EquipmentList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4f4f4',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="EquipmentList"
        component={EquipmentScreen}
        options={{ title: 'Equipment' }}
      />
      <Stack.Screen
        name="EquipmentDetails"
        component={EquipmentDetailsScreen}
        options={{ title: 'Equipment Details' }}
      />
      <Stack.Screen
        name="EquipmentRentalForm"
        component={EquipmentRentalFormScreen}
        options={{ title: 'Rent Equipment' }}
      />
    </Stack.Navigator>
  );
};

export default EquipmentStackNavigator;

// Human tasks:
// 1. Implement custom header components for each screen in the stack (Optional)
// 2. Add transition animations between screens for a smoother user experience (Optional)
// 3. Implement deep linking for direct navigation to specific equipment details (Optional)
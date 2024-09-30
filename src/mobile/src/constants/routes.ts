/**
 * This file contains constant values for route names used in the mobile application's navigation system.
 * It provides a centralized location for managing route names, ensuring consistency across the app.
 */

// Home route
export const HOME = '/'

// Authentication routes
export const LOGIN = '/login'
export const REGISTER = '/register'

// Main app routes
export const DASHBOARD = '/dashboard'
export const BOOKINGS = '/bookings'
export const BOOKING_DETAILS = '/bookings/:id'
export const RINKS = '/rinks'
export const RINK_DETAILS = '/rinks/:id'
export const EQUIPMENT = '/equipment'
export const EQUIPMENT_DETAILS = '/equipment/:id'
export const PROFILE = '/profile'

/**
 * Use these constants when defining routes in your navigation system.
 * For example:
 * 
 * import { DASHBOARD, BOOKINGS } from '../constants/routes';
 * 
 * const Stack = createStackNavigator();
 * 
 * <Stack.Navigator>
 *   <Stack.Screen name={DASHBOARD} component={DashboardScreen} />
 *   <Stack.Screen name={BOOKINGS} component={BookingsScreen} />
 * </Stack.Navigator>
 */
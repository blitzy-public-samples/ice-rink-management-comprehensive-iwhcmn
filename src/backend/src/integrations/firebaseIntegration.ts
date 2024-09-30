import { initializeApp } from 'firebase/app';
import { getMessaging, Message, Messaging } from 'firebase/messaging';
import { FirebaseConfig } from '../types/integrations';

let messaging: Messaging | null = null;

/**
 * Initializes the Firebase app with the provided configuration
 * @param config The Firebase configuration object
 */
export const initializeFirebase = (config: FirebaseConfig): void => {
  try {
    const app = initializeApp(config);
    messaging = getMessaging(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};

/**
 * Sends a push notification to a specific device or topic
 * @param token The FCM token of the device or topic
 * @param data The data to be sent in the notification
 * @returns A Promise that resolves to true if the notification was sent successfully, false otherwise
 */
export const sendPushNotification = async (token: string, data: object): Promise<boolean> => {
  if (!messaging) {
    console.error('Firebase messaging is not initialized');
    return false;
  }

  try {
    const message: Message = {
      token,
      data,
    };

    const response = await messaging.send(message);
    console.log('Push notification sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Error sending push notification:', error);
    return false;
  }
};

// TODO: Implement error handling and retry logic for failed push notification attempts
// TODO: Set up Firebase Cloud Messaging credentials and update the configuration

/**
 * Human tasks:
 * 1. Implement error handling and retry logic for failed push notification attempts
 * 2. Set up Firebase Cloud Messaging credentials and update the configuration
 */
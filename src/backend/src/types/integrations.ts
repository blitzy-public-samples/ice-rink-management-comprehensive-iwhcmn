import { Stripe } from 'stripe';
import { SendGridClient } from '@sendgrid/client';
import { Twilio } from 'twilio';
import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js';
import { app as FirebaseApp } from 'firebase/app';
import * as Sentry from '@sentry/node';

// Configuration interface for Stripe integration
export interface StripeConfig {
  apiKey: string;
  webhookSecret: string;
}

// Configuration interface for SendGrid integration
export interface SendGridConfig {
  apiKey: string;
  fromEmail: string;
}

// Configuration interface for Twilio integration
export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
}

// Configuration interface for Google Maps integration
export interface GoogleMapsConfig {
  apiKey: string;
}

// Configuration interface for Firebase integration
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Configuration interface for Sentry integration
export interface SentryConfig {
  dsn: string;
  environment: string;
}

// Union type for supported payment providers
export type PaymentProvider = 'stripe';

// Union type for supported email providers
export type EmailProvider = 'sendgrid';

// Union type for supported SMS providers
export type SMSProvider = 'twilio';

// Union type for supported maps providers
export type MapsProvider = 'google';

// Union type for supported push notification providers
export type PushNotificationProvider = 'firebase';

// Union type for supported error tracking providers
export type ErrorTrackingProvider = 'sentry';

// Exported types for third-party services
export {
  Stripe,
  SendGridClient,
  Twilio,
  GoogleMapsClient,
  FirebaseApp,
  Sentry
};
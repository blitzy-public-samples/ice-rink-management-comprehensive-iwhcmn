import { initializeStripe, createPaymentIntent, confirmPayment, refundPayment, handleWebhook } from './stripeIntegration';
import { initializeSendGrid, sendEmail, sendTemplateEmail } from './sendGridIntegration';
import { initializeTwilio, sendSMS } from './twilioIntegration';
import { GoogleMapsService } from './googleMapsIntegration';
import { StripeConfig, SendGridConfig, TwilioConfig, GoogleMapsConfig } from '../types/integrations';
import config from '../config';

// Initialize Stripe service
const stripeService = {
  initializeStripe: initializeStripe(config.stripe as StripeConfig),
  createPaymentIntent,
  confirmPayment,
  refundPayment,
  handleWebhook,
};

// Initialize SendGrid service
const sendGridService = {
  initializeSendGrid: initializeSendGrid(config.sendGrid as SendGridConfig),
  sendEmail,
  sendTemplateEmail,
};

// Initialize Twilio service
const twilioService = {
  initializeTwilio: initializeTwilio(config.twilio as TwilioConfig),
  sendSMS,
};

// Initialize Google Maps service
const googleMapsService = new GoogleMapsService(config.googleMaps as GoogleMapsConfig);

/**
 * Initializes all external service integrations
 */
export function initializeIntegrations(): void {
  try {
    // Initialize Stripe
    stripeService.initializeStripe();
    console.log('Stripe integration initialized successfully');

    // Initialize SendGrid
    sendGridService.initializeSendGrid();
    console.log('SendGrid integration initialized successfully');

    // Initialize Twilio
    twilioService.initializeTwilio();
    console.log('Twilio integration initialized successfully');

    // Google Maps service is initialized when the instance is created
    console.log('Google Maps integration initialized successfully');
  } catch (error) {
    console.error('Error initializing integrations:', error);
    throw new Error('Failed to initialize integrations');
  }
}

export {
  stripeService,
  sendGridService,
  twilioService,
  googleMapsService,
};

// List of human tasks
/**
 * TODO: Human Tasks
 * 1. [Critical] Ensure all necessary configuration values are present in the config file
 * 2. [Required] Implement proper error handling for initialization failures
 * 3. [Optional] Add logging for successful initialization of each integration
 */
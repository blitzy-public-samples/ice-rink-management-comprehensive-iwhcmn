import { Twilio } from 'twilio';
import { TwilioConfig } from '../types/integrations';

let twilioClient: Twilio | null = null;

/**
 * Initializes the Twilio client with the provided configuration
 * @param config TwilioConfig object containing accountSid and authToken
 * @returns Initialized Twilio client
 */
export const initializeTwilio = (config: TwilioConfig): Twilio => {
  if (!config.accountSid || !config.authToken) {
    throw new Error('Invalid Twilio configuration. accountSid and authToken are required.');
  }

  twilioClient = new Twilio(config.accountSid, config.authToken);
  return twilioClient;
};

/**
 * Sends an SMS message using the Twilio service
 * @param to The recipient's phone number
 * @param body The message content
 * @returns A promise that resolves when the SMS is sent successfully
 */
export const sendSMS = async (to: string, body: string): Promise<void> => {
  if (!twilioClient) {
    throw new Error('Twilio client is not initialized. Call initializeTwilio first.');
  }

  try {
    const message = await twilioClient.messages.create({
      body,
      to,
      from: process.env.TWILIO_PHONE_NUMBER, // Ensure this environment variable is set
    });

    console.log(`SMS sent successfully. SID: ${message.sid}`);
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS. Please try again later.');
  }
};

// Rate limiting implementation
let lastSMSTimestamp = 0;
const SMS_RATE_LIMIT = 1000; // 1 second between SMS sends

/**
 * Sends an SMS message with rate limiting
 * @param to The recipient's phone number
 * @param body The message content
 * @returns A promise that resolves when the SMS is sent successfully
 */
export const sendSMSWithRateLimit = async (to: string, body: string): Promise<void> => {
  const now = Date.now();
  if (now - lastSMSTimestamp < SMS_RATE_LIMIT) {
    const delay = SMS_RATE_LIMIT - (now - lastSMSTimestamp);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  await sendSMS(to, body);
  lastSMSTimestamp = Date.now();
};

// Retry mechanism for failed SMS attempts
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

/**
 * Sends an SMS message with retry mechanism
 * @param to The recipient's phone number
 * @param body The message content
 * @returns A promise that resolves when the SMS is sent successfully
 */
export const sendSMSWithRetry = async (to: string, body: string): Promise<void> => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      await sendSMSWithRateLimit(to, body);
      return;
    } catch (error) {
      console.error(`SMS sending failed. Retry ${retries + 1} of ${MAX_RETRIES}`);
      retries++;
      if (retries >= MAX_RETRIES) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
};

/**
 * Human tasks:
 * 1. Implement error handling and logging for SMS sending failures (Required)
 * 2. Add rate limiting to prevent abuse of the SMS sending functionality (Required)
 * 3. Implement a retry mechanism for failed SMS attempts (Optional)
 */
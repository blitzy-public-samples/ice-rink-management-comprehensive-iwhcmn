import nodemailer from 'nodemailer';
import twilio from 'twilio';
import * as firebaseAdmin from 'firebase-admin';

export interface NotificationService {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
  sendSMS(phoneNumber: string, message: string): Promise<void>;
  sendPushNotification(userId: string, title: string, body: string): Promise<void>;
}

export class NotificationServiceImpl implements NotificationService {
  private emailTransporter: nodemailer.Transporter;
  private twilioClient: twilio.Twilio;
  private firebaseAdmin: typeof firebaseAdmin;

  constructor() {
    // Initialize nodemailer transporter
    this.emailTransporter = nodemailer.createTransport({
      // TODO: Configure email service settings
    });

    // Initialize Twilio client
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Initialize Firebase Admin SDK
    this.firebaseAdmin = firebaseAdmin.initializeApp({
      // TODO: Configure Firebase Admin SDK settings
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      // Validate email address
      if (!this.isValidEmail(to)) {
        throw new Error('Invalid email address');
      }

      // Create email options object
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html: body,
      };

      // Send email using nodemailer transporter
      await this.emailTransporter.sendMail(mailOptions);
    } catch (error) {
      // Handle any errors and log them
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendSMS(phoneNumber: string, message: string): Promise<void> {
    try {
      // Validate phone number
      if (!this.isValidPhoneNumber(phoneNumber)) {
        throw new Error('Invalid phone number');
      }

      // Create SMS options object
      const smsOptions = {
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      };

      // Send SMS using Twilio client
      await this.twilioClient.messages.create(smsOptions);
    } catch (error) {
      // Handle any errors and log them
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  async sendPushNotification(userId: string, title: string, body: string): Promise<void> {
    try {
      // Retrieve user's device token(s) from the database
      const deviceTokens = await this.getUserDeviceTokens(userId);

      if (deviceTokens.length === 0) {
        throw new Error('No device tokens found for the user');
      }

      // Create push notification message object
      const message = {
        notification: { title, body },
        tokens: deviceTokens,
      };

      // Send push notification using Firebase Admin SDK
      await this.firebaseAdmin.messaging().sendMulticast(message);
    } catch (error) {
      // Handle any errors and log them
      console.error('Error sending push notification:', error);
      throw error;
    }
  }

  private isValidEmail(email: string): boolean {
    // Implement email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhoneNumber(phoneNumber: string): boolean {
    // Implement phone number validation logic
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  }

  private async getUserDeviceTokens(userId: string): Promise<string[]> {
    // TODO: Implement logic to retrieve user's device tokens from the database
    // This is a placeholder implementation
    return [];
  }
}

// Export a singleton instance of the NotificationService
export const notificationService = new NotificationServiceImpl();

// Human tasks:
// TODO: Set up and configure nodemailer with appropriate email service credentials
// TODO: Set up Twilio account and obtain necessary credentials for SMS functionality
// TODO: Set up Firebase project and configure Firebase Admin SDK for push notifications
// TODO: Implement error handling and logging mechanism for failed notifications
// TODO: Consider implementing rate limiting for notifications to prevent abuse
// TODO: Implement unit tests for the NotificationServiceImpl class
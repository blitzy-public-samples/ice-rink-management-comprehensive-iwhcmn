import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import admin from 'firebase-admin';
import { NotificationServiceImpl } from '../../../src/services/notificationService';

jest.mock('nodemailer');
jest.mock('twilio');
jest.mock('firebase-admin');

describe('NotificationService', () => {
  let notificationService: NotificationServiceImpl;
  let mockNodemailerTransporter: jest.Mocked<nodemailer.Transporter>;
  let mockTwilioClient: jest.Mocked<twilio.Twilio>;
  let mockFirebaseMessaging: jest.Mocked<admin.messaging.Messaging>;

  beforeEach(() => {
    mockNodemailerTransporter = {
      sendMail: jest.fn().mockResolvedValue({ messageId: 'test-email-id' }),
    } as any;
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockNodemailerTransporter);

    mockTwilioClient = {
      messages: {
        create: jest.fn().mockResolvedValue({ sid: 'test-sms-id' }),
      },
    } as any;
    (twilio as unknown as jest.Mock).mockReturnValue(mockTwilioClient);

    mockFirebaseMessaging = {
      send: jest.fn().mockResolvedValue('test-push-id'),
    } as any;
    admin.messaging = jest.fn().mockReturnValue(mockFirebaseMessaging);

    notificationService = new NotificationServiceImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    test('should send an email successfully', async () => {
      const email = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test email content',
      };

      await notificationService.sendEmail(email);

      expect(mockNodemailerTransporter.sendMail).toHaveBeenCalledWith(email);
    });

    test('should throw an error if email sending fails', async () => {
      const error = new Error('Email sending failed');
      mockNodemailerTransporter.sendMail.mockRejectedValue(error);

      await expect(notificationService.sendEmail({
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test email content',
      })).rejects.toThrow('Email sending failed');
    });
  });

  describe('sendSMS', () => {
    test('should send an SMS successfully', async () => {
      const sms = {
        to: '+1234567890',
        body: 'Test SMS content',
      };

      await notificationService.sendSMS(sms);

      expect(mockTwilioClient.messages.create).toHaveBeenCalledWith(sms);
    });

    test('should throw an error if SMS sending fails', async () => {
      const error = new Error('SMS sending failed');
      mockTwilioClient.messages.create.mockRejectedValue(error);

      await expect(notificationService.sendSMS({
        to: '+1234567890',
        body: 'Test SMS content',
      })).rejects.toThrow('SMS sending failed');
    });
  });

  describe('sendPushNotification', () => {
    test('should send a push notification successfully', async () => {
      const pushNotification = {
        token: 'user-device-token',
        title: 'Test Notification',
        body: 'Test push notification content',
      };

      await notificationService.sendPushNotification(pushNotification);

      expect(mockFirebaseMessaging.send).toHaveBeenCalledWith({
        token: pushNotification.token,
        notification: {
          title: pushNotification.title,
          body: pushNotification.body,
        },
      });
    });

    test('should throw an error if push notification sending fails', async () => {
      const error = new Error('Push notification sending failed');
      mockFirebaseMessaging.send.mockRejectedValue(error);

      await expect(notificationService.sendPushNotification({
        token: 'user-device-token',
        title: 'Test Notification',
        body: 'Test push notification content',
      })).rejects.toThrow('Push notification sending failed');
    });
  });
});
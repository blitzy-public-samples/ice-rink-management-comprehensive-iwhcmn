import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { initializeTwilio, sendSMS } from '../../../src/integrations/twilioIntegration';
import { TwilioConfig } from '../../../src/types/integrations';
import { getConfig } from '../../../src/config';
import Twilio from 'twilio';

jest.mock('twilio');
jest.mock('../../../src/config');

describe('Twilio Integration', () => {
  let mockTwilioClient: jest.Mocked<Twilio.Twilio>;
  let mockConfig: TwilioConfig;

  beforeAll(() => {
    // Mock the configuration
    mockConfig = {
      accountSid: 'test_account_sid',
      authToken: 'test_auth_token',
      phoneNumber: '+1234567890'
    };
    (getConfig as jest.Mock).mockReturnValue({ twilio: mockConfig });

    // Mock Twilio client
    mockTwilioClient = {
      messages: {
        create: jest.fn()
      }
    } as unknown as jest.Mocked<Twilio.Twilio>;
    (Twilio as jest.Mock).mockReturnValue(mockTwilioClient);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should initialize Twilio client successfully', () => {
    const client = initializeTwilio();
    expect(client).toBeDefined();
    expect(Twilio).toHaveBeenCalledWith(mockConfig.accountSid, mockConfig.authToken);
  });

  it('should send an SMS successfully', async () => {
    const to = '+9876543210';
    const body = 'Test message';

    mockTwilioClient.messages.create.mockResolvedValue({} as Twilio.MessageInstance);

    await expect(sendSMS(to, body)).resolves.not.toThrow();

    expect(mockTwilioClient.messages.create).toHaveBeenCalledWith({
      to,
      from: mockConfig.phoneNumber,
      body
    });
  });

  it('should handle errors when sending SMS fails', async () => {
    const to = '+9876543210';
    const body = 'Test message';

    const mockError = new Error('Failed to send SMS');
    mockTwilioClient.messages.create.mockRejectedValue(mockError);

    await expect(sendSMS(to, body)).rejects.toThrow('Failed to send SMS');

    expect(mockTwilioClient.messages.create).toHaveBeenCalledWith({
      to,
      from: mockConfig.phoneNumber,
      body
    });
  });
});

// Human tasks:
// TODO: Implement mock for Twilio client to avoid actual API calls during tests
// TODO: Add more edge case tests for error handling scenarios
// TODO: Implement test for rate limiting functionality once it's added to the main integration
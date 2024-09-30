import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import nock from 'nock';
import { initializeSendGrid, sendEmail, sendTemplateEmail } from '../../../src/integrations/sendGridIntegration';
import { SendGridConfig } from '../../../src/types/integrations';

describe('SendGrid Integration', () => {
  const testConfig: SendGridConfig = {
    apiKey: 'TEST_API_KEY',
    fromEmail: 'test@example.com',
  };

  beforeAll(() => {
    // Initialize SendGrid with test configuration
    initializeSendGrid(testConfig);

    // Set up nock to intercept HTTP requests to SendGrid API
    nock('https://api.sendgrid.com')
      .persist()
      .post('/v3/mail/send')
      .reply(202, { message: 'success' });
  });

  afterAll(() => {
    // Clean up nock interceptors
    nock.cleanAll();
  });

  test('should initialize SendGrid client successfully', () => {
    expect(() => initializeSendGrid(testConfig)).not.toThrow();
  });

  test('should send an email successfully', async () => {
    const emailData = {
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
      html: '<p>This is a test email</p>',
    };

    await expect(sendEmail(emailData)).resolves.not.toThrow();
  });

  test('should send a template email successfully', async () => {
    const templateData = {
      to: 'recipient@example.com',
      templateId: 'TEST_TEMPLATE_ID',
      dynamicTemplateData: {
        name: 'John Doe',
        bookingDate: '2023-05-01',
      },
    };

    await expect(sendTemplateEmail(templateData)).resolves.not.toThrow();
  });

  test('should handle API errors gracefully', async () => {
    // Set up nock to return an error
    nock.cleanAll();
    nock('https://api.sendgrid.com')
      .post('/v3/mail/send')
      .reply(500, { error: 'Internal Server Error' });

    const emailData = {
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
      html: '<p>This is a test email</p>',
    };

    await expect(sendEmail(emailData)).rejects.toThrow('Failed to send email');
  });
});

// Human tasks:
// TODO: Implement additional test cases for edge cases and error scenarios
// TODO: Set up test environment variables for SendGrid API key and other configuration
// TODO: Create mock data for email templates to use in template email tests
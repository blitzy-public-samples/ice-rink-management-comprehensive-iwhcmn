import { initializeSentry, captureException, captureMessage, setUser, clearUser } from '../../../src/integrations/sentryIntegration';
import { SentryConfig } from '../../../src/types/integrations';
import * as Sentry from '@sentry/node';

jest.mock('@sentry/node');

describe('Sentry Integration', () => {
  const mockSentryConfig: SentryConfig = {
    dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
    environment: 'test',
    release: '1.0.0',
  };

  beforeAll(() => {
    // Initialize Sentry with test configuration
    initializeSentry(mockSentryConfig);
  });

  afterAll(() => {
    // Clear any mocks
    jest.clearAllMocks();
  });

  it('should initialize Sentry with correct configuration', () => {
    expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
      dsn: mockSentryConfig.dsn,
      environment: mockSentryConfig.environment,
      release: mockSentryConfig.release,
    }));
  });

  it('should capture exceptions', () => {
    const testError = new Error('Test error');
    captureException(testError);
    expect(Sentry.captureException).toHaveBeenCalledWith(testError);
  });

  it('should capture messages', () => {
    const testMessage = 'Test message';
    captureMessage(testMessage);
    expect(Sentry.captureMessage).toHaveBeenCalledWith(testMessage);
  });

  it('should set user context', () => {
    const testUser = { id: '123', email: 'test@example.com' };
    setUser(testUser);
    expect(Sentry.setUser).toHaveBeenCalledWith(testUser);
  });

  it('should clear user context', () => {
    clearUser();
    expect(Sentry.setUser).toHaveBeenCalledWith(null);
  });

  it('should handle errors when capturing exceptions', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const testError = new Error('Test error');
    (Sentry.captureException as jest.Mock).mockImplementation(() => {
      throw new Error('Sentry error');
    });

    captureException(testError);

    expect(consoleSpy).toHaveBeenCalledWith('Failed to capture exception:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('should handle errors when capturing messages', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const testMessage = 'Test message';
    (Sentry.captureMessage as jest.Mock).mockImplementation(() => {
      throw new Error('Sentry error');
    });

    captureMessage(testMessage);

    expect(consoleSpy).toHaveBeenCalledWith('Failed to capture message:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});

// Human tasks:
// 1. Implement mock for Sentry SDK to avoid actual API calls during tests
// 2. Add test cases for error scenarios and edge cases
// 3. Implement test coverage reporting for Sentry integration
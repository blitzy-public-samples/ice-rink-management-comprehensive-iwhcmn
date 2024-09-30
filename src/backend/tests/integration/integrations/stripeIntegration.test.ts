import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import Stripe from 'stripe';
import { initializeStripe, createPaymentIntent, confirmPayment, refundPayment, handleWebhook } from '../../../src/integrations/stripeIntegration';
import { StripeConfig } from '../../../src/types/integrations';

// Mock server for webhook testing
import * as http from 'http';
import { AddressInfo } from 'net';

describe('Stripe Integration', () => {
  let stripeInstance: Stripe;
  let mockServer: http.Server;
  let webhookUrl: string;

  const stripeConfig: StripeConfig = {
    apiKey: 'sk_test_examplekey',
    webhookSecret: 'whsec_examplesecret',
  };

  beforeAll(async () => {
    // Initialize Stripe instance
    stripeInstance = initializeStripe(stripeConfig);

    // Set up mock server for webhook testing
    mockServer = http.createServer((req, res) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        res.end('OK');
      });
    });

    await new Promise<void>((resolve) => {
      mockServer.listen(0, '127.0.0.1', () => {
        const { port } = mockServer.address() as AddressInfo;
        webhookUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  afterAll((done) => {
    mockServer.close(done);
  });

  test('initializeStripe should return a valid Stripe instance', () => {
    expect(stripeInstance).toBeInstanceOf(Stripe);
    expect(stripeInstance.apiKey).toBe(stripeConfig.apiKey);
  });

  test('createPaymentIntent should create a valid payment intent', async () => {
    const amount = 2000; // $20.00
    const currency = 'usd';
    const metadata = { orderId: '12345' };

    const paymentIntent = await createPaymentIntent(stripeInstance, amount, currency, metadata);

    expect(paymentIntent).toBeDefined();
    expect(paymentIntent.id).toBeDefined();
    expect(paymentIntent.amount).toBe(amount);
    expect(paymentIntent.currency).toBe(currency);
    expect(paymentIntent.metadata).toEqual(metadata);
  });

  test('confirmPayment should confirm a payment intent', async () => {
    const paymentIntent = await createPaymentIntent(stripeInstance, 3000, 'usd');
    const confirmedPaymentIntent = await confirmPayment(stripeInstance, paymentIntent.id);

    expect(confirmedPaymentIntent).toBeDefined();
    expect(confirmedPaymentIntent.id).toBe(paymentIntent.id);
    expect(confirmedPaymentIntent.status).toBe('succeeded');
  });

  test('refundPayment should refund a payment', async () => {
    const paymentIntent = await createPaymentIntent(stripeInstance, 4000, 'usd');
    await confirmPayment(stripeInstance, paymentIntent.id);

    const refund = await refundPayment(stripeInstance, paymentIntent.id, 2000);

    expect(refund).toBeDefined();
    expect(refund.amount).toBe(2000);
    expect(refund.status).toBe('succeeded');
  });

  test('handleWebhook should process valid webhook events', async () => {
    const event = {
      id: 'evt_test123',
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: 'pi_test123',
          amount: 2000,
          currency: 'usd',
        },
      },
    };

    const signature = 'test_signature';

    const result = await handleWebhook(stripeConfig.webhookSecret, JSON.stringify(event), signature);

    expect(result).toBeDefined();
    expect(result.type).toBe('payment_intent.succeeded');
  });
});
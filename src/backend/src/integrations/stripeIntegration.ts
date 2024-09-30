import Stripe from 'stripe';
import { StripeConfig } from '../types/integrations';

/**
 * Initializes the Stripe client with the provided configuration
 * @param config StripeConfig object containing the API key
 * @returns Initialized Stripe client
 */
export const initializeStripe = (config: StripeConfig): Stripe => {
  return new Stripe(config.apiKey, { apiVersion: '2023-08-16' });
};

/**
 * Creates a payment intent for a booking
 * @param amount The amount to charge in cents
 * @param currency The currency code (e.g., 'usd')
 * @param bookingId The ID of the booking associated with this payment
 * @returns A Promise resolving to the created PaymentIntent
 */
export const createPaymentIntent = async (
  amount: number,
  currency: string,
  bookingId: string
): Promise<Stripe.PaymentIntent> => {
  const stripe = initializeStripe({ apiKey: process.env.STRIPE_SECRET_KEY as string });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { bookingId },
    });

    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

/**
 * Confirms a payment intent
 * @param paymentIntentId The ID of the payment intent to confirm
 * @returns A Promise resolving to the confirmed PaymentIntent
 */
export const confirmPayment = async (
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> => {
  const stripe = initializeStripe({ apiKey: process.env.STRIPE_SECRET_KEY as string });

  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error confirming payment intent:', error);
    throw error;
  }
};

/**
 * Refunds a payment
 * @param paymentIntentId The ID of the payment intent to refund
 * @param amount The amount to refund in cents
 * @returns A Promise resolving to the Refund details
 */
export const refundPayment = async (
  paymentIntentId: string,
  amount: number
): Promise<Stripe.Refund> => {
  const stripe = initializeStripe({ apiKey: process.env.STRIPE_SECRET_KEY as string });

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount,
    });

    return refund;
  } catch (error) {
    console.error('Error refunding payment:', error);
    throw error;
  }
};

/**
 * Handles Stripe webhook events
 * @param rawBody The raw body of the webhook request
 * @param signature The Stripe signature from the request headers
 * @returns A Promise that resolves when the webhook is handled
 */
export const handleWebhook = async (
  rawBody: string,
  signature: string
): Promise<void> => {
  const stripe = initializeStripe({ apiKey: process.env.STRIPE_SECRET_KEY as string });
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  try {
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      // Add more event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    throw error;
  }
};

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  // Implement logic to update booking status, send confirmation, etc.
  console.log('Payment succeeded:', paymentIntent.id);
  // TODO: Update booking status in the database
  // TODO: Send confirmation email to the customer
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  // Implement logic to handle failed payments
  console.log('Payment failed:', paymentIntent.id);
  // TODO: Update booking status in the database
  // TODO: Send notification to the customer about the failed payment
}

// TODO: Implement error handling and logging for Stripe API calls
// TODO: Set up Stripe webhook endpoint in the application
// TODO: Configure Stripe API keys and webhook secret in the environment variables
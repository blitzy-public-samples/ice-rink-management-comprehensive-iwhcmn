import { ApiResponse, ErrorResponse } from '../types';
import { config } from '../config';
import Stripe from 'stripe';

// Initialize Stripe with the API key from config
const stripe = new Stripe(config.stripeApiKey, { apiVersion: '2023-08-16' });

/**
 * Service responsible for handling payment operations in the Ice Rink Management and Booking System
 */
export class PaymentService {
  /**
   * Process a payment for a booking
   * @param amount - The amount to charge in cents
   * @param currency - The currency code (e.g., 'usd')
   * @param paymentMethodId - The ID of the payment method to use
   * @param customerId - The ID of the customer making the payment
   * @returns A promise that resolves to an ApiResponse object
   */
  static async processPayment(
    amount: number,
    currency: string,
    paymentMethodId: string,
    customerId: string
  ): Promise<ApiResponse> {
    try {
      // Create a PaymentIntent using Stripe API
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        customer: customerId,
        confirm: true,
      });

      // If successful, return a success ApiResponse with the PaymentIntent
      return {
        success: true,
        data: paymentIntent,
        message: 'Payment processed successfully',
      };
    } catch (error) {
      // If an error occurs, catch it and return an error ApiResponse
      console.error('Error processing payment:', error);
      return {
        success: false,
        error: error as ErrorResponse,
        message: 'Failed to process payment',
      };
    }
  }

  /**
   * Process a refund for a previously made payment
   * @param paymentIntentId - The ID of the PaymentIntent to refund
   * @param amount - The amount to refund in cents
   * @returns A promise that resolves to an ApiResponse object
   */
  static async refundPayment(
    paymentIntentId: string,
    amount: number
  ): Promise<ApiResponse> {
    try {
      // Create a Refund using Stripe API
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount,
      });

      // If successful, return a success ApiResponse with the Refund details
      return {
        success: true,
        data: refund,
        message: 'Refund processed successfully',
      };
    } catch (error) {
      // If an error occurs, catch it and return an error ApiResponse
      console.error('Error processing refund:', error);
      return {
        success: false,
        error: error as ErrorResponse,
        message: 'Failed to process refund',
      };
    }
  }

  /**
   * Retrieve details of a specific payment
   * @param paymentIntentId - The ID of the PaymentIntent to retrieve
   * @returns A promise that resolves to an ApiResponse object containing payment details
   */
  static async getPaymentDetails(paymentIntentId: string): Promise<ApiResponse> {
    try {
      // Retrieve the PaymentIntent using Stripe API
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      // If successful, return a success ApiResponse with the PaymentIntent details
      return {
        success: true,
        data: paymentIntent,
        message: 'Payment details retrieved successfully',
      };
    } catch (error) {
      // If an error occurs, catch it and return an error ApiResponse
      console.error('Error retrieving payment details:', error);
      return {
        success: false,
        error: error as ErrorResponse,
        message: 'Failed to retrieve payment details',
      };
    }
  }
}

// List of human tasks
/**
 * TODO: Human Tasks
 * 1. Set up Stripe API key in the configuration (Critical)
 * 2. Implement proper error handling and logging for payment operations (Required)
 * 3. Review and test all payment flows to ensure they meet the business requirements (Required)
 * 4. Implement additional security measures for handling sensitive payment information (Required)
 */
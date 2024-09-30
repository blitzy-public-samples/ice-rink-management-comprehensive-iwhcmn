import { ApiResponse } from '../types';
import nodemailer from 'nodemailer';
import sendgrid from '@sendgrid/mail';

// Set SendGrid API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

// Define the from email address
const FROM_EMAIL = process.env.FROM_EMAIL as string;

/**
 * Sends an email using SendGrid
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param text - Plain text content of the email
 * @param html - HTML content of the email
 * @returns Promise<ApiResponse> - Response indicating success or failure of email sending
 */
export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<ApiResponse> => {
  try {
    // Create email data object
    const msg = {
      to,
      from: FROM_EMAIL,
      subject,
      text,
      html,
    };

    // Send email using SendGrid
    await sendgrid.send(msg);

    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Sends a booking confirmation email to the user
 * @param to - Recipient email address
 * @param bookingDetails - Object containing booking details
 * @returns Promise<ApiResponse> - Response indicating success or failure of email sending
 */
export const sendBookingConfirmation = async (
  to: string,
  bookingDetails: any
): Promise<ApiResponse> => {
  // Generate email subject
  const subject = 'Booking Confirmation - Ice Rink Management System';

  // Generate email content with booking details
  const text = `Thank you for your booking. Here are your booking details:\n\n${JSON.stringify(bookingDetails, null, 2)}`;
  const html = `
    <h1>Booking Confirmation</h1>
    <p>Thank you for your booking. Here are your booking details:</p>
    <pre>${JSON.stringify(bookingDetails, null, 2)}</pre>
  `;

  // Call sendEmail function with generated content
  return sendEmail(to, subject, text, html);
};

/**
 * Sends a password reset email to the user
 * @param to - Recipient email address
 * @param resetToken - Password reset token
 * @returns Promise<ApiResponse> - Response indicating success or failure of email sending
 */
export const sendPasswordReset = async (
  to: string,
  resetToken: string
): Promise<ApiResponse> => {
  // Generate email subject for password reset
  const subject = 'Password Reset - Ice Rink Management System';

  // Generate email content with reset token and instructions
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  const text = `You have requested a password reset. Please use the following link to reset your password: ${resetUrl}`;
  const html = `
    <h1>Password Reset</h1>
    <p>You have requested a password reset. Please click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
  `;

  // Call sendEmail function with generated content
  return sendEmail(to, subject, text, html);
};

/**
 * Sends a welcome email to newly registered users
 * @param to - Recipient email address
 * @param userName - Name of the user
 * @returns Promise<ApiResponse> - Response indicating success or failure of email sending
 */
export const sendWelcomeEmail = async (
  to: string,
  userName: string
): Promise<ApiResponse> => {
  // Generate welcome email subject
  const subject = 'Welcome to Ice Rink Management System';

  // Generate welcome email content with user's name
  const text = `Welcome ${userName}! Thank you for registering with Ice Rink Management System. We're excited to have you on board.`;
  const html = `
    <h1>Welcome to Ice Rink Management System</h1>
    <p>Hello ${userName},</p>
    <p>Thank you for registering with Ice Rink Management System. We're excited to have you on board.</p>
    <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
  `;

  // Call sendEmail function with generated content
  return sendEmail(to, subject, text, html);
};

// Human tasks (commented)
/*
TODO: Human tasks
1. Set up SendGrid API key in environment variables (Critical)
2. Design and implement email templates for various email types (Required)
3. Implement email tracking and analytics (Optional)
*/
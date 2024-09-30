import { SendGridClient } from '@sendgrid/client';
import { MailService } from '@sendgrid/mail';

// Define the SendGridConfig type
interface SendGridConfig {
  apiKey: string;
  defaultSender: string;
}

/**
 * Initializes the SendGrid client with the provided configuration
 * @param config SendGrid configuration object
 */
export function initializeSendGrid(config: SendGridConfig): void {
  SendGridClient.setApiKey(config.apiKey);
  MailService.setApiKey(config.apiKey);
  MailService.setGlobalSendAt(config.defaultSender);
}

/**
 * Sends an email using the SendGrid service
 * @param to Recipient email address
 * @param subject Email subject
 * @param content Email content
 * @param isHtml Whether the content is HTML
 * @returns A promise that resolves when the email is sent successfully
 */
export async function sendEmail(
  to: string,
  subject: string,
  content: string,
  isHtml: boolean
): Promise<void> {
  try {
    const message = {
      to,
      from: MailService.getGlobalSendAt(),
      subject,
      [isHtml ? 'html' : 'text']: content,
    };

    await MailService.send(message);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

/**
 * Sends a templated email using the SendGrid service
 * @param to Recipient email address
 * @param templateId SendGrid template ID
 * @param dynamicTemplateData Object containing dynamic data for the template
 * @returns A promise that resolves when the email is sent successfully
 */
export async function sendTemplateEmail(
  to: string,
  templateId: string,
  dynamicTemplateData: Record<string, any>
): Promise<void> {
  try {
    const message = {
      to,
      from: MailService.getGlobalSendAt(),
      templateId,
      dynamicTemplateData,
    };

    await MailService.send(message);
  } catch (error) {
    console.error('Error sending templated email:', error);
    throw new Error('Failed to send templated email');
  }
}

// TODO: Implement error handling and logging for failed email sends
// TODO: Set up SendGrid templates for common email notifications (booking confirmations, reminders, etc.)
// TODO: Implement rate limiting to prevent abuse of the email service
import AWS from 'aws-sdk';

// Define the AWS configuration interface
interface AWSConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

// Global variables for AWS configuration
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

/**
 * Configures the AWS SDK with the necessary credentials and region
 */
export const configureAWS = (): void => {
  const config: AWSConfig = {
    region: AWS_REGION!,
    accessKeyId: AWS_ACCESS_KEY_ID!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  };

  AWS.config.update(config);
};

/**
 * Creates and returns an S3 client instance
 * @returns {AWS.S3} An instance of AWS.S3
 */
export const getS3Client = (): AWS.S3 => {
  return new AWS.S3();
};

/**
 * Creates and returns a Lambda client instance
 * @returns {AWS.Lambda} An instance of AWS.Lambda
 */
export const getLambdaClient = (): AWS.Lambda => {
  return new AWS.Lambda();
};

/**
 * Creates and returns a CloudFront client instance
 * @returns {AWS.CloudFront} An instance of AWS.CloudFront
 */
export const getCloudFrontClient = (): AWS.CloudFront => {
  return new AWS.CloudFront();
};

// Commented list of human tasks
/**
 * Human Tasks:
 * 1. Ensure AWS credentials are securely stored and not hard-coded (Critical)
 * 2. Verify that the correct AWS services are being configured based on the project requirements (Required)
 * 3. Implement proper error handling for AWS service initialization (Required)
 */
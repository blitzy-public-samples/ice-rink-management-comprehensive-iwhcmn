import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Global constants
const ENCRYPTION_ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

/**
 * Encrypts a string using AES-256-CBC encryption
 * @param data - The string to be encrypted
 * @param encryptionKey - The key used for encryption
 * @returns Encrypted data as a base64 encoded string
 */
export function encrypt(data: string, encryptionKey: string): string {
  // Generate a random initialization vector (IV)
  const iv = crypto.randomBytes(IV_LENGTH);

  // Create a cipher using the encryption algorithm, key, and IV
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, Buffer.from(encryptionKey), iv);

  // Encrypt the data
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Combine the IV and encrypted data
  const result = Buffer.concat([iv, encrypted]);

  // Return the result as a base64 encoded string
  return result.toString('base64');
}

/**
 * Decrypts a string that was encrypted using the encrypt function
 * @param encryptedData - The encrypted data as a base64 encoded string
 * @param encryptionKey - The key used for decryption
 * @returns Decrypted data as a UTF-8 string
 */
export function decrypt(encryptedData: string, encryptionKey: string): string {
  // Decode the base64 encoded input
  const buffer = Buffer.from(encryptedData, 'base64');

  // Extract the IV from the first 16 bytes
  const iv = buffer.slice(0, IV_LENGTH);

  // Extract the encrypted data (everything after the IV)
  const encryptedText = buffer.slice(IV_LENGTH);

  // Create a decipher using the encryption algorithm, key, and IV
  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, Buffer.from(encryptionKey), iv);

  // Decrypt the data
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // Return the decrypted data as a UTF-8 string
  return decrypted.toString('utf8');
}

/**
 * Hashes a password using bcrypt
 * @param password - The password to be hashed
 * @returns A Promise that resolves to the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  // Generate a salt using bcrypt
  const salt = await bcrypt.genSalt();

  // Hash the password using the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  // Return the hashed password
  return hashedPassword;
}

/**
 * Compares a plain-text password with a hashed password
 * @param password - The plain-text password to compare
 * @param hashedPassword - The hashed password to compare against
 * @returns A Promise that resolves to true if the passwords match, false otherwise
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  // Use bcrypt to compare the plain-text password with the hashed password
  const isMatch = await bcrypt.compare(password, hashedPassword);

  // Return the result of the comparison
  return isMatch;
}

// Human tasks (commented)
/*
TODO: Ensure that the encryption key is securely stored and accessed (e.g., through environment variables)
TODO: Implement key rotation mechanism for enhanced security
TODO: Set up secure key management system for production environment
*/
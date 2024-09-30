import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User';
import { ApiResponse, ErrorResponse, UserRole } from '../types/index';
import { User } from '../../shared/types/user';

const JWT_SECRET = process.env.JWT_SECRET as string;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '1h';

/**
 * Generates a JWT token for a user
 * @param user User object
 * @returns JWT token
 */
const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

/**
 * Authenticates a user and generates a token
 * @param email User's email
 * @param password User's password
 * @returns Promise<ApiResponse> Response with token if successful
 */
const login = async (email: string, password: string): Promise<ApiResponse> => {
  try {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return { success: false, error: 'User not found' } as ErrorResponse;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, error: 'Invalid password' } as ErrorResponse;
    }

    const token = generateToken(user);
    return { success: true, data: { token, user } };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' } as ErrorResponse;
  }
};

/**
 * Registers a new user
 * @param userData User data
 * @param password User's password
 * @returns Promise<ApiResponse> Response with created user if successful
 */
const register = async (userData: User, password: string): Promise<ApiResponse> => {
  try {
    const existingUser = await UserModel.findByEmail(userData.email);
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' } as ErrorResponse;
    }

    const newUser = await UserModel.createUser({ ...userData, password });
    const token = generateToken(newUser);
    return { success: true, data: { token, user: newUser } };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'An error occurred during registration' } as ErrorResponse;
  }
};

/**
 * Changes the password for a user
 * @param userId User's ID
 * @param currentPassword Current password
 * @param newPassword New password
 * @returns Promise<ApiResponse> Response indicating success or failure
 */
const changePassword = async (userId: string, currentPassword: string, newPassword: string): Promise<ApiResponse> => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return { success: false, error: 'User not found' } as ErrorResponse;
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return { success: false, error: 'Current password is incorrect' } as ErrorResponse;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.updatePassword(userId, hashedPassword);

    return { success: true, message: 'Password changed successfully' };
  } catch (error) {
    console.error('Change password error:', error);
    return { success: false, error: 'An error occurred while changing the password' } as ErrorResponse;
  }
};

/**
 * Verifies a JWT token
 * @param token JWT token
 * @returns Promise<User | null> Decoded user data if token is valid, null otherwise
 */
const verifyToken = async (token: string): Promise<User | null> => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await UserModel.findById(decoded.id);
    return user;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

export const authService = {
  login,
  register,
  changePassword,
  verifyToken,
};

// Human tasks:
// TODO: Implement password reset functionality
// TODO: Add email verification process for new user registrations
// TODO: Implement refresh token mechanism
// TODO: Set up rate limiting for login attempts
// TODO: Implement multi-factor authentication (optional)
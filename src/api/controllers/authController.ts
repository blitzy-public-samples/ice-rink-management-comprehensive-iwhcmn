import { Request, Response } from 'express';
import { login, register, changePassword, verifyToken } from '../services/authService';
import { ApiResponse, ErrorResponse } from '../types/index';
import { User } from '../../shared/types/user';

/**
 * Handles user login requests
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    
    if (result.success) {
      const response: ApiResponse = {
        success: true,
        data: { token: result.token },
        message: 'Login successful'
      };
      res.status(200).json(response);
    } else {
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Invalid credentials'
      };
      res.status(401).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'An error occurred during login'
    };
    res.status(500).json(errorResponse);
  }
};

/**
 * Handles user registration requests
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: Partial<User> = req.body;
    const result = await register(userData);
    
    if (result.success) {
      const response: ApiResponse = {
        success: true,
        data: { user: result.user, token: result.token },
        message: 'Registration successful'
      };
      res.status(201).json(response);
    } else {
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Registration failed'
      };
      res.status(400).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'An error occurred during registration'
    };
    res.status(500).json(errorResponse);
  }
};

/**
 * Handles password change requests
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const changePasswordController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    const result = await changePassword(userId, currentPassword, newPassword);
    
    if (result.success) {
      const response: ApiResponse = {
        success: true,
        message: 'Password changed successfully'
      };
      res.status(200).json(response);
    } else {
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Password change failed'
      };
      res.status(400).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'An error occurred during password change'
    };
    res.status(500).json(errorResponse);
  }
};

/**
 * Handles token verification requests
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const verifyTokenController = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.query.token as string;
    const result = await verifyToken(token);
    
    if (result.success) {
      const response: ApiResponse = {
        success: true,
        data: { user: result.user },
        message: 'Token verified successfully'
      };
      res.status(200).json(response);
    } else {
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Invalid token'
      };
      res.status(401).json(errorResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: 'An error occurred during token verification'
    };
    res.status(500).json(errorResponse);
  }
};

// TODO: Implement the following functions
// - Password reset controller function
// - Email verification controller function
// - Refresh token controller function

/**
 * List of pending human tasks:
 * 1. Implement password reset controller function (Required)
 * 2. Add email verification controller function (Required)
 * 3. Implement refresh token controller function (Required)
 * 4. Add input validation middleware to all controller functions (Required)
 * 5. Implement logging for all authentication attempts (Required)
 */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || config.get<string>('jwtSecret');

/**
 * Middleware to authenticate incoming requests using JWT
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns Promise<void>
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract JWT token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('No token, authorization denied');
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Fetch the user from the database using the decoded user ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Attach the user object to the request
    (req as any).user = user;

    // Call next() to pass control to the next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

/**
 * Middleware to authorize user access based on roles
 * @param allowedRoles - Array of allowed roles
 * @returns Express middleware function
 */
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (allowedRoles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'User not authorized' });
    }
  };
};

// TODO: Implement proper error handling for token verification failures
// TODO: Add rate limiting to prevent brute force attacks
// TODO: Implement token refresh mechanism (Optional)
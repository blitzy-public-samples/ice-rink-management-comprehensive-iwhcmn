import { Router } from 'express';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  listUsers,
  changeUserRole
} from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';
import { validateUserInput } from '../middleware/validation';
import { UserRole } from '../types/index';

const router = Router();

/**
 * @route POST /api/users
 * @desc Create a new user
 * @access Public
 */
router.post('/', validateUserInput, createUser);

/**
 * @route GET /api/users
 * @desc Get all users
 * @access Private (Admin and Rink Manager only)
 */
router.get('/', authenticate, authorize([UserRole.ADMIN, UserRole.RINK_MANAGER]), listUsers);

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Private
 */
router.get('/:id', authenticate, getUser);

/**
 * @route PUT /api/users/:id
 * @desc Update user
 * @access Private
 */
router.put('/:id', authenticate, validateUserInput, updateUser);

/**
 * @route DELETE /api/users/:id
 * @desc Delete user
 * @access Private (Admin only)
 */
router.delete('/:id', authenticate, authorize([UserRole.ADMIN]), deleteUser);

/**
 * @route PATCH /api/users/:id/role
 * @desc Change user role
 * @access Private (Admin only)
 */
router.patch('/:id/role', authenticate, authorize([UserRole.ADMIN]), changeUserRole);

export default router;

/**
 * TODO: Implement the following tasks:
 * 1. Implement rate limiting middleware for user routes (Required)
 * 2. Add input sanitization to prevent XSS attacks (Critical)
 * 3. Implement request logging middleware (Required)
 * 4. Set up proper error handling middleware (Required)
 */
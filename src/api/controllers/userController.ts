import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { ApiResponse, PaginatedResponse, ErrorResponse, UserRole } from '../types/index';
import { User } from '../../shared/types/user';
import { asyncHandler } from '../middleware/asyncHandler';

/**
 * Controller handling user-related operations for the Ice Rink Management and Booking System
 */

/**
 * Creates a new user
 * @route POST /api/users
 * @access Public
 */
export const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Validate user input
    // TODO: Implement input validation middleware

    const { email, password, firstName, lastName, dateOfBirth, role } = req.body;

    // Check if user with email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'User with this email already exists'
        };
        res.status(400).json(errorResponse);
        return;
    }

    // Create new user using UserModel.createUser
    const newUser = await UserModel.createUser({
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        role: role || UserRole.CUSTOMER // Default to CUSTOMER if role is not provided
    });

    // Send success response with created user data
    const response: ApiResponse<User> = {
        success: true,
        data: newUser
    };
    res.status(201).json(response);
});

/**
 * Retrieves a user by ID
 * @route GET /api/users/:id
 * @access Private
 */
export const getUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Extract user ID from request parameters
    const userId = req.params.id;

    // Fetch user from database
    const user = await UserModel.findById(userId);

    // If user not found, send 404 error
    if (!user) {
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'User not found'
        };
        res.status(404).json(errorResponse);
        return;
    }

    // Send success response with user data
    const response: ApiResponse<User> = {
        success: true,
        data: user
    };
    res.status(200).json(response);
});

/**
 * Updates an existing user
 * @route PUT /api/users/:id
 * @access Private
 */
export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Extract user ID from request parameters
    const userId = req.params.id;

    // Validate update data
    // TODO: Implement input validation middleware

    // Update user using UserModel.updateUser
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true
    });

    // If user not found, send 404 error
    if (!updatedUser) {
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'User not found'
        };
        res.status(404).json(errorResponse);
        return;
    }

    // Send success response with updated user data
    const response: ApiResponse<User> = {
        success: true,
        data: updatedUser
    };
    res.status(200).json(response);
});

/**
 * Deletes a user
 * @route DELETE /api/users/:id
 * @access Private
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Extract user ID from request parameters
    const userId = req.params.id;

    // Delete user using UserModel.deleteUser
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    // If user not found, send 404 error
    if (!deletedUser) {
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'User not found'
        };
        res.status(404).json(errorResponse);
        return;
    }

    // Send success response
    const response: ApiResponse<null> = {
        success: true,
        data: null,
        message: 'User deleted successfully'
    };
    res.status(200).json(response);
});

/**
 * Retrieves a paginated list of users
 * @route GET /api/users
 * @access Private
 */
export const listUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Extract pagination parameters from query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;

    // Fetch paginated users from database
    const total = await UserModel.countDocuments();
    const users = await UserModel.find().skip(startIndex).limit(limit);

    // Send success response with paginated user data
    const response: PaginatedResponse<User> = {
        success: true,
        count: users.length,
        pagination: {
            page,
            limit,
            total
        },
        data: users
    };
    res.status(200).json(response);
});

/**
 * Changes the role of a user
 * @route PATCH /api/users/:id/role
 * @access Private (Admin only)
 */
export const changeUserRole = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Extract user ID and new role from request body
    const userId = req.params.id;
    const { role } = req.body;

    // Validate new role
    if (!Object.values(UserRole).includes(role)) {
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'Invalid user role'
        };
        res.status(400).json(errorResponse);
        return;
    }

    // Update user role using UserModel.updateUser
    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { role },
        { new: true, runValidators: true }
    );

    // If user not found, send 404 error
    if (!updatedUser) {
        const errorResponse: ErrorResponse = {
            success: false,
            error: 'User not found'
        };
        res.status(404).json(errorResponse);
        return;
    }

    // Send success response with updated user data
    const response: ApiResponse<User> = {
        success: true,
        data: updatedUser
    };
    res.status(200).json(response);
});

// TODO: Implement input validation middleware for user operations
// TODO: Add authorization checks to ensure only appropriate roles can perform certain actions
// TODO: Implement password change functionality
// TODO: Add logging for user operations
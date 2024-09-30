import { Router } from 'express';
import {
  createRink,
  getRinks,
  getRinkById,
  updateRink,
  deleteRink,
  getRinkSchedule,
  getRinkEquipment
} from '../controllers/rinkController';
import { authenticate, authorize } from '../middleware/auth';
import { validateRinkInput } from '../middleware/validation';

const router = Router();

/**
 * @route POST /api/rinks
 * @desc Create a new rink
 * @access Private (Admin only)
 */
router.post(
  '/',
  authenticate,
  authorize(['admin']),
  validateRinkInput,
  createRink
);

/**
 * @route GET /api/rinks
 * @desc Get all rinks
 * @access Private
 */
router.get('/', authenticate, getRinks);

/**
 * @route GET /api/rinks/:id
 * @desc Get a specific rink by ID
 * @access Private
 */
router.get('/:id', authenticate, getRinkById);

/**
 * @route PUT /api/rinks/:id
 * @desc Update a rink
 * @access Private (Admin only)
 */
router.put(
  '/:id',
  authenticate,
  authorize(['admin']),
  validateRinkInput,
  updateRink
);

/**
 * @route DELETE /api/rinks/:id
 * @desc Delete a rink
 * @access Private (Admin only)
 */
router.delete('/:id', authenticate, authorize(['admin']), deleteRink);

/**
 * @route GET /api/rinks/:id/schedule
 * @desc Get the schedule for a specific rink
 * @access Private
 */
router.get('/:id/schedule', authenticate, getRinkSchedule);

/**
 * @route GET /api/rinks/:id/equipment
 * @desc Get the equipment for a specific rink
 * @access Private
 */
router.get('/:id/equipment', authenticate, getRinkEquipment);

// TODO: Implement rate limiting for API endpoints
// TODO: Add proper error handling for route middleware
// TODO: Consider implementing API versioning
// TODO: Add more detailed documentation comments for each route

export default router;
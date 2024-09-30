import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import bookingRoutes from './bookings';
import rinkRoutes from './rinks';
import equipmentRoutes from './equipment';

/**
 * Creates and configures the main router for the API by combining all route modules
 * @returns {Router} An Express router instance with all routes configured
 */
const createRouter = (): Router => {
  const router = Router();

  // Configure routes with their respective prefixes
  router.use('/auth', authRoutes);
  router.use('/users', userRoutes);
  router.use('/bookings', bookingRoutes);
  router.use('/rinks', rinkRoutes);
  router.use('/equipment', equipmentRoutes);

  return router;
};

export default createRouter;
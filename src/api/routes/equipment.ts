import { Router } from 'express';
import {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipmentByRink
} from '../controllers/equipmentController';
import { authenticate, authorize } from '../middleware/auth';
import { validateEquipmentInput } from '../middleware/validation';

const createEquipmentRouter = (): Router => {
  const router = Router();

  // GET /api/equipment
  router.get('/', authenticate, getAllEquipment);

  // GET /api/equipment/:id
  router.get('/:id', authenticate, getEquipmentById);

  // POST /api/equipment
  router.post(
    '/',
    authenticate,
    authorize(['admin', 'manager']),
    validateEquipmentInput,
    createEquipment
  );

  // PUT /api/equipment/:id
  router.put(
    '/:id',
    authenticate,
    authorize(['admin', 'manager']),
    validateEquipmentInput,
    updateEquipment
  );

  // DELETE /api/equipment/:id
  router.delete(
    '/:id',
    authenticate,
    authorize(['admin', 'manager']),
    deleteEquipment
  );

  // GET /api/equipment/rink/:rinkId
  router.get('/rink/:rinkId', authenticate, getEquipmentByRink);

  return router;
};

export default createEquipmentRouter;

// TODO: Implement rate limiting for API endpoints to prevent abuse
// TODO: Add comprehensive error handling for edge cases
// TODO: Implement request logging for auditing purposes
// TODO: Consider adding caching mechanisms for frequently accessed equipment data
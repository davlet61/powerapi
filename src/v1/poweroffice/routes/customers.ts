import { Router } from 'express';
import { checkIfHeaderExists } from 'src/middleware/errorHandlers';
import {
  createNew,
  customersController,
  deleteById,
  getById,
} from '../controllers/customers';

const router: Router = Router({ mergeParams: true });

router.get('/', checkIfHeaderExists, customersController);
router.get('/:id', checkIfHeaderExists, getById);
router.post('/', checkIfHeaderExists, createNew);
router.delete('/:id', checkIfHeaderExists, deleteById);

export { router as poCustomers };

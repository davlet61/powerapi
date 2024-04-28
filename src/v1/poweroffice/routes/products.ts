import { Router } from 'express';
import {
  createNew,
  deleteById,
  getGroupById,
  getProductGroups,
  productsController,
} from '../controllers/products';
import { checkIfHeaderExists } from '../../../middleware/errorHandlers';

const router: Router = Router();

router.get('/', checkIfHeaderExists, productsController);
router.post('/', checkIfHeaderExists, createNew);
router.delete('/:id', checkIfHeaderExists, deleteById);
router.get('/groups/:id', checkIfHeaderExists, getGroupById);
router.get('/groups', checkIfHeaderExists, getProductGroups);

export { router as poProducts };

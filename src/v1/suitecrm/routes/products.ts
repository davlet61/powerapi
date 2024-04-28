import { Router } from 'express';
import {
  createProductCategory,
  createSuiteProduct,
} from '../controllers/suiteProducts';
import { checkIfHeaderExists } from '../../../middleware/errorHandlers';

const router: Router = Router();

router.post('/categories', checkIfHeaderExists, createProductCategory);
router.get('/categories', checkIfHeaderExists, createProductCategory);
router.post('/', checkIfHeaderExists, createSuiteProduct);

export { router as crmProducts };

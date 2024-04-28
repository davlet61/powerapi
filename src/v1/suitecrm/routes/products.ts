import { Router } from 'express';
import { checkIfHeaderExists } from 'src/middleware/errorHandlers';
import {
  createProductCategory,
  createSuiteProduct,
} from '../controllers/suiteProducts';

const router: Router = Router();

router.post('/categories', checkIfHeaderExists, createProductCategory);
router.get('/categories', checkIfHeaderExists, createProductCategory);
router.post('/', checkIfHeaderExists, createSuiteProduct);

export { router as crmProducts };

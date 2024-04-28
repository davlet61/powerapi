import { Router } from 'express';
import { syncProductGroups, syncProducts } from '../controllers/products';
import { checkIfHeaderExists } from '../../../middleware/errorHandlers';

const router: Router = Router();

router.post('/products', checkIfHeaderExists, syncProducts);
router.post('/groups', checkIfHeaderExists, syncProductGroups);

export { router as sync };

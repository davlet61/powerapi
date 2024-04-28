import { Router } from 'express';
import { checkIfHeaderExists } from 'src/middleware/errorHandlers';
import { syncProductGroups, syncProducts } from '../controllers/products';

const router: Router = Router();

router.post('/products', checkIfHeaderExists, syncProducts);
router.post('/groups', checkIfHeaderExists, syncProductGroups);

export { router as sync };

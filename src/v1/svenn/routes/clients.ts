import { Router } from 'express';
import { createNew } from '../controllers/clients';
import { checkIfHeaderExists } from '../../../middleware/errorHandlers';

const clients: Router = Router();

clients.post('/', checkIfHeaderExists, createNew);

export { clients };

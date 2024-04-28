import { Router } from 'express';
import { checkIfHeaderExists } from 'src/middleware/errorHandlers';
import { createNew } from '../controllers/clients';

const clients: Router = Router();

clients.post('/', checkIfHeaderExists, createNew);

export { clients };

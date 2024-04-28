import { Router } from 'express';
import { createNew } from '../controllers/resourcePlanner';
import { checkIfHeaderExists } from '../../../middleware/errorHandlers';

const tasks: Router = Router();

tasks.post('/', checkIfHeaderExists, createNew);

export { tasks };

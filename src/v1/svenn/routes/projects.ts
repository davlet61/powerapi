import { Router } from 'express';
import { createNew } from '../controllers/projects';
import { checkIfHeaderExists } from '../../../middleware/errorHandlers';

const projects: Router = Router();

projects.post('/', checkIfHeaderExists, createNew);

export { projects };

import express, { Application } from 'express';
import cors from 'cors';
import poRoutes from './routes/poRoutes';
import {
  errorHandler,
  globalErrorHandler,
} from './v1/controllers/errorHandlers';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) =>
  res.json({ message: 'Welcome to Aploskod integration API!' })
);
app.use('/oauth', poRoutes);

app.use(errorHandler);
app.use(globalErrorHandler);

export default app;

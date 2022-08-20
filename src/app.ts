import express, { Application } from 'express';
import cors from 'cors';
import oAuthRoute from 'src/v1/routes/oAuthRoute';
import customerRoute from 'src/v1/routes/customerRoute';
import { errorHandler, globalErrorHandler } from 'src/v1/controllers/errorHandlers';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/v1', (_req, res) => {
  console.log(`[${new Date()}]: The endpoint was hit`);
  res.json({ message: 'Welcome to Aploskod integration API!' });
});

app.use('/v1', oAuthRoute);
app.use('/v1', customerRoute);
app.use(errorHandler);
app.use(globalErrorHandler);

export default app;
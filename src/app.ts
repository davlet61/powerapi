import express, { Application } from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';
// import webhookRoutes from '$v1/webhooks/routes';
import { poOauth } from './v1/poweroffice/routes/oauth';
import { poCustomers } from './v1/poweroffice/routes/customers';
import { poInvoices } from './v1/poweroffice/routes/invoices';
import { poProducts } from './v1/poweroffice/routes/products';
import { crmProducts } from './v1/suitecrm/routes/products';
import { errorHandler, globalErrorHandler } from './middleware/errorHandlers';
import { docs } from './v1/docs/router';
import { sync } from './v1/sync/routes';
import { moduleFromLatepoint } from './v1/webhooks/controllers/latepoint';

const app: Application = express();

console.log(process.env);
Sentry.init({
  dsn: 'https://19bd89163958457e9c1aedf8edfa69e4@o4504951835983872.ingest.sentry.io/4505062670729216',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/debug-sentry', () => {
  throw new Error('My first Sentry error!');
});

app.get('/v1', (req, res) => {
  console.log(
    `\x1b[33m[${new Date().toUTCString()}] \x1b[0m=>\x1b[32m The endpoint was hit!\x1b[0m`,
  );
  res.json({ message: 'Welcome to Aploskod integration API!' });
});

app.use('/v1/poweroffice/oauth', poOauth);
app.use('/v1/poweroffice/customers', poCustomers);
app.use('/v1/poweroffice/invoices', poInvoices);
app.use('/v1/poweroffice/products', poProducts);
app.use('/v1/suitecrm/products', crmProducts);
app.use('/v1/hooks/latepoint', moduleFromLatepoint);
app.use('/v1/sync', sync);
app.use('/v1/docs', docs);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);
app.use(globalErrorHandler);

export default app;

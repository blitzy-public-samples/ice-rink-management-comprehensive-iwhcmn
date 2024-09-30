import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { middlewareConfig } from './config/middleware';
import { createRouter } from './routes';

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const createServer = (): Express => {
  const app: Express = express();

  // Apply middleware
  middlewareConfig(app);

  // Set up API routes
  const router = createRouter();
  app.use('/api', router);

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  return app;
};

const startServer = (app: Express): void => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const app = createServer();

if (process.env.NODE_ENV !== 'test') {
  startServer(app);
}

export { app };

// Human tasks:
// TODO: Review and set appropriate PORT value in environment variables
// TODO: Implement proper error logging and monitoring solution
// TODO: Set up SSL/TLS for HTTPS in production environment
// TODO: Implement rate limiting to prevent abuse
// TODO: Set up health check endpoint for monitoring
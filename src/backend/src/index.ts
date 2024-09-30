import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { getConfig } from './config';
import { logger } from './utils/logger';
import { errorHandler } from './utils/errorHandler';
import { db } from './db';
import { initializeServices } from './services';
import { initializeJobs } from './jobs';
import { initializeIntegrations } from './integrations';

const app: Express = express();
const config = getConfig();

function setupMiddleware(): void {
  // Use cors middleware
  app.use(cors());
  
  // Use helmet for security headers
  app.use(helmet());
  
  // Use compression middleware
  app.use(compression());
  
  // Use express.json() for parsing JSON bodies
  app.use(express.json());
  
  // Use express.urlencoded() for parsing URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));
}

function setupRoutes(): void {
  // TODO: Import route modules
  // TODO: Use route modules with app.use()
}

function startServer(): void {
  const port = config.port || 3000;
  app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  });
}

async function main(): Promise<void> {
  try {
    setupMiddleware();
    
    await db.connect();
    logger.info('Connected to database');
    
    await initializeServices();
    logger.info('Services initialized');
    
    await initializeJobs();
    logger.info('Jobs initialized');
    
    await initializeIntegrations();
    logger.info('Integrations initialized');
    
    setupRoutes();
    
    // Set up global error handler
    app.use(errorHandler);
    
    startServer();
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}

main();

// Implement proper error handling and graceful shutdown
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received.');
  // Implement graceful shutdown logic here
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  // Implement graceful shutdown logic here
  process.exit(0);
});

// TODO: Implement health check endpoint

// TODO: Set up API documentation (e.g., Swagger)

/**
 * Human tasks:
 * 1. Implement proper error handling and graceful shutdown (Required)
 * 2. Set up logging for application events and errors (Required)
 * 3. Configure environment-specific settings (development, staging, production) (Required)
 * 4. Implement health check endpoint (Required)
 * 5. Set up API documentation (e.g., Swagger) (Optional)
 */
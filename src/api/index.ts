import app from './server';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    logger.info('Starting the Ice Rink Management and Booking System API...');

    app.listen(PORT, () => {
      logger.info(`API is running on port ${PORT}`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      app.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT signal received: closing HTTP server');
      app.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();

// Human tasks (commented as requested):
/*
TODO: Implement proper error handling and logging for the main process
TODO: Set up process management tool (e.g., PM2) for production deployment
TODO: Implement graceful shutdown handling
TODO: Set up application monitoring and alerting
*/
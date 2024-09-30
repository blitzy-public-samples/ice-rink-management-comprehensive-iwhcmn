import winston from 'winston';

const ENVIRONMENT = process.env.NODE_ENV || 'development';

const createLogger = (): winston.Logger => {
  // Define log format
  const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  );

  // Create and configure logger based on environment
  const logger = winston.createLogger({
    level: ENVIRONMENT === 'production' ? 'info' : 'debug',
    format: logFormat,
    defaultMeta: { service: 'ice-rink-api' },
    transports: [
      // Write all logs with level `error` and below to `error.log`
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      // Write all logs with level `info` and below to `combined.log`
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });

  // If we're not in production, log to the console with a simpler format
  if (ENVIRONMENT !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }));
  }

  return logger;
};

const logger = createLogger();

export default logger;

// Human tasks:
// TODO: Implement error tracking integration (e.g., Sentry)
// TODO: Set up log rotation for production environment
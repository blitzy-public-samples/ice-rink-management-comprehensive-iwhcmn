import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';

// Define types for environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CORS_ORIGIN: string;
      MORGAN_FORMAT: string;
    }
  }
}

// Constants
const CORS_ORIGIN: string | string[] = process.env.CORS_ORIGIN ? JSON.parse(process.env.CORS_ORIGIN) : '*';
const MORGAN_FORMAT: string = process.env.MORGAN_FORMAT || 'combined';

/**
 * Configures CORS settings
 * @returns CORS configuration object
 */
const configureCors = (): cors.CorsOptions => {
  return {
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 hours
  };
};

/**
 * Configures Helmet security settings
 * @returns Helmet configuration object
 */
const configureHelmet = (): helmet.HelmetOptions => {
  return {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin',
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  };
};

/**
 * Configures Morgan logging settings
 * @returns Morgan configuration object
 */
const configureMorgan = (): morgan.Options<express.Request, express.Response> => {
  return {
    stream: {
      write: (message: string) => {
        console.log(message.trim());
      },
    },
  };
};

/**
 * Configures body-parser settings
 * @returns body-parser configuration object
 */
const configureBodyParser = (): { json: express.JsonOptions; urlencoded: express.UrlEncodedOptions } => {
  return {
    json: {
      limit: '10mb',
    },
    urlencoded: {
      extended: true,
      limit: '10mb',
    },
  };
};

/**
 * Middleware configuration object for the API
 */
export const middlewareConfig = {
  cors: configureCors(),
  helmet: configureHelmet(),
  morgan: configureMorgan(),
  bodyParser: configureBodyParser(),
};

// Human tasks (commented)
/*
TODO: Human tasks
1. Review and set appropriate CORS_ORIGIN value in environment variables
2. Review and adjust security settings in configureHelmet function if necessary
3. Determine if additional middleware configurations are needed for the project
*/
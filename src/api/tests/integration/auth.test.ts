import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/users';
import { bookingRoutes } from './routes/bookings';
import { rinkRoutes } from './routes/rinks';
import { equipmentRoutes } from './routes/equipment';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rinks', rinkRoutes);
app.use('/api/equipment', equipmentRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = config.port || 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

export { app, startServer };

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}

// Human tasks:
// TODO: Implement rate limiting for API endpoints
// TODO: Add logging service integration
// TODO: Implement API versioning
// TODO: Set up health check endpoint
// TODO: Configure HTTPS/SSL
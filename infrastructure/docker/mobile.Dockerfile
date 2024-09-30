# Stage 1: Builder
FROM node:14-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY src/mobile/package.json src/mobile/package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY src/mobile ./

# Run build command for React Native
RUN npm run build

# Stage 2: Production
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app ./

# Install production dependencies
RUN npm ci --only=production

# Expose necessary port
EXPOSE 8081

# Set up environment variables
ENV NODE_ENV=production
ENV API_URL=${API_URL}

# Define the command to start the application
CMD ["npm", "start"]

# Create a volume for node_modules
VOLUME ["/app/node_modules"]

# Add labels for better maintainability
LABEL maintainer="Ice Rink Management Team"
LABEL version="1.0"
LABEL description="Dockerfile for Ice Rink Management and Booking System mobile application"

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Commented list of human tasks
# TODO: Ensure the correct Node.js version is used in the base image (Critical)
# TODO: Verify that all necessary environment variables are properly set (Required)
# TODO: Optimize the Dockerfile for faster builds and smaller image size (Optional)
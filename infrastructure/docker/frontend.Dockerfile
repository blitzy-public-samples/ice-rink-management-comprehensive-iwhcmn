# Build stage
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY src/frontend/package.json src/frontend/package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY src/frontend ./

# Build the Next.js application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Production stage
FROM node:22-alpine AS production

# Set working directory
WORKDIR /app

# Copy built application from build stage
COPY --from=build /app ./

# Install only production dependencies
RUN npm ci --only=production

# Expose port 3000
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Set the command to start the Next.js application
CMD ["npm", "start"]

# Human tasks (commented):
# TODO: Verify Node.js version compatibility with the application
# TODO: Ensure all necessary environment variables are properly set for production
# TODO: Optimize Docker image size if needed
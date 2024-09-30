FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ../../src/api/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY ../../src/api .

# Build TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Define health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD node healthcheck.js

# Set start command
CMD ["node", "dist/index.js"]

# Human tasks (commented):
# TODO: Review and adjust Node.js version if needed (Optional)
# TODO: Implement healthcheck.js script for Docker health check (Required)
# TODO: Consider adding additional security measures (e.g., running as non-root user) (Optional)
# Use Node.js 14 Alpine as the base image
FROM node:14-alpine

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set the command to run the application
CMD ["node", "dist/index.js"]

# Human tasks:
# TODO: Verify if Node.js version 14 is still appropriate or if it should be updated
# TODO: Consider adding health check instructions
# TODO: Evaluate if any environment-specific build arguments are needed
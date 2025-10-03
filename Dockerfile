# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs && \
    adduser -S dreambot -u 1001

# Change ownership of the app directory to the nodejs user
RUN chown -R dreambot:nodejs /app
USER dreambot

# Expose the port that the app runs on (from the webAdmin config)
EXPOSE 8081

# Define environment variable
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8081', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["npm", "start"]

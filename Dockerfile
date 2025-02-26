# Use a Node.js base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and lock files first (for efficient layer caching)
COPY package.json pnpm-lock.yaml* ./

# Install project dependencies
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Build the project
RUN pnpm build

# Install serve globally
RUN npm install -g serve

# Expose port 3000 for the container
EXPOSE 3000

# Command to serve the built app
CMD ["serve", "-s", "dist", "-l", "3000"]

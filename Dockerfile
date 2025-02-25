# Use a Node.js base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and install serve globally
COPY package.json .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

# Expose port 3000 for the container
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", ".", "-l", "3000"]

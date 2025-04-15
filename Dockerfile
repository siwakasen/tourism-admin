# Use a Node.js base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install global dependencies
COPY . .
COPY .env.example .env
RUN npm install -g pnpm
RUN npm install -g serve
RUN pnpm install

# Expose port 3000 for the container
EXPOSE 3000

# Note: Environment variables will be passed at runtime, not set here

# Command to serve the app
CMD ["sh", "-c", "printenv | grep ^VITE_ > .env && pnpm run build && serve -s dist -l 3000"]

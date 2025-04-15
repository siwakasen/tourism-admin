# Use a Node.js base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install global dependencies
COPY . .
RUN npm install -g pnpm
RUN npm install -g serve
RUN pnpm install

# Build the application
RUN pnpm run build

# Cleanup unnecessary files
RUN rm -rf src public .env.example .gitignore Dockerfile eslist.config.js index.html package.json pnpm-lock.yaml postcss.config.js README.md tailwind.config.js tsconfig.json vite.config.ts tsconfig.app.json tsconfig.node.json

# Expose port 3000 for the container
EXPOSE 3000

# Note: Environment variables will be passed at runtime, not set here

# Command to serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]

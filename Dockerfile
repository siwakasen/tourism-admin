# Use a Node.js base image
FROM node:alpine

# Set working directory
WORKDIR /tmp

# Copy package.json and install serve globally
COPY . .
RUN npm install -g pnpm
RUN npm install -g serve
RUN pnpm install
RUN pnpm run build

WORKDIR /app
RUN COPY /tmp/dist .
RUN rm -rf /tmp

# Expose port 3000 for the container
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "./dist/", "-l", "3000"]

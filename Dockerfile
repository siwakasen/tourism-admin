# Use a Node.js base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and install serve globally
COPY package.json .
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY tsconfig.node.json .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build
# delete all except dist
# Expose port 3000 for the container
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "./dist/", "-l", "3000"]

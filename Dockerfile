# Use a Node.js base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install global dependencies
COPY /dist .

# Expose port 3000 for the container
EXPOSE 3000

# Command to serve the app
CMD ["sh", "-c", "printenv | grep ^VITE_ > .env && \
serve -s dist -l 3000"]

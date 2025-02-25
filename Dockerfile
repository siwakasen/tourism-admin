# Use a Node.js base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and install serve globally
RUN npm install -g serve

RUN npm run build

# Copy the build files to the working directory
COPY ./dist /app

# Expose port 3000 for the container
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", ".", "-l", "3000"]

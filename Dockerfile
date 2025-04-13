# Use a Node.js base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install serve globally
COPY . .
RUN npm install -g pnpm
RUN npm install -g serve
RUN pnpm install

# ARG REACT_APP_REST_HOST
# ARG REACT_APP_REST_AUTH
# ARG REACT_APP_REST_TESTI
# ARG REACT_APP_REST_DRIVERS

RUN pnpm run build
# delete all except dist
RUN rm -rf src public .env.example .gitignore Dockerfile eslist.config.js index.html package.json pnpm-lock.yaml postcss.config.js README.md tailwind.config.js tsconfig.json vite.config.ts tsconfig.app.json tsconfig.node.json

# Expose port 3000 for the container
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]

#
# test deploy message
#

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

CMD ["sh", "-c", "\
    pnpm run build && \
    # delete all known files/folders except .env and dist/ \
    rm -rf .dockerignore .env.example .gitignore Dockerfile README.md eslint.config.js index.html node_modules package.json pnpm-lock.yaml postcss.config.js public src tailwind.config.js tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts && \
    # safety‐net: remove anything in /app except .env and dist/ \
    find . -maxdepth 1 ! -name dist ! -name .env -type d -exec rm -rf {} + && \
    find . -maxdepth 1 ! -name dist ! -name .env -type f -exec rm -f {} + && \
    pnpm store prune && \
    serve -s dist -l 3000\
"]

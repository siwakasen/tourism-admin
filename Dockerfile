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
# At container start:
# 1) generate .env from VITE_ vars
# 2) build
# 3) cleanup everything except .env & dist
# 4) serve
CMD ["sh", "-c", "\
    printenv | grep ^VITE_ > .env && \
    pnpm run build && \
    rm -rf .dockerignore .env.example .gitignore Dockerfile README.md eslint.config.js index.html node_modules pnpm-lock.yaml postcss.config.js public src tailwind.config.js tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts package.json && \
    find . -maxdepth 1 ! -name dist ! -name .env -type d -exec rm -rf {} + && \
    find . -maxdepth 1 ! -name dist ! -name .env -type f -exec rm -f {} + && \
    serve -s dist -l 3000\
"]

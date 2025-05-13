FROM node:23-alpine
WORKDIR /app

# Copy your built assets
COPY dist/ ./dist

# (Optional) Install the `serve` package globally
RUN npm install -g serve

EXPOSE 3000

# Exec form: each argument is its own array element
CMD ["serve", "-s", "dist", "-l", "3000"]

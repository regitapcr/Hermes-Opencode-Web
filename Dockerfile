# syntax=docker/dockerfile:1

# Build stage: Node-based build (only needed if you extended this to pre-render).
# For this static site we use the final stage as the runtime.

# Stage 1: Build (optional extension for SCSS/JS minification)
# FROM node:20-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npx @angular/cli build --configuration production 2>/dev/null || true

# Stage 2: Runtime (Nginx Alpine)
FROM nginx:alpine

# Copy the built/static assets (adjust path to your build output)
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./login.html /usr/share/nginx/html/login.html
COPY ./css /usr/share/nginx/html/css
COPY ./js  /usr/share/nginx/html/js

# Nginx runs as non-root user `nginx`; do not switch to root
# but keep the default config in place.
RUN mkdir -p /tmp/nginx && chown -R nginx:nginx /var/cache/nginx /var/log/nginx /usr/share/nginx/html

# Expose port 80 (used by docker-compose as `8080:80`)
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

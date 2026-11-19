# JavaVerse 3D Production Dockerfile
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (or run zero-dep standalone)
RUN npm ci --omit=dev || npm install --omit=dev

# Copy application files
COPY . .

# Environment
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Non-root user for security
USER node

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "server.js"]

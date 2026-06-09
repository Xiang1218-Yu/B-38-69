# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage cache
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the development port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev", "--", "--host"]

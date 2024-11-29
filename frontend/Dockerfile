# Frontend Dockerfile (frontend/Dockerfile)
# Use Node.js as base image for React development
FROM node:16

# Set working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/

RUN npm install

# Copy all files into the working directory
COPY . /app/

# Expose port where frontend will run (typically React runs on port 3000)
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]

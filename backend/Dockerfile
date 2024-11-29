# Backend Dockerfile (backend/Dockerfile)
# Use Node.js as base image
FROM node:16

# Set working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/

RUN npm install

# Copy all files into the working directory
COPY . /app/

# Expose the port the app runs on
EXPOSE 3001

# Start the backend server
CMD ["npm", "start"]

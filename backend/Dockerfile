# Use an official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . ./

# Expose the backend server port
EXPOSE 3002

# Start the backend server
CMD ["node", "server.js"]

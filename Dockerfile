# Use a base image with Node.js pre-installed
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app
COPY tsconfig.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3001 to the outside world
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]

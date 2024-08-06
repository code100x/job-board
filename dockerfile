# Use Node.js 20 as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma/

# Copy the rest of the application code
COPY . .

# Generate Prisma client - as prisma is dev dependency here
RUN npx prisma generate

# the port the app runs on 
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "dev"]
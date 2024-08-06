# Use an official Node runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Add Prisma CLI and ts-node to the PATH
ENV PATH /app/node_modules/.bin:$PATH

# Expose the port the app runs on
EXPOSE 3000

# The command will be overridden by docker-compose
CMD ["npm", "run", "start"]
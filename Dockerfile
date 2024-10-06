# Base stage
FROM node:20-alpine AS base
WORKDIR /usr/src/app

# Copy the .env file
COPY .env .env

# Copy the necessary files
COPY package*.json ./
COPY ./prisma ./prisma

# Install dependencies
RUN npm install

# Use the .env file for the Prisma client generation
RUN npx prisma generate --schema=./prisma/schema.prisma

# Development stage
FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY . .
COPY --from=base /usr/src/app/node_modules ./node_modules
CMD ["npm", "run", "dev:docker"]

# Build stage
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .

# Copy .env file into the build stage
COPY --from=base /usr/src/app/.env .env

# Install dependencies and generate Prisma client using the .env file
RUN npm install
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /usr/src/app

# Copy the necessary files from the build stage
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/.env .env

# Start the application with the .env file
CMD ["npm", "run", "start"]

EXPOSE 3000
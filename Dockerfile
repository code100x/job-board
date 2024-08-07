#Pull the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json files
COPY package*.json ./

# Copy the prisma folder
COPY prisma ./prisma/

# Install the dependencies
RUN npm install

# Generate the prisma client
RUN npx prisma generate

#Copy the rest of the files
COPY . .

# Build the app
RUN npm run build

# Set the environment variables
ENV PATH /app/node_modules/.bin:$PATH

# Push the database
RUN npx prisma db push
RUN npx prisma db seed

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
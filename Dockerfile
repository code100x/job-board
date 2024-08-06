    # Use an official Node runtime as the base image
    FROM node:18-alpine
    
    # Set the working directory in the container
    WORKDIR /app
    
    # Install necessary tools
    RUN apk add --no-cache openssl
    
    # Copy package.json and package-lock.json
    COPY package*.json ./
    
    # Copy Prisma schema
    COPY prisma ./prisma/
    
    # Install project dependencies without running scripts
    RUN npm install --ignore-scripts
    
    # Copy project files and folders to the working directory
    COPY . .
    
    # Install Prisma CLI
    RUN npm install -g prisma
    
    # Generate Prisma client
    RUN npx prisma generate
    
    # Expose the port the app runs on
    EXPOSE 3000
    
    # Start the application
    CMD ["npm", "run", "dev"]
    
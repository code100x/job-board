FROM node:20

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY . .

# Copy the .env file
COPY .env .env

# Install dependencies
RUN npm install

# Run database migrations and seed the database
RUN npx prisma db push && npx prisma db seed

EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]

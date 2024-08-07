# Project Name: Job Board


## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)


## Description

Job Board is a platform designed to connect employers with potential employees. Employers can post job listings, and job seekers can apply for these positions. The application ensures a seamless and efficient job search and hiring process.

## Features

- **User Registration and Authentication**: Secure and easy registration and login for both employers and job seekers.
- **Job Listings Management**: Employers can create, update, and manage job listings.
- **Job Applications**: Job seekers can browse listings and apply directly through the platform.
- **Profile Management**: Users can create and update their profiles with relevant information.
- **Search and Filter**: Advanced search and filtering options to find the perfect job or candidate.

## Technologies

- **Web-app**: Next.Js, TypeScript
- **Database**: Prisma ORM, Postgres
- **Authentication**: NextAuth
- **Hosting**: Vercel, Heroku
- **Containerization**: Docker

## Getting Started

To get started with the Job Board app, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/job-board
   ```

Follow these steps to set up the repository locally and run it.

### Configuration

1. Create a `.env` file in the root folder of your project. Update it following the convention of the `.env.example` file. Here's an example:

   ```bash
   AUTH_SECRET="MY_SECRET_KEY"
   ```

2. To generate AUTH_SECRET, 

   Run this command in your terminal:

   ```bash
   openssl rand -base64 33
   ```

   or

   [Run in browser](https://www.cryptool.org/en/cto/openssl/)

### Running the Project with Docker

```bash
docker compose up --build
```

### Running the Project without Docker

1. Install the necessary dependencies:
   ```bash
   npm install
   ```

2. Sync & Seed your database:

   ```bash
   npx prisma db push
   npx prisma db seed
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Now, you can run the project and make changes as needed.

### Test User Credentials

```js
Emails: "user1@gmail.com, user2@gmail.com, admin@gmail.com"
Password: "123456" 
```

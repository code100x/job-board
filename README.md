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

## Getting Started

To get started with the Job Board app, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/job-board


Follow these steps to set up the repository locally and run it.

### Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/code100x/job-board/
   cd job-board
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root folder of your project. Update it following the convention of the `.env.example` file. Here's an example:

   ```bash
   DATABASE_URL=postgres://********
   AUTH_SECRET="MY_SECRET_KEY"
   ```

   To generate AUTH_SECRET, run this command in your terminal:

   ```bash
   openssl rand -base64 33
   ```

### Running the Project

1. Sync & Seed your database:

    ```bash
    npx prisma db push
    npx prisma db seed
    ```

2. Start the development server:

    ```bash
    npm run dev
    ```

Now, you can run the project and make changes as needed.

### Test User Credentials

   ```js
      Emails: "user1@gmail.com, user2@gmail.com, admin@gmail.com"
      Password: "123456" 
   ```

# 100xJobs - Online Job Portal

Follow these steps to set up the repository locally and run it.

## Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/code100x/job-board/
   cd job-board
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root folder of your project. Update it following the convention of the `.env.example` file. Here's an example:

   ```bash
   DATABASE_URL=postgres://********
   AUTH_SECRET="MY_SECRET_KEY"
   ```

   To generate AUTH_SECRET, run this command in your terminal:

   ```bash
   openssl rand -base64 33
   ```

## Running the Project

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

## Test User Credentials

   ```js
      Emails: "user1@gmail.com, user2@gmail.com, admin@gmail.com"
      Password: "123456" 
   ```

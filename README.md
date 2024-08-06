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

## Running the Project with Docker

To set up and run the project using Docker, follow these steps:

### Prerequisites

Ensure you have Docker installed on your machine. If not, you can download and install it from the [official Docker website](https://www.docker.com/get-started).

### Build and Run with Docker

#### Build the Docker Image

In the root directory of your project, where the Dockerfile is located, run the following command to build the Docker image:

```bash
docker build -t job-board .
```

This will create a Docker image named job-board.

#### Run the Docker Container
Once the image is built, you can run it using the following command:

```bash
docker run -p 3000:3000 --env-file .env job-board
```
This command maps port 3000 on your host to port 3000 in the container and uses the .env file for environment variables. Make sure you have a .env file in your project root with the appropriate configuration.
# Project Name: Job Board
[All about job board](https://marmalade-height-05f.notion.site/100xDevs-Job-board-ab8ca399180d49e4bc0c2ff5c81dfb08?pvs=25) <br/>
[Job board bugs](https://marmalade-height-05f.notion.site/100xDevs-JOB-BOARD-Bugs-10115651c69c80478fc8f673a139bc60)
## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)

## Description

Job Board is a platform designed to connect employers with potential employees. Employers can post job listings, and job seekers can apply for these positions. The application ensures a seamless and efficient job search and hiring process.

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
   #
   # Database 
   #
   DATABASE_URL="postgres://postgres:password@localhost:5432/postgres"

   #
   # AUTH 
   #
   NEXTAUTH_SECRET="koXrQGB5TFD4KALDX4kAvnQ5RHHvAOIzB"
   NEXTAUTH_URL="http://localhost:3000"

   #
   # Bunny CDN
   #
   CDN_SZ_NAME=
   CDN_BASE_PATH=
   CDN_API_KEY=
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
   npm run db:seed
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Now, you can run the project and make changes as needed.

### Test User Credentials

```js
Emails: 'user@gmail.com, admin@gmail.com';
Password: '123456';
```


## Steps to create a BunnyCDN storage for this repo:

1. **Create a storage zone:**

     <img src="https://utfs.io/f/CUistsOk9f0Iocrllmq4RQuXkCx9NthDrTEw6dFy1Z3KfIPc" alt="Create a storage zone" width="150" />

2. **Connect the storage zone to a pull zone:**

     <img src="https://utfs.io/f/CUistsOk9f0ImevkKUyo3QdPNXDuFbcZEagW0AUej1tzvmMw" alt="Connect the storage zone to a pull zone" width="250" />

4. **Set environment variables:**

   Go to the FTP & API Access section in the storage zone and add the following environment variables:

   ```bash
   CDN_API_KEY=<your-api-key>
   ```
   
   Which you can find in the storage -> [storage name] -> FTP & API Access section
   
   <img src="https://utfs.io/f/CUistsOk9f0Imf5c1ZUyo3QdPNXDuFbcZEagW0AUej1tzvmM" alt="CDN_API_KEY" width="500" />

---

   ```bash
   CDN_BASE_UPLOAD_URL=<your-cdn-base-upload-url>
   ```
   Which is https://[your-hostname]/[storage-name]/[any folder name you might have added otherwise empty]
   
   <img src="https://utfs.io/f/CUistsOk9f0Imf5c1ZUyo3QdPNXDuFbcZEagW0AUej1tzvmM" alt="CDN_BASE_UPLOAD_URL"  width="500"  />

---
   
   ```bash
   CDN_BASE_ACCESS_URL=<your-cdn-base-access-url>
   ```
   Which is https://[your-pull-zone-hostname]/[any folder name you might have added otherwise empty]
   
   <img src="https://utfs.io/f/CUistsOk9f0IyM9047Pa7YvK8qbtnUAPO9jwxdskhzc2JNoR" alt=" CDN_BASE_ACCESS_URL"  width="600"  />

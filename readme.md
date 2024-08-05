# 100xHire - Online Job Portal

Follow these steps to set up the repository locally and run it.

## Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/code100x/job-board.git
   cd job-board
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root folder of your project. Use the `.env.example` file as a template:

   ```
   DATABASE_URL=""

   AUTH_SECRET=""

   GITHUB_CLIENT_ID=""
   GITHUB_CLIENT_SECRET=""

   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""

   RESEND_API_KEY=""

   UPLOADTHING_SECRET=""
   UPLOADTHING_APP_ID=""

   NEXT_PUBLIC_APP_URL=""
   ```

2. Fill in the values for each field:

   - `DATABASE_URL`: Your PostgreSQL database URL
   - `AUTH_SECRET`: Generate using `openssl rand -base64 33`
   - `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`: Obtain from [GitHub Developer Settings](https://github.com/settings/developers)
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Obtain from [Google Cloud Console](https://console.cloud.google.com/)
   - `RESEND_API_KEY`: Get from [Resend](https://resend.com/)
   - `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`: Get from [UploadThing](https://uploadthing.com/)
   - `NEXT_PUBLIC_APP_URL`: Your application's public URL (e.g., "http://localhost:3000" for local development)

## Running the Project

1. Start the PostgreSQL database using Docker Compose:

   ```bash
   docker compose up -d
   ```

   This command starts the database in detached mode.

2. Sync & Seed your database:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

Now, you can run the project and make changes as needed.

## Test User Credentials

```js
Emails: "john@gmail.com, admin@gmail.com";
Password: "12345";
```

Remember to keep your `.env` file secure and never commit it to version control. Ensure it's listed in your `.gitignore` file.

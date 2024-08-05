# Job-Board

A brief description of what this project does and who it's for

## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for ways to get started.

## Run Locally

### With Docker:

- Clone the project

```bash
git clone https://github.com/code100x/job-board
```

- Go to the project directory

```bash
cd job-board
```

- Create a `.env` file based on the `.env.example` file and update the environment variables. **Do not update the DATABASE_URL**.

- Run docker-compose

```bash
docker-compose up
```

### Without Docker

- Clone the project

```bash
git clone https://github.com/code100x/job-board
```

- Go to the project directory

```bash
cd job-board
```

- Start a PostgreSQL database

  1. Using Docker:

  ```bash
  docker run -d \
      --name cms-db \
      -e POSTGRES_USER=postgres \
      -e POSTGRES_PASSWORD=mysecretpassword \
      -e POSTGRES_DB=postgres \
      -p 5432:5432 \
      postgres
  ```

  based on this command the connection url will be

  ```
  DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres?schema=public
  ```

  **OR**

  2. Create a database using [neon.tech](https://neon.tech/) and update the `DATABASE_URL` accordingly

- Create a `.env` file based on the `.env.example` file and update the environment variables

- Install Dependencies

```bash
npm install
```

- Migrate the database

```bash
npm run db:migrate
```

- Start the server

```bash
npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- **`GOOGLE_CLIENT_ID`** : Generate from Google Developers Console

- **`GOOGLE_CLIENT_SECRET`** : Generate from Google Developers Console

- **`NEXTAUTH_SECRET`** : Run `openssl rand -base64 32` in your terminal to generate a secret

- **`DATABASE_URL`** : URL of postgres database

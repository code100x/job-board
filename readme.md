<div align="center">
  <br/>
  <h1>100xJobs</h1>
  <p>
    <strong>Find your next 100x Job!</strong>
  </p>
  <br/>
</div>

## Prerequisite
 - Google login OAuth credentials: Create new OAuth Client ID [Link](https://console.developers.google.com/apis/credentials)
 - Postgres DB:  Create a local DB or create one on [Neon](https://neon.tech/)


## Project Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/code100x/job-board.git
    ```

2. Navigate to the project directory:
    ```bash
    cd job-board
    ```

3. Install the dependencies: 
    ```bash
    npm install
    ```

4. Create .env file similar to .env.example and add your GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DATABASE_URL values.

5. Run the development environment:
   ```bash
   npm run dev
   ```
   
6. Access the application at http://localhost:3000

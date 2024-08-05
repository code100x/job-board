---

# Contributing to Job-Board

We’re excited that you want to contribute to Job-Board! To make the process smooth and easy, please follow the guidelines below.

## How to Contribute

1. **Fork the Repository**  
   Click the "Fork" button at the top right of this page to create your own copy of the repository.

2. **Clone Your Fork**  
   Run the following command to download your fork to your local machine:
   ```bash
   git clone https://github.com/your-username/job-board.git
   ```

3. **Create a New Branch**  
   Switch to a new branch where you’ll make your changes:
   ```bash
   git checkout -b your-branch-name
   ```
4. **Run lint checks**
   Run the lint check to ensure no linting warnings
      ```bash
   npm run lint
   ```
5. **Run format checks**
   Run the format check to ensure no formatting errors
      ```bash
   npm run format:check
   ```
   Fix formatting errors (if any) using 
      ```bash
   npm run format:fix
   ```

6. **Build the project**
   Build the project to ensure no build errors
      ```bash
   npm run build
   ```

7. **Make Your Changes**  
   Edit the code as needed and commit your changes with a clear, concise message:
   ```bash
   git commit -m "Describe your changes here"
   ```

8. **Push Your Changes**  
   Upload your changes to your fork on GitHub:
   ```bash
   git push origin your-branch-name
   ```

9. **Submit a Pull Request**  
   Go to the original repository on GitHub and open a pull request from your fork. Provide a clear description of your changes and why they are necessary.

## Reporting Issues

If you encounter a bug or have a feature request, please create an issue using the issue templates provided. This helps us address your concerns more efficiently.

## Pull Request Guidelines

- **Read the Template**: Before submitting your pull request, review the [PULL_REQUEST_TEMPLATE.md](/.github/PULL_REQUEST_TEMPLATE.md).
- **Follow Code Style**: Ensure your code follows the existing style and quality standards of the project.
- **Write Tests**: If applicable, include tests for your changes to ensure they work as expected.
- **Keep It Focused**: Make sure your pull request addresses a single issue or feature to simplify the review process.
- **Naming Conventions**: Name your pull request with one of the following prefixes to indicate the type of change:

  - **[DOC]**: Documentation updates
  - **[BUGFIX]**: Bug fixes
  - **[FEAT]**: New features
  - **[ENH]**: Enhancements
  - **[CHORE]**: Chores or maintenance tasks


Thank you for your contributions and for helping make Job-Board better!

---

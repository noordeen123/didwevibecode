# Contributing to didwevibecode

Thank you for your interest in contributing! We welcome all kinds of contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Development Setup](#development-setup)
- [Commit Message Guidelines](#commit-message-guidelines)

---

## Code of Conduct

This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/didwevibecode.git
   cd didwevibecode
   ```
3. **Add the upstream remote:**
   ```bash
   git remote add upstream https://github.com/noordeen123/didwevibecode.git
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Add your GEMINI_API_KEY
   ```

---

## How to Contribute

### Reporting Bugs

- Search [existing issues](https://github.com/noordeen123/didwevibecode/issues) before opening a new one.
- Use the **Bug Report** issue template.
- Include steps to reproduce, expected vs actual behaviour, and your environment details.

### Suggesting Features

- Open a [Feature Request](https://github.com/noordeen123/didwevibecode/issues/new/choose) issue.
- Describe the use case and why it would benefit the project.

### Contributing Code

1. Create a new branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes.
3. Run lint checks:
   ```bash
   npm run lint
   ```
4. Commit your changes (see [Commit Message Guidelines](#commit-message-guidelines)).
5. Push to your fork and open a Pull Request.

---

## Pull Request Process

- Ensure your branch is up to date with `main` before opening a PR.
- Fill out the PR template completely.
- Link to any related issues using `Closes #issue-number`.
- Wait for a maintainer review. Address any requested changes promptly.

---

## Development Setup

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

---

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new AI interview question type
fix: resolve API key validation bug
docs: update README setup instructions
chore: update dependencies
refactor: simplify Swarm Chaos component
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`

---

Thank you for helping make **didwevibecode** better!

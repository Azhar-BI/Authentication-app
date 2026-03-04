# AuthFlow - Authentication App

A full-stack authentication application built with SvelteKit, Drizzle ORM, and PostgreSQL. Features user registration with email verification, password reset, session-based auth, and a dashboard with profile management.

---

## Setup

### Prerequisites

- Node.js >= 18.x
- PostgreSQL installed and running
- SMTP server for email (mailtrap)

### 1. Clone and Install

```bash
git clone https://github.com/Azhar-BI/Authentication-app.git
cd authentication-app
npm install
```

### 2. Configure Environment Variables

```bash
cp .env
```

Fill in the following values in `.env`:

| Variable                | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `DATABASE_URL`          | PostgreSQL connection string                       |
| `AUTH_SECRET`           | Secret key for Auth.js ) |
| `EMAIL_SERVER_HOST`     | SMTP server hostname                               |
| `EMAIL_SERVER_PORT`     | SMTP server port (e.g., 2525 for Mailtrap)         |
| `EMAIL_SERVER_USER`     | SMTP username                                      |
| `EMAIL_SERVER_PASSWORD` | SMTP password                                      |
| `EMAIL_FROM`            | Sender email address                               |

### 3. Set Up the Database

```bash
createdb auth-app
npx drizzle-kit push
```

### 4. Run the App

```bash
npm run dev
```



# AuthFlow - Authentication App

A full-stack authentication application built with **SvelteKit**, **Auth.js**, **Drizzle ORM**, and **PostgreSQL**. Features secure database-based session management, email verification, password reset, and a professional landing page.

---

## Tech Stack

| Layer        | Technology                                                  |
| ------------ | ----------------------------------------------------------- |
| Framework    | [SvelteKit](https://kit.svelte.dev/) (Svelte 5)            |
| Auth         | [Auth.js](https://authjs.dev/) (`@auth/sveltekit`)         |
| ORM          | [Drizzle ORM](https://orm.drizzle.team/)                   |
| Database     | [PostgreSQL](https://www.postgresql.org/)                   |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com/)                |
| Email        | [Nodemailer](https://nodemailer.com/)                      |
| Language     | TypeScript                                                  |
| Hashing      | [bcryptjs](https://www.npmjs.com/package/bcryptjs)         |
| Build Tool   | [Vite](https://vitejs.dev/)                                |

---

## Features

### Core Authentication
- **User Registration** — Email/password signup with form validation
- **User Login/Logout** — Secure database session management (not JWT)
- **Protected Routes** — Dashboard accessible only after authentication
- **Profile Management** — View and update name/email

### Additional Feature: Email (Option A)
- **Email Verification** — Verification email sent on signup; login blocked until verified
- **Password Reset** — Secure reset flow via email with time-limited tokens

---

## Project Structure

```
authentication-app/
├── src/
│   ├── app.d.ts                            # App-level type definitions (Locals)
│   ├── app.html                            # HTML shell template
│   ├── hooks.server.ts                     # Auth.js + custom session middleware
│   ├── lib/
│   │   ├── index.ts                        # Library barrel exports
│   │   ├── assets/                         # Static assets (favicon)
│   │   └── server/
│   │       ├── auth.js                     # Auth.js configuration
│   │       ├── db.ts                       # Database connection (pg Pool + Drizzle)
│   │       ├── email.ts                    # Nodemailer email sending
│   │       ├── schema.ts                   # Drizzle ORM table definitions
│   │       └── session.ts                  # Custom DB session management
│   └── routes/
│       ├── +layout.svelte                  # Root layout (Tailwind CSS)
│       ├── +layout.server.ts               # Root layout data (session/user)
│       ├── +page.svelte                    # Landing page
│       ├── login/
│       │   ├── +page.server.ts             # Login form action
│       │   └── +page.svelte                # Login page
│       ├── register/
│       │   ├── +page.server.ts             # Registration form action
│       │   └── +page.svelte                # Registration page
│       ├── logout/
│       │   └── +page.server.ts             # Logout action
│       ├── dashboard/
│       │   ├── +layout.server.ts           # Auth guard
│       │   ├── +layout.svelte              # Dashboard layout/nav
│       │   ├── +page.svelte                # Dashboard page
│       │   └── profile/
│       │       ├── +page.server.ts         # Profile update action
│       │       └── +page.svelte            # Profile edit form
│       ├── verify-email/
│       │   ├── +page.server.ts             # Token validation
│       │   └── +page.svelte                # Verification result
│       ├── forgot-password/
│       │   ├── +page.server.ts             # Send reset email
│       │   └── +page.svelte                # Forgot password form
│       └── reset-password/
│           ├── +page.server.ts             # Validate token + update password
│           └── +page.svelte                # New password form
├── drizzle/                                # Generated SQL migrations
├── schema.sql                              # Complete database schema (SQL)
├── .env.example                            # Environment variable template
├── drizzle.config.ts                       # Drizzle Kit configuration
├── svelte.config.js                        # SvelteKit configuration
├── vite.config.ts                          # Vite configuration
├── tsconfig.json                           # TypeScript configuration
├── package.json                            # Dependencies and scripts
└── README.md                               # This file
```

---

## Prerequisites

- **Node.js** >= 18.x
- **npm** (comes with Node.js)
- **PostgreSQL** installed and running locally (or a remote instance)
- **SMTP server** for email (e.g., [Mailtrap](https://mailtrap.io) for testing)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Azhar-BI/Authentication-app.git
cd authentication-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example and fill in your values:

```bash
cp .env.example .env
```

| Variable               | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `DATABASE_URL`         | PostgreSQL connection string                     |
| `AUTH_SECRET`          | Secret key for Auth.js (`openssl rand -base64 32`) |
| `EMAIL_SERVER_HOST`    | SMTP server hostname                             |
| `EMAIL_SERVER_PORT`    | SMTP server port (e.g., 2525 for Mailtrap)       |
| `EMAIL_SERVER_USER`    | SMTP username                                    |
| `EMAIL_SERVER_PASSWORD`| SMTP password                                    |
| `EMAIL_FROM`           | Sender email address                             |

### 4. Set Up the Database

Create the PostgreSQL database and push the schema:

```bash
createdb auth-app
npx drizzle-kit push
```

This creates five tables: `users`, `accounts`, `sessions`, `verification_tokens`, and `password_reset_tokens`.

### 5. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Database Schema

The schema is defined in `src/lib/server/schema.ts` and also available as raw SQL in `schema.sql`.

| Table                    | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `users`                  | User accounts (id, name, email, password)  |
| `accounts`               | OAuth provider accounts (Auth.js)          |
| `sessions`               | Database sessions (token, userId, expires) |
| `verification_tokens`    | Email verification tokens                  |
| `password_reset_tokens`  | Password reset tokens                      |

---

## Authentication Flow

### Registration
1. User submits the registration form (`/register`)
2. Server validates fields, checks for duplicate email
3. Password is hashed with bcryptjs (10 salt rounds)
4. User record is inserted into the `users` table
5. A verification token is generated and stored in `verification_tokens`
6. A verification email is sent via Nodemailer
7. User is redirected to `/login?registered=true`

### Email Verification
1. User clicks the verification link in their email
2. Server validates the token and checks expiry
3. `email_verified` timestamp is set on the user record
4. Token is deleted from `verification_tokens`

### Login
1. User submits the login form (`/login`)
2. Server validates credentials with bcrypt
3. Server checks that email is verified (blocks login if not)
4. A session token is generated and stored in the `sessions` table
5. Session cookie (`session_token`) is set on the response
6. User is redirected to `/dashboard`

### Session Management
- **Strategy**: Custom database sessions stored in the `sessions` table
- **Cookie**: `session_token` (httpOnly, sameSite: lax, 30-day expiry)
- **Middleware**: `hooks.server.ts` reads the cookie on every request, joins with `users` table, and populates `event.locals.user`
- **Auth guard**: Dashboard routes check `locals.user` in their layout server load

### Logout
1. Session is deleted from the `sessions` table
2. Cookie is cleared
3. User is redirected to `/`

### Password Reset
1. User submits their email on `/forgot-password`
2. A reset token is generated and stored in `password_reset_tokens`
3. A reset email is sent (response is the same whether or not the email exists, to prevent enumeration)
4. User clicks the link, enters a new password on `/reset-password`
5. Password is updated with bcrypt, token is deleted
6. User is redirected to `/login?reset=true`

---

## Available Scripts

| Command                    | Description                                  |
| -------------------------- | -------------------------------------------- |
| `npm run dev`              | Start development server at `localhost:5173` |
| `npm run build`            | Build for production                         |
| `npm run preview`          | Preview the production build locally         |
| `npm run check`            | Run `svelte-check` for type checking         |
| `npm run lint`             | Check formatting with Prettier               |
| `npm run format`           | Auto-format all files with Prettier          |
| `npx drizzle-kit push`     | Push schema changes to the database          |
| `npx drizzle-kit generate` | Generate SQL migration files                 |

---

## Troubleshooting

### Emails not sending
1. Verify SMTP credentials in `.env` are correct
2. For Mailtrap: use port `2525` with the sandbox SMTP host
3. Check server logs for nodemailer errors

### Database connection refused
1. Ensure PostgreSQL is running: `pg_isready`
2. Verify `DATABASE_URL` in `.env`
3. Make sure the database exists: `createdb auth-app`

### Login says "verify your email" but no email received
1. Check the Mailtrap inbox (emails may be in the test inbox, not your real inbox)
2. Verify SMTP credentials are correct
3. Check server console for email sending errors

---

## License

This project is private and not licensed for public distribution.

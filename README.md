# AuthFlow - Authentication App

A full-stack authentication application built with **SvelteKit**, **Auth.js**, **Drizzle ORM**, and **PostgreSQL**. It features a professional service-based company landing page with secure user registration and login functionality.

---

## Tech Stack

| Layer        | Technology                                                  |
| ------------ | ----------------------------------------------------------- |
| Framework    | [SvelteKit](https://kit.svelte.dev/) (Svelte 5)            |
| Auth         | [Auth.js](https://authjs.dev/) (`@auth/sveltekit`)         |
| ORM          | [Drizzle ORM](https://orm.drizzle.team/)                   |
| Database     | [PostgreSQL](https://www.postgresql.org/)                   |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com/)                |
| Language     | TypeScript                                                  |
| Hashing      | [bcryptjs](https://www.npmjs.com/package/bcryptjs)         |
| Build Tool   | [Vite](https://vitejs.dev/)                                |

---

## Project Structure

```
authentication-app/
├── src/
│   ├── app.d.ts                            # App-level type definitions
│   ├── app.html                            # HTML shell template
│   ├── hooks.server.ts                     # SvelteKit server hooks (Auth.js middleware)
│   ├── lib/
│   │   ├── index.ts                        # Library barrel exports
│   │   ├── assets/                         # Static assets (favicon, etc.)
│   │   └── server/
│   │       ├── auth.js                     # Auth.js configuration (providers, adapter)
│   │       ├── db.ts                       # Database connection (pg Pool + Drizzle)
│   │       └── schema.ts                   # Drizzle ORM table definitions
│   └── routes/
│       ├── +layout.svelte                  # Root layout (imports Tailwind CSS)
│       ├── +page.svelte                    # Landing page (service-based company page)
│       ├── login/
│       │   └── +page.svelte                # Login form page
│       └── register/
│           ├── +page.server.ts             # Registration form action (server-side)
│           └── +page.svelte                # Registration form page
├── drizzle/                                # Generated SQL migrations
│   ├── 0000_cuddly_skaar.sql
│   └── meta/
├── static/                                 # Public static files
├── .env                                    # Environment variables (not committed)
├── drizzle.config.ts                       # Drizzle Kit configuration
├── svelte.config.js                        # SvelteKit configuration
├── vite.config.ts                          # Vite configuration (Tailwind + SvelteKit plugins)
├── tsconfig.json                           # TypeScript configuration
├── package.json                            # Dependencies and scripts
└── README.md                               # This file
```

---

## Prerequisites

Before setting up the project, make sure you have:

- **Node.js** >= 18.x
- **npm** (comes with Node.js)
- **PostgreSQL** installed and running locally (or a remote instance)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <https://github.com/Azhar-BI/Authentication-app.git>
cd authentication-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root (or edit the existing one):

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<database>"
AUTH_SECRET="<random-secret-key>"
```

| Variable       | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string                                                |
| `AUTH_SECRET`  | Secret key used by Auth.js to sign JWT tokens. Generate one with `openssl rand -base64 32` |

### 4. Set Up the Database

Create the PostgreSQL database:

```bash
createdb auth-app
```

Run Drizzle migrations to create the tables:

```bash
npx drizzle-kit push
```

This creates four tables: `users`, `accounts`, `sessions`, and `verification_tokens`.

### 5. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Database Schema

The database schema is defined in `src/lib/server/schema.ts` using Drizzle ORM.

### Users Table

| Column          | Type        | Description                      |
| --------------- | ----------- | -------------------------------- |
| `id`            | UUID        | Primary key (auto-generated)     |
| `name`          | TEXT        | User's full name                 |
| `email`         | TEXT        | Unique email address             |
| `password`      | TEXT        | bcrypt-hashed password           |
| `email_verified`| TIMESTAMP   | Email verification date          |
| `image`         | TEXT        | Profile image URL                |
| `created_at`    | TIMESTAMP   | Account creation date            |

### Accounts Table

Used by Auth.js for OAuth providers. Composite primary key on (`provider`, `provider_account_id`).

### Sessions Table

Stores database sessions (primary key: `session_token`). Links to users via `user_id`.

### Verification Tokens Table

For email verification workflows. Composite primary key on (`identifier`, `token`).

---

## Authentication Flow

### How Registration Works

1. User fills out the registration form (`/register`)
2. The form submits via POST to SvelteKit's form action (`+page.server.ts`)
3. Server validates all fields (name, email, password with 6-char minimum)
4. Server checks for duplicate email addresses
5. Password is hashed using **bcryptjs** with 10 salt rounds
6. New user record is inserted into the `users` table
7. User is redirected to the home page

### How Login Works

1. User fills out the login form (`/login`)
2. The form submits via POST to `/auth/callback/credentials` (Auth.js endpoint)
3. Auth.js invokes the `authorize` function in the Credentials provider
4. Server looks up the user by email in the database
5. Password is verified using `bcrypt.compare()`
6. On success, a **JWT session** is created and stored in a cookie
7. On failure, the user stays on the login page

### Session Strategy

This app uses **JWT-based sessions** (`strategy: "jwt"`). Session data is stored in an encrypted cookie — no database session table is used at runtime. This is required because the Auth.js Credentials provider does not support the `database` session strategy.

---

## Key Files Explained

### `src/hooks.server.ts`

Registers the Auth.js middleware with SvelteKit. This file is **required** for Auth.js to intercept and handle all `/auth/*` routes (login, callback, signout, etc.).

```ts
export { handle } from "$lib/server/auth";
```

### `src/lib/server/auth.js`

Configures Auth.js with:

- **DrizzleAdapter** — connects Auth.js to the PostgreSQL database via Drizzle ORM
- **Credentials provider** — handles email/password authentication
- **JWT session strategy** — stores sessions in encrypted cookies
- **AUTH_SECRET** — used to sign and verify tokens

### `src/lib/server/db.ts`

Creates a PostgreSQL connection pool using the `pg` package and wraps it with Drizzle ORM for type-safe database queries.

### `src/lib/server/schema.ts`

Defines all database tables using Drizzle's schema builder. These definitions are used both for migrations (`drizzle-kit push`) and for type-safe queries in application code.

---

## Available Scripts

| Command                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start development server at `localhost:5173`   |
| `npm run build`        | Build for production                           |
| `npm run preview`      | Preview the production build locally           |
| `npm run check`        | Run `svelte-check` for type checking           |
| `npm run check:watch`  | Run type checking in watch mode                |
| `npm run lint`         | Check formatting with Prettier                 |
| `npm run format`       | Auto-format all files with Prettier            |
| `npx drizzle-kit push` | Push schema changes to the database            |
| `npx drizzle-kit generate` | Generate SQL migration files               |

---

## Landing Page

The landing page (`src/routes/+page.svelte`) is designed as a professional **service-based company website** for "AuthFlow" and includes:

- **Fixed navbar** with navigation links and login/register buttons
- **Hero section** with headline, description, and call-to-action buttons
- **Stats bar** showing key company metrics
- **Services grid** — 6 service cards (Web Development, Cloud Solutions, Cybersecurity, Data Analytics, Mobile Apps, IT Consulting) with hover animations
- **About section** with company info and "Why Choose Us" checklist
- **Testimonials** — 3 client testimonials with star ratings
- **CTA section** with dark background and action buttons
- **Footer** with service links, company links, and social connections

All styling uses **Tailwind CSS v4** utility classes with responsive design for mobile and desktop.

---

## Troubleshooting

### "AUTH_SECRET is not set" or session errors

Make sure your `.env` file contains a valid `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

Copy the output and add it to `.env` as `AUTH_SECRET="<value>"`.

### Database connection refused

1. Ensure PostgreSQL is running: `pg_isready`
2. Verify the `DATABASE_URL` in `.env` matches your PostgreSQL credentials
3. Make sure the database exists: `createdb auth-app`

### Login not working

1. Verify `src/hooks.server.ts` exists and exports `handle` from auth
2. Ensure session strategy is set to `"jwt"` in `src/lib/server/auth.js` (Credentials provider does not support `"database"` strategy)
3. Check that `AUTH_SECRET` is set in `.env`

### Migration issues

If schema changes aren't reflected, run:

```bash
npx drizzle-kit push
```

Or generate and apply a migration:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

---

## Deployment

To build for production:

```bash
npm run build
```

The project uses `@sveltejs/adapter-auto` which automatically selects the right adapter for your deployment platform (Vercel, Netlify, Cloudflare, etc.). For a specific platform, install the corresponding adapter:

```bash
# Example: Node.js server
npm install @sveltejs/adapter-node

# Example: Vercel
npm install @sveltejs/adapter-vercel
```

Update `svelte.config.js` to use the chosen adapter.

**Important**: Set `AUTH_SECRET` and `DATABASE_URL` as environment variables on your hosting platform.

---

## License

This project is private and not licensed for public distribution.

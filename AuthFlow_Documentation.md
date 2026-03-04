# AuthFlow — Code Documentation

## Project Overview

AuthFlow is a full-stack authentication application built with SvelteKit, Drizzle ORM, and PostgreSQL. It provides user registration, login/logout, email verification, password reset, and profile management — all using secure database-backed sessions.

**Tech Stack:** SvelteKit (Svelte 5), Drizzle ORM, PostgreSQL, Tailwind CSS v4, Nodemailer, bcryptjs, TypeScript

---

## Project Structure

```
src/
├── app.d.ts                              Type declarations
├── app.html                              HTML shell template
├── hooks.server.ts                       Server middleware (session handling)
├── lib/
│   └── server/
│       ├── auth.js                       Auth.js configuration
│       ├── db.ts                         Database connection
│       ├── email.ts                      Email service (Nodemailer)
│       ├── schema.ts                     Database table definitions
│       └── session.ts                    Session management functions
└── routes/
    ├── +layout.svelte                    Root layout
    ├── +layout.server.ts                 Root layout data loader
    ├── +page.svelte                      Landing page
    ├── login/                            Login page
    ├── register/                         Registration page
    ├── logout/                           Logout action
    ├── verify-email/                     Email verification
    ├── forgot-password/                  Forgot password form
    ├── reset-password/                   Password reset form
    └── dashboard/
        ├── +layout.svelte               Dashboard layout with navbar
        ├── +layout.server.ts            Auth guard
        ├── +page.svelte                 Dashboard home
        └── profile/                     Profile edit page
```

---

## Core Files

### 1. `src/app.d.ts` — Type Declarations

Defines the global `App.Locals` interface used throughout the application. Every request has access to:

- `user` — The authenticated user object (id, name, email, emailVerified, image), or `null` if not logged in.
- `session` — The active session object (sessionToken, userId, expires), or `null` if no valid session.

These are populated by the session middleware in `hooks.server.ts` and accessed via `event.locals` in server-side code or `data` in page components.

---

### 2. `src/hooks.server.ts` — Server Middleware

Runs on every incoming request. Uses SvelteKit's `sequence()` to chain two handlers:

1. **authHandle** — The Auth.js handler (imported from `lib/server/auth.js`). Provides OAuth/JWT support.
2. **sessionHandle** — Custom session middleware that:
   - Reads the `session_token` cookie from the request.
   - Calls `getSessionAndUser()` to look up the session in the database.
   - If valid, sets `event.locals.user` and `event.locals.session`.
   - If invalid or missing, sets both to `null` and clears the cookie.

---

### 3. `src/lib/server/db.ts` — Database Connection

Sets up the PostgreSQL connection using `node-postgres` (pg) and wraps it with Drizzle ORM.

- Creates a connection pool using the `DATABASE_URL` environment variable.
- Exports a `db` instance used by all server-side code for database queries.

---

### 4. `src/lib/server/schema.ts` — Database Schema

Defines all database tables using Drizzle ORM's `pgTable()`:

| Table                    | Purpose                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| `users`                  | Stores user accounts — id (UUID), name, email, hashed password, emailVerified timestamp, image, createdAt |
| `accounts`               | OAuth provider accounts (required by Auth.js) — linked to users via userId with cascade delete. Composite primary key on (provider, providerAccountId) |
| `sessions`               | Database-backed sessions — sessionToken (primary key), userId (foreign key to users), expires timestamp |
| `verification_tokens`    | Email verification tokens — identifier (email), token, expires. Composite primary key on (identifier, token) |
| `password_reset_tokens`  | Password reset tokens — identifier (email), token, expires. Composite primary key on (identifier, token) |

---

### 5. `src/lib/server/session.ts` — Session Management

Provides three functions for managing database sessions:

**`createSession(userId)`**
- Generates a random UUID as the session token.
- Sets expiry to 30 days from creation.
- Inserts the session into the `sessions` table.
- Returns the token and expiry date.

**`getSessionAndUser(sessionToken)`**
- Joins the `sessions` and `users` tables.
- Filters by the given session token and checks that it hasn't expired.
- Returns the session and user data, or `null` if not found/expired.

**`deleteSession(sessionToken)`**
- Deletes the session record from the `sessions` table.
- Called during logout.

---

### 6. `src/lib/server/email.ts` — Email Service

Configures Nodemailer with SMTP credentials from environment variables (EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM).

**`sendVerificationEmail(email, token, baseUrl)`**
- Builds a verification URL: `{baseUrl}/verify-email?token={token}&email={email}`
- Sends an HTML email with a "Verify Email" button linking to that URL.
- Called after user registration.

**`sendPasswordResetEmail(email, token, baseUrl)`**
- Builds a reset URL: `{baseUrl}/reset-password?token={token}&email={email}`
- Sends an HTML email with a "Reset Password" button.
- Called from the forgot-password flow.

---

### 7. `src/lib/server/auth.js` — Auth.js Configuration

Configures SvelteKitAuth with:

- **DrizzleAdapter** — Connects Auth.js to the PostgreSQL database via Drizzle.
- **JWT session strategy** — Auth.js uses JWT internally.
- **Custom sign-in page** — Redirects to `/login`.
- **Credentials provider** — Handles email/password authentication:
  - Validates that credentials are provided.
  - Looks up the user by email in the database.
  - Compares the password with the stored bcrypt hash.
  - Returns the user object (id, email, name) on success, `null` on failure.
- **AUTH_SECRET** — Secret key from environment for signing tokens.

Note: The app primarily uses the custom session management in `session.ts` for actual user sessions, not Auth.js sessions.

---

## Route Files

### 8. `src/routes/+layout.server.ts` — Root Layout Loader

Passes `user` and `session` from `event.locals` to all pages. This data is available as `data.user` and `data.session` in every page and layout component.

---

### 9. `src/routes/+page.svelte` — Landing Page

The public-facing home page with:
- Navigation bar with Login/Register links (or Dashboard link if logged in).
- Hero section with call-to-action.
- Services section.
- About section.
- Testimonials.
- Footer.
- Responsive design with mobile hamburger menu.

---

### 10. `src/routes/register/+page.server.ts` — Registration Action

Handles the POST form submission for new user registration:

1. Extracts name, email, and password from the form data.
2. Validates all fields are present.
3. Checks password is at least 6 characters.
4. Checks password contains both letters and numbers (alphanumeric validation).
5. Checks if a user with the same email already exists.
6. Hashes the password using bcrypt with 10 salt rounds.
7. Inserts the new user into the `users` table.
8. Generates a verification token (UUID) with 24-hour expiry.
9. Stores the token in the `verification_tokens` table.
10. Sends a verification email via Nodemailer.
11. Redirects to `/login?registered=true` on success.

If the email fails to send, the account is still created but an error message is returned.

### `src/routes/register/+page.svelte` — Registration Page

Two-column layout:
- Left panel (desktop only): Dark gradient with branding and decorative elements.
- Right panel: Registration form with fields for Full Name, Email Address, and Password.
- Password hint shows: "Must be at least 6 characters with both letters and numbers."
- Displays error messages from server validation.
- Link to login page for existing users.

---

### 11. `src/routes/login/+page.server.ts` — Login Action

Handles the POST form submission for user login:

1. Extracts email and password from the form data.
2. Validates both fields are present.
3. Looks up the user by email in the database.
4. Returns generic "Invalid email or password" if user not found (prevents email enumeration).
5. Compares the submitted password against the stored bcrypt hash.
6. Checks if the user's email is verified — blocks login if not, with a message to check their inbox.
7. Creates a new database session using `createSession()`.
8. Sets the `session_token` cookie (httpOnly, sameSite: lax, 30-day expiry).
9. Redirects to `/dashboard`.

### `src/routes/login/+page.svelte` — Login Page

Two-column layout matching the registration page style:
- Email and password input fields.
- Success banners for "registered=true" (after registration) and "reset=true" (after password reset).
- "Forgot password?" link.
- Link to registration page.

---

### 12. `src/routes/logout/+page.server.ts` — Logout Action

Handles the POST form submission for logout:

1. Reads the `session_token` cookie.
2. Deletes the session from the `sessions` table using `deleteSession()`.
3. Clears the `session_token` cookie.
4. Redirects to the home page (`/`).

---

### 13. `src/routes/verify-email/+page.server.ts` — Email Verification

Runs on page load (GET request) when the user clicks the verification link in their email:

1. Reads `token` and `email` from URL query parameters.
2. Looks up the token in the `verification_tokens` table.
3. If the token doesn't exist, returns an error.
4. If the token has expired, deletes it and returns an error.
5. If valid, sets `emailVerified` to the current timestamp on the user record.
6. Deletes the used verification token.
7. Returns `{ success: true }` to display a success message.

### `src/routes/verify-email/+page.svelte` — Verification Result Page

Displays either:
- Green success message with a "Go to Login" link.
- Red error message explaining what went wrong.

---

### 14. `src/routes/forgot-password/+page.server.ts` — Forgot Password Action

Handles the POST form submission when a user requests a password reset:

1. Extracts and validates the email field.
2. Looks up the user by email.
3. If the user exists, generates a reset token (UUID) with 1-hour expiry.
4. Stores the token in the `password_reset_tokens` table.
5. Sends a password reset email.
6. Always returns `{ success: true }` regardless of whether the email exists — this prevents email enumeration attacks.

### `src/routes/forgot-password/+page.svelte` — Forgot Password Page

- Email input form.
- Success message after submission: "If an account exists with that email, we've sent a password reset link."
- Link back to login page.

---

### 15. `src/routes/reset-password/+page.server.ts` — Password Reset

**Load function (GET):**
1. Reads `token` and `email` from URL query parameters.
2. Looks up the token in the `password_reset_tokens` table.
3. Checks if the token has expired.
4. Returns `{ valid: true, token, email }` if valid, or `{ valid: false, error }` if not.

**Form action (POST):**
1. Extracts token, email, and new password from the form.
2. Validates all fields and password length (min 6 characters).
3. Re-verifies the token is still valid (in case it expired between page load and form submission).
4. Hashes the new password with bcrypt.
5. Updates the user's password in the database.
6. Deletes the used reset token.
7. Redirects to `/login?reset=true`.

### `src/routes/reset-password/+page.svelte` — Reset Password Page

- If the link is invalid/expired: shows an error with a link to request a new reset.
- If valid: shows a new password form with hidden fields for token and email.

---

### 16. `src/routes/dashboard/+layout.server.ts` — Dashboard Auth Guard

Protects all dashboard routes:
- Checks if `locals.user` exists (set by the session middleware).
- If not authenticated, redirects to `/login`.
- If authenticated, passes the user data to all child pages.

### `src/routes/dashboard/+layout.svelte` — Dashboard Layout

Shared layout for all dashboard pages:
- Fixed top navbar with AuthFlow branding.
- Navigation links: Dashboard, Profile.
- Active page highlighting.
- Logout button.
- Mobile responsive hamburger menu with slide-out panel showing user info, navigation, and logout.

---

### 17. `src/routes/dashboard/+page.svelte` — Dashboard Home

The main dashboard page after login, featuring:
- **Welcome banner** — Shows user initials avatar, name, and today's date.
- **Stats cards** (3-column grid) — Full Name, Email, and Email Verification Status with colored badges.
- **Quick Actions** (3-column grid) — Edit Profile, Change Password, and Sign Out buttons with icons and descriptions.
- **Account Security section** — Lists email verification status, password status, and Two-Factor Authentication (coming soon) with status badges.
- **Footer** — Branding text and "Logged in as" with user's email.

---

### 18. `src/routes/dashboard/profile/+page.server.ts` — Profile Management

**Load function:** Passes user data from the parent dashboard layout.

**Form action (POST):**
1. Checks authentication.
2. Extracts name and email from the form.
3. If the email has changed, checks if the new email is already taken by another user.
4. Updates the user record (name and email) in the database.
5. Returns `{ success: true }` on success.

### `src/routes/dashboard/profile/+page.svelte` — Profile Edit Page

- User avatar with initials.
- Form with name and email fields pre-filled with current values.
- Success/error message display.
- Save and Cancel buttons.

---

## Authentication Flow Summary

```
Registration:
  User fills form → Server validates → Hash password → Insert user
  → Generate token → Send verification email → Redirect to login

Email Verification:
  User clicks email link → Server validates token → Mark user verified
  → Delete token → Show success

Login:
  User fills form → Validate credentials → Check email verified
  → Create session → Set cookie → Redirect to dashboard

Session Check (every request):
  Read cookie → Look up session in DB → Attach user to request locals

Dashboard Access:
  Auth guard checks locals.user → Redirect to login if null

Logout:
  Delete session from DB → Clear cookie → Redirect to home

Password Reset:
  Request: User enters email → Generate token → Send reset email
  Reset: User clicks link → Validate token → Update password → Delete token
```

---

## Database Tables

| Table                    | Primary Key                     | Key Columns                              |
| ------------------------ | ------------------------------- | ---------------------------------------- |
| `users`                  | `id` (UUID, auto-generated)     | name, email (unique), password, email_verified, created_at |
| `accounts`               | (provider, provider_account_id) | user_id (FK → users), type, tokens       |
| `sessions`               | `session_token` (text)          | user_id (FK → users), expires            |
| `verification_tokens`    | (identifier, token)             | identifier (email), token, expires       |
| `password_reset_tokens`  | (identifier, token)             | identifier (email), token, expires       |

---

## Environment Variables

| Variable                | Purpose                                    |
| ----------------------- | ------------------------------------------ |
| `DATABASE_URL`          | PostgreSQL connection string               |
| `AUTH_SECRET`           | Secret key used by Auth.js for signing     |
| `EMAIL_SERVER_HOST`     | SMTP server hostname                       |
| `EMAIL_SERVER_PORT`     | SMTP server port                           |
| `EMAIL_SERVER_USER`     | SMTP username                              |
| `EMAIL_SERVER_PASSWORD` | SMTP password                              |
| `EMAIL_FROM`            | Sender email address for outgoing emails   |

---

## Security Measures

- Passwords are hashed with **bcrypt** (10 salt rounds) before storing.
- Passwords must be at least 6 characters and contain both letters and numbers.
- Session tokens are **httpOnly** cookies (not accessible via JavaScript).
- Email verification is required before login is allowed.
- Password reset always returns success to **prevent email enumeration**.
- Verification tokens expire after **24 hours**.
- Password reset tokens expire after **1 hour**.
- Used tokens are deleted from the database after use.
- Sessions expire after **30 days**.

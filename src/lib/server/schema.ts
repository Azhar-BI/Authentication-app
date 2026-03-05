import {
  pgTable,
  text,
  timestamp,
  uuid,
  primaryKey
} from "drizzle-orm/pg-core";

/**
 * USERS TABLE
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password"),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow()
});

/**
 * SESSIONS TABLE (database sessions)
 */
export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull()
});

/**
 * VERIFICATION TOKENS
 */
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires").notNull()
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token)
  })
);

/**
 * PASSWORD RESET TOKENS
 */
export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires").notNull()
  },
  (prt) => ({
    compoundKey: primaryKey(prt.identifier, prt.token)
  })
);
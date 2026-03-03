import { SvelteKitAuth } from "@auth/sveltekit";
import Credentials from "@auth/core/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: DrizzleAdapter(db),

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/login"
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {
  if (
    !credentials ||
    typeof credentials.email !== "string" ||
    typeof credentials.password !== "string"
  ) {
    return null;
  }

  const email = credentials.email;
  const password = credentials.password;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  const user = result[0];

  if (!user || !user.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name
  };
}
    })
  ],

  secret: process.env.AUTH_SECRET
});

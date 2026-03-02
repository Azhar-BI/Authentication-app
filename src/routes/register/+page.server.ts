import type { Actions } from "./$types";
import { db } from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { redirect, fail } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim().toLowerCase();
    const password = data.get("password")?.toString();

    if (!name || !email || !password) {
      return fail(400, { error: "All fields are required." });
    }

    if (password.length < 6) {
      return fail(400, { error: "Password must be at least 6 characters." });
    }

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res[0]);

    if (existingUser) {
      return fail(400, { error: "User already exists with this email." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword
    });

    throw redirect(303, "/");
  }
};
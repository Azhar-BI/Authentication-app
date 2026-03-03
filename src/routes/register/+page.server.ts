import type { Actions } from "./$types";
import { db } from "$lib/server/db";
import { users, verificationTokens } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { redirect, fail } from "@sveltejs/kit";
import { sendVerificationEmail } from "$lib/server/email";

export const actions: Actions = {
	default: async ({ request, url }) => {
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

		// Generate verification token and send email
		const token = crypto.randomUUID();
		const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

		await db.insert(verificationTokens).values({
			identifier: email,
			token,
			expires
		});

		try {
			await sendVerificationEmail(email, token, url.origin);
		} catch (err) {
			console.error("Failed to send verification email:", err);
			return fail(500, {
				error: "Account created but we couldn't send the verification email. Please contact support."
			});
		}

		throw redirect(303, "/login?registered=true");
	}
};

import type { PageServerLoad, Actions } from "./$types";
import { db } from "$lib/server/db";
import { users, passwordResetTokens } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { redirect, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get("token");
	const email = url.searchParams.get("email");

	if (!token || !email) {
		return { valid: false, error: "Invalid reset link." };
	}

	const result = await db
		.select()
		.from(passwordResetTokens)
		.where(
			and(eq(passwordResetTokens.identifier, email), eq(passwordResetTokens.token, token))
		);

	const prt = result[0];

	if (!prt || prt.expires < new Date()) {
		return { valid: false, error: "Reset link has expired or is invalid." };
	}

	return { valid: true, token, email };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const token = data.get("token")?.toString();
		const email = data.get("email")?.toString();
		const password = data.get("password")?.toString();

		if (!token || !email || !password) {
			return fail(400, { error: "All fields are required." });
		}

		if (password.length < 6) {
			return fail(400, { error: "Password must be at least 6 characters." });
		}

		// Verify token is still valid
		const result = await db
			.select()
			.from(passwordResetTokens)
			.where(
				and(
					eq(passwordResetTokens.identifier, email),
					eq(passwordResetTokens.token, token)
				)
			);

		const prt = result[0];

		if (!prt || prt.expires < new Date()) {
			return fail(400, { error: "Reset link has expired or is invalid." });
		}

		// Update password
		const hashedPassword = await bcrypt.hash(password, 10);
		await db.update(users).set({ password: hashedPassword }).where(eq(users.email, email));

		// Delete the used token
		await db
			.delete(passwordResetTokens)
			.where(
				and(
					eq(passwordResetTokens.identifier, email),
					eq(passwordResetTokens.token, token)
				)
			);

		throw redirect(303, "/login?reset=true");
	}
};

import type { Actions } from "./$types";
import { db } from "$lib/server/db";
import { users, passwordResetTokens } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { fail } from "@sveltejs/kit";
import { sendPasswordResetEmail } from "$lib/server/email";

export const actions: Actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();
		const email = data.get("email")?.toString().trim().toLowerCase();

		if (!email) {
			return fail(400, { error: "Email is required." });
		}

		// Always show success to prevent email enumeration
		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.then((res) => res[0]);

		if (user) {
			const token = crypto.randomUUID();
			const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

			await db.insert(passwordResetTokens).values({
				identifier: email,
				token,
				expires
			});

			try {
				await sendPasswordResetEmail(email, token, url.origin);
			} catch {
				// Silently fail to prevent enumeration
			}
		}

		return { success: true };
	}
};

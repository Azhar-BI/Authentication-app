import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { users, verificationTokens } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get("token");
	const email = url.searchParams.get("email");

	if (!token || !email) {
		return { success: false, error: "Invalid verification link." };
	}

	// Find the token
	const result = await db
		.select()
		.from(verificationTokens)
		.where(and(eq(verificationTokens.identifier, email), eq(verificationTokens.token, token)));

	const vt = result[0];

	if (!vt) {
		return { success: false, error: "Invalid or expired verification link." };
	}

	if (vt.expires < new Date()) {
		// Clean up expired token
		await db
			.delete(verificationTokens)
			.where(
				and(eq(verificationTokens.identifier, email), eq(verificationTokens.token, token))
			);
		return { success: false, error: "Verification link has expired." };
	}

	// Mark user as verified
	await db.update(users).set({ emailVerified: new Date() }).where(eq(users.email, email));

	// Delete the token
	await db
		.delete(verificationTokens)
		.where(and(eq(verificationTokens.identifier, email), eq(verificationTokens.token, token)));

	return { success: true };
};

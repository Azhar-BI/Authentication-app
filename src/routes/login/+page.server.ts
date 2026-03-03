import type { Actions } from "./$types";
import { db } from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { redirect, fail } from "@sveltejs/kit";
import { createSession } from "$lib/server/session";

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const email = data.get("email")?.toString().trim().toLowerCase();
		const password = data.get("password")?.toString();

		if (!email || !password) {
			return fail(400, { error: "Email and password are required." });
		}

		const result = await db.select().from(users).where(eq(users.email, email));
		const user = result[0];

		if (!user || !user.password) {
			return fail(400, { error: "Invalid email or password." });
		}

		const isValid = await bcrypt.compare(password, user.password);

		if (!isValid) {
			return fail(400, { error: "Invalid email or password." });
		}

		if (!user.emailVerified) {
			return fail(403, { error: "Please verify your email before logging in. Check your inbox for a verification link." });
		}

		const session = await createSession(user.id);

		cookies.set("session_token", session.sessionToken, {
			path: "/",
			httpOnly: true,
			sameSite: "lax",
			secure: false,
			expires: session.expires
		});

		throw redirect(303, "/dashboard");
	}
};

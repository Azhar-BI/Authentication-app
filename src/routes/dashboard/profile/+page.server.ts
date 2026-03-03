import type { PageServerLoad, Actions } from "./$types";
import { db } from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	return { user };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: "Not authenticated." });
		}

		const data = await request.formData();
		const name = data.get("name")?.toString().trim();
		const email = data.get("email")?.toString().trim().toLowerCase();

		if (!name || !email) {
			return fail(400, { error: "Name and email are required." });
		}

		// Check if email is taken by another user
		if (email !== locals.user.email) {
			const existing = await db
				.select()
				.from(users)
				.where(eq(users.email, email))
				.then((res) => res[0]);

			if (existing) {
				return fail(400, { error: "Email is already taken by another account." });
			}
		}

		await db
			.update(users)
			.set({ name, email })
			.where(eq(users.id, locals.user.id));

		return { success: true };
	}
};

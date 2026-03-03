import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { deleteSession } from "$lib/server/session";

export const actions: Actions = {
	default: async ({ cookies }) => {
		const sessionToken = cookies.get("session_token");

		if (sessionToken) {
			await deleteSession(sessionToken);
			cookies.delete("session_token", { path: "/" });
		}

		throw redirect(303, "/");
	}
};

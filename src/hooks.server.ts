import { getSessionAndUser } from "$lib/server/session";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get("session_token");

	if (sessionToken) {
		const result = await getSessionAndUser(sessionToken);
		if (result) {
			event.locals.user = result.user;
			event.locals.session = result.session;
		} else {
			event.locals.user = null;
			event.locals.session = null;
			event.cookies.delete("session_token", { path: "/" });
		}
	} else {
		event.locals.user = null;
		event.locals.session = null;
	}

	return resolve(event);
};

import { db } from "$lib/server/db";
import { sessions, users } from "$lib/server/schema";
import { eq, and, gt } from "drizzle-orm";
import crypto from "crypto";

export async function createSession(userId: string) {
	const sessionToken = crypto.randomUUID();
	const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

	await db.insert(sessions).values({
		sessionToken,
		userId,
		expires
	});

	return { sessionToken, expires };
}

export async function getSessionAndUser(sessionToken: string) {
	const result = await db
		.select({
			session: sessions,
			user: {
				id: users.id,
				name: users.name,
				email: users.email,
				emailVerified: users.emailVerified,
				image: users.image
			}
		})
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(and(eq(sessions.sessionToken, sessionToken), gt(sessions.expires, new Date())));

	if (result.length === 0) return null;

	return result[0];
}

export async function deleteSession(sessionToken: string) {
	await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
}

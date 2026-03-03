declare global {
	namespace App {
		interface Locals {
			user: {
				id: string;
				name: string | null;
				email: string;
				emailVerified: Date | null;
				image: string | null;
			} | null;
			session: {
				sessionToken: string;
				userId: string;
				expires: Date;
			} | null;
		}
	}
}

export {};

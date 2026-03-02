import type { Actions } from "./$types";
import { signIn } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (!email || !password) {
      return fail(400, { error: "Email and password required." });
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (!result || result.error) {
      return fail(400, { error: "Invalid credentials." });
    }

    throw redirect(303, "/dashboard");
  }
};
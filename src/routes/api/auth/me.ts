import { auth } from "$lib/auth";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ request }) => {
  const token = await auth.getToken(request.headers);
  if (token) {
    const { id, email, name, role } = token.user;
    return { 
      status: 200,
      body: { id, email, name, role }
    };
  } else {
    return {
      status: 401,
      body: { error: 'Not logged in' }
    };
  }
};

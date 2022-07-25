import type { Handle, RequestEvent } from "@sveltejs/kit";
import { appAuth, getSession as getSessionAuth } from "$lib/appAuth";
import { prisma } from "$lib/prisma";

export const handle: Handle = async ({ event, resolve }) => {
  // TODO https://github.com/sveltejs/kit/issues/1046



  const response = await resolve(event);

  return response;
};

export const getSession = async (event: RequestEvent<Record<string, string>>) => {
  const session = await appAuth.getSession(event);

  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });
    return {user};
  }

  return { user: undefined };
}
import type { Handle, RequestEvent } from "@sveltejs/kit";
import { appAuth, getSession as getSessionAuth } from "$lib/appAuth";
import { prisma } from "$lib/prisma";

export const handle: Handle = async ({ event, resolve }) => {
  // TODO https://github.com/sveltejs/kit/issues/1046



  const response = await resolve(event);

  return response;
};

export const getSession = async (event: RequestEvent<Record<string, string>>) => {
  const {user} = await appAuth.getSession(event);
  const appUser = await prisma.user.findUnique({ where: { id: user?.id } });
  return { user: appUser };
}
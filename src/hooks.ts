import type { Handle } from "@sveltejs/kit";
import { appAuth } from "$lib/appAuth";

export const handle: Handle = async ({ event, resolve }) => {
  // TODO https://github.com/sveltejs/kit/issues/1046



  const response = await resolve(event);

  return response;
};

export const { getSession } = appAuth;
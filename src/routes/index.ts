import { auth } from "$lib/auth";
import { prisma } from "$lib/prisma";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
  const token = await auth.getToken(request.headers);
  if (token?.user?.id) {
    const { id } = token.user;
    return { 
      body: { wallet: await prisma.wallet.findUnique({ where: { userId: id } }) },
    };
  } else {
    return {
      body: { error: 'Not logged in' }
    };
  }
};
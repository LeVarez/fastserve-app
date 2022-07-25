import { authMiddleware } from "$lib/auth";
import { prisma } from "$lib/prisma";


export const GET = authMiddleware(
  { role: 'ADMIN' },
  async () => {
  return {
    body: {
    }
  };
});

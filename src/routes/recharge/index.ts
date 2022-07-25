import { authMiddleware } from "$lib/auth";
import { prisma } from "$lib/prisma";


export const GET = authMiddleware(
  { role: 'BALANCE_RECHARGER' },
  async () => {
  return {
    body: {
    }
  };
});

import { authMiddleware } from "$lib/auth";


export const GET = authMiddleware(
  { role: 'BALANCE_RECHARGER' },
  async () => {
  return {
    body: {
    }
  };
});

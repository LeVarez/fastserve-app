import { authMiddleware } from "$lib/auth";


export const GET = authMiddleware(
  { role: 'ADMIN' },
  async () => {
  return {
    body: {
    }
  };
});

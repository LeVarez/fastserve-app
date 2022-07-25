import { authMiddleware } from "$lib/auth";
import { updateWallet } from "$lib/prisma/wrappers";
import type { updateWalletRequest } from "$lib/types";

export const patch = authMiddleware(
  { role:'BALANCE_RECHARGER' },
  async ({ request, params }) => {

    const data = await request.json() as updateWalletRequest;

    const tag = await updateWallet(params.id, data);
    return {
      status: 200,
      body: tag
    };

  }
);

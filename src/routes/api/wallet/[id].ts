import { authMiddleware } from "$lib/auth";
import { updateWallet } from "$lib/prisma/wrappers";
import type { UpdateWalletRequest } from "$lib/types";

export const PATCH = authMiddleware(
  { role:'BALANCE_RECHARGER' },
  async ({ request, params }) => {
    const data = await request.json() as UpdateWalletRequest;

    const tag = await updateWallet(params.id, data);
    return {
      status: 200,
      body: tag
    };

  }
);

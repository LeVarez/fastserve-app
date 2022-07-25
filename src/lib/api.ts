import type { updateWalletRequest } from "./types";

export async function updateWallet(walletId: string, data: updateWalletRequest) {
  const response = await fetch(`/api/wallet/${walletId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
  return response.ok;
}

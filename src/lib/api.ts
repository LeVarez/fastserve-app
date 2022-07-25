import type { UpdateWalletRequest } from "$lib/types";

export async function updateWallet(walletId: string, data: UpdateWalletRequest) {
  console.log('updateWallet', walletId, data);
  const response = await fetch(`/api/wallet/${walletId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
  return response.ok;
}

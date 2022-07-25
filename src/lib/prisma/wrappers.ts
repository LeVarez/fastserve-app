import type { updateWalletRequest } from "$lib/types";
import { prisma } from ".";

export async function updateWallet(id: string, request: updateWalletRequest) {
  let wallet = await prisma.wallet.findUnique({
    where: {
      id
    }
  });

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  wallet = await prisma.wallet.update({
    where: {
      id
    },
    data: {
      balance: wallet.balance + request.amount
    }
  });

  return wallet;
}
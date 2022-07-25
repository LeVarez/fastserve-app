import type { UpdateWalletRequest } from "$lib/types";
import { prisma } from ".";

export async function updateWallet(id: string, data: UpdateWalletRequest) {
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
      balance: wallet.balance + data.amount
    }
  });

  return wallet;
}
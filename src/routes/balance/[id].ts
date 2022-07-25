import { authMiddleware } from "$lib/auth";
import { prisma } from "$lib/prisma";

export const get = authMiddleware(
  { role: 'USER' },
  async ({ params }) => {

    const { id } = params;
    //Needs to validate that the user is the owner of the wallet
    const wallet = await prisma.wallet.findUnique({
      where: { id: id }
    });

    //if (!wallet) return error404('Wallet not found');

    return { body: { wallet} };
  }
);


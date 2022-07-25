import type { ExpandRecursively, Exact, Modify, Expand } from "$lib/helpers/utils";
import type { Prisma, Wallet } from "@prisma/client";

export const wallet = validate<Prisma.WalletSelect>()({
  id: true,
  balance: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
});

// ***********************
//   Typescript helpers
// ***********************

type MapToSelect<T> = Expand<{select: T}>;

function validate<V>(): <S>(q: Exact<S, V>) => ExpandRecursively<MapToSelect<S>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return q => ({ select: q }) as any;
}
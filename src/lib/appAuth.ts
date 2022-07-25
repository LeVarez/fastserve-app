import { SvelteKitAuth } from "sk-auth";
import { GoogleOAuth2Provider } from "sk-auth/providers";
import { prisma } from '$lib/prisma';
import env from "./env";

// weird import workaround here because of how prisma's
// generated files interact with svelte-kit prod builds
import PrismaClient from "@prisma/client";
import type { Role as _Role } from "@prisma/client";
const Role = PrismaClient.Role;

interface GoogleProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean,
  locale: string;
  provider: string;
}

const getOrCreateUser = async (profile: GoogleProfile) => {
  
  const user = await prisma.user.findUnique({
    where: {
      googleId: profile.sub
    }
  });

  if (user) {
    return user;
  }
  //Not user found, create new one
  const walletId = Math.random().toString(36).substring(7);
  
  const realUser = await prisma.user.findFirst({
    where: { NOT: { googleId: null }}
  });

  const isFirstUser = realUser === null;

  const newUser = await prisma.user.create({
    data: {
      googleId: profile.sub,
      name: profile.name,
      email: profile.email,
      role: isFirstUser ? Role.ADMIN : Role.USER,
    }
  });

  const wallet = await prisma.wallet.create({
    data: {
      id: walletId,
      balance: isFirstUser? 1000 : 0,
      userId: newUser.id,
    }
  });

  return newUser;
};
export const appAuth = new SvelteKitAuth({
  protocol: env.protocol,
  host: env.host,
  providers: [
    new GoogleOAuth2Provider({
      clientId: env.googleOAuthClientId,
      clientSecret: env.googleOAuthClientSecret,
      profile(profile) {
        return { ...profile, provider: "google" };
      },
    })
  ],
  callbacks: {
    redirect: () => {
      return '/';
    },

    
    async jwt(token, profile) {
      if (profile?.provider === "google") {	
        const { provider, ...account } = profile;
        const user = await getOrCreateUser(profile);
        const { id } = user;
        token = {
          ...token,
          user: { id },
        };
      }

      return token;
    },
  },
  jwtSecret: env.jwtSecret,
});
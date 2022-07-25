import type { RequestHandler } from "@sveltejs/kit";
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

export const auth = new SvelteKitAuth({
  protocol: env.protocol,
  host: env.host,
  providers: [
    new GoogleOAuth2Provider({
      clientId: env.googleOAuthClientId,
      clientSecret: env.googleOAuthClientSecret,
      profile(profile) {
        return { ...profile, provider: "google" };
      }
    })
  ],
  callbacks: {
    redirect: () => {
      return '/';
    },
    async jwt(token, profile) {
      if (profile?.provider === 'google') {
        const user = await getOrCreateUser(profile);
        const { id } = user;
        token = { ...token,
          user: { id }
        };
      }
      return null;
    },
  },
  jwtSecret: env.jwtSecret,
});

function roleCheck(userRole: _Role, requiredRole: _Role) {
  const ROLE_VALUES = {
    USER: 0,
    SELLER: 1,
    BALANCE_RECHARGER: 2,
    ADMIN: 3,
  };
  return ROLE_VALUES[userRole] >= ROLE_VALUES[requiredRole];
}

export function authMiddleware(opts: { role: _Role, redirect?: string }, handler: RequestHandler): RequestHandler {
  return async event => {

    const token = await auth.getToken(event.request.headers);
    const isApi = event.url.pathname.startsWith('/api/');

    if (!token?.user) { // not signed in
      return isApi
      ? { status: 401, body: { error: 'Unauthorized' } }
      : { status: 302, headers: { 'Location': await auth.getRedirectUrl(opts.redirect || '/') } };
    }

    const user = await prisma.user.findUnique({ where: { id: token.user.id } });

    if (!user) { // invalid user so clear the token
      const token = auth.setToken(event.request.headers, {});
      const jwt = auth.signToken(token);
      return isApi
      ? {
        status: 400,
        headers: { "set-cookie": `svelteauthjwt=${jwt}; Path=/; HttpOnly`},
        body: { error: 'Invalid user token' }
      }
      : {
        status: 302,
        headers: {
          "set-cookie": `svelteauthjwt=${jwt}; Path=/; HttpOnly`,
          "Location": '/api/auth/signin/google',
          "contentType": "application/json; charset=utf-8",
        }
      };
    }
    else if (!roleCheck(user.role, opts.role)) { // valid user but not authorized
      return {
        status: 401,
        body: { error: 'Not authorized' }
      };
    }
    else {
      return handler(event);
    }

  };
}
import { SvelteKitAuth } from "sk-auth";
import { GoogleOAuth2Provider } from "sk-auth/providers";
import env from "./env";

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
    jwt(token, profile) {
      if (profile?.provider) {
        const { provider, ...account } = profile;
        token = {
          ...token,
          user: {
            ...(token.user ?? {}),
            connections: { ...(token.user?.connections ?? {}), [provider]: account },
          },
        };
      }

      return token;
    },
  },
  jwtSecret: env.jwtSecret,
});
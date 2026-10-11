import type { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      authorization: { params: { scope: "identify email" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.discord_id = (profile as { id: string }).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.discord_id = (token.discord_id as string) || token.sub || "";
        session.user.id = (token.discord_id as string) || token.sub || "";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;

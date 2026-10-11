import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      discord_id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    discord_id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    discord_id?: string;
  }
}

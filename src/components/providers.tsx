"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: ReactNode;
  session?: any;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}

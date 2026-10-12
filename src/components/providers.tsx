"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { UidSessionProvider } from "@/hooks/use-uid-session";
import { Toaster } from "@/components/ui/toaster";

interface ProvidersProps {
  children: ReactNode;
  session?: any;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UidSessionProvider>
          {children}
          <Toaster />
        </UidSessionProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

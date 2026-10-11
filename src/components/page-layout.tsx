"use client";

import React, { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

type Props = {
  children?: ReactNode;
  title?: string;
  headerLinks?: any;
  session?: any;
};

export default function PageLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mb-8 flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

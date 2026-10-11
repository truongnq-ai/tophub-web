"use client";

import React from "react";

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto px-4 py-8 max-w-4xl">{children}</div>;
}

import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

(global as any).React = React;

// Mock fonts
vi.mock("next/font/google", () => ({
  Nunito: () => ({ variable: "font-heading" }),
  Be_Vietnam_Pro: () => ({ variable: "font-sans" }),
  JetBrains_Mono: () => ({ variable: "font-mono" }),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

// Mock next-intl/server
vi.mock("next-intl/server", () => ({
  getMessages: vi.fn().mockResolvedValue({}),
  getTranslations: vi.fn().mockResolvedValue(() => "Top Heroes Hub"),
  setRequestLocale: vi.fn(),
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="next-intl-client-provider">{children}</div>
  ),
}));

// Mock next-auth
vi.mock("next-auth", () => ({
  getServerSession: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/auth", () => ({
  authOptions: {},
}));

// Mock layout sub-components
vi.mock("@/components/providers", () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}));

vi.mock("@/components/header", () => ({
  Header: () => <header data-testid="site-header" />,
}));

vi.mock("@/components/footer", () => ({
  Footer: () => <footer data-testid="site-footer" />,
}));

// Mock @vercel/analytics/next
const mockAnalyticsRender = vi.fn();
vi.mock("@vercel/analytics/next", () => ({
  Analytics: (props: any) => {
    mockAnalyticsRender(props);
    return <div data-testid="vercel-analytics" />;
  },
}));

describe("Vercel Web Analytics Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should verify that @vercel/analytics/next is available and exports Analytics", async () => {
    const { Analytics } = await import("@vercel/analytics/next");
    expect(Analytics).toBeDefined();
    expect(typeof Analytics).toBe("function");
  });

  it("should mount <Analytics /> inside LocaleLayout body", async () => {
    const { default: LocaleLayout } = await import(
      "../src/app/[locale]/layout"
    );

    const jsx = await LocaleLayout({
      children: <div data-testid="page-content">Test Page Content</div>,
      params: { locale: "vi" },
    });

    render(jsx);

    // Verify main content and sub-components are present
    expect(screen.getByTestId("page-content")).toBeDefined();
    expect(screen.getByTestId("site-header")).toBeDefined();
    expect(screen.getByTestId("site-footer")).toBeDefined();

    // Verify Vercel Analytics component is rendered inside the layout
    expect(screen.getByTestId("vercel-analytics")).toBeDefined();
    expect(mockAnalyticsRender).toHaveBeenCalledTimes(1);
  });
});

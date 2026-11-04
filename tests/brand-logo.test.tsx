import React from "react";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrandLogo, BRAND_LOGO_SRC } from "../src/components/brand-logo";
import { Header } from "../src/components/header";
import { LogoAnimated } from "../src/components/logo-animated";

vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    className,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => "/",
}));

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: null,
    savedAccounts: [],
    selectAccount: vi.fn(),
    logout: vi.fn(),
    isLoaded: true,
  }),
}));

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
  useTranslations: () => (key: string) => {
    if (key === "calculatorsNewBadge") return "MỚI";
    return key;
  },
}));

describe("BrandLogo & Top Hero Hub Brand Identity", () => {
  it("stores the generated brand logo assets in public/images/brand/", () => {
    const publicDir = path.resolve(__dirname, "../public");
    const pngPath = path.join(publicDir, "images/brand/tophub-logo.png");
    const webpPath = path.join(publicDir, "images/brand/tophub-logo.webp");

    expect(fs.existsSync(pngPath)).toBe(true);
    expect(fs.existsSync(webpPath)).toBe(true);
    expect(fs.statSync(pngPath).size).toBeGreaterThan(1024);
    expect(fs.statSync(webpPath).size).toBeGreaterThan(1024);
  });

  it("renders BrandLogo with new emblem image, 'TopHub' title, and 'Top Hero Hub' subtitle", () => {
    render(<BrandLogo size="md" />);

    const img = screen.getByTestId("brand-logo-img") as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toContain(BRAND_LOGO_SRC);
    expect(screen.getByText("TopHub")).toBeTruthy();

    const subtitle = screen.getByTestId("brand-logo-subtitle");
    expect(subtitle.textContent).toBe("Top Hero Hub");
    expect(subtitle.className).toContain("uppercase");
  });

  it("updates Header and LogoAnimated to display 'Top Hero Hub' instead of 'Top Heroes Companion'", () => {
    const { container } = render(
      <div>
        <Header />
        <LogoAnimated />
      </div>
    );

    expect(screen.getAllByText("TopHub").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Top Hero Hub").length).toBeGreaterThanOrEqual(2);
    expect(container.textContent).not.toContain("Top Heroes Companion");
  });
});

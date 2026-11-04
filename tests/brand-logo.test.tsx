import React from "react";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrandLogo, BRAND_LOGO_SRC } from "../src/components/brand-logo";
import { Header } from "../src/components/header";
import { Footer } from "../src/components/footer";
import { LogoAnimated } from "../src/components/logo-animated";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";

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
  useTranslations:
    (ns?: string) => (key: string, params?: Record<string, unknown>) => {
      const dict = (
        viMessages as unknown as Record<string, Record<string, string>>
      )[ns ?? ""];
      const raw = dict?.[key] ?? (key === "calculatorsNewBadge" ? "MỚI" : key);
      if (!params) return raw;
      return Object.entries(params).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        raw
      );
    },
}));

describe("BrandLogo & Top Hero Hub Brand Identity", () => {
  it("stores the generated brand logo assets in public/images/brand/ and syncs favicon/app-icons", () => {
    const publicDir = path.resolve(__dirname, "../public");
    const appDir = path.resolve(__dirname, "../src/app");
    const pngPath = path.join(publicDir, "images/brand/tophub-logo.png");
    const webpPath = path.join(publicDir, "images/brand/tophub-logo.webp");
    const publicFaviconPath = path.join(publicDir, "favicon.ico");
    const appFaviconPath = path.join(appDir, "favicon.ico");
    const appIconPath = path.join(appDir, "icon.png");
    const appleIconPath = path.join(appDir, "apple-icon.png");

    expect(fs.existsSync(pngPath)).toBe(true);
    expect(fs.existsSync(webpPath)).toBe(true);
    expect(fs.existsSync(publicFaviconPath)).toBe(true);
    expect(fs.existsSync(appFaviconPath)).toBe(true);
    expect(fs.existsSync(appIconPath)).toBe(true);
    expect(fs.existsSync(appleIconPath)).toBe(true);

    expect(fs.statSync(pngPath).size).toBeGreaterThan(1024);
    expect(fs.statSync(webpPath).size).toBeGreaterThan(1024);
    expect(fs.statSync(appIconPath).size).toBeGreaterThan(1024);
    expect(fs.statSync(appleIconPath).size).toBeGreaterThan(1024);
    expect(fs.readFileSync(publicFaviconPath).equals(fs.readFileSync(appFaviconPath))).toBe(true);
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

  it("updates Footer to display 'TopHub' + 'Top Hero Hub', link to '/calculators' with NEW badge, hide '/guides', and fix VI/EN copywriting", () => {
    const { container } = render(<Footer />);

    expect(screen.getByText("TopHub")).toBeTruthy();
    expect(screen.getByText("Top Hero Hub")).toBeTruthy();
    expect(screen.getByTestId("footer-calculators-new-badge").textContent).toBe(
      "MỚI"
    );

    const links = Array.from(container.querySelectorAll("a")).map((a) =>
      a.getAttribute("href")
    );
    expect(links).toContain("/calculators");
    expect(links).toContain("/giftcodes");
    expect(links).not.toContain("/guides");

    expect(container.textContent).not.toContain("TopHub Companion");
    expect(container.textContent).not.toContain("Phát triển với dành cho");
    expect(container.textContent).toContain(
      "Phát triển với tâm huyết dành cho cộng đồng Top Heroes"
    );

    expect(viMessages.Footer.title).toBe("Top Hero Hub");
    expect(enMessages.Footer.title).toBe("Top Hero Hub");
    expect(viMessages.Footer.copyright).toContain("Top Hero Hub");
    expect(enMessages.Footer.copyright).toContain("Top Hero Hub");
    expect(viMessages.Footer.brandDesc).toContain("tính toán nguyên liệu");
    expect(enMessages.Footer.brandDesc).toContain("resource calculators");
    expect(enMessages.Footer.builtWithLove).toBe(
      "Crafted with love for Top Heroes gamers"
    );
  });
});

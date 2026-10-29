import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const { mockIntlMiddleware, mockWithAuthMiddleware } = vi.hoisted(() => ({
  mockIntlMiddleware: vi.fn(() => ({ type: "INTL_PUBLIC_RESPONSE" })),
  mockWithAuthMiddleware: vi.fn(() => ({ type: "AUTH_REDIRECT_TO_LOGIN" })),
}));

vi.mock("next-intl/middleware", () => ({
  default: () => mockIntlMiddleware,
}));

vi.mock("next-auth/middleware", () => ({
  withAuth: () => mockWithAuthMiddleware,
}));

import middleware from "../src/middleware";

describe("Middleware Public vs Auth Route Guard Regression Suite", () => {
  beforeEach(() => {
    mockIntlMiddleware.mockClear();
    mockWithAuthMiddleware.mockClear();
  });

  it("allows unauthenticated access to /calculators and all sub-calculator routes (/vi & /en) without redirecting to Admin login", () => {
    const publicCalculatorUrls = [
      "https://tophero.vercel.app/calculators",
      "https://tophero.vercel.app/vi/calculators",
      "https://tophero.vercel.app/en/calculators",
      "https://tophero.vercel.app/calculators/heroes/hero-stars",
      "https://tophero.vercel.app/vi/calculators/heroes/hero-stars",
      "https://tophero.vercel.app/en/calculators/heroes/hero-stars",
      "https://tophero.vercel.app/vi/calculators/lord-gear/lord-gear-upgrade",
    ];

    for (const url of publicCalculatorUrls) {
      const req = new NextRequest(url);
      const res = middleware(req);

      expect(res).toEqual({ type: "INTL_PUBLIC_RESPONSE" });
      expect(mockWithAuthMiddleware).not.toHaveBeenCalled();
    }
  });

  it("continues to protect private /dashboard route with authMiddleware when unauthenticated", () => {
    const req = new NextRequest("https://tophero.vercel.app/vi/dashboard");
    const res = middleware(req);

    expect(res).toEqual({ type: "AUTH_REDIRECT_TO_LOGIN" });
    expect(mockWithAuthMiddleware).toHaveBeenCalledTimes(1);
  });
});

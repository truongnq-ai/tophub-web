import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  sanitizeReturnUrl,
  buildGuideReturnUrl,
} from "../src/lib/return-url";
import { UidEnrollForm } from "../src/components/home/uid-enroll-form";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const selectAccountMock = vi.fn().mockResolvedValue(undefined);
const saveAccountMock = vi.fn().mockResolvedValue(undefined);

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: null,
    savedAccounts: [
      {
        uid: "2446869146316",
        nickname: "DragonSlayer",
        server_id: "1024",
        added_at: 1700000000000,
      },
    ],
    isLoaded: true,
    selectAccount: selectAccountMock,
    saveAccount: saveAccountMock,
    removeSavedAccount: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe("UID ReturnUrl Bridge & Open Redirect Sanitizer (GAP-CMT-09 & GAP-CMT-10)", () => {
  beforeEach(() => {
    selectAccountMock.mockClear();
    saveAccountMock.mockClear();
  });

  it("allows valid internal guide paths and blocks external or protocol-relative URLs", () => {
    expect(sanitizeReturnUrl("/vi/guides/roadmap/horde-pivot-roadmap#comments")).toBe(
      "/vi/guides/roadmap/horde-pivot-roadmap#comments"
    );
    expect(sanitizeReturnUrl("https://evil.com/phishing")).toBeNull();
    expect(sanitizeReturnUrl("//evil.com/phishing")).toBeNull();
    expect(sanitizeReturnUrl("javascript:alert(1)")).toBeNull();
    expect(sanitizeReturnUrl(null)).toBeNull();
  });

  it("deterministically builds guide return URLs from pageKey without usePathname", () => {
    expect(buildGuideReturnUrl("guides:hub", "vi")).toBe("/vi/guides#comments");
    expect(buildGuideReturnUrl("guides:heroes/encyclopedia", "en")).toBe(
      "/en/guides/heroes/encyclopedia#comments"
    );
  });

  it("invokes onReturnUrlRedirect with sanitized returnUrl when user selects a saved account", async () => {
    const redirectSpy = vi.fn();
    render(
      <UidEnrollForm
        initialActiveCodes={[]}
        returnUrl="/vi/guides/heroes/encyclopedia#comments"
        onReturnUrlRedirect={redirectSpy}
      />
    );

    const savedBtn = screen.getByText("DragonSlayer");
    fireEvent.click(savedBtn);

    await waitFor(() => {
      expect(selectAccountMock).toHaveBeenCalled();
      expect(redirectSpy).toHaveBeenCalledWith(
        "/vi/guides/heroes/encyclopedia#comments"
      );
    });
  });
});

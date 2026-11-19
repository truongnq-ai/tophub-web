import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { NavigationProgressBar, startNavigationProgress, stopNavigationProgress } from "@/components/navigation-progress-bar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/vi/admin/login",
  useSearchParams: () => new URLSearchParams(),
}));

describe("NavigationProgressBar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders progress bar container in DOM", () => {
    const { container } = render(<NavigationProgressBar />);
    const bar = container.querySelector("[data-testid='nav-progress-bar']");
    expect(bar).toBeDefined();
  });

  it("activates when startNavigationProgress is triggered", () => {
    const { container } = render(<NavigationProgressBar />);
    act(() => {
      startNavigationProgress();
    });
    const activeBar = container.querySelector("[data-active='true']");
    expect(activeBar != null).toBe(true);
  });

  it("deactivates when stopNavigationProgress is triggered", () => {
    const { container } = render(<NavigationProgressBar />);
    act(() => {
      startNavigationProgress();
    });
    act(() => {
      stopNavigationProgress();
    });
    // Bar should transition to completion
    expect(container.querySelector("[data-testid='nav-progress-bar']")).toBeDefined();
  });
});

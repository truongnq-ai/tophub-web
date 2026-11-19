import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Enhanced Button Component — Loading State", () => {
  it("renders children normally when loading is false", () => {
    render(<Button>Xác nhận</Button>);
    const button = screen.getByRole("button", { name: "Xác nhận" });
    expect(button).toBeDefined();
    expect(button.hasAttribute("disabled")).toBe(false);
    expect(button.hasAttribute("aria-busy")).toBe(false);
  });

  it("applies disabled and aria-busy='true' when loading is true", () => {
    render(<Button loading>Xác nhận</Button>);
    const button = screen.getByRole("button");
    expect(button.hasAttribute("disabled")).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
  });

  it("renders a spinner with animate-spin when loading is true", () => {
    const { container } = render(<Button loading>Xác nhận</Button>);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner != null).toBe(true);
  });

  it("renders loadingText when loading is true and loadingText is provided", () => {
    render(<Button loading loadingText="Đang xử lý...">Xác nhận</Button>);
    expect(screen.getByText("Đang xử lý...")).toBeDefined();
    expect(screen.queryByText("Xác nhận")).toBeNull();
  });

  it("preserves children when loadingText is not provided", () => {
    render(<Button loading>Xác nhận</Button>);
    expect(screen.getByText("Xác nhận")).toBeDefined();
  });

  it("prevents onClick execution when loading is true", () => {
    const handleClick = vi.fn();
    render(<Button loading onClick={handleClick}>Xác nhận</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

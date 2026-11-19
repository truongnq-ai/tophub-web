import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminLoginPage from "@/app/[locale]/admin/login/page";
import * as adminActions from "@/actions/admin";

const pushMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
}));

describe("AdminLoginPage — Loading FSM & Double-Submit Guard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("disables submit button and shows loading while authenticating", async () => {
    let resolveLogin: (val: any) => void;
    const loginPromise = new Promise((resolve) => {
      resolveLogin = resolve;
    });

    vi.spyOn(adminActions, "adminLoginAction").mockReturnValue(loginPromise as any);

    render(<AdminLoginPage />);

    const userInput = screen.getByPlaceholderText("admin");
    const passInput = screen.getByPlaceholderText("••••••••");
    const submitBtn = screen.getByRole("button", { name: "Đăng Nhập Quản Trị" });

    fireEvent.change(userInput, { target: { value: "superadmin" } });
    fireEvent.change(passInput, { target: { value: "secret123" } });

    fireEvent.click(submitBtn);

    // During authentication
    await waitFor(() => {
      expect(submitBtn.hasAttribute("disabled")).toBe(true);
      expect(screen.getByText("Đang xác thực...")).toBeDefined();
    });

    // Inputs must be disabled during authentication
    expect(userInput.hasAttribute("disabled")).toBe(true);
    expect(passInput.hasAttribute("disabled")).toBe(true);

    // Resolve login successfully
    resolveLogin!({
      success: true,
      data: { token: "fake-jwt-token" },
    });

    // After success, it must transition to redirecting and NOT reset to idle!
    await waitFor(() => {
      expect(screen.getByText("Đang chuyển hướng...")).toBeDefined();
      expect(submitBtn.hasAttribute("disabled")).toBe(true);
      expect(pushMock).toHaveBeenCalledWith("/vi/admin/dashboard");
      expect(refreshMock).toHaveBeenCalled();
    });
  });

  it("resets to idle and displays error when authentication fails", async () => {
    vi.spyOn(adminActions, "adminLoginAction").mockResolvedValue({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Sai tài khoản hoặc mật khẩu" },
    } as any);

    render(<AdminLoginPage />);

    const userInput = screen.getByPlaceholderText("admin");
    const passInput = screen.getByPlaceholderText("••••••••");
    const submitBtn = screen.getByRole("button", { name: "Đăng Nhập Quản Trị" });

    fireEvent.change(userInput, { target: { value: "wronguser" } });
    fireEvent.change(passInput, { target: { value: "wrongpass" } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Sai tài khoản hoặc mật khẩu")).toBeDefined();
      expect(screen.getByText("Đăng Nhập Quản Trị")).toBeDefined();
      expect(submitBtn.hasAttribute("disabled")).toBe(false);
      expect(userInput.hasAttribute("disabled")).toBe(false);
    });
  });
});

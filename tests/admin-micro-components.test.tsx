import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { AccountAvatar } from "../src/components/dashboard/admin/account-avatar";
import { ServerTag } from "../src/components/dashboard/admin/server-tag";
import { AdminTooltip } from "../src/components/dashboard/admin/admin-tooltip";

describe("Admin Micro-Components", () => {
  describe("AccountAvatar", () => {
    it("should render initials for multi-word nickname", () => {
      render(<AccountAvatar nickname="DragonSlayer" />);
      expect(screen.getByText("DS")).toBeDefined();
    });

    it("should render first 2 letters for single-word nickname", () => {
      render(<AccountAvatar nickname="Hero" />);
      expect(screen.getByText("HE")).toBeDefined();
    });

    it("should fallback to 'U' when nickname is missing or empty", () => {
      render(<AccountAvatar nickname="" />);
      expect(screen.getByText("U")).toBeDefined();
    });

    it("should render PRO badge indicator when isPro is true", () => {
      const { container } = render(<AccountAvatar nickname="VIPPlayer" isPro={true} />);
      const proRing = container.querySelector(".ring-amber-500\\/60");
      expect(proRing).toBeDefined();
    });
  });

  describe("ServerTag", () => {
    it("should render server tag format [S1024]", () => {
      render(<ServerTag serverId="1024" />);
      expect(screen.getByText("[S1024]")).toBeDefined();
    });

    it("should render [S?] when serverId is empty or undefined", () => {
      render(<ServerTag serverId="" />);
      expect(screen.getByText("[S?]")).toBeDefined();
    });
  });

  describe("AdminTooltip", () => {
    it("should render children and tooltip balloon content", () => {
      render(
        <AdminTooltip content="Đang kết nối ổn định">
          <button type="button">Trigger</button>
        </AdminTooltip>
      );
      expect(screen.getByText("Trigger")).toBeDefined();
      expect(screen.getByText("Đang kết nối ổn định")).toBeDefined();
    });
  });
});

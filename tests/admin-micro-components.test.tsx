import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { AccountAvatar } from "../src/components/dashboard/admin/account-avatar";
import { ServerTag } from "../src/components/dashboard/admin/server-tag";
import { AdminTooltip } from "../src/components/dashboard/admin/admin-tooltip";
import { formatServerCode, compareServerIds } from "../src/lib/utils";

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

  describe("formatServerCode & compareServerIds utilities", () => {
    it("should normalize numeric and S-prefixed server IDs idempotently without duplicating S", () => {
      expect(formatServerCode("S10957")).toBe("S10957");
      expect(formatServerCode("s10957")).toBe("S10957");
      expect(formatServerCode("SS10957")).toBe("S10957");
      expect(formatServerCode("1024")).toBe("S1024");
      expect(formatServerCode("Server 1024")).toBe("S1024");
      expect(formatServerCode("Server #1028")).toBe("S1028");
      expect(formatServerCode("Server #S10957")).toBe("S10957");
    });

    it("should preserve special identifiers like ADMIN and Global and fallback to S? on empty values", () => {
      expect(formatServerCode("ADMIN")).toBe("ADMIN");
      expect(formatServerCode(" admin ")).toBe("ADMIN");
      expect(formatServerCode("Global")).toBe("Global");
      expect(formatServerCode("")).toBe("S?");
      expect(formatServerCode("   ")).toBe("S?");
      expect(formatServerCode("?")).toBe("S?");
      expect(formatServerCode("S?")).toBe("S?");
      expect(formatServerCode(undefined)).toBe("S?");
      expect(formatServerCode(null)).toBe("S?");
    });

    it("should sort server IDs numerically so S999 comes before S10957", () => {
      const list = ["S10957", "999", "S1024"];
      expect(list.sort(compareServerIds)).toEqual(["999", "S1024", "S10957"]);
    });
  });

  describe("ServerTag", () => {
    it("should render server tag format [S1024] when given numeric '1024'", () => {
      render(<ServerTag serverId="1024" />);
      expect(screen.getByText("[S1024]")).toBeDefined();
    });

    it("should render [S10957] without duplicate S when given 'S10957' or 'SS10957'", () => {
      const { rerender } = render(<ServerTag serverId="S10957" />);
      expect(screen.getByText("[S10957]")).toBeDefined();
      expect(screen.queryByText("[SS10957]")).toBeNull();

      rerender(<ServerTag serverId="SS10957" />);
      expect(screen.getByText("[S10957]")).toBeDefined();
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

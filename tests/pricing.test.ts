import { describe, it, expect } from "vitest";

describe("Pricing Calculations", () => {
  const baseMonthlyPrice = 50000; // 50,000 VND / month

  it("should apply correct discount for billing cycles", () => {
    const cycles = [
      { months: 1, discount: 0, expected: 50000 },
      { months: 3, discount: 0.1, expected: 135000 },
      { months: 6, discount: 0.2, expected: 240000 },
      { months: 12, discount: 0.3, expected: 420000 },
    ];

    cycles.forEach((c) => {
      const total = Math.round(baseMonthlyPrice * c.months * (1 - c.discount));
      expect(total).toBe(c.expected);
    });
  });

  it("should format VND currency accurately", () => {
    const amount = 135000;
    const formatted = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
    expect(formatted).toContain("135.000");
  });
});

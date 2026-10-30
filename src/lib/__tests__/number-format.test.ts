import { describe, expect, it } from "vitest";
import {
  formatCompactNumber,
  formatExactNumber,
  formatGameNumberParts,
  parseCompactNumberInput,
} from "../number-format";

describe("number-format — Shared FE Game Number Formatter (K / M / B / T)", () => {
  describe("formatExactNumber", () => {
    it("formats integers with standard comma thousands separators", () => {
      expect(formatExactNumber(0)).toBe("0");
      expect(formatExactNumber(988)).toBe("988");
      expect(formatExactNumber(3163)).toBe("3,163");
      expect(formatExactNumber(36160000)).toBe("36,160,000");
      expect(formatExactNumber(216960000)).toBe("216,960,000");
      expect(formatExactNumber(-12500)).toBe("-12,500");
    });

    it("handles NaN and non-finite inputs safely", () => {
      expect(formatExactNumber(Number.NaN)).toBe("0");
      expect(formatExactNumber(Number.POSITIVE_INFINITY)).toBe("0");
    });
  });

  describe("formatCompactNumber", () => {
    it("keeps numbers below default threshold (1,000) uncompacted", () => {
      expect(formatCompactNumber(0)).toBe("0");
      expect(formatCompactNumber(988)).toBe("988");
      expect(formatCompactNumber(999)).toBe("999");
    });

    it("supports custom threshold (e.g., 10,000 for Hero/Spirit Shards)", () => {
      expect(formatCompactNumber(3163, { threshold: 10_000 })).toBe("3,163");
      expect(formatCompactNumber(9999, { threshold: 10_000 })).toBe("9,999");
      expect(formatCompactNumber(10000, { threshold: 10_000 })).toBe("10K");
    });

    it("formats K (thousand), M (million), B (billion), and T (trillion) accurately", () => {
      expect(formatCompactNumber(1_000)).toBe("1K");
      expect(formatCompactNumber(1_500)).toBe("1.5K");
      expect(formatCompactNumber(371_745)).toBe("371.75K");
      expect(formatCompactNumber(22_190_845)).toBe("22.19M");
      expect(formatCompactNumber(36_160_000)).toBe("36.16M");
      expect(formatCompactNumber(216_960_000)).toBe("216.96M");
      expect(formatCompactNumber(1_095_480_000)).toBe("1.1B");
      expect(formatCompactNumber(2_450_000_000_000)).toBe("2.45T");
    });

    it("prevents boundary rollover bug (e.g., 999,999 -> 1M instead of 1000K)", () => {
      expect(formatCompactNumber(999_999)).toBe("1M");
      expect(formatCompactNumber(999_995)).toBe("1M");
      expect(formatCompactNumber(999_999_999)).toBe("1B");
      expect(formatCompactNumber(999_999_999_999)).toBe("1T");
    });

    it("supports keepTrailingZeros, roundingMode='floor', and signDisplay='always'", () => {
      expect(formatCompactNumber(1_500_000, { keepTrailingZeros: true })).toBe(
        "1.50M"
      );
      expect(
        formatCompactNumber(1_599_000, { maxDecimals: 1, roundingMode: "floor" })
      ).toBe("1.5M");
      expect(formatCompactNumber(12_500_000, { signDisplay: "always" })).toBe(
        "+12.5M"
      );
      expect(formatCompactNumber(-12_500_000, { signDisplay: "always" })).toBe(
        "-12.5M"
      );
    });
  });

  describe("formatGameNumberParts", () => {
    it("splits numericPart, suffix, compact, and exact for MD3 UI rendering", () => {
      const parts = formatGameNumberParts(216_960_000);
      expect(parts).toEqual({
        raw: 216_960_000,
        compact: "216.96M",
        numericPart: "216.96",
        suffix: "M",
        exact: "216,960,000",
        isCompacted: true,
      });

      const smallParts = formatGameNumberParts(988);
      expect(smallParts).toEqual({
        raw: 988,
        compact: "988",
        numericPart: "988",
        suffix: "",
        exact: "988",
        isCompacted: false,
      });
    });
  });

  describe("parseCompactNumberInput", () => {
    it("parses K, M, B, T suffixes (case-insensitive, dot or comma decimal)", () => {
      expect(parseCompactNumberInput("500k")).toBe(500_000);
      expect(parseCompactNumberInput("500K")).toBe(500_000);
      expect(parseCompactNumberInput("36.16m")).toBe(36_160_000);
      expect(parseCompactNumberInput("36,16M")).toBe(36_160_000);
      expect(parseCompactNumberInput("1.5b")).toBe(1_500_000_000);
      expect(parseCompactNumberInput("2.45T")).toBe(2_450_000_000_000);
    });

    it("parses plain numbers and comma-separated numbers", () => {
      expect(parseCompactNumberInput("58,350,845")).toBe(58_350_845);
      expect(parseCompactNumberInput("988")).toBe(988);
      expect(parseCompactNumberInput(1200)).toBe(1200);
    });

    it("returns 0 safely for empty, negative, or invalid strings", () => {
      expect(parseCompactNumberInput("")).toBe(0);
      expect(parseCompactNumberInput("   ")).toBe(0);
      expect(parseCompactNumberInput("invalid")).toBe(0);
      expect(parseCompactNumberInput("-50m")).toBe(0);
    });
  });
});

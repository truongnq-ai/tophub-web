import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { countMicroTextOccurrences } from "./utils/md3-audit";

const CALCULATORS_DIR = path.resolve(__dirname, "../src/components/calculators");
const SHARED_TRACK2_FILES: readonly string[] = [
  path.resolve(__dirname, "../src/components/guides/guides-feedback-notice.tsx"),
];

/** min-h khai báo dưới 44px (0–43px) = vùng chạm vi phạm MASTER §3.1. */
const SUB_44PX_MIN_HEIGHT_REGEX = /min-h-\[(?:[0-3]?\d|4[0-3])px\]/g;
/** Eyebrow `font-mono` + `uppercase` trong cùng 1 chuỗi class = anti-pattern chữ Việt (MASTER §1.1). */
const MONO_UPPERCASE_CLASS_REGEX =
  /"[^"\n]*\bfont-mono\b[^"\n]*\buppercase\b[^"\n]*"|"[^"\n]*\buppercase\b[^"\n]*\bfont-mono\b[^"\n]*"/g;
const PRIMITIVES_IMPORT = 'from "./calculator-md3-primitives"';

interface Offender {
  readonly file: string;
  readonly count: number;
}

function listCalculatorSources(): string[] {
  return fs
    .readdirSync(CALCULATORS_DIR)
    .filter((name) => /\.(ts|tsx)$/.test(name))
    .map((name) => path.join(CALCULATORS_DIR, name));
}

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

function collectOffenders(
  files: readonly string[],
  counter: (source: string) => number
): Offender[] {
  return files
    .map((file) => ({ file: path.basename(file), count: counter(readFile(file)) }))
    .filter((entry) => entry.count > 0);
}

describe("Track 2 MD3 Compliance Gate — khuôn mẫu cho máy tính 1.1 ➔ 9.2", () => {
  it("scans every calculators source file (current and future)", () => {
    const names = listCalculatorSources().map((file) => path.basename(file));
    expect(names).toContain("calculator-md3-primitives.tsx");
    expect(names.length).toBeGreaterThanOrEqual(10);
  });

  it("forbids text-[8px..11px] in all calculators sources and the shared feedback notice", () => {
    expect(
      collectOffenders(
        [...listCalculatorSources(), ...SHARED_TRACK2_FILES],
        countMicroTextOccurrences
      )
    ).toEqual([]);
  });

  it("forbids touch targets declared below 44px", () => {
    expect(
      collectOffenders(
        [...listCalculatorSources(), ...SHARED_TRACK2_FILES],
        (source) => source.match(SUB_44PX_MIN_HEIGHT_REGEX)?.length ?? 0
      )
    ).toEqual([]);
  });

  it("forbids font-mono + uppercase eyebrow class strings", () => {
    expect(
      collectOffenders(
        [...listCalculatorSources(), ...SHARED_TRACK2_FILES],
        (source) => source.match(MONO_UPPERCASE_CLASS_REGEX)?.length ?? 0
      )
    ).toEqual([]);
  });

  it("requires every *-calculator.tsx to compose CalculatorToolHeader from the MD3 primitives", () => {
    const calculatorFiles = listCalculatorSources().filter((file) =>
      /-calculator\.tsx$/.test(file)
    );
    expect(calculatorFiles.length).toBeGreaterThanOrEqual(3);
    for (const file of calculatorFiles) {
      const source = readFile(file);
      expect(source, path.basename(file)).toContain(PRIMITIVES_IMPORT);
      expect(source, path.basename(file)).toContain("<CalculatorToolHeader");
    }
  });

  it("requires every *-selector.tsx to use the 44px CalculatorStepperButton", () => {
    const selectorFiles = listCalculatorSources().filter((file) =>
      /-selector\.tsx$/.test(file)
    );
    expect(selectorFiles.length).toBeGreaterThanOrEqual(3);
    for (const file of selectorFiles) {
      const source = readFile(file);
      expect(source, path.basename(file)).toContain(PRIMITIVES_IMPORT);
      expect(source, path.basename(file)).toContain("<CalculatorStepperButton");
    }
  });
});

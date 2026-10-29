import fs from "node:fs";
import path from "node:path";

/** MASTER.md §1.2 — Zero Sub-12px Policy. */
export const FORBIDDEN_MICRO_TEXT_REGEX = /text-\[(?:8|9|10|11)px\]/;
const FORBIDDEN_MICRO_TEXT_GLOBAL_REGEX = /text-\[(?:8|9|10|11)px\]/g;

/**
 * Class viền 4 cạnh `border` đứng riêng.
 * Không khớp: `border-b`, `border-t`, `border-0`, `border-amber-500/30`, `sm:border`, `divide-y`.
 */
export const ALL_SIDE_BORDER_REGEX = /(?:^|\s)border(?=\s|$)/;

export const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

/** Vùng ngoài phạm vi Track 2 hoặc overlay nổi — bị loại khỏi mọi phép đo DOM. */
export const DEFAULT_MD3_AUDIT_IGNORE = [
  '[data-testid="game-asset-frame"]',
  '[data-md3-overlay="true"]',
  '[data-testid="guide-comments-section"]',
  "#comments",
].join(", ");

const CONTAINER_TAGS: ReadonlySet<string> = new Set([
  "DIV",
  "SECTION",
  "ASIDE",
  "NAV",
  "HEADER",
  "ARTICLE",
  "UL",
  "OL",
  "LI",
  "TABLE",
]);

const TEXT_NODE_TYPE = 3;

function classOf(el: Element): string {
  return el.getAttribute("class") ?? "";
}

/** Đọc file nguồn theo đường dẫn tương đối từ thư mục `tophub-web/`. */
export function readSource(relativePath: string): string {
  return fs.readFileSync(
    path.resolve(__dirname, "..", "..", relativePath),
    "utf-8"
  );
}

export function countMicroTextOccurrences(source: string): number {
  return source.match(FORBIDDEN_MICRO_TEXT_GLOBAL_REGEX)?.length ?? 0;
}

/** Chỉ tính khung chứa (div/section/ul/li/table…), không tính button/input/a. */
export function isBorderedContainer(el: Element): boolean {
  return CONTAINER_TAGS.has(el.tagName) && ALL_SIDE_BORDER_REGEX.test(classOf(el));
}

/** Độ sâu lồng tối đa của các khung có viền 4 cạnh (MASTER §2.1: phải ≤ 1). */
export function getMaxBorderedContainerDepth(
  root: Element,
  ignoreSelector: string = DEFAULT_MD3_AUDIT_IGNORE
): number {
  const walk = (el: Element, depth: number): number => {
    const ownDepth = isBorderedContainer(el) ? depth + 1 : depth;
    let maxDepth = ownDepth;
    for (const child of Array.from(el.children)) {
      if (child.matches(ignoreSelector)) continue;
      maxDepth = Math.max(maxDepth, walk(child, ownDepth));
    }
    return maxDepth;
  };
  return walk(root, 0);
}

export function findMicroTextElements(
  root: Element,
  ignoreSelector: string = DEFAULT_MD3_AUDIT_IGNORE
): Element[] {
  return Array.from(root.querySelectorAll("[class]")).filter(
    (el) =>
      el.closest(ignoreSelector) === null &&
      FORBIDDEN_MICRO_TEXT_REGEX.test(classOf(el))
  );
}

/** Trả về các đoạn text tiếng Việt có dấu nằm TRỰC TIẾP trong phần tử `font-mono`. */
export function findMonoElementsWithVietnamese(
  root: Element,
  ignoreSelector: string = DEFAULT_MD3_AUDIT_IGNORE
): string[] {
  const offenders: string[] = [];
  root.querySelectorAll(".font-mono").forEach((el) => {
    if (el.closest(ignoreSelector) !== null) return;
    const ownText = Array.from(el.childNodes)
      .filter((node) => node.nodeType === TEXT_NODE_TYPE)
      .map((node) => node.textContent ?? "")
      .join("");
    if (VI_DIACRITIC_REGEX.test(ownText)) {
      offenders.push(ownText.trim());
    }
  });
  return offenders;
}

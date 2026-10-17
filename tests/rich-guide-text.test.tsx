import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import {
  RichGuideText,
  splitStructuredSentences,
} from "../src/components/guides/blocks/rich-guide-text";
import { ARTICLE_5_1_GEAR_OVERVIEW } from "../src/content/guides/groups/group-5/5.1-gear-overview";

describe("RichGuideText Semantic HTML Engine (DEC-V4-01)", () => {
  it("renders **bold** as <strong>bold</strong> and strips raw ** markers", () => {
    const { container } = render(
      <RichGuideText text="Ưu tiên nâng **Pyromancer** lên tối đa." />
    );

    const strong = container.querySelector("strong");
    expect(strong).not.toBeNull();
    expect(strong?.textContent).toBe("Pyromancer");
    expect(container.textContent).toBe("Ưu tiên nâng Pyromancer lên tối đa.");
    expect(container.textContent).not.toContain("**");
  });

  it("renders `560 Mảnh` as semantic <code>560 Mảnh</code> and strips raw backticks", () => {
    const { container } = render(
      <RichGuideText text="Mốc thức tỉnh cần `560 Mảnh` để mở kỹ năng." />
    );

    const code = container.querySelector("code");
    expect(code).not.toBeNull();
    expect(code?.textContent).toBe("560 Mảnh");
    expect(container.textContent).not.toContain("`");
  });

  it("parses nested inline tokens (**Điểm gãy `560 Mảnh`**) cleanly without leaving ** or `", () => {
    const { container } = render(
      <RichGuideText text="Hướng tới **Điểm gãy `560 Mảnh`** hoặc **`9 Hồn Đá Đỏ`**." />
    );

    const strongElements = container.querySelectorAll("strong");
    const codeElements = container.querySelectorAll("code");
    expect(strongElements.length).toBeGreaterThanOrEqual(2);
    expect(codeElements.length).toBe(2);
    expect(codeElements[0].textContent).toBe("560 Mảnh");
    expect(codeElements[1].textContent).toBe("9 Hồn Đá Đỏ");
    expect(container.textContent).not.toContain("**");
    expect(container.textContent).not.toContain("`");
  });

  it("keeps single asterisks in mathematical expressions (5 * 10 = 50) untouched", () => {
    const { container } = render(
      <RichGuideText text="Công thức tính điểm: 5 * 10 = 50 điểm (5★ Mythic)." />
    );

    expect(container.querySelector("strong")).toBeNull();
    expect(container.textContent).toBe(
      "Công thức tính điểm: 5 * 10 = 50 điểm (5★ Mythic)."
    );
  });

  it("renders multiline bullet strings (\\n• Item 1\\n• Item 2) as <ul> with 2 <li> elements", () => {
    const { container } = render(
      <RichGuideText
        text={"Quy tắc hành động:\n• Item 1: Dồn tài nguyên Đội 1\n• Item 2: Tích lũy `560 Mảnh`"}
      />
    );

    const ul = container.querySelector("ul");
    expect(ul).not.toBeNull();
    const items = ul?.querySelectorAll("li") ?? [];
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain("Item 1: Dồn tài nguyên Đội 1");
    expect(items[1].querySelector("code")?.textContent).toBe("560 Mảnh");
  });

  it("renders multiline numbered strings (\\n1. Step A\\n2. Step B) as <ol> with 2 <li> elements and step badges", () => {
    const { container } = render(
      <RichGuideText text={"1. Step A: Mở khóa **Lâu Đài**\n2. Step B: Đạt mốc `Lv.40`"} />
    );

    const ol = container.querySelector("ol");
    expect(ol).not.toBeNull();
    const items = ol?.querySelectorAll("li") ?? [];
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain("01");
    expect(items[0].textContent).toContain("Step A: Mở khóa Lâu Đài");
    expect(items[1].textContent).toContain("02");
    expect(items[1].querySelector("code")?.textContent).toBe("Lv.40");
  });

  it("splits a 450-character dense paragraph in variant='structured-brief' into a lead <p> headline and a <ul> micro-bullet list without corrupting Lv.40 or 1.000", () => {
    const denseParagraph = `${ARTICLE_5_1_GEAR_OVERVIEW.tldr!.coreRule.vi} Giữ nguyên mốc Lv.40 và định mức 1.000 Kim Cương ở bài 5.1 mà không bị cắt nhầm câu.`;

    const sentences = splitStructuredSentences(denseParagraph);
    expect(sentences.length).toBeGreaterThanOrEqual(3);

    const { container } = render(
      <RichGuideText text={denseParagraph} variant="structured-brief" />
    );

    const leadHeadline = container.querySelector("p");
    const bulletList = container.querySelector("ul");
    expect(leadHeadline).not.toBeNull();
    expect(bulletList).not.toBeNull();
    expect(leadHeadline?.textContent).toContain(
      "Top Heroes vận hành 3 hệ thống trang bị hoàn toàn độc lập"
    );

    const listItems = bulletList?.querySelectorAll("li") ?? [];
    expect(listItems.length).toBeGreaterThanOrEqual(2);
    expect(container.textContent).toContain("Lv.40");
    expect(container.textContent).toContain("1.000 Kim Cương");
    expect(container.textContent).toContain("5.1");
  });

  it("splits sentences ending with numbers, S1, or T10 while preserving Lv.40 and 1.000 in variant='structured-brief'", () => {
    const denseWithTrailingNumber =
      "Dồn toàn bộ tài nguyên nâng cấp vào Đội hình 1. Tuyệt đối không chia đều mảnh vàng cho tướng phụ ở S1. Sau khi đạt lính T10. Bạn mới bắt đầu mở rộng sang đội hình thứ hai ở mốc Lv.40 với 1.000 Đá.";

    const { container } = render(
      <RichGuideText text={denseWithTrailingNumber} variant="structured-brief" />
    );

    const listItems = container.querySelectorAll("ul > li");
    expect(listItems.length).toBe(3);
    expect(container.querySelector("p")?.textContent).toContain(
      "Dồn toàn bộ tài nguyên nâng cấp vào Đội hình 1."
    );
    expect(listItems[0].textContent).toContain(
      "Tuyệt đối không chia đều mảnh vàng cho tướng phụ ở S1."
    );
    expect(listItems[2].textContent).toContain("Lv.40 với 1.000 Đá.");
  });
});


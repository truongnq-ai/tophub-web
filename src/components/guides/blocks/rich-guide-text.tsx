import React from "react";
import { ArrowRight } from "lucide-react";
import { GameInlineChip } from "@/components/guides/media/game-inline-chip";
import { resolveEntityFromCodeToken } from "@/content/guides/asset-registry";
import type { GuideLocale } from "@/content/guides/types";
import { cn } from "@/lib/utils";

export type RichGuideTextVariant = "default" | "inline" | "structured-brief";
export type RichGuideTextAccent =
  | "amber"
  | "emerald"
  | "rose"
  | "sky"
  | "neutral";
export type RichGuideAccentColor = RichGuideTextAccent;

export interface RichGuideTextProps {
  text: string;
  variant?: RichGuideTextVariant;
  inline?: boolean;
  accentColor?: RichGuideTextAccent;
  locale?: GuideLocale;
  disableEntityChips?: boolean;
  className?: string;
}

export interface InlineParseOptions {
  readonly locale?: GuideLocale;
  readonly seenEntityIds?: Set<string>;
  readonly disableEntityChips?: boolean;
}

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỠỲÝỴỶỸĐ]/;

const ACCENT_STYLES: Record<
  RichGuideTextAccent,
  {
    code: string;
    bullet: string;
    stepBadge: string;
    arrow: string;
  }
> = {
  amber: {
    code: "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-300",
    bullet: "bg-amber-500/70",
    stepBadge:
      "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    arrow: "text-amber-500/80",
  },
  emerald: {
    code: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    bullet: "bg-emerald-500/70",
    stepBadge:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    arrow: "text-emerald-500/80",
  },
  rose: {
    code: "border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-300",
    bullet: "bg-rose-500/70",
    stepBadge:
      "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    arrow: "text-rose-500/80",
  },
  sky: {
    code: "border-sky-500/25 bg-sky-500/10 text-sky-600 dark:text-sky-300",
    bullet: "bg-sky-500/70",
    stepBadge:
      "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    arrow: "text-sky-500/80",
  },
  neutral: {
    code: "border-border/80 bg-muted/60 text-foreground/90",
    bullet: "bg-muted-foreground/70",
    stepBadge: "border-border/80 bg-muted/60 text-muted-foreground",
    arrow: "text-muted-foreground/80",
  },
};

const BULLET_LINE_REGEX = /^[•●▪]\s*|^[-*]\s+/;
const NUMBERED_LINE_REGEX =
  /^(?:(\d+)[.)]\s+|(?:Bước|Step)\s*(\d+)\s*[:.-]\s*)/i;
const ABBREVIATION_END_REGEX =
  /^(?:\d+)|(?:^|[\s(])(?:Lv|vs|Mr|Mrs|Dr|St|No|Fig|Bài|Mục|Tab)$/i;

/**
 * Splits plain text segments on progression arrows (`➔` or ` -> `) and renders
 * semantic inline `<ArrowRight />` icons while preserving surrounding text.
 */
function parseProgressionArrows(
  segment: string,
  accentColor: RichGuideTextAccent,
  keyPrefix: string
): React.ReactNode[] {
  // Clean up any stray unmatched `**` or backticks so raw Markdown never leaks
  const sanitized = segment.replace(/\*\*/g, "").replace(/`/g, "");
  if (!sanitized) return [];

  const parts = sanitized.split(/(➔|\s+->\s+)/g);
  if (parts.length === 1) {
    return [sanitized];
  }

  const arrowClass = ACCENT_STYLES[accentColor].arrow;
  const nodes: React.ReactNode[] = [];

  parts.forEach((part, idx) => {
    if (!part) return;
    if (part === "➔" || /^\s+->\s+$/.test(part)) {
      nodes.push(
        <React.Fragment key={`${keyPrefix}-arr-${idx}`}>
          {" "}
          <ArrowRight
            className={cn(
              "mx-1 inline-block h-3.5 w-3.5 -translate-y-[1px]",
              arrowClass
            )}
            aria-hidden="true"
          />{" "}
        </React.Fragment>
      );
    } else {
      nodes.push(part);
    }
  });

  return nodes;
}

/**
 * Deterministic, zero-XSS inline tokenizer that converts `**bold**`, `` `code` ``,
 * nested tokens (e.g. `**Điểm gãy `560 Mảnh`**`), and progression arrows (`➔`, ` -> `)
 * into pure React elements without touching single math asterisks (`5 * 10 = 50`).
 */
export function parseInlineTokens(
  input: string,
  accentColor: RichGuideTextAccent = "amber",
  keyPrefix = "in",
  options?: InlineParseOptions
): React.ReactNode[] {
  if (!input) return [];

  const nodes: React.ReactNode[] = [];
  let remaining = input;
  let tokenCounter = 0;

  while (remaining.length > 0) {
    const boldMatch = /\*\*([\s\S]+?)\*\*/.exec(remaining);
    const codeMatch = /`([^`]+)`/.exec(remaining);

    if (!boldMatch && !codeMatch) {
      nodes.push(
        ...parseProgressionArrows(
          remaining,
          accentColor,
          `${keyPrefix}-txt-${tokenCounter++}`
        )
      );
      break;
    }

    const useBold =
      boldMatch !== null &&
      (codeMatch === null || boldMatch.index <= codeMatch.index);

    if (useBold && boldMatch) {
      if (boldMatch.index > 0) {
        const before = remaining.slice(0, boldMatch.index);
        nodes.push(
          ...parseProgressionArrows(
            before,
            accentColor,
            `${keyPrefix}-pre-${tokenCounter++}`
          )
        );
      }

      const innerBold = boldMatch[1];
      const idx = tokenCounter++;
      nodes.push(
        <strong
          key={`${keyPrefix}-b-${idx}`}
          className="font-semibold text-foreground"
        >
          {parseInlineTokens(
            innerBold,
            accentColor,
            `${keyPrefix}-b-${idx}`,
            options
          )}
        </strong>
      );

      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
    } else if (codeMatch) {
      if (codeMatch.index > 0) {
        const before = remaining.slice(0, codeMatch.index);
        nodes.push(
          ...parseProgressionArrows(
            before,
            accentColor,
            `${keyPrefix}-pre-${tokenCounter++}`
          )
        );
      }

      const cleanCodeText = codeMatch[1].replace(/\*\*/g, "");
      const idx = tokenCounter++;
      const matchedEntity = options?.disableEntityChips
        ? undefined
        : resolveEntityFromCodeToken(cleanCodeText);

      if (matchedEntity) {
        const isFirstOccurrence =
          !options?.seenEntityIds || !options.seenEntityIds.has(matchedEntity.id);
        if (isFirstOccurrence && options?.seenEntityIds) {
          options.seenEntityIds.add(matchedEntity.id);
        }

        nodes.push(
          <GameInlineChip
            key={`${keyPrefix}-c-${idx}`}
            entity={matchedEntity}
            locale={options?.locale ?? "vi"}
            codeClassName={ACCENT_STYLES[accentColor].code}
            showIcon={isFirstOccurrence}
          >
            {parseProgressionArrows(
              cleanCodeText,
              accentColor,
              `${keyPrefix}-c-${idx}`
            )}
          </GameInlineChip>
        );
      } else {
        const hasViDiacritics = VI_DIACRITIC_REGEX.test(cleanCodeText);
        nodes.push(
          <code
            key={`${keyPrefix}-c-${idx}`}
            className={cn(
              "mx-0.5 inline-flex items-center rounded-md border px-1.5 py-0.5 text-[0.88em] font-semibold transition-colors",
              hasViDiacritics ? "font-sans" : "font-mono",
              ACCENT_STYLES[accentColor].code
            )}
          >
            {parseProgressionArrows(
              cleanCodeText,
              accentColor,
              `${keyPrefix}-c-${idx}`
            )}
          </code>
        );
      }

      remaining = remaining.slice(codeMatch.index + codeMatch[0].length);
    }
  }

  return nodes;
}

/**
 * Splits a dense single-paragraph string into sentences/clauses at top-level `. ` or `; `
 * without breaking decimals (`Lv.10`, `5.1`, `1.000`), abbreviations (`Lv. 35`, `S1.`),
 * parentheticals, or backtick code pills.
 */
export function splitStructuredSentences(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const sentences: string[] = [];
  let current = "";
  let parenDepth = 0;
  let inBackticks = false;

  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];

    if (ch === "`") {
      inBackticks = !inBackticks;
      current += ch;
      continue;
    }

    if (!inBackticks) {
      if (ch === "(") parenDepth++;
      else if (ch === ")" && parenDepth > 0) parenDepth--;
    }

    if (
      !inBackticks &&
      parenDepth === 0 &&
      (ch === "." || ch === ";") &&
      i + 1 < trimmed.length &&
      /\s/.test(trimmed[i + 1])
    ) {
      if (ch === "." && ABBREVIATION_END_REGEX.test(current)) {
        current += ch;
        continue;
      }

      current += ch;
      const pushed = current.trim();
      if (pushed) {
        sentences.push(pushed);
      }
      current = "";
      while (i + 1 < trimmed.length && /\s/.test(trimmed[i + 1])) {
        i++;
      }
      continue;
    }

    current += ch;
  }

  const tail = current.trim();
  if (tail) {
    sentences.push(tail);
  }

  // Fallback for >180-char single-sentence walls with top-level comma clauses
  if (sentences.length === 1 && trimmed.length > 180) {
    const commaClauses: string[] = [];
    let buf = "";
    let pDepth = 0;
    let inTick = false;

    for (let i = 0; i < trimmed.length; i++) {
      const c = trimmed[i];
      if (c === "`") inTick = !inTick;
      if (!inTick) {
        if (c === "(") pDepth++;
        else if (c === ")" && pDepth > 0) pDepth--;
      }

      if (
        !inTick &&
        pDepth === 0 &&
        c === "," &&
        i + 1 < trimmed.length &&
        /\s/.test(trimmed[i + 1]) &&
        buf.trim().length >= 55
      ) {
        commaClauses.push(buf.trim());
        buf = "";
        while (i + 1 < trimmed.length && /\s/.test(trimmed[i + 1])) {
          i++;
        }
        continue;
      }
      buf += c;
    }

    if (buf.trim()) {
      commaClauses.push(buf.trim());
    }
    if (commaClauses.length >= 2) {
      return commaClauses;
    }
  }

  return sentences;
}

type ParsedBlockGroup =
  | { kind: "paragraph"; lines: string[] }
  | { kind: "ul"; items: string[] }
  | {
      kind: "ol";
      items: Array<{ stepNum: number; content: string }>;
    };

function groupLinesIntoBlocks(rawLines: string[]): ParsedBlockGroup[] {
  const groups: ParsedBlockGroup[] = [];

  for (const rawLine of rawLines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (BULLET_LINE_REGEX.test(line)) {
      const content = line.replace(BULLET_LINE_REGEX, "").trim();
      const prev = groups[groups.length - 1];
      if (prev && prev.kind === "ul") {
        prev.items.push(content);
      } else {
        groups.push({ kind: "ul", items: [content] });
      }
      continue;
    }

    const numMatch = NUMBERED_LINE_REGEX.exec(line);
    if (numMatch) {
      const stepNum = Number.parseInt(numMatch[1] ?? numMatch[2] ?? "1", 10);
      const content = line.slice(numMatch[0].length).trim();
      const prev = groups[groups.length - 1];
      if (prev && prev.kind === "ol") {
        prev.items.push({ stepNum, content });
      } else {
        groups.push({ kind: "ol", items: [{ stepNum, content }] });
      }
      continue;
    }

    groups.push({ kind: "paragraph", lines: [line] });
  }

  return groups;
}

export function RichGuideText({
  text,
  variant = "default",
  inline = false,
  accentColor = "amber",
  locale,
  disableEntityChips = false,
  className,
}: RichGuideTextProps) {
  if (!text) return null;

  const resolvedLocale: GuideLocale =
    locale ?? (VI_DIACRITIC_REGEX.test(text) ? "vi" : "en");
  const effectiveVariant: RichGuideTextVariant = inline ? "inline" : variant;
  const accentStyle = ACCENT_STYLES[accentColor];

  if (effectiveVariant === "inline") {
    const inlineOptions: InlineParseOptions = {
      locale: resolvedLocale,
      seenEntityIds: new Set<string>(),
      disableEntityChips,
    };
    return (
      <span className={className}>
        {parseInlineTokens(text, accentColor, "inline", inlineOptions)}
      </span>
    );
  }

  const rawLines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (rawLines.length === 0) return null;

  if (effectiveVariant === "structured-brief") {
    const briefOptions: InlineParseOptions = {
      locale: resolvedLocale,
      seenEntityIds: new Set<string>(),
      disableEntityChips,
    };

    // Multiline structured brief: if first line is non-bullet and subsequent lines exist
    if (rawLines.length > 1) {
      const firstIsBullet =
        BULLET_LINE_REGEX.test(rawLines[0]) ||
        NUMBERED_LINE_REGEX.test(rawLines[0]);

      if (!firstIsBullet) {
        const leadLine = rawLines[0];
        const restItems = rawLines
          .slice(1)
          .map((l) =>
            l
              .replace(BULLET_LINE_REGEX, "")
              .replace(NUMBERED_LINE_REGEX, "")
              .trim()
          )
          .filter(Boolean);

        return (
          <div className={cn("space-y-1.5", className)}>
            <p className="font-semibold text-foreground leading-snug mb-2">
              {parseInlineTokens(leadLine, accentColor, "sb-lead", briefOptions)}
            </p>
            {restItems.length > 0 && (
              <ul className="space-y-1.5 text-sm sm:text-base text-muted-foreground">
                {restItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 leading-relaxed"
                  >
                    <span
                      className={cn(
                        "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                        accentStyle.bullet
                      )}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 text-foreground/95">
                      {parseInlineTokens(
                        item,
                        accentColor,
                        `sb-ml-item-${idx}`,
                        briefOptions
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }
      // If all lines are bullets/numbered, fall through to block grouping below
    } else {
      // Single-line string in structured-brief mode
      const singleLine = rawLines[0];
      if (singleLine.length > 180) {
        const sentences = splitStructuredSentences(singleLine);
        if (sentences.length > 1) {
          const [leadSentence, ...restSentences] = sentences;
          return (
            <div className={cn("space-y-1.5", className)}>
              <p className="font-semibold text-foreground leading-snug mb-2">
                {parseInlineTokens(
                  leadSentence,
                  accentColor,
                  "sb-s-lead",
                  briefOptions
                )}
              </p>
              <ul className="space-y-1.5 text-sm sm:text-base text-muted-foreground">
                {restSentences.map((sentence, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 leading-relaxed"
                  >
                    <span
                      className={cn(
                        "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                        accentStyle.bullet
                      )}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 text-foreground/95">
                      {parseInlineTokens(
                        sentence,
                        accentColor,
                        `sb-s-item-${idx}`,
                        briefOptions
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      }

      return (
        <div className={cn("leading-relaxed", className)}>
          <p className="leading-relaxed">
            {parseInlineTokens(
              singleLine,
              accentColor,
              "sb-single",
              briefOptions
            )}
          </p>
        </div>
      );
    }
  }

  // Default block & multiline rendering
  const groups = groupLinesIntoBlocks(rawLines);

  if (groups.length === 1 && groups[0].kind === "paragraph") {
    const singleParagraphOptions: InlineParseOptions = {
      locale: resolvedLocale,
      seenEntityIds: new Set<string>(),
      disableEntityChips,
    };
    return (
      <div className={cn("leading-relaxed", className)}>
        <p className="leading-relaxed">
          {parseInlineTokens(
            groups[0].lines[0],
            accentColor,
            "def-p-0",
            singleParagraphOptions
          )}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {groups.map((group, gIdx) => {
        if (group.kind === "ul") {
          return (
            <ul key={gIdx} className="my-2 space-y-1.5 text-left">
              {group.items.map((item, iIdx) => {
                const itemOptions: InlineParseOptions = {
                  locale: resolvedLocale,
                  seenEntityIds: new Set<string>(),
                  disableEntityChips,
                };
                return (
                  <li
                    key={iIdx}
                    className="flex items-start gap-2 leading-relaxed"
                  >
                    <span
                      className={cn(
                        "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                        accentStyle.bullet
                      )}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      {parseInlineTokens(
                        item,
                        accentColor,
                        `ul-${gIdx}-${iIdx}`,
                        itemOptions
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }

        if (group.kind === "ol") {
          return (
            <ol key={gIdx} className="my-2 space-y-2 text-left">
              {group.items.map((item, iIdx) => {
                const itemOptions: InlineParseOptions = {
                  locale: resolvedLocale,
                  seenEntityIds: new Set<string>(),
                  disableEntityChips,
                };
                return (
                  <li
                    key={iIdx}
                    className="flex items-start gap-2.5 leading-relaxed"
                  >
                    <span
                      className={cn(
                        "mt-0.5 inline-flex h-5 min-w-[22px] shrink-0 items-center justify-center rounded border px-1 font-mono text-xs font-bold",
                        accentStyle.stepBadge
                      )}
                    >
                      {String(item.stepNum || iIdx + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      {parseInlineTokens(
                        item.content,
                        accentColor,
                        `ol-${gIdx}-${iIdx}`,
                        itemOptions
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
          );
        }

        const paragraphOptions: InlineParseOptions = {
          locale: resolvedLocale,
          seenEntityIds: new Set<string>(),
          disableEntityChips,
        };
        return (
          <p key={gIdx} className="leading-relaxed">
            {parseInlineTokens(
              group.lines[0],
              accentColor,
              `p-${gIdx}`,
              paragraphOptions
            )}
          </p>
        );
      })}
    </div>
  );
}

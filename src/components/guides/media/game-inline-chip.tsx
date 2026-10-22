"use client";

import React, { useState } from "react";
import type { GameAssetEntry, GuideLocale } from "@/content/guides/types";
import { cn } from "@/lib/utils";
import { GameEntityPopover } from "./game-entity-popover";

export interface GameInlineChipProps {
  readonly entity: GameAssetEntry;
  readonly locale: GuideLocale;
  readonly codeClassName?: string;
  readonly showIcon?: boolean;
  readonly children: React.ReactNode;
}

export function GameInlineChip({
  entity,
  locale,
  codeClassName,
  showIcon = true,
  children,
}: GameInlineChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <code
      data-entity-id={entity.id}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
      className={cn(
        "relative mx-0.5 inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[0.82em] font-semibold transition-colors cursor-pointer",
        codeClassName
      )}
    >
      {showIcon && !imgError && entity.iconPath ? (
        <img
          src={entity.iconPath}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={16}
          height={16}
          onError={() => setImgError(true)}
          className="h-4 w-4 shrink-0 rounded-xs object-contain"
        />
      ) : null}
      {children}
      {isOpen ? <GameEntityPopover entity={entity} locale={locale} /> : null}
    </code>
  );
}

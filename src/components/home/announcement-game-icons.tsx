"use client";

import React, { useEffect, useState } from "react";
import type { AnnouncementVisualKind } from "@/config/announcements";
import { cn } from "@/lib/utils";

const CALCULATOR_DIGITS = ["85", "99", "42", "12"] as const;

interface GameIconProps {
  className?: string;
  showLiveDigits?: boolean;
  "data-testid"?: string;
}

/**
 * Left Broadcast Bell / Megaphone with RPG wiggle animation & radiating soundwave rings.
 */
export function GameBroadcastBellIcon({
  className,
  "data-testid": testId = "announcement-megaphone-icon",
}: GameIconProps) {
  return (
    <span className="relative inline-flex items-center justify-center shrink-0">
      <span
        aria-hidden="true"
        className="absolute -inset-1 rounded-full bg-amber-950/20 animate-ping motion-reduce:animate-none pointer-events-none"
      />
      <svg
        data-testid={testId}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn(
          "h-4 w-4 origin-top animate-wiggle-bell motion-reduce:animate-none shrink-0",
          className
        )}
      >
        {/* Bell Dome & Rim */}
        <path
          d="M12 2.5C8.96 2.5 6.5 4.96 6.5 8V12.2L4.7 14.9C4.26 15.56 4.73 16.45 5.53 16.45H18.47C19.27 16.45 19.74 15.56 19.3 14.9L17.5 12.2V8C17.5 4.96 15.04 2.5 12 2.5Z"
          fill="currentColor"
        />
        {/* Bell Clapper */}
        <path
          d="M9.75 18C10.15 19.3 11 20.1 12 20.1C13 20.1 13.85 19.3 14.25 18H9.75Z"
          fill="currentColor"
        />
        {/* Soundwave Left & Right Arcs */}
        <path
          d="M3.2 6.2C2.2 7.7 1.8 9.5 2.1 11.3M20.8 6.2C21.8 7.7 22.2 9.5 21.9 11.3"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          className="animate-pulse motion-reduce:animate-none"
        />
      </svg>
    </span>
  );
}

/**
 * Contextual Calculator Icon with jumping LED digits (`font-mono`).
 */
export function AnimatedCalculatorIcon({
  className,
  showLiveDigits = false,
  "data-testid": testId = "announcement-calculator-icon",
}: GameIconProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % CALCULATOR_DIGITS.length);
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  const currentDigits = CALCULATOR_DIGITS[step] ?? "85";

  return (
    <span
      data-testid={testId}
      className="inline-flex items-center gap-1 shrink-0"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn("h-4 w-4 shrink-0", className)}
      >
        <rect
          x="3.5"
          y="2.5"
          width="17"
          height="19"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="currentColor"
          fillOpacity="0.12"
        />
        {/* Digital Screen */}
        <rect
          x="6.2"
          y="5"
          width="11.6"
          height="5.2"
          rx="1.2"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        {/* Keypad Dots */}
        <circle
          cx="8"
          cy="13.5"
          r="1.15"
          fill="currentColor"
          className={step % 2 === 0 ? "opacity-100" : "opacity-45"}
        />
        <circle
          cx="12"
          cy="13.5"
          r="1.15"
          fill="currentColor"
          className={step % 2 === 1 ? "opacity-100" : "opacity-45"}
        />
        <circle
          cx="16"
          cy="13.5"
          r="1.15"
          fill="currentColor"
          className={step === 2 ? "opacity-100" : "opacity-55"}
        />
        <circle
          cx="8"
          cy="17.5"
          r="1.15"
          fill="currentColor"
          className={step === 3 ? "opacity-100" : "opacity-55"}
        />
        <rect
          x="11"
          y="16.4"
          width="6"
          height="2.2"
          rx="1"
          fill="currentColor"
        />
      </svg>
      {showLiveDigits && (
        <span
          data-testid="announcement-calculator-digits"
          className="inline-flex items-center justify-center rounded bg-amber-500/20 px-1 text-xs font-mono font-extrabold tabular-nums leading-none text-amber-700 dark:text-amber-300 group-hover:bg-slate-950/20 group-hover:text-slate-950 transition-colors"
        >
          {currentDigits}
        </span>
      )}
    </span>
  );
}

/**
 * Contextual Open Book Icon with animated turning page & sparkles (Guides / Guild).
 */
export function AnimatedBookIcon({
  className,
  "data-testid": testId = "announcement-book-icon",
}: GameIconProps) {
  return (
    <svg
      data-testid={testId}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("h-4 w-4 shrink-0", className)}
    >
      {/* Left Open Page */}
      <path
        d="M2.5 5.5C2.5 4.4 3.4 3.5 4.5 3.5H10C11.1 3.5 12 4.4 12 5.5V19.5C12 18.67 11.33 18 10.5 18H4.5C3.4 18 2.5 17.1 2.5 16V5.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity="0.14"
      />
      {/* Right Open Page */}
      <path
        d="M21.5 5.5C21.5 4.4 20.6 3.5 19.5 3.5H14C12.9 3.5 12 4.4 12 5.5V19.5C12 18.67 12.67 18 13.5 18H19.5C20.6 18 21.5 17.1 21.5 16V5.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity="0.14"
      />
      {/* Flipping Page Layer */}
      <path
        d="M12 5.2C13.8 4.4 16.5 4.3 18.6 4.8V15.4C16.5 14.9 13.8 15 12 15.8V5.2Z"
        fill="currentColor"
        fillOpacity="0.32"
        style={{ transformOrigin: "12px 11px" }}
        className="animate-page-flip motion-reduce:animate-none"
      />
      {/* Floating Knowledge Sparkle */}
      <path
        d="M12 1.2L12.5 2.4L13.7 2.9L12.5 3.4L12 4.6L11.5 3.4L10.3 2.9L11.5 2.4L12 1.2Z"
        fill="currentColor"
        className="animate-pulse motion-reduce:animate-none"
      />
    </svg>
  );
}

/**
 * Contextual Gift Chest Icon for Giftcode announcements.
 */
export function AnimatedGiftIcon({
  className,
  "data-testid": testId = "announcement-gift-icon",
}: GameIconProps) {
  return (
    <svg
      data-testid={testId}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(
        "h-4 w-4 shrink-0 animate-bounce motion-reduce:animate-none",
        className
      )}
    >
      <rect
        x="3.5"
        y="8"
        width="17"
        height="4"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M5 12H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V12Z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M12 8V21M12 8C12 8 9 8 8 5.8C7.2 4.1 9.5 3 11 4.8L12 8ZM12 8C12 8 15 8 16 5.8C16.8 4.1 14.5 3 13 4.8L12 8Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Contextual Trophy Icon for Event announcements.
 */
export function AnimatedTrophyIcon({
  className,
  "data-testid": testId = "announcement-trophy-icon",
}: GameIconProps) {
  return (
    <svg
      data-testid={testId}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(
        "h-4 w-4 shrink-0 animate-pulse motion-reduce:animate-none",
        className
      )}
    >
      <path
        d="M7 4H17V10C17 12.76 14.76 15 12 15C9.24 15 7 12.76 7 10V4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M7 6H4.5C3.95 6 3.5 6.45 3.5 7V8.5C3.5 10.43 5.07 12 7 12M17 6H19.5C20.05 6 20.5 6.45 20.5 7V8.5C20.5 10.43 18.93 12 17 12M12 15V19M8.5 19H15.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Contextual Shield & Gear Icon for Maintenance / System announcements.
 */
export function AnimatedSystemIcon({
  className,
  "data-testid": testId = "announcement-system-icon",
}: GameIconProps) {
  return (
    <svg
      data-testid={testId}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("h-4 w-4 shrink-0", className)}
    >
      <path
        d="M12 3L4.5 6.2V11.5C4.5 16.3 7.7 20.6 12 22C16.3 20.6 19.5 16.3 19.5 11.5V6.2L12 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="currentColor"
        fillOpacity="0.16"
      />
      <circle
        cx="12"
        cy="12"
        r="2.6"
        stroke="currentColor"
        strokeWidth="1.75"
        className="animate-spin motion-reduce:animate-none"
      />
    </svg>
  );
}

export function AnnouncementContextIcon({
  kind,
  className,
  showLiveDigits = false,
}: {
  kind: AnnouncementVisualKind;
  className?: string;
  showLiveDigits?: boolean;
}) {
  switch (kind) {
    case "calculator":
      return (
        <AnimatedCalculatorIcon
          className={className}
          showLiveDigits={showLiveDigits}
        />
      );
    case "guide":
      return <AnimatedBookIcon className={className} />;
    case "giftcode":
      return <AnimatedGiftIcon className={className} />;
    case "event":
      return <AnimatedTrophyIcon className={className} />;
    case "maintenance":
      return <AnimatedSystemIcon className={className} />;
    default:
      return <AnimatedBookIcon className={className} />;
  }
}

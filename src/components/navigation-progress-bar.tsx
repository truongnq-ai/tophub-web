"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

let globalStartProgress: (() => void) | null = null;
let globalStopProgress: (() => void) | null = null;

export function startNavigationProgress() {
  if (globalStartProgress) {
    globalStartProgress();
  }
}

export function stopNavigationProgress() {
  if (globalStopProgress) {
    globalStopProgress();
  }
}

export function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(true);
    setProgress(15);
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) return prev;
        const diff = Math.max(1, (90 - prev) * 0.1);
        return prev + diff;
      });
    }, 150);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setProgress(100);
    setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 250);
  };

  useEffect(() => {
    globalStartProgress = start;
    globalStopProgress = stop;
    return () => {
      globalStartProgress = null;
      globalStopProgress = null;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // When pathname or searchParams changes, navigation is complete
  useEffect(() => {
    stop();
  }, [pathname, searchParams]);

  // Intercept click on internal links
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = (e.target as Element).closest("a");
      if (!target || !target.href) return;

      try {
        const targetUrl = new URL(target.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Only handle internal links on same origin
        if (targetUrl.origin === currentUrl.origin) {
          // If clicking a hash on same page, ignore
          if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search) {
            return;
          }
          // If download or target _blank, ignore
          if (target.target === "_blank" || target.hasAttribute("download")) {
            return;
          }
          start();
        }
      } catch {
        // Ignore malformed URLs
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  if (!active && progress === 0) {
    return <div data-testid="nav-progress-bar" className="hidden" aria-hidden="true" />;
  }

  return (
    <div
      data-testid="nav-progress-bar"
      data-active={active ? "true" : "false"}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-hidden={!active}
      className="fixed top-0 left-0 right-0 z-[9999] h-[2.5px] pointer-events-none transition-all duration-200 ease-out"
      style={{
        width: `${progress}%`,
        opacity: active ? 1 : 0,
      }}
    >
      <div className="h-full w-full bg-gradient-to-r from-amber-500 via-primary to-purple-600 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
    </div>
  );
}

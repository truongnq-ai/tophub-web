import React from "react";
import { motion } from "framer-motion";
import {
  BRAND_LOGO_SRC,
  BRAND_SUBTITLE,
  BRAND_TITLE,
} from "@/components/brand-logo";

type LogoAnimatedProps = {
  invert?: boolean;
};

export function LogoAnimated({ invert = false }: LogoAnimatedProps) {
  const textClass = invert
    ? "text-white dark:text-slate-900"
    : "text-foreground";
  const textMutedClass = invert
    ? "text-white/80 dark:text-slate-900/80"
    : "text-amber-500 dark:text-amber-400";

  return (
    <div className="mt-auto flex items-center gap-3">
      <motion.div
        className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-amber-400/60 shadow-lg shadow-amber-500/30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img
          src={BRAND_LOGO_SRC}
          alt="TopHub - Top Hero Hub Logo"
          width={48}
          height={48}
          className="h-full w-full object-cover select-none"
        />
      </motion.div>
      <div className="space-y-0.5">
        <motion.p
          className={`text-2xl font-black font-heading tracking-tight ${textClass}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {BRAND_TITLE}
        </motion.p>
        <motion.p
          className={`text-xs font-extrabold font-heading uppercase tracking-wider ${textMutedClass}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {BRAND_SUBTITLE}
        </motion.p>
      </div>
    </div>
  );
}

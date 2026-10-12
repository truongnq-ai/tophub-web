import { motion } from "framer-motion";
import { Shield } from "lucide-react";

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
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-lg shadow-amber-500/30 border border-amber-300/40"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Shield className="h-6 w-6 fill-current" />
      </motion.div>
      <div className="space-y-0.5">
        <motion.p
          className={`text-2xl font-black font-heading tracking-wide ${textClass}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          TopHub
        </motion.p>
        <motion.p
          className={`text-xs font-bold font-mono uppercase tracking-wider ${textMutedClass}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Top Heroes Companion
        </motion.p>
      </div>
    </div>
  );
}

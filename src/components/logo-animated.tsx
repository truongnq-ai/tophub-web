import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

type LogoAnimatedProps = {
  invert?: boolean
}

export function LogoAnimated({ invert = false }: LogoAnimatedProps) {
  const h = useTranslations("Index.hero")

  // Determine the text classes based on the invert prop
  const textClass = invert
    ? "text-white dark:text-black"
    : "text-black dark:text-white"
  const textMutedClass = invert
    ? "text-white/80 dark:text-black/80"
    : "text-black/80 dark:text-white/80"

  return (
    <div className="mt-auto flex items-center gap-4">
      <div className="w-20">
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full"
          initial="hidden"
          animate="visible"
        >
          {/* Top rectangle */}
          <motion.path
            d="M20 20 L80 20 Q85 20 85 25 L85 40 Q85 45 80 45 L20 45 Q15 45 15 40 L15 25 Q15 20 20 20"
            fill="none"
            className={`stroke-current ${textClass}`}
            strokeWidth="2"
            variants={{
              hidden: { pathLength: 0 },
              visible: {
                pathLength: 1,
                transition: { duration: 2, ease: "easeInOut" },
              },
            }}
          />
          {/* Bottom left rectangle */}
          <motion.path
            d="M20 55 L50 55 Q55 55 55 60 L55 75 Q55 80 50 80 L20 80 Q15 80 15 75 L15 60 Q15 55 20 55"
            fill="none"
            className={`stroke-current ${textClass}`}
            strokeWidth="2"
            variants={{
              hidden: { pathLength: 0 },
              visible: {
                pathLength: 1,
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              },
            }}
          />
          {/* Bottom right rectangle */}
          <motion.path
            d="M65 55 L80 55 Q85 55 85 60 L85 75 Q85 80 80 80 L65 80 Q60 80 60 75 L60 60 Q60 55 65 55"
            fill="none"
            className={`stroke-current ${textClass}`}
            strokeWidth="2"
            variants={{
              hidden: { pathLength: 0 },
              visible: {
                pathLength: 1,
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1,
                },
              },
            }}
          />
        </motion.svg>
      </div>
      <div className="space-y-1">
        <motion.p
          className={`text-2xl font-bold ${textClass}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          Template
        </motion.p>
        <motion.p
          className={`text-sm ${textMutedClass}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          {h("title-1")} {h("title-2")}
        </motion.p>
      </div>
    </div>
  )
}

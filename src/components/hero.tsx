"use client"

import Link from "next/link"
// import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { GITHUB_REPO_LINK } from "@/config/constants"

export function Hero() {
  const t = useTranslations("Index.hero")

  return (
    <section className="flex flex-col items-center justify-center px-4 py-12 text-center md:py-24">
      <motion.div
        className="mb-8 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="rounded-full bg-muted px-3 py-1 text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t("new")}
        </motion.span>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href={GITHUB_REPO_LINK}
            className="inline-flex items-center gap-1 text-sm hover:underline"
          >
            {t("punchline")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.h1
          className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
              },
            },
          }}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {t("title-1")}
          </motion.span>
          <motion.span
            className="block"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {t("title-2")}
          </motion.span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
              },
            },
          }}
        >
          {t("description")}
        </motion.p>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.8,
          duration: 0.5,
          type: "spring",
          stiffness: 200
        }}
      >
        <Button size="lg" className="mt-10">
          Start scaling
        </Button>
      </motion.div> */}
    </section>
  )
}

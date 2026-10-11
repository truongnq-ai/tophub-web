"use client"

import { motion } from "framer-motion"
import {
  KeyRound,
  Languages,
  Moon,
  ComponentIcon as Components,
  BarChart3,
  Github,
} from "lucide-react"
import type { Feature, FeatureListProps } from "@/types/feature"

const defaultFeatures: Feature[] = [
  {
    title: "Authentication & Authorization",
    description:
      "Secure your application with NextAuth.js. Support for multiple providers and role-based access control.",
    icon: KeyRound,
  },
  {
    title: "Internationalization",
    description:
      "Make your app global with next-intl. Support for multiple languages and locales out of the box.",
    icon: Languages,
  },
  {
    title: "Theme Switching",
    description:
      "Toggle between light and dark modes seamlessly. Supports system preferences and user choice.",
    icon: Moon,
  },
  {
    title: "Component Library",
    description:
      "Beautiful, accessible components from shadcn/ui. Customizable and ready to use.",
    icon: Components,
  },
  {
    title: "Analytics",
    description:
      "Track user behavior and performance with Vercel Analytics. Real-time insights and reporting.",
    icon: BarChart3,
  },
  {
    title: "Free",
    description: "The template is free and open source availabel at GitHub.",
    icon: Github,
  },
]

export function FeatureList({ features = defaultFeatures }: FeatureListProps) {
  return (
    <section className="flex flex-col items-center justify-center py-6 md:py-8">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-lg border p-6 transition-all hover:border-foreground/10 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

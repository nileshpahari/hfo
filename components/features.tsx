"use client"

import { motion } from "framer-motion"
import { Section, staggerContainer, fadeUpItem } from "./section"
import { Sparkles, Layers, Rocket, ScrollText, MousePointerClick, Gauge } from "lucide-react"

const items = [
  {
    icon: Sparkles,
    title: "Micro-interactions",
    desc: "Delightful, subtle feedback for hover, tap, and focus states.",
  },
  { icon: Layers, title: "Composable", desc: "Reusable motion variants and section patterns." },
  { icon: Rocket, title: "Performance", desc: "Spring-based transitions tuned to feel snappy." },
  { icon: ScrollText, title: "On Scroll", desc: "Reveal content as it comes into view." },
  { icon: MousePointerClick, title: "Interactive", desc: "Engaging hover and tap effects." },
  { icon: Gauge, title: "Accessible", desc: "Meets contrast and motion preferences." },
]

export function Features() {
  return (
    <Section id="features" className="py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-semibold text-foreground md:text-4xl">
          Built-in motion, zero friction
        </h2>
        <p className="mt-3 text-muted-foreground">A set of animated building blocks to craft modern UIs with confidence.</p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={fadeUpItem}
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-teal-50 p-2">
                <Icon className="h-5 w-5 text-teal-500" aria-hidden="true" />
              </div>
              <h3 className="font-medium text-card-foreground">{title}</h3>
            </div>
            <p className="mt-3 text-muted-foreground">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

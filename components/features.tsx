"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { Bookmark, Folder, Monitor, Search, Sparkles, Lock } from "lucide-react"

const items = [
  {
    icon: Bookmark,
    title: "One-Click Save",
    desc: "Bookmark any page instantly from the extension's floating button.",
  },
  {
    icon: Folder,
    title: "Organized Folders",
    desc: "Group and manage your bookmarks with easy-to-create folders.",
  },
  {
    icon: Monitor,
    title: "Sync",
    desc: "Extension and dashboard stay in sync—never lose a bookmark.",
  },
  {
    icon: Search,
    title: "Quick Search",
    desc: "Search saved pages quickly from the dashboard or extension popup.",
  },
  {
    icon: Sparkles,
    title: "Notes & Highlights",
    desc: "Save not just links, but also notes and ideas.",
  },
  {
    icon: Lock,
    title: "Privacy Focused",
    desc: "Your data stays private and secure, only accessible to you.",
  },
]

export function Features() {
  return (
    <Section id="features" className="py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-balance text-4xl font-bold text-foreground md:text-5xl">
          Key Features
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A seamless way to save, search, and organize your web experience.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto"
      >
        {items.map(({ icon: Icon, title, desc }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="rounded-xl border bg-neutral-100 dark:bg-[#030712] border-border p-8 shadow-sm text-center"
          >
            <div className="flex flex-col items-center">
              <div className="rounded-lg bg-violet-50 p-4 mb-6 dark:bg-indigo-900/20">
                <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">{title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed max-w-sm">{desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

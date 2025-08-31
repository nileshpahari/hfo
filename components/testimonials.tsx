"use client"

import { motion } from "framer-motion"
import { Section } from "./section"

const testimonials = [
  { quote: "The motion feels silky-smooth and intentional.", name: "Alex L.", role: "Product Designer" },
  { quote: "Performance is excellent, even on low-end devices.", name: "Sam K.", role: "Frontend Engineer" },
  { quote: "Exactly the right amount of polish and restraint.", name: "Priya D.", role: "Design Lead" },
  { quote: "Ship faster without sacrificing UX quality.", name: "Jordan P.", role: "Founder" },
]

function Row({ offset = 0 }) {
  const row = [...testimonials, ...testimonials]
  return (
    <motion.div
      aria-label="Testimonials carousel track"
      className="flex gap-4"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        duration: 22 + offset,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      {row.map((t, i) => (
        <motion.blockquote
          key={`${t.name}-${i}-${offset}`}
          whileHover={{ scale: 1.03 }}
          className="min-w-[280px] max-w-[320px] flex-1 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm"
        >
          “{t.quote}”
          <footer className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{t.name}</span> — {t.role}
          </footer>
        </motion.blockquote>
      ))}
    </motion.div>
  )
}

export function Testimonials() {
  return (
    <Section id="testimonials" className="py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-semibold text-foreground md:text-4xl">Testimonials</h2>
        <p className="mt-3 text-muted-foreground">Auto-scrolling carousel with smooth motion.</p>
      </div>

      <div className="relative mt-10 overflow-hidden">
        {/* edge fades for nicer masking */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
        <div className="flex flex-col gap-4">
          <Row offset={0} />
          <Row offset={4} />
        </div>
      </div>
    </Section>
  )
}

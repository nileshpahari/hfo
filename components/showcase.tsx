"use client"

import { Section } from "./section"
import { ParallaxCard } from "./parallax-card"

const images = [
  "/cat.png",
  "/cat.png",
  "/cat.png",
]

export function Showcase() {
  return (
    <Section id="showcase" className="py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-semibold text-foreground md:text-4xl">Showcase</h2>
        <p className="mt-3 text-muted-foreground">Just 3 steps to a more organized digital life.</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <ParallaxCard key={`${src}-${i}`} src={src} alt={`Project ${i + 1}`} delay={i * 0.04} />
        ))}
      </div>
    </Section>
  )
}

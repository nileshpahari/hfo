"use client"

import { Section } from "./section"
import { ParallaxCard } from "./parallax-card"

const images = [
  "/cat.png",
  "/cat.png",
  "/cat.png",
  "/cat.png",
  "/cat.png",
  "/cat.png",
]

export function Showcase() {
  return (
    <Section id="showcase" className="py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-semibold text-gray-900 md:text-4xl">Showcase</h2>
        <p className="mt-3 text-gray-600">Project cards with parallax fade-in and hover zoom.</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <ParallaxCard key={`${src}-${i}`} src={src} alt={`Project ${i + 1}`} delay={i * 0.04} />
        ))}
      </div>
    </Section>
  )
}

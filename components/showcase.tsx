"use client"

import { Section } from "./section"
import Image from "next/image"

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

      <div className="mt-10 flex justify-center">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xlxl w-full">
          {images.map((src, i) => (
            <div key={`${src}-${i}`} className="flex justify-center">
              <Image
                src={src}
                alt={`Showcase ${i + 1}`}
                width={800}
                height={600}
                className="h-56 w-full object-cover rounded-xl border border-border shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

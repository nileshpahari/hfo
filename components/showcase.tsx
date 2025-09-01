"use client"

import { Section } from "./section"
import Image from "next/image"
import { motion } from "framer-motion"

const steps = [
  {
    step: "Step 1",
    title: "Add the Extension",
    description: "Install Savvio with one click. Log in once to sync bookmarks and notes across the extension and dashboard.",
    image: "/cat.png",
    imageAlt: "Chrome extension store showing Savvio installation"
  },
  {
    step: "Step 2", 
    title: "Save Bookmarks & Notes",
    description: "Use the floating button or popup to save links and quick notes from anywhere on the web.",
    image: "/cat.png", 
    imageAlt: "Savvio extension popup interface"
  },
  {
    step: "Step 3",
    title: "Organize & Access",
    description: "View, search, and organize your saved content in the beautiful dashboard with smart categorization.",
    image: "/cat.png", 
    imageAlt: "Savvio dashboard showing organized bookmarks"
  }
]

export function Showcase() {
  return (
    <Section id="showcase" className="py-20">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-balance text-3xl font-semibold text-foreground md:text-4xl">How It Works</h2>
        <p className="mt-3 text-muted-foreground">Just 3 steps to a more organized digital life.</p>
      </div>

      <div className="mx-auto max-w-7xl space-y-20">
        {steps.map((stepData, index) => (
          <motion.div
            key={stepData.step}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`flex flex-col lg:flex-row items-center gap-12 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="flex-1 space-y-6">
              <div className="inline-block">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                  {stepData.step}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {stepData.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                {stepData.description}
              </p>
            </div>

            {/* Image Content */}
            <div className="flex-1 flex justify-center">
              <Image
                src={stepData.image}
                alt={stepData.imageAlt}
                width={600}
                height={400}
                className="w-full max-w-lg h-auto object-cover rounded-xl border border-border shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

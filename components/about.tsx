"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Section, staggerContainer, fadeUpItem } from "./section"

export function About() {
  return (
    <Section id="about" className="py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid items-center gap-8 md:grid-cols-2"
      >
        <motion.div variants={fadeUpItem}>
          <h2 className="text-balance text-3xl font-semibold text-gray-900 md:text-4xl">
            Fluid, responsive interfaces
          </h2>
          <p className="mt-4 text-gray-600">
            Animate on load, on scroll, and on hover with accessible, performance-conscious patterns. Our approach
            balances visual flair with usability and clarity.
          </p>
          <ul className="mt-6 space-y-2 text-gray-700">
            <li>• Scroll-triggered reveals with subtle blur easing</li>
            <li>• Staggered entrances for hierarchy and rhythm</li>
            <li>• Hover and tap states for every interactive element</li>
          </ul>
        </motion.div>

        <motion.div variants={fadeUpItem} className="relative">
          <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-2 shadow-[0_10px_50px_rgba(2,6,23,0.08)]">
              <img
                src="https://simp6.selti-delivery.ru/images3/Screenshot_31-Aug_12-53-28_5956152e4a8d111e6815.png"
                alt="Product dashboard preview with folders and bookmarks UI"
                className="w-full rounded-xl"
              />
            </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Section } from "./section"

export function About() {
  return (
    <Section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid items-center gap-8 md:grid-cols-2"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-balance text-3xl font-semibold text-foreground md:text-4xl">
            A Better Way to Manage Bookmarks
          </h2>
          <p className="mt-4 text-muted-foreground">
           Introducing a solution that brings all your bookmarks together in one place.
           Across browsers. Across devices.
          </p>
         <Button className="mt-3 bg-purple-600 text-white text-md py-6 px-4">Get Started with Savvio</Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-2 shadow-[0_10px_50px_rgba(2,6,23,0.08)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.3)]">
              <img
                src="https://simp6.selti-delivery.ru/images3/Screenshot_31-Aug_12-53-28_5956152e4a8d111e6815.png"
                alt="not found"
                className="w-full rounded-xl"
              />
            </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}

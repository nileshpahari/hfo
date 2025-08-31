"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const reveal: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <motion.section
      id={id}
      className={`mx-auto max-w-6xl px-4 ${className}`}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </motion.section>
  )
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)", scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
}

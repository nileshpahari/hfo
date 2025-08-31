"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  words: string[]
  intervalMs?: number
  className?: string
}

export function ContainerTextFlip({ words, intervalMs = 1800, className }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, words.length])

  const word = words[index]

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={word}
          initial={{ rotateX: -90, opacity: 0, y: -6 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: 90, opacity: 0, y: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="inline-block will-change-transform"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

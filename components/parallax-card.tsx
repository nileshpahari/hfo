"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function ParallaxCard({
  src,
  alt,
  delay = 0,
}: {
  src: string
  alt: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 50%"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [24, -24])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 110, damping: 16, delay }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm"
    >
      <motion.div style={{ y, opacity }}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={800}
          height={600}
          className="h-56 w-full object-cover transition-transform duration-500"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: delay + 0.2 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: delay + 0.4 }}
          className="rounded-md bg-card/90 p-2 text-sm text-card-foreground backdrop-blur"
        >
          Steps
        </motion.div>
      </div>
    </motion.div>
  )
}

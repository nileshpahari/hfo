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
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 110, damping: 16, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative overflow-hidden rounded-xl border border-gray-2 00 bg-white shadow-sm"
    >
      <motion.div style={{ y, opacity }}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={800}
          height={600}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>

      <motion.div
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-md bg-white/90 p-2 text-sm text-gray-700 backdrop-blur"
        >
          Steps
        </motion.div>
      </div>
    </motion.div>
  )
}

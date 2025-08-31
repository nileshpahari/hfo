"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ContainerTextFlip } from "./container-text-flip"
import WrapButton from "./ui/wrap-button"
import { Button } from "@/components/ui/button"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]) // subtle parallax

  return (
    <div ref={ref} id="home" className="relative isolate overflow-hidden pt-24" aria-label="Hero section">
      {/* Background gradient (blue -> teal, analogous) */}
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-teal-50" aria-hidden /> */}
      <div className="absolute inset-0 -z-10 " aria-hidden />

      {/* Parallax decoration */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -top-24 right-1/2 h-72 w-72 translate-x-1/2 rounded-full blur-3xl"
        aria-hidden
      />

      <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center gap-6 px-4 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { type: "spring", stiffness: 110, damping: 14, delay: 0.4 },
              },
            }}
            className="text-balance text-4xl font-semibold text-foreground md:text-6xl"
          >
            {"Stay Organized, Stay Savvio"}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground md:text-lg"
          >
            Save, search, and manage bookmarks & notes across devices all from one simple extension and dashboard.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { delay: 0.4 } },
            }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <WrapButton>
              <motion.a
                href="#features"
                whileTap={{ scale: 0.98 }}
                className="rounded-lg px-5 py-3 font-medium text-white"
              >
               Install Extension
              </motion.a>
            </WrapButton>
            
            <motion.div
              whileTap={{ scale: 0.98 }}
            >
              <Button 
              className="ml-1 py-7 px-6 rounded-xl text-md"
              variant="outline"
                asChild
              >
                <a href="#showcase">Explore Features</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.35 }}
            className="mt-10"
          >
            <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-2 shadow-[0_10px_50px_rgba(2,6,23,0.08)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.3)]">
              <img
                src="https://simp6.selti-delivery.ru/images3/Screenshot_31-Aug_12-53-28_5956152e4a8d111e6815.png"
                alt="Product dashboard preview with folders and bookmarks UI"
                className="w-full rounded-xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

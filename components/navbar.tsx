"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#showcase", label: "Showcase" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 10))

  useEffect(() => {
    // ensure client hydration
  }, [])

  return (
    <motion.nav
      initial={false}
      animate={{
        paddingTop: scrolled ? 10 : 18,
        paddingBottom: scrolled ? 10 : 18,
        backgroundColor: scrolled ? "hsl(var(--background) / 0.7)" : "hsl(var(--background) / 0)",
        backdropFilter: scrolled ? "blur(8px)" : "blur(0px)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className="fixed top-0 left-0 right-0 z-50"
      aria-label="Main"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2">
            <span className="sr-only">Go to homepage</span>
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
              whileHover={{ rotate: 6, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600/10 ring-1 ring-blue-600/30"
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                <path
                  d="M3 6.75A1.75 1.75 0 0 1 4.75 5h3.879c.464 0 .908.184 1.237.513l1.06 1.06c.329.33.773.514 1.237.514H19.25A1.75 1.75 0 0 1 21 8.836v8.414A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
            <span className="font-semibold text-foreground">MotionSite</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="relative z-10">{l.label}</span>
                  <span className="pointer-events-none absolute inset-x-2 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded bg-teal-500 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="md:hidden">
            <a href="#faq" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

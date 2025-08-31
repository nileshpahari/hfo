"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar"

const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Features", link: "#features" },
  { name: "Showcase", link: "#showcase" },
  { name: "FAQ", link: "#faq" },
]

export function ResizableNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <Navbar className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop Navigation */}
      <NavBody>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
            whileHover={{ rotate: 6, scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600/10 ring-1 ring-blue-600/30"
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-purple-600">
              <path
                d="M3 6.75A1.75 1.75 0 0 1 4.75 5h3.879c.464 0 .908.184 1.237.513l1.06 1.06c.329.33.773.514 1.237.514H19.25A1.75 1.75 0 0 1 21 8.836v8.414A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
          <span className="font-semibold text-foreground">Savvio</span>
        </div>

        {/* Navigation Items */}
        <NavItems items={navItems} />

        {/* CTA Button */}
        <NavbarButton
          href="#faq"
          variant="primary"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Get Started
        </NavbarButton>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          {/* Mobile Logo */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
              whileHover={{ rotate: 6, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600/10 ring-1 ring-blue-600/30"
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-purple-600">
                <path
                  d="M3 6.75A1.75 1.75 0 0 1 4.75 5h3.879c.464 0 .908.184 1.237.513l1.06 1.06c.329.33.773.514 1.237.514H19.25A1.75 1.75 0 0 1 21 8.836v8.414A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
            <span className="font-semibold text-foreground">Savvio</span>
          </div>

          {/* Mobile Menu Toggle */}
          <MobileNavToggle isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        </MobileNavHeader>

        {/* Mobile Menu */}
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={closeMobileMenu}
              className="block w-full px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            href="#faq"
            variant="primary"
            className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            onClick={closeMobileMenu}
          >
            Get Started
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}

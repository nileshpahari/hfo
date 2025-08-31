"use client"
import ThemeToggleButton from "../components/ui/theme-toggle-button"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  const socials = [
    { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
    { href: "https://github.com", label: "GitHub", Icon: Github },
    { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  ]
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-8">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} MotionSite</p>
        <ul className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <li key={href}>
              <motion.a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.12, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex rounded-md p-2 text-gray-700 hover:text-gray-900"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </motion.a>
            </li>
          ))}
          <li>
            <ThemeToggleButton />

          </li>
        </ul>
      </div>
    </footer>
  )
}

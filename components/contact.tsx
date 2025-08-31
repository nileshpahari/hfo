"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Section } from "./section"

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thanks! This is a demo form.")
  }

  return (
    <Section id="contact" className="py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold text-gray-900 md:text-4xl">Get in touch</h2>
        <p className="mt-3 text-gray-600">We’ll get back within 1–2 business days.</p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-10 max-w-xl space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Jane Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="jane@example.com"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="How can we help?"
            required
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(20, 184, 166, 0.25)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-lg bg-teal-500 px-5 py-3 font-medium text-white"
        >
          Send message
        </motion.button>
      </motion.form>
    </Section>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { Section } from "./section"

const faqData = [
  {
    id: 1,
    question: "Is Savvio free to use?",
    answer: "Yes! Savvio is completely free with no hidden costs.",
    isOpen: true
  },
  {
    id: 2,
    question: "Do I need an account to use the extension?",
    answer: "No account is required. You can start using Savvio immediately after installation from the browser extension store."
  },
  {
    id: 3,
    question: "How does Savvio work?",
    answer: "Savvio integrates seamlessly with your browser to help you save and organize bookmarks, articles, and web content with intelligent categorization and search capabilities."
  },
  {
    id: 4,
    question: "Can I organize bookmarks into folders?",
    answer: "Yes! Savvio provides powerful organizational tools including custom folders, tags, and smart collections to keep your saved content perfectly organized."
  },
  {
    id: 5,
    question: "Is my data private?",
    answer: "Absolutely. Your data is stored locally and encrypted. We respect your privacy and never access or share your personal information."
  },
  {
    id: 6,
    question: "Does it work across multiple browsers?",
    answer: "Yes, Savvio supports all major browsers including Chrome, Firefox, Safari, and Edge with seamless synchronization across devices."
  }
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <Section id="faq" className="py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
              >
                <span className="text-lg font-medium text-card-foreground pr-4">
                  {item.question}
                </span>
                <div className="flex-shrink-0">
                  {openItems.includes(item.id) ? (
                    <Minus className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Plus className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

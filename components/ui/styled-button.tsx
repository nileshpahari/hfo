"use client"

import { motion } from "framer-motion"

interface StyledButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

export function StyledButton({ children, href, onClick, className = "" }: StyledButtonProps) {
  const ButtonComponent = motion.button

  const buttonContent = (
    <span className="px-6 py-3 font-medium text-white">
      {children}
    </span>
  )

  if (href) {
    return (
      <ButtonComponent
        className={`bg-gradient-to-r from-purple-800 to-purple-500 rounded-lg text-lg text-neutral-100 ${className}`}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          if (href.startsWith('#')) {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
          } else {
            window.open(href, '_blank')
          }
        }}
      >
        {buttonContent}
      </ButtonComponent>
    )
  }

  return (
    <ButtonComponent
      className={`bg-gradient-to-r from-purple-800 to-purple-500 rounded-lg text-lg text-neutral-100 ${className}`}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {buttonContent}
    </ButtonComponent>
  )
}

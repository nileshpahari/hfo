"use client"

import { Section } from "./section"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <Section id="faq" className="py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold text-foreground md:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-3 text-muted-foreground">Answers to common questions about the animations and components.</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Can I use these components in any Next.js app?</AccordionTrigger>
            <AccordionContent>
              Yes. They’re built with Tailwind and Framer Motion and work in standard Next.js projects without extra
              setup.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Are the animations accessible?</AccordionTrigger>
            <AccordionContent>
              We respect reduced motion preferences and keep timing/contrast within sensible ranges to avoid motion
              fatigue.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I customize colors and spacing?</AccordionTrigger>
            <AccordionContent>
              Adjust your Tailwind tokens or CSS variables. The components use utilities so design tokens apply
              globally.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Do I need an API or backend?</AccordionTrigger>
            <AccordionContent>
              No. Everything shown here is presentational; you can wire your own APIs if and when you need them.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Section>
  )
}

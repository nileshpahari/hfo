import { ResizableNavbar } from "@/components/resizable-navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Features } from "@/components/features"
import { Showcase } from "@/components/showcase"
// import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <ResizableNavbar />
      <main className="pt-0">
        <Hero />
        <About />
        <Features />
        <Showcase />
        {/* <Testimonials /> */}
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

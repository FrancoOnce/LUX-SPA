import { AnimatePresence } from 'framer-motion'
import { QuoteProvider, useQuote } from './context/QuoteContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Packages } from './components/Packages'
import { About } from './components/About'
import { Testimonials } from './components/Testimonials'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { QuoteWizard } from './components/quote/QuoteWizard'

function Site() {
  const { isOpen } = useQuote()

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Packages />
        <About />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
      <AnimatePresence>{isOpen && <QuoteWizard />}</AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <QuoteProvider>
      <Site />
    </QuoteProvider>
  )
}
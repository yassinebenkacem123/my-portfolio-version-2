import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './index.css'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Discover from './components/Discover'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import Experiences from './components/Experiences'
import GitHubContributionSection from './components/github/GitHubContributionSection'
import FAQs from './components/FAQs'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ContactPage from './components/ContactPage'
import NotFoundPage from './components/NotFoundPage'

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
const HomePage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <div
    style={{
      opacity: isLoading ? 0 : 1,
      transition: 'opacity 0.5s ease-out',
    }}
  >
    <Navbar />
    {/* Navbar is fixed — main needs top padding to clear it */}
    <main style={{ paddingTop: 80 }}>
      <Hero />
      <Discover />
      <About />
      <Services />
      <Work />
      <Experiences />
      <GitHubContributionSection />
      <FAQs />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// AppRoutes — handles AnimatePresence for smooth page transitions
// Must be inside <BrowserRouter> so useLocation works.
// ─────────────────────────────────────────────────────────────────────────────
const AppRoutes: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const location = useLocation()

  return (
    /*
     * AnimatePresence with mode="wait" ensures the outgoing page finishes its
     * exit animation before the new page enters — same behaviour as the
     * reference website's staggered fade-in transition.
     */
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage isLoading={isLoading} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// App — root component
// ─────────────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <BrowserRouter>
      {/* Loading screen sits outside routes so it always shows first */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            key="loader"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <AppRoutes isLoading={isLoading} />
    </BrowserRouter>
  )
}

export default App

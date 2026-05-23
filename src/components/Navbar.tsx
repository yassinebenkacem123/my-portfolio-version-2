import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home',        href: '#hero-section', num: '01' },
  { label: 'About',       href: '#about',        num: '02' },
  { label: 'Skills',      href: '#skills',       num: '03' },
  { label: 'Projects',    href: '#work',         num: '04' },
  { label: 'Experiences', href: '#experiences',  num: '05' },
  { label: 'Contact Us',  href: '#contact',      num: '06' },
  { label: 'Q&A',         href: '#faq',          num: '07' },
]

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14m0 0l-7-7m7 7l-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const menuVariants = {
  hidden: { 
    y: '-100%', 
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } 
  },
  visible: { 
    y: 0, 
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } 
  },
  exit: { 
    y: '-100%', 
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 } 
  }
}

const linkItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1] as const,
    },
  }),
  exit: { 
    opacity: 0, 
    y: 20, 
    transition: { duration: 0.3 } 
  }
}

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Close on Escape */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setMenuOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── Fixed navbar bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[1080px] px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="z-[100] flex items-center gap-3 relative group" aria-label="Go to homepage">
            <motion.img
              src="/my-logo.png"
              alt="Yassine logo"
              className="w-10 h-auto object-contain"
              whileHover={{ scale: 0.95, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
          </a>

          {/* Hamburger ↔ Close trigger */}
          <button
            className="z-[100] relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-neutral-100 transition-colors group focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-6 h-[14px]">
              <motion.span
                className="absolute left-0 w-full h-[1px] bg-neutral-900 origin-center rounded-sm"
                animate={menuOpen ? { top: '6px', rotate: 45 } : { top: '0px', rotate: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute left-0 w-4 h-[1px] bg-neutral-900 rounded-sm"
                animate={menuOpen ? { top: '6px', opacity: 0, scaleX: 0 } : { top: '6px', opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute left-0 w-full h-[1px] bg-neutral-900 origin-center rounded-sm"
                animate={menuOpen ? { top: '6px', rotate: -45 } : { top: '12px', rotate: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Overlay Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl text-neutral-900 flex justify-center overflow-y-auto overflow-x-hidden"
          >
            <div className="w-full max-w-[1080px] px-6 pt-32 pb-16 flex flex-col justify-between min-h-screen">
              
              <div className="w-full flex-1 flex flex-col justify-center">
                {/* Section title (Optional) */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-8"
                >
                  Menu
                </motion.p>
                
                {/* Links list */}
                <ul className="flex flex-col gap-6 w-full max-w-4xl mx-auto" role="list">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.label}
                      custom={i}
                      variants={linkItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="group flex border-b border-neutral-200/50 pb-4"
                    >
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className="flex items-center text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-600 relative overflow-hidden w-full transition-colors duration-500 hover:text-black"
                        tabIndex={menuOpen ? 0 : -1}
                      >
                        {/* Number Indicator */}
                        <span className="text-xs md:text-sm font-light text-neutral-400 w-12 md:w-20 transition-colors duration-500 group-hover:text-neutral-600">
                          {link.num}
                        </span>
                        
                        {/* Link Text */}
                        <span className="relative flex items-center pr-8 w-full transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-3">
                          {link.label}
                          
                          {/* Arrow */}
                          <span className="inline-flex items-center justify-center ml-auto opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100 group-hover:translate-x-0">
                            <ArrowIcon />
                          </span>
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

      
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

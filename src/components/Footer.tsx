import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
]

const NAV_ROWS = [
  [
    { label: 'Home', href: '/#hero-section' },
    { label: 'About', href: '/#about' },
    { label: 'Skills', href: '/#skills' },
  ],
  [
    { label: 'Work', href: '/#projects' },
    { label: 'GitHub', href: '/#github-activity' },
    { label: 'Contact', href: '/#contact' },
  ]
]

const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const elements = footer.querySelectorAll('.gsap-footer-fade')
    gsap.set(elements, { opacity: 0, y: 30 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    })

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
    })

    return () => { tl.kill() }
  }, [])

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative overflow-hidden pt-32 pb-0 text-white"
      style={{ backgroundColor: '#000000' }}
    >
      {/* ── Top Circular CTA Button ─────────────────────────────────────────── */}
      <div className="w-full flex justify-center mb-32 gsap-footer-fade relative z-10">
        <motion.button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center gap-2 group transition-all duration-500 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] cursor-pointer"
        >
          <ArrowUp size={24} className="text-white/50 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300" />
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/50 group-hover:text-white font-['Space_Grotesk_Variable',sans-serif] text-center leading-tight">
            Back<br/>To Top
          </span>
        </motion.button>
      </div>

      {/* "YASSINE" watermark — large, low-opacity, anchored to bottom */}
      <div
        aria-hidden
        className="absolute bottom-[-3vw] left-1/2 -translate-x-1/2 w-full text-center font-['Space_Grotesk_Variable',sans-serif] font-bold text-[clamp(80px,22vw,360px)] leading-[0.8] tracking-[-0.04em] bg-gradient-to-b from-neutral-700 to-neutral-900/20 bg-clip-text text-transparent select-none whitespace-nowrap z-0 pointer-events-none"
      >
        YASSINE
      </div>

      {/* ── Content Grid (Framer Links Layout) ─────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Two-column layout matching Framer */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8 pb-12">
          
          {/* Left Column: Socials & Nav */}
          <div className="flex flex-col gap-10 gsap-footer-fade">
            {/* Social Icons */}
            <div className="flex flex-row gap-4">
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Nav Links Rows */}
            <div className="flex flex-col gap-3">
              {NAV_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-row items-center gap-2.5 flex-wrap">
                  {row.map((link, linkIndex) => (
                    <React.Fragment key={link.label}>
                      <a
                        href={link.href}
                        className="font-['Space_Grotesk_Variable',sans-serif] text-[20px] text-white hover:text-white/70 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                      {linkIndex < row.length - 1 && (
                        <span className="font-['Space_Grotesk_Variable',sans-serif] text-[20px] text-white/30">
                          /
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Info */}
          <div className="flex flex-col gap-10 gsap-footer-fade md:items-start">
            
            {/* Contact Us Block */}
            <div className="flex flex-col gap-1.5">
              <span className="font-['Space_Grotesk_Variable',sans-serif] text-[18px] text-white/50">
                Contact Us
              </span>
              <a 
                href="tel:+212610833077" 
                className="font-['Space_Grotesk_Variable',sans-serif] text-[24px] text-white hover:text-white/70 transition-colors"
              >
                +212 6 10 83 30 77
              </a>
            </div>

            {/* Location & Email Blocks */}
            <div className="flex flex-col sm:flex-row gap-10">
              <div className="flex flex-col gap-1.5">
                <span className="font-['Space_Grotesk_Variable',sans-serif] text-[18px] text-white/50">
                  Location
                </span>
                <span className="font-['Space_Grotesk_Variable',sans-serif] text-[24px] text-white">
                  Fes, Morocco
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-['Space_Grotesk_Variable',sans-serif] text-[18px] text-white/50">
                  Email
                </span>
                <a 
                  href="mailto:yassinbenkacem12@gmail.com" 
                  className="font-['Space_Grotesk_Variable',sans-serif] text-[24px] text-white hover:text-white/70 transition-colors"
                >
                  yassinbenkacem12@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────────────── */}
        <div className="border-t border-white/[0.08] pt-8 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 gsap-footer-fade">
          <p className="font-['Space_Grotesk_Variable',sans-serif] text-[13px] text-white/40 tracking-wide text-center sm:text-left">
            © {year} Yassine Benkacem. All rights reserved.
          </p>
          <p className="font-['Space_Grotesk_Variable',sans-serif] text-[12px] text-white/30 text-center sm:text-right">
            Designed &amp; built with React, Framer Motion &amp; TailwindCSS
          </p>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOCIAL_LINKS } from './Hero';

gsap.registerPlugin(ScrollTrigger);

const activeSocials = SOCIAL_LINKS.filter(s => s.href && s.href.trim() !== '' && s.href !== '#');

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
      className="relative overflow-hidden pb-0 text-white"
      style={{ backgroundColor: '#000000' }}
    >
   

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
              {activeSocials.map(s => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
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
        </div>
        
      </div>
    </footer>
  )
}

export default Footer;

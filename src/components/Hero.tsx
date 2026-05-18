import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Hero.css'
import RotatingHeroBadge from './RotatingHeroBadge'

// @ts-ignore
import englishCV from '../cv-pdf/cv_english_version.pdf'
// @ts-ignore
import frenchCV from '../cv-pdf/cv_frensh_version.pdf'

/*
 * HeroSection — Framer XML reference:
 *   backgroundColor: /White   padding: 160px 0 60px
 *   Container max-1080 gap:120 vertical start
 *     LabelTitle: relative row, min-height:auto
 *       BrandTag: absolute top:25 left:10 (small label float)
 *       H1: maxWidth:780  inlineTextStyle:/Heading 1
 *     CtaDescription: horizontal space-between alignEnd wrap gap:10
 *       Cta: vertical gap:10 alignStart
 *         ArrowButton
 *       Description: /20px Body Regular, maxWidth:456
 */

/* Shared easing curve (Framer default spring-ish) */
const EASE = [0.22, 1, 0.36, 1] as const

const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/yassinebenkacem123',
    color: '#0f0f0f',
    path: 'M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2Z',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yassine-ben-kacem-791150316/?locale=en',
    color: '#0a66c2',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/yassine.benkacem12/',
    color: '#e1306c',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/212672740307',
    color: '#25d366',
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z',
  },
]

/* Arrow CTA button — matches Framer's YhdCwSbLA component */
const ArrowBtn: React.FC<{ label: string; href: string; dark?: boolean }> = ({
  label,
  href,
  dark = true,
}) => (
  <a
    href={href}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      borderRadius: 9999,
      border: `1.5px solid ${dark ? 'rgb(51,51,51)' : 'rgba(255,255,255,0.4)'}`,
      color: dark ? 'rgb(51,51,51)' : '#fff',
      padding: '11px 16px 11px 20px',
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: '-0.02em',
      textDecoration: 'none',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      whiteSpace: 'nowrap',
    }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.72'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
  >
    {label}
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor: dark ? 'rgb(51,51,51)' : '#fff',
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5"
          stroke={dark ? '#fff' : 'rgb(15,15,15)'}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </a>
)

/* Download CV button — secondary pill, ghost variant of ArrowBtn */
const DownloadBtn: React.FC<{ label?: string; onClick?: () => void }> = ({
  label = 'Download CV',
  onClick,
}) => (
  <button
    onClick={onClick}
    aria-label="Download resume PDF"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      borderRadius: 9999,
      border: '1.5px solid rgba(51,51,51,0.30)',
      color: 'rgb(51,51,51)',
      padding: '11px 16px 11px 20px',
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: '-0.02em',
      cursor: 'pointer',
      transition: 'opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
      whiteSpace: 'nowrap',
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLElement
      el.style.opacity = '0.72'
      el.style.transform = 'translateY(-1px)'
      el.style.borderColor = 'rgb(51,51,51)'
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLElement
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
      el.style.borderColor = 'rgba(51,51,51,0.30)'
    }}
  >
    {label}
    {/* Download icon circle — matches ArrowBtn's icon circle size exactly */}
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: '50%',
        border: '1.5px solid rgba(51,51,51,0.25)',
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        {/* Down arrow shaft */}
        <path
          d="M7 1.5V9.5"
          stroke="rgb(51,51,51)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Chevron */}
        <path
          d="M4 6.5L7 9.5L10 6.5"
          stroke="rgb(51,51,51)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Baseline */}
        <path
          d="M2 12H12"
          stroke="rgb(51,51,51)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  </button>
)

const CVDownloadModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', zIndex: 99999, inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'relative',
              backgroundColor: '#fff',
              borderRadius: 24,
              padding: 32,
              width: '90%',
              maxWidth: 400,
              boxShadow: '0 24px 48px -12px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'rgb(15,15,15)', letterSpacing: '-0.02em' }}>
                Choose CV Language
              </h3>
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgb(153,153,153)',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(15,15,15)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgb(153,153,153)')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href={englishCV}
                download="Yassine_Ben_Kacem_CV_English.pdf"
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 16,
                  border: '1px solid rgba(0,0,0,0.08)',
                  textDecoration: 'none',
                  color: 'rgb(51,51,51)',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  backgroundColor: '#fafafa',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                }}
              >
                English Version
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
              <a
                href={frenchCV}
                download="Yassine_Ben_Kacem_CV_French.pdf"
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 16,
                  border: '1px solid rgba(0,0,0,0.08)',
                  textDecoration: 'none',
                  color: 'rgb(51,51,51)',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  backgroundColor: '#fafafa',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                }}
              >
                Télécharger le CV en Français
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Hero: React.FC = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  return (
    <>
      <CVDownloadModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
      <section
        id="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'hidden',
        backgroundColor: '#fff',
        paddingTop: 100,
        paddingBottom: 80,
      }}
    >
      {/* ── Background image layer ── */}
      <div className="hero-bg-wrap" aria-hidden="true">
        <img
          src="/background.png"
          alt=""
          className="hero-bg-img"
          draggable={false}
        />
        <div className="hero-bg-vignette" />

        {/* ── Left-hand accent image — bottom-left corner ── */}
        <img
          src="/left-hand.png"
          alt=""
          draggable={false}
          className={[
            /* positioning */
            'absolute', 'bottom-0', 'left-0',
            /* sizing — ~40% of hero width, capped */
            'w-[38%]', 'max-w-[550px]', 'h-auto',
            /* push it slightly off-screen left so it looks naturally cropped */
            '-translate-x-[22%]', 'translate-y-[8%]',
            /* blend the solid-black bg away on white */
            'mix-blend-mode-multiply',
            /* subtle opacity — hand is accent, not focal point */
            'opacity-40',
            /* no interaction */
            'pointer-events-none', 'select-none',
          ].join(' ')}
          style={{
            /* mix-blend-mode via style because TW v4 may not ship the utility by default */
            mixBlendMode: 'multiply',
            /* soft edge fade — mask fades left, bottom, and a touch at top */
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), ' +
              'linear-gradient(to top, transparent 0%, black 18%, black 100%)',
            WebkitMaskComposite: 'destination-in',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), ' +
              'linear-gradient(to top, transparent 0%, black 18%, black 100%)',
            maskComposite: 'intersect',
            /* slight contrast lift so hand detail pops on white */
            filter: 'contrast(1.08) brightness(1.02)',
          }}
        />

        {/* ── Decorative Crack Image — top-left corner ── */}
        <img
          src="/crack.png"
          alt=""
          draggable={false}
          className="absolute  -top-24 -left-20 -rotate-25  w-[240px] md:w-[420px] opacity-50 md:opacity-30 pointer-events-none select-none z-0 mix-blend-multiply"
        />
      </div>
      {/* ── All foreground content sits above the bg image ── */}
      <div className="hero-content" style={{ width: '100%', display: 'contents' }}>
        {/* ── Max-1080 container ── */}
        <div className="portfolio-container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 96 }}>
   {/* Premium Animated Circular Badge — top-left absolute */}
            <div style={{ position: 'absolute', top: -40, left: -30, zIndex: 10 }}>
              <RotatingHeroBadge />
            </div>
          {/* ── LabelTitle block — exact Framer layout ── */}
          <div style={{ position: 'relative', width: '100%' }}>

         

            {/* ── Main H1 headline — full-width, wraps naturally across two lines ── */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.07, ease: EASE }}
              className="text-heading-1 text-center"
              style={{
                color: 'rgb(15,15,15)',
                width: '100%',
                paddingLeft: 120, /* clear the new circular badge */
              }}
            >
              Software Engineering{' '}
              <span
                className="text-heading-1-italic"
                style={{ color: 'rgb(51,51,51)' }}
              >
                and
              </span> {' '}
              Artificial Intelligence
            </motion.h1>
          </div>

          {/* ── CtaDescription row ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 32,
            }}
          >
            {/* CTA column — primary + secondary buttons */}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <ArrowBtn label="Let's work together" href="#contact" />
              <DownloadBtn onClick={() => setIsCVModalOpen(true)} />
            </div>

            {/* Description paragraph */}
            <p
              className="text-body-20-regular"
              style={{
                color: 'rgb(76,76,76)',
                maxWidth: 600,
                flex: '1 1 320px',
                lineHeight: '1.65em',
              }}
            >
              Passionate about building intelligent and scalable digital solutions,
              I specialize in software engineering and artificial intelligence.
              I focus on creating impactful applications, clean user experiences,
              and innovative systems that solve real-world problems.
            </p>

          </motion.div>
        </div>

        {/* ── Social icons — bottom-right of hero ── */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          style={{
            position: 'absolute',
            bottom: 28,
            right: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                color: 'rgb(153,153,153)',
                textDecoration: 'none',
                transition: 'color 0.2s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = s.color
                el.style.transform = 'translateY(-3px) scale(1.15)'
                el.style.backgroundColor = 'rgba(0,0,0,0.05)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'rgb(153,153,153)'
                el.style.transform = 'none'
                el.style.backgroundColor = 'transparent'
              }}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}

          {/* Vertical line */}
          <div style={{
            width: 1,
            height: 44,
            marginTop: 4,
            background: 'linear-gradient(to bottom, rgba(153,153,153,0.35), transparent)',
          }} />
        </motion.div>
      </div>{/* end hero-content */}
    </section>
    </>
  )
}

export default Hero

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'



/* Word-by-word scroll color fill animation */
const ScrollRevealText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 10%'],
  })
  const words = text.split(' ')

  return (
    <div ref={ref} style={{ maxWidth: 780 }}>
      <p
        className="text-body-20-regular"
        style={{ color: 'transparent', position: 'relative' }}
      >
        {words.map((word, i) => {
          // Progressive reveal: each word fills as scroll progresses
          const start = i / words.length
          const end = Math.min((i + 4) / words.length, 1)
          return (
            <AnimatedWord
              key={i}
              word={word}
              progress={scrollYProgress}
              start={start}
              end={end}
            />
          )
        })}
      </p>
    </div>
  )
}

const AnimatedWord: React.FC<{
  word: string
  progress: any
  start: number
  end: number
}> = ({ word, progress, start, end }) => {
  const color = useTransform(
    progress,
    [start, end],
    ['rgba(15,15,15,0.2)', 'rgb(51,51,51)']
  )
  return (
    <motion.span
      style={{
        color,
        marginRight: '0.3em',
        display: 'inline-block',
        fontSize: 20,
        fontWeight: 400,
        letterSpacing: '-0.02em',
        lineHeight: '1.4em',
      }}
    >
      {word}
    </motion.span>
  )
}

/* KPI Card 1 — 100% Full-Stack */
const KpiCard1: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
  >
    {/* Striped header strip */}
    <div
      style={{
        height: 32,
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 2px, transparent 2px, transparent 10px), #2a2a2a',
        flexShrink: 0,
      }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px 0', gap: 16 }}>
      <span className="text-body-80-regular" style={{ color: 'rgb(40,40,40)', lineHeight: 0.9, letterSpacing: '-0.04em' }}>
        100%
      </span>
      <p className="text-body-16-regular" style={{ color: 'rgb(90,90,90)', lineHeight: 1.5 }}>
        Built full-stack applications using modern technologies like React, Spring Boot, and PostgreSQL, with a strong focus on clean architecture and scalability.
      </p>
    </div>
  </motion.div>
)

/* KPI Card 2 — 85% AI & LLMs */
const KpiCard2: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
  >
    {/* Striped header box */}
    <div
      style={{
        flexGrow: 0,
        height: '60%',
        minHeight: 180,
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 2px, transparent 2px, transparent 10px), #2a2a2a',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '24px 20px',
      }}
    >
      <span className="text-body-80-regular" style={{ color: '#fff', lineHeight: 0.9, letterSpacing: '-0.04em' }}>
        85%
      </span>
    </div>
    {/* Description */}
    <div style={{ padding: '20px 0' }}>
      <p className="text-body-16-regular" style={{ color: 'rgb(90,90,90)', lineHeight: 1.5 }}>
        Specialized in AI-driven systems, including LLMs, RAG pipelines, and intelligent agents integrated into real-world applications.
      </p>
    </div>
  </motion.div>
)

/* KPI Card 3 — 0 Bugs Mindset 🚀 */
const KpiCard3: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    style={{
      borderRadius: 12,
      height: '100%',
      background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 2px, transparent 2px, transparent 10px), #2a2a2a',
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      gap: 16,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span className="text-body-80-regular" style={{ color: '#fff', lineHeight: 0.9, letterSpacing: '-0.04em' }}>0%</span>
    </div>
    <span className="text-body-18-medium" style={{ color: '#fff', opacity: 0.9, marginTop: 4 }}>Bugs Mindset</span>
    <p className="text-body-16-regular" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
      Focused on writing clean, maintainable code and ensuring reliable systems through structured APIs, testing, and consistent communication across projects.
    </p>
  </motion.div>
)

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: 'rgb(250,250,250)', padding: '80px 0' }}
    >
      <div className="portfolio-container flex flex-col" style={{ gap: 60 }}>
        {/*
         * Content row — horizontal space-between, gap:10
         * Location text | ScrollColorText maxWidth 780
         */}
        <div
          className="w-full flex flex-row flex-wrap items-start"
          style={{ justifyContent: 'space-between', gap: 10 }}
        >
          <div style={{ paddingRight: 40, flexShrink: 0 }}>
            <p className="text-body-20-regular" style={{ color: 'rgb(51,51,51)' }}>
              Software Engineer &<br />AI Specialist
            </p>
          </div>

          <ScrollRevealText text="Explore my work, where modern software engineering seamlessly meets artificial intelligence. I focus on building systems that don't just function smoothly, but push boundaries, scale reliably, and solve real-world problems." />
        </div>

        {/*
         * KpIsButton row — horizontal space-between, align-end
         * ButtonWrap (padding right 40) | KpIsCards grid 3cols 400px
         */}
        <div
          className="w-full flex flex-row flex-wrap items-end"
          style={{ justifyContent: 'space-between', gap: 10 }}
        >
          {/* Contact Us button */}
          <div style={{ paddingRight: 40, flexShrink: 0 }}>
            <a
              href="/contact"
              className="inline-flex   items-center gap-3 rounded-full transition-all hover:bg-neutral-900 group"
              style={{
                color: 'rgb(51,51,51)',
                backgroundColor: 'transparent',
                border: '1px solid rgba(0,0,0,0.15)',
                padding: '10px 20px',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="text-body-16-regular  transition-colors">Contact Me</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-all group-hover:translate-x-1">
                <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className=" transition-colors" />
              </svg>
            </a>
          </div>

          {/* KPI Cards — 3-column grid, height 400px, maxWidth 780 */}
          <div
            style={{
              flex: '1 1 500px',
              maxWidth: 780,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
              height: 400,
              minWidth: 0,
            }}
          >
            <KpiCard1 />
            <KpiCard2 />
            <KpiCard3 />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

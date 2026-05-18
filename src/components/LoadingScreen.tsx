import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ─── Design tokens ─────────────────────────────── */
const BG      = '#0a0a0a'
const TEXT    = '#f5f5f5'
const MUTED   = '#888888'
const STROKE  = '#1f1f1f'

/* ─── Config ────────────────────────────────────── */
const WORDS         = ['Cues', 'Desires', 'Develop']
const WORD_INTERVAL = 900      // ms between words
const COUNT_DURATION = 2700    // ms from 0→100
const COMPLETE_DELAY = 400     // ms after 100 before onComplete

/* ─── Ease ──────────────────────────────────────── */
const EASE = [0.4, 0, 0.2, 1] as const

/* ═══════════════════════════════════════════════════
   LoadingScreen
   ═══════════════════════════════════════════════════ */
interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [wordIndex, setWordIndex]   = useState(0)
  const [progress,  setProgress]   = useState(0)

  /* Stable ref so the RAF/timeout callbacks never capture a stale closure */
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  /* ── Cycling words ── */
  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => {
        const next = prev + 1
        if (next >= WORDS.length - 1) clearInterval(id)
        return Math.min(next, WORDS.length - 1)
      })
    }, WORD_INTERVAL)
    return () => clearInterval(id)
  }, [])

  /* ── Counter (requestAnimationFrame) ── */
  useEffect(() => {
    let rafId: number
    let startTime: number | null = null
    let completed = false

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const raw     = Math.min((elapsed / COUNT_DURATION) * 100, 100)
      setProgress(raw)

      if (raw < 100) {
        rafId = requestAnimationFrame(tick)
      } else if (!completed) {
        completed = true
        setTimeout(() => onCompleteRef.current(), COMPLETE_DELAY)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          9999,
        backgroundColor: BG,
        overflow:        'hidden',
      }}
    >

      {/* ── Element 1: "Portfolio" label — top-left ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y:   0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        style={{
          position:      'absolute',
          top:           'clamp(32px, 5vw, 48px)',
          left:          'clamp(32px, 5vw, 48px)',
          fontSize:      'clamp(11px, 1.2vw, 13px)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color:          MUTED,
          fontFamily:    "'Space Grotesk Variable', 'Space Grotesk', system-ui, sans-serif",
          fontWeight:    400,
          userSelect:    'none',
        }}
      >
        Portfolio
      </motion.div>

      {/* ── Element 2: Rotating words — center ── */}
      <div
        style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          pointerEvents:  'none',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y:  20 }}
            animate={{ opacity: 1, y:   0 }}
            exit={{    opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              fontFamily:  "'Instrument Serif', Georgia, serif",
              fontStyle:   'italic',
              fontWeight:  400,
              fontSize:    'clamp(42px, 7vw, 96px)',
              color:       `${TEXT}cc`,           /* 80% opacity */
              userSelect:  'none',
              lineHeight:  1,
            }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Element 3: Counter — bottom-right ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y:  0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        style={{
          position:    'absolute',
          bottom:      'clamp(32px, 5vw, 48px)',
          right:       'clamp(32px, 5vw, 48px)',
          fontFamily:  "'Instrument Serif', Georgia, serif",
          fontStyle:   'normal',
          fontWeight:  400,
          fontSize:    'clamp(64px, 10vw, 144px)',
          color:        TEXT,
          lineHeight:  1,
          userSelect:  'none',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </motion.div>

      {/* ── Element 4: Progress bar — bottom edge ── */}
      <div
        style={{
          position:        'absolute',
          bottom:          0,
          left:            0,
          right:           0,
          height:          3,
          backgroundColor: `${STROKE}80`,   /* 50% opacity */
        }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: 'linear' }}
          style={{
            height:           '100%',
            transformOrigin:  'left',
            background:       'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            boxShadow:        '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>

    </motion.div>
  )
}

export default LoadingScreen

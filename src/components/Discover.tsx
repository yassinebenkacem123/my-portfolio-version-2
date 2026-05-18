import React, { useState } from 'react'
import { motion } from 'framer-motion'

/*
 * DiscoverSection — Framer XML:
 *   width:1fr, height:800px, borderRadius:24px
 *   backgroundImage: (dark atmospheric/smoky)
 *   overflow:clip, padding:48px 100px
 *   layout:stack vertical space-between center
 *   Container max-1080 gap:120 vertical space-between start (height:1fr)
 *     Row 1 (align end): Card width≤280 bg /Black 01, p:24, gap:48
 *       PhoneIcon circle + text "Elevating your brand..."
 *     Row 2 (align start): Card width≤420 bg /White, p:24, gap:48
 *       H3 "Let's Discover..." + email form
 */

const BG =
  '/discover.png'

const Discover: React.FC = () => {
  const [email, setEmail] = useState('')

  return (
    <section
      id="discover"
      className="w-full"
      style={{ backgroundColor: '#fff', padding: '0' }}
    >
      {/*
       * The 800px container with background image, 24px radius
       * padding: 48px 100px each side
       */}
      <div
        style={{
          width: '100%',
          height: 800,
          borderRadius: 24,
          backgroundImage: `url(${BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          padding: '48px 100px',
        }}
      >
        {/* Inner container max-1080, full height, space-between */}
        <div
          className="portfolio-container flex flex-col"
          style={{
            justifyContent: 'space-between',
            height: '100%',
            gap: 120,
            padding: 0,
          }}
        >
          {/*
           * Row 1 — align end (right side)
           * Card: max-width 280, bg /Black 01 (rgb 51,51,51), br:24, p:24, gap:48 vertical
           */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex"
            style={{ justifyContent: 'flex-end' }}
          >
            <div
              style={{
                maxWidth: 280,
                width: '100%',
                backgroundColor: 'rgb(51,51,51)',
                borderRadius: 24,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 48,
              }}
            >
              {/* PhoneIcon — 56×56, border circle /Gray */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: '1px solid rgb(153,153,153)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.25 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 4.5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    stroke="white"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* Text and Phone CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p className="text-body-24-regular" style={{ color: '#fff' }}>
                  Let's discuss your next project directly.
                </p>
                <a
                  href="tel:+212610833077"
                  className="text-body-16-regular transition-all duration-200"
                  style={{
                    color: 'rgb(153,153,153)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    textDecoration: 'none',
                    width: 'fit-content',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#fff'
                    el.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'rgb(153,153,153)'
                    el.style.transform = 'none'
                  }}
                >
                  +212 610833077
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/*
           * Row 2 — align start (left side)
           * Card: max-width 420, bg /White, br:24, p:24, gap:48 vertical
           */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex"
            style={{ justifyContent: 'flex-start' }}
          >
            <div
              style={{
                maxWidth: 420,
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: 24,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 48,
              }}
            >
              {/* Text and Note */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p className="text-body-36-regular" style={{ color: 'rgb(51,51,51)' }}>
                  {"Reach out to start\nyour project."}
                </p>
                <p className="text-body-16-regular" style={{ color: 'rgb(76,76,76)', lineHeight: 1.5 }}>
                  Leave your email below to send a message, and I'll respond to you as soon as possible.
                </p>
              </div>

              {/* EmailForm — horizontal pill input */}
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgb(235,235,235)',
                  borderRadius: 9999,
                  padding: '6px 6px 6px 20px',
                  gap: 8,
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-body-16-regular flex-1 bg-transparent outline-none border-none min-w-0"
                  style={{ color: 'rgb(51,51,51)' }}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-full flex-shrink-0 transition-opacity hover:opacity-70"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'rgb(51,51,51)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Discover

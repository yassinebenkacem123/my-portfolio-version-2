import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Mail, Phone, MapPin, Send, ArrowLeft } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

// ─────────────────────────────────────────────────────────────────────────────
// Stagger animation helpers
// ─────────────────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

// ─────────────────────────────────────────────────────────────────────────────
// ContactCard — glassmorphic info card (Email / Phone / Location)
// ─────────────────────────────────────────────────────────────────────────────
interface ContactCardProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, label, value, href }) => {
  const inner = (
    <div
      className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300"
      style={{
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.07)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.16)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.04)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif' }}>
          {label}
        </span>
        <span style={{ fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.75)', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif', letterSpacing: '-0.01em', wordBreak: 'break-all' }}>
          {value}
        </span>
      </div>
    </div>
  )

  return href ? (
    <a href={href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</a>
  ) : <>{inner}</>
}

// ─────────────────────────────────────────────────────────────────────────────
// InputField — dark styled form input
// ─────────────────────────────────────────────────────────────────────────────
interface InputFieldProps {
  label: string
  id: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  rows?: number
}

const InputField: React.FC<InputFieldProps> = ({
  label, id, type = 'text', placeholder, value, onChange, multiline, rows = 5,
}) => {
  const sharedStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '14px 16px',
    fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
    fontSize: 15,
    fontWeight: 400,
    color: '#fff',
    outline: 'none',
    letterSpacing: '-0.01em',
    resize: 'none' as const,
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
  }

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    ;(e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'
    ;(e.target as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    ;(e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
    ;(e.target as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.04)'
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.01em', color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif' }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={rows}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={sharedStyle}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={sharedStyle}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ContactPage — the full /contact route
// Two-column layout: info cards (left) + form (right)
// ─────────────────────────────────────────────────────────────────────────────
const ContactPage: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedName = form.name.trim()
    const trimmedEmail = form.email.trim()
    const trimmedMessage = form.message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMsg('Please fill in all fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setSending(true)
    setErrorMsg('')

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSent(true)
        setForm({ name: '', email: '', message: '' })
      } else {
        setErrorMsg(data.error || 'Failed to send message. Please try again.')
      }
    } catch (err) {
      console.error('[Contact Form Error]', err)
      setErrorMsg('Network error. Please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    // Page wrapper — full-screen, dark background
    // AnimatePresence handles the mount/unmount transition in App.tsx
    <motion.div
      key="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      style={{ minHeight: '100vh', backgroundColor: 'rgb(15,15,15)', position: 'relative', overflowX: 'hidden' }}
    >
      {/* ── Back button ─────────────────────────────────────────────────────── */}
      <div className="portfolio-container" style={{ paddingTop: 100, paddingBottom: 40 }}>
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 transition-opacity hover:opacity-60"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '-0.01em',
          }}
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>
      </div>

      <div className="portfolio-container" style={{ paddingBottom: 120 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-16"
        >
          {/* ── Page heading ──────────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif' }}>
              // Contact
            </span>

            <div className="flex flex-col" style={{ lineHeight: 1 }}>
              {/* "Let's Get" — bold sans */}
              <h1
                style={{
                  fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
                  fontSize: 'clamp(52px, 8vw, 100px)',
                  fontWeight: 500,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.0,
                  color: '#fff',
                  margin: 0,
                }}
              >
                Let's Get
              </h1>
              {/* "In Touch" — italic serif contrast (Instrument Serif) */}
              <h1
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 'clamp(52px, 8vw, 100px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  color: '#fff',
                  margin: 0,
                }}
              >
                In Touch
              </h1>
            </div>

            <p style={{ fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif', fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.4)', maxWidth: 480, margin: 0, lineHeight: 1.65, letterSpacing: '-0.01em' }}>
              Have a project in mind? I'd love to hear about it. Let's build something remarkable together.
            </p>
          </motion.div>

          {/* ── Two-column grid ───────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Left — info cards ───────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif', marginBottom: 4 }}>
                Contact Details
              </p>
              <ContactCard icon={<Mail size={18} />} label="Email us" value="yassinbenkacem12@gmail.com" href="mailto:yassinbenkacem12@gmail.com" />
              <ContactCard icon={<Phone size={18} />} label="Call us" value="+212 6 10 83 30 77" href="tel:+212610833077" />
              <ContactCard icon={<MapPin size={18} />} label="Location" value="Fes, Morocco" />
            </motion.div>

            {/* ── Right — contact form ─────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-6 p-7 rounded-3xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {sent ? (
                // ── Success state ──────────────────────────────────────────
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center gap-5 py-10 text-center"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)' }}>
                    <Send size={22} style={{ color: 'rgb(74,222,128)' }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p style={{ fontSize: 20, fontWeight: 600, color: '#fff', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>Message sent!</p>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif' }}>I'll get back to you as soon as possible.</p>
                  </div>
                </motion.div>
              ) : (
                // ── Form ─────────────────────────────────────────────────
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <InputField
                    label="Name"
                    id="contact-name"
                    placeholder="Ex. John Doe"
                    value={form.name}
                    onChange={v => {
                      setForm(f => ({ ...f, name: v }))
                      if (errorMsg) setErrorMsg('')
                    }}
                  />
                  <InputField
                    label="Email"
                    id="contact-email"
                    type="email"
                    placeholder="Ex. john@example.com"
                    value={form.email}
                    onChange={v => {
                      setForm(f => ({ ...f, email: v }))
                      if (errorMsg) setErrorMsg('')
                    }}
                  />
                  <InputField
                    label="Message"
                    id="contact-message"
                    placeholder="Type your message..."
                    value={form.message}
                    onChange={v => {
                      setForm(f => ({ ...f, message: v }))
                      if (errorMsg) setErrorMsg('')
                    }}
                    multiline
                    rows={5}
                  />

                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="text-sm"
                        style={{
                          color: '#ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
                          overflow: 'hidden',
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button — full width white pill */}
                  <motion.button
                    type="submit"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    disabled={sending}
                    style={{
                      width: '100%',
                      height: 52,
                      borderRadius: 9999,
                      backgroundColor: '#fff',
                      border: 'none',
                      cursor: sending ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: 'rgb(15,15,15)',
                      opacity: sending ? 0.7 : 1,
                      marginTop: 4,
                    }}
                  >
                    {sending ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgb(15,15,15)', borderTopColor: 'transparent', borderRadius: '50%' }}
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ContactPage

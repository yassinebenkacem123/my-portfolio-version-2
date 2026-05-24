import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      key="not-found-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        minHeight: '100vh',
        backgroundColor: 'rgb(15,15,15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      {/* Premium subtle glowing background radial gradient */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
     
          <img
            src="/not-found-icon.png"
            alt="Page Not Found Icon"
            style={{
              width: '200px',
              height: 'auto',
              maxHeight: '180px',
              objectFit: 'contain',            }}
          />

        {/* Error Code Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'inline-flex',
            padding: '6px 18px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 12,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 20,
            fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
          }}
        >
          Error Code: 404
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 500,
            color: '#fff',
            margin: '0 0 16px 0',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          Lost in the <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400 }}>Void</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
            fontSize: 16,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.6,
            maxWidth: 440,
            margin: '0 auto 40px auto',
            letterSpacing: '-0.01em',
          }}
        >
          The page you are looking for does not exist, was moved, or has disappeared into the digital ether. Let's get you back on track.
        </motion.p>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.95)', scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: '14px 28px',
              borderRadius: '9999px',
              backgroundColor: '#fff',
              color: 'rgb(15,15,15)',
              fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35)',
            }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  )
}

export default NotFoundPage

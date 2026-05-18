import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const elements = section.querySelectorAll('.gsap-fade')
    gsap.set(elements, { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
    })

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex flex-col items-center justify-center overflow-hidden w-full"
      style={{ backgroundColor: '#000000' }}
    >
      {/* ── Structural Tree Image with Breathing Glow ── */}
      <div className="w-full relative z-0 pointer-events-none">
        {/* Base crisp tree */}
        <img
          src="/discover.png"
          alt=""
          className="w-full h-auto object-cover pointer-events-none"
          style={{
            opacity: 0.25,
            filter: 'invert(1) grayscale(1) brightness(0.9) contrast(1.5)',
            mixBlendMode: 'screen'
          }}
        />
        {/* Soft breathing halo/glow effect */}
        <motion.img
          src="/discover.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          animate={{ opacity: [0, 0.45, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            filter: 'invert(1) grayscale(1) brightness(1.2) contrast(1.5) blur(12px)',
            mixBlendMode: 'screen'
          }}
        />
      </div>

      {/* Edge fade gradients to seamlessly blend the top and bottom into the surrounding sections */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #000000 0%, transparent 15%, transparent 85%, #000000 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* ── Main Content (Absolute Centered) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.button
          onClick={() => navigate('/contact')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="gsap-fade group flex items-center gap-5 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] hover:border-white/[0.25] text-white px-8 py-4 rounded-full backdrop-blur-md transition-all duration-300 shadow-2xl"
        >
          <span className="font-['Space_Grotesk_Variable',sans-serif] text-[17px] font-medium tracking-wide">
            Let's Get In Touch
          </span>
          <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-sm">
            <ArrowRight size={20} />
          </div>
        </motion.button>
      </div>
    </section>
  )
}

export default Contact;

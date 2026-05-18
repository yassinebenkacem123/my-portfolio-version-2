import React, { useRef } from 'react'
import { motion } from 'framer-motion'

interface Experience {
  id: string
  number: string
  title: string
  description: string
}

const EXPERIENCES: Experience[] = [
  {
    id: '1',
    number: '1',
    title: 'First Internship at EPG',
    description: 'Built an e-learning platform, which significantly enhanced my full-stack capabilities, exposed me to real-world project workflows, and solidified my software engineering fundamentals.'
  },
  {
    id: '2',
    number: '2',
    title: 'IEEE Innovation Event',
    description: 'Presented an innovative tech solution aimed at solving a real-world problem in Morocco. This experience strengthened my creative thinking, technical presentation skills, and focus on impactful innovation.'
  },
  {
    id: '3',
    number: '3',
    title: 'Gaming Event in Rabat',
    description: 'Proudly represented ENSA Fès at a national gaming event. Engaged with the broader tech and gaming community, expanding my network and refining my interpersonal communication skills.'
  },
  {
    id: '4',
    number: '4',
    title: 'DocVoice Event',
    description: 'Spoke at the Faculty of Medicine about inner balance, personal growth, and interdisciplinary collaboration, honing my ability to express complex ideas clearly to diverse audiences.'
  },
  {
    id: '5',
    number: '5',
    title: 'GITEX Africa',
    description: 'Explored emerging technology trends and gained valuable industry insights. This global tech event clarified my career vision and the specific skills needed to excel in software engineering and AI.'
  },
  {
    id: '6',
    number: '6',
    title: 'Coding Challenge at UPF',
    description: 'Competed in a rigorous programming challenge at UPF University. This high-pressure environment sharpened my algorithmic problem-solving abilities and competitive programming mindset.'
  }
]

const EASE = [0.22, 1, 0.36, 1] as const

const Experiences: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="experiences"
      className="w-full flex justify-center overflow-visible"
      style={{ backgroundColor: 'rgb(250,250,250)', padding: '120px 0' }}
    >
      <div 
        ref={containerRef}
        className="portfolio-container flex flex-col lg:flex-row relative w-full max-w-[1200px] px-6"
        style={{ gap: 40, alignItems: 'flex-start' }}
      >
        
        {/* Left Column - Sticky */}
        <div 
          className="w-full lg:w-5/12 flex flex-col lg:sticky lg:top-[120px] z-10"
          style={{ gap: 48, paddingRight: '0', flexShrink: 0 }}
        >
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span 
                className="text-sm font-medium inline-block"
                style={{ color: 'rgb(153,153,153)', letterSpacing: '0.05em' }}
              >
                {'{ Experiences }'}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="text-heading-2 uppercase"
              style={{ color: 'rgb(15,15,15)', maxWidth: 450, lineHeight: 1.1, letterSpacing: '-0.02em', fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Experiences That Shaped My Journey
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="w-full relative overflow-hidden bg-neutral-200"
            style={{ 
              aspectRatio: '4/3',
              borderRadius: '32px',
              borderBottomRightRadius: '100px', // Custom cutout look
            }}
          >
            <img 
              src="/discover.png" 
              alt="Experience" 
              className="w-full h-full object-cover opacity-80 filter grayscale transition-transform duration-700 hover:scale-105" 
            />
            {/* Tech monochrome overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent mix-blend-overlay" />
          </motion.div>
        </div>

        {/* Right Column - Timeline */}
        <div 
          className="w-full lg:w-7/12 flex flex-col pt-10 lg:pt-0 relative" 
        >
          {/* Vertical continuous line */}
          <div className="absolute left-[19px] sm:left-[27px] top-4 bottom-0 w-[2px] bg-black/5" />

          <div className="flex flex-col gap-12 sm:gap-16">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="group relative flex flex-row items-start gap-6 sm:gap-10 cursor-default"
              >
                {/* Node wrapper */}
                <div className="relative flex flex-col items-center mt-2 z-10">
                  {/* Outer circle */}
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[rgb(250,250,250)] border-[2px] border-black/10 flex items-center justify-center transition-all duration-300 group-hover:border-black/60 group-hover:scale-110">
                    {/* Inner dot */}
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-black/20 transition-colors duration-300 group-hover:bg-black/80" />
                  </div>
                  
                  {/* Dynamic line fill on hover (optional enhancement for tech feel) */}
                  <div className="absolute top-10 sm:top-14 w-[2px] h-0 bg-black/20 transition-all duration-500 group-hover:h-[calc(100%+3rem)] sm:group-hover:h-[calc(100%+4rem)] -z-10" />
                </div>

                {/* Content */}
                <div className="flex flex-row items-start gap-4 sm:gap-6 flex-1 pt-2 sm:pt-4">
                  <span 
                    className="text-[48px] sm:text-[72px] leading-[0.8] font-bold tracking-tighter transition-colors duration-500" 
                    style={{ color: 'rgb(15,15,15)' }}
                  >
                    {exp.number}
                  </span>
                  
                  <div className="flex flex-col gap-2 sm:gap-3 mt-1 sm:mt-2">
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-black/70" style={{ color: 'rgb(15,15,15)' }}>
                      {exp.title}
                    </h3>
                    <p className="text-body-16-regular leading-relaxed" style={{ color: 'rgb(76,76,76)' }}>
                      {exp.description}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Experiences

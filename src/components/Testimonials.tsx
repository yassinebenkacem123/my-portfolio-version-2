import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    quote: "Collaborating with Yassine reshaped how our platform operates. His eye for detail and thoughtful full-stack architecture elevated our application far beyond expectations. He truly understood our technical needs.",
    name: "Yakoub Dibiazah",
    role: "Brand Experience Lead",
    image: "https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 2,
    quote: "Working with him was transformative. His technical excellence in backend systems combined with an incredible AI intuition delivered a product that genuinely stunned our users. Highly recommended.",
    name: "Sarah Jenkins",
    role: "Product Manager, TechFlow",
    image: "https://img.freepik.com/premium-photo/portrait-indian-male-businessman-standing-white-background_466689-45726.jpg"
  },
  {
    id: 3,
    quote: "An exceptional software engineer who perfectly blends robust API architecture with a keen eye for premium frontend design. His expertise in integrating LLMs elevated our product capabilities substantially.",
    name: "Alex Rivera",
    role: "CTO, NextGen Web",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCG7_AGYcFT_AXYmJGTNUbVDEG_ucXnoK1vQ&s"
  },
  {
    id: 4,
    quote: "He possesses a rare combination of deep technical expertise and strong problem-solving skills. The React and Spring Boot applications he built for us scale seamlessly and perform flawlessly.",
    name: "Priya Sharma",
    role: "Founder, Bloom Studio",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkLP1nLUi0MGIvn3XDh7Fyd_X_QQvBbyZmPQ&s"
  },
  {
    id: 5,
    quote: "Meticulous, brilliant, and incredibly fast. The AI solutions he implemented completely streamlined our workflows. The reliable, zero-bug mindset he brings to the table is unmatched.",
    name: "David Chen",
    role: "Director of Engineering",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_cppNo57Z6TpJtEkwxVqGZR5gRGpeKwJmQ&s"
  }
]

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentT = testimonials[currentIndex]

  // Slide animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  }

  return (
    <section
      id="trust-us"
      className="testimonials-section w-full flex justify-center"
    >
      <div className="portfolio-container flex flex-col pt-20 pb-24 md:pt-32 md:pb-32">
        
        {/* Header Row: Title + Navigation */}
        <div className="flex flex-row justify-between items-end mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-heading-2"
            style={{ color: 'rgb(40,40,40)', letterSpacing: '-0.04em', lineHeight: 1 }}
          >
            Trust Me
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4"
          >
            <button 
              onClick={handlePrev} 
              className="nav-arrow-btn rounded-full flex items-center justify-center transition-all"
              aria-label="Previous Testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext} 
              className="nav-arrow-btn rounded-full flex items-center justify-center transition-all"
              aria-label="Next Testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Content Row: Counter + Quote */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32">
          {/* Index Counter */}
          <div className="md:w-1/4 flex-shrink-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-body-16-regular"
              style={{ color: 'rgb(160,160,160)', letterSpacing: '0.02em' }}
            >
              (0{currentIndex + 1} - 0{testimonials.length})
            </motion.p>
          </div>

          {/* Testimonial Quote & Author */}
          <div className="md:w-3/4 flex-grow relative" style={{ minHeight: '300px' }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-12"
              >
                <p 
                  className="testimonial-quote"
                  style={{ 
                    color: 'rgb(60,60,60)', 
                    lineHeight: 1.4,
                    letterSpacing: '-0.02em',
                    fontWeight: 400
                  }}
                >
                  {currentT.quote}
                </p>

                <div className="flex items-center gap-4">
                  {/* Avatar circle */}
                  <div 
                    className="avatar-circle overflow-hidden flex items-center justify-center font-medium text-white shadow-sm bg-neutral-200 flex-shrink-0"
                  >
                    <img 
                      src={currentT.image} 
                      alt={currentT.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-body-18-medium" style={{ color: 'rgb(40,40,40)', fontWeight: 600 }}>
                      {currentT.name}
                    </span>
                    <span className="text-body-16-regular mt-1" style={{ color: 'rgb(150,150,150)' }}>
                      {currentT.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Testimonials

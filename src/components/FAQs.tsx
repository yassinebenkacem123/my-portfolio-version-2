import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
 * FAQs Section ("Have a Question") — Framer node "FaQsSection"
 *   componentId: UzTAtLyky (FAQs Section component)
 *   White background, accordion FAQ items
 *   Framer uses a CMS collection for content
 */

interface FAQ {
  q: string
  a: string
}

const FAQS: FAQ[] = [
  {
    q: 'What is your primary area of expertise?',
    a: 'I am a Full-Stack developer with a strong focus on backend development. I specialize in designing robust applications, modern architectures, and integrating intelligent AI solutions into real-world products.',
  },
  {
    q: 'Which technologies are you most experienced with?',
    a: 'I have developed comprehensive web projects utilizing React, Spring Boot, Express, and PostgreSQL. I also hold specialized certifications in Advanced React, TypeScript, Next.js, and Spring Boot.',
  },
  {
    q: 'What are your current career interests?',
    a: 'I have a deep interest in systems based on Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and automation via AI agents. Currently, I am actively seeking an internship in software development and Artificial Intelligence.',
  },
  {
    q: 'What is your educational background?',
    a: 'I am pursuing an Engineering Degree in Computer Engineering at the École Nationale des Sciences Appliquées (ENSAF) in Fès, Morocco, where I also completed my Integrated Preparatory Classes.',
  },
  {
    q: 'How do you stay updated with emerging technologies like AI?',
    a: 'Continuous learning is a priority for me. I follow leading industry trends and complete specialized coursework, such as designing intelligent AI Agents and MCP Servers through Coursera, to ensure my skills remain at the cutting edge.',
  },
  {
    q: 'What soft skills do you bring to a team?',
    a: 'Beyond technical skills, I actively develop my communication, debate, and public speaking abilities as a member of TGD ENSAF (The Great Debaters). I am also involved in technical brainstorming events like the IEEE ENSAF Innovation Event.',
  },
  {
    q: 'What languages do you speak?',
    a: 'Arabic is my native language, and I have intermediate proficiency in both French and English, allowing me to effectively communicate and collaborate in diverse professional teams.',
  },
]

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onToggle: () => void }> = ({
  faq,
  isOpen,
  onToggle,
}) => (
  <div
    className="border-t border-neutral-200 transition-colors duration-300 hover:bg-neutral-50/50"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left group focus:outline-none"
      style={{ paddingTop: 32, paddingBottom: 32, paddingLeft: 16, paddingRight: 16 }}
    >
      <span
        className="text-body-24-regular sm:text-2xl transition-colors duration-300 group-hover:text-black"
        style={{ color: isOpen ? '#000' : 'rgb(51,51,51)', paddingRight: 24, fontWeight: isOpen ? 500 : 400 }}
      >
        {faq.q}
      </span>
      <span
        className={`flex items-center justify-center rounded-full border flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-neutral-900 border-neutral-900 text-white' : 'border-neutral-300 text-neutral-800'}`}
        style={{
          width: 44,
          height: 44,
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-colors">
          <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <p
            className="text-body-20-regular sm:text-lg pb-10 px-2 sm:px-6 leading-relaxed"
            style={{ color: 'rgb(76,76,76)', maxWidth: 840 }}
          >
            {faq.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faqs"
      className="w-full flex justify-center"
      style={{ backgroundColor: '#fff', padding: '80px 0' }}
    >
      <div className="portfolio-container">
        {/* Header row — label left, heading right */}
        <div
          className="flex flex-row items-start justify-between flex-wrap mb-14"
          style={{ gap: 40 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-body-16-regular"
            style={{ color: 'rgb(153,153,153)', paddingRight: 40, flexShrink: 0 }}
          >
            Have a question?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="text-heading-2"
            style={{ color: 'rgb(51,51,51)', flex: 1, maxWidth: 780 }}
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        {/* FAQ accordion list with bottom border */}
        <div style={{ borderBottom: '1px solid rgba(153,153,153,0.3)' }}>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQs

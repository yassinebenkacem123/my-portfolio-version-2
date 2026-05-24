import React from 'react'
import { motion } from 'framer-motion'
import {
  Code2, FileCode, Layers, Palette, Hexagon,
  Server, Network, Database, Brain, Cpu, 
  Bot, Cloud, GitBranch, Box, Activity, 
  CheckCircle, Settings, TerminalSquare, Compass
} from 'lucide-react'

interface SkillCategory {
  category: string
  skills: string[]
}

const SKILLS_DATA: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Java', 'TypeScript', 'JavaScript', 'Python'],
  },
  {
    category: 'Frontend',
    skills: ['React.js', 'Redux Toolkit', 'TailwindCSS', 'Next.js', 'Framer Motion', 'shadcn/ui'],
  },
  {
    category: 'Backend',
    skills: ['Spring Boot', 'Spring Data JPA', 'Spring AI', 'Express.js', 'FastAPI', 'REST APIs'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Sanity', 'pgvector'],
  },
  {
    category: 'AI & Intelligent Systems',
    skills: ['LLMs', 'RAG', 'MCP', 'TensorFlow', 'Keras', 'Scikit-learn', 'LangChain4j'],
  },
  {
    category: 'Deployment & Cloud',
    skills: ['Vercel', 'Railway', 'Render', 'GitHub Actions'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Postman', 'Docker', 'Git Branching'],
  },
  {
    category: 'Concepts',
    skills: ['REST Architecture', 'MVC', 'Clean Code', 'API Testing', 'Automation'],
  },
]

const getSkillIcon = (skillName: string) => {
  const s = skillName.toLowerCase()
  
  // Langages
  if (s.includes('java') && !s.includes('script')) return <FileCode size={15} />
  if (s.includes('script') || s.includes('ts') || s.includes('python')) return <Code2 size={15} />

  // Frontend
  if (s.includes('react') || s.includes('next')) return <Layers size={15} />
  if (s.includes('tailwind') || s.includes('shadcn') || s.includes('css')) return <Palette size={15} />
  if (s.includes('framer')) return <Hexagon size={15} />

  // Backend
  if (s.includes('spring') || s.includes('express') || s.includes('fastapi')) return <Server size={15} />
  if (s.includes('api')) return <Network size={15} />

  // Database
  if (s.includes('sql') || s.includes('mongo') || s.includes('sanity') || s.includes('vector')) return <Database size={15} />

  // AI
  if (s.includes('llm') || s.includes('rag') || s.includes('langchain')) return <Brain size={15} />
  if (s.includes('tensor') || s.includes('keras') || s.includes('scikit')) return <Cpu size={15} />
  if (s.includes('mcp')) return <Bot size={15} />

  // Cloud / Tools
  if (s.includes('vercel') || s.includes('railway') || s.includes('render')) return <Cloud size={15} />
  if (s.includes('github') || s.includes('git')) return <GitBranch size={15} />
  if (s.includes('docker')) return <Box size={15} />
  if (s.includes('postman')) return <Activity size={15} />

  // Concepts
  if (s.includes('architecture') || s.includes('mvc')) return <Compass size={15} />
  if (s.includes('clean code')) return <TerminalSquare size={15} />
  if (s.includes('test')) return <CheckCircle size={15} />
  if (s.includes('automatisation') || s.includes('automation')) return <Settings size={15} />

  return <TerminalSquare size={15} />
}

const Ticker = ({ tags, reverse }: { tags: string[], reverse?: boolean }) => {
  // 5 sets to guarantee width, x2 to ensure absolute looping overlap
  const group = [...tags, ...tags, ...tags, ...tags, ...tags]
  const extended = [...group, ...group]

  return (
    <div 
      className="flex w-max" 
      style={{ 
        gap: '16px',
        animation: `ticker ${reverse ? '85s' : '95s'} linear infinite ${reverse ? 'reverse' : 'normal'}` 
      }}
    >
      {extended.map((tag, i) => (
        <span 
          key={i} 
          className="text-[13px] md:text-[15px] flex items-center gap-2 rounded-full flex-shrink-0 backdrop-blur-sm transition-colors hover:bg-white/10 cursor-default"
          style={{ 
            color: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.12)',
            backgroundColor: 'rgba(255,255,255,0.02)',
            letterSpacing: '0.01em',
            padding: '5px 18px'
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>{getSkillIcon(tag)}</span>
          {tag}
        </span>
      ))}
    </div>
  )
}

const SkillRow = ({ data, index }: { data: SkillCategory, index: number }) => {
  return (
    <div className="w-full relative border-b group" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="w-full flex flex-col justify-center h-full min-h-[150px] md:min-h-[220px] relative py-8 md:py-0">
        
        {/* Category Title */}
        <h3 
          className="text-[32px] sm:text-[40px] md:text-[56px] font-light tracking-tight z-10 w-full md:w-3/4" 
          style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          <span className="text-white/30 group-hover:text-white transition-colors duration-500 cursor-default">
            {data.category}
          </span>
        </h3>

        {/* Arrow top-right desktop */}
        <div className="absolute top-8 right-0 hidden md:flex z-20">
          <a 
            href="#contact" 
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300" 
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }} 
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }} 
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            aria-label="Let's Talk"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
               <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Ticker bottom-right */}
        <div 
          className="md:absolute md:bottom-8 md:right-0 overflow-hidden w-full md:w-[65%] flex mt-8 md:mt-0 z-0" 
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 90%, transparent)'
          }}
        >
          <Ticker tags={data.skills} reverse={index % 2 !== 0} />
        </div>
      </div>
    </div>
  )
}

const Services: React.FC = () => {
  return (
    <section
      id="skills"
      className="w-full flex justify-center overflow-hidden"
      style={{ backgroundColor: 'rgb(15,15,15)', padding: '100px 0' }}
    >
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      
      <div className="portfolio-container flex flex-col">
        {/* Section Heading */}
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
           className="mb-12 md:mb-16"
        >
          <span className="text-body-18-medium tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            Technical Skills
          </span>
          <h2 className="text-heading-2 mt-4" style={{ color: '#fff' }}>
            My Skills
          </h2>
        </motion.div>

        {/* Grid / List */}
        <div className="w-full flex flex-col" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {SKILLS_DATA.map((item, i) => (
            <SkillRow key={item.category} data={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

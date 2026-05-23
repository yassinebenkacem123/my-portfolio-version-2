import React from 'react'
import { motion } from 'framer-motion'
import { Database, ArrowRight, Server, Layout, Code } from 'lucide-react'

const Github = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)

const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)


interface ProjectCardData {
  name: string
  category: string
  image: string
  stackUsed: string[]
  description: string
  status: string
  featureText: string
  FeatureIcon: React.ElementType,
  githubLink?: string,
  linkedinVideo?: string
}

const projects: ProjectCardData[] = [
  {
    name: 'Ai Chat Bot',
    category: 'AI',
    image: '/projects/ai/chat-bot.png',
    stackUsed: ["Spring Boot", "Ollama", "RAG"],
    description: "An intelligent conversational agent leveraging RAG and local LLMs for accurate, context-aware responses.",
    status: "Production Ready",
    featureText: "AI Integration",
    FeatureIcon: Server,
    linkedinVideo:"https://www.linkedin.com/posts/yassine-ben-kacem-791150316_springboot-springai-java-activity-7426415479927447552-FREL?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFAchV0BiiDo67jzBZMxnJO78qr6Vian7QU",
    githubLink: "https://github.com/yassinet-1/Open-Source-Ai-Chat-Bot"
    },
  {
    name: 'Memory Card',
    category: 'Games',
    image: '/projects/games/memory-card.png',
    stackUsed: ["React.js", "Tailwind CSS", "Framer Motion"],
    description: "Interactive memory matching game featuring smooth animations, state management, and responsive design.",
    status: "Live Demo",
    featureText: "Interactive UI",
    FeatureIcon: Layout,
    linkedinVideo:"https://www.linkedin.com/posts/yassine-ben-kacem-791150316_exciting-news-im-thrilled-to-announce-activity-7311501409164701697-BYU_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFAchV0BiiDo67jzBZMxnJO78qr6Vian7QU",
    githubLink:"https://github.com/yassinebenkacem123/memory-card-game"
  },
  {
    name: 'Vanlife Project',
    category: 'Web Dev',
    image: '/projects/web-dev/vanlife_project.png',
    stackUsed: ["React.js", "Tailwind CSS", "Vite"],
    description: "A modern camper van rental platform with elegant UI, dynamic routing, and seamless page transitions.",
    status: "Live Demo",
    featureText: "Frontend UI",
    FeatureIcon: Layout,
    githubLink: "https://github.com/yassinebenkacem123/react-vanslife-project",
    linkedinVideo: "https://www.linkedin.com/posts/yassine-ben-kacem-791150316_react-html-css-activity-7292997502318837763-yHaD?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFAchV0BiiDo67jzBZMxnJO78qr6Vian7QU"
  },
  {
    name: 'Smart Code',
    category: 'Web Dev',
    image: '/projects/web-dev/smartCode.png',
    stackUsed: ["React.js", "Express", "MySQL", "TypeScript"],
    description: "Full-stack e-learning platform for teaching and learning programming",
    status: "Production Ready",
    featureText: "REST API",
    FeatureIcon: Database,
    githubLink:"https://github.com/yassinebenkacem123/smart-code-web-site"
  },
  {
    name: 'ShareStartup',
    category: 'Web Dev',
    image: '/projects/web-dev/share_startup.png',
    stackUsed: ["Next.js", "Sanity", "RabbitMQ", "Tailwind"],
    description: "Platform for discovering and sharing startup ideas, built with modern server-side rendering and headless CMS.",
    status: "Production Ready",
    FeatureIcon: Server,
    featureText: "Next.js 16",
  },
  {
    name: 'Shoes-Store',
    category: 'Web Dev',
    image: '/projects/web-dev/shoes-store.png',
    stackUsed: ["React.js", "Tailwind CSS", "Framer Motion"],
    description: "Modern e-commerce frontend for a sneaker store featuring dynamic cart management and product filtering.",
    status: "Live Demo",
    featureText: "E-Commerce",
    FeatureIcon: Code,
    linkedinVideo:"https://www.linkedin.com/posts/yassine-ben-kacem-791150316_react-ensaf-tailwind-activity-7292995105081229313-ZPkz?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFAchV0BiiDo67jzBZMxnJO78qr6Vian7QU",
    githubLink:"https://github.com/yassinebenkacem123/snake-shoes-brand"
  },
  {
    name: 'Morocco Booking',
    category: 'Web Dev',
    image: '/projects/web-dev/hotel.png',
    stackUsed: ["React.js", "Express", "MySQL", "Three.js"],
    description: "Full-stack hotel booking platform featuring interactive 3D elements, user authentication, and booking management.",
    status: "Production Ready",
    featureText: "REST API",
    FeatureIcon: Server,
  
  },
  {
    name:'Perlica For Tours And Travel',
    category:'Web Dev',
    image:'/projects/web-dev/perlica.png',
    stackUsed:["React.js", "Tailwind CSS", "Framer Motion", "FastAPI","Nginx"],
    description:"Perlica is a platform for booking tours and travel. It is a platform for booking tours and travel.",
    status:"Production Ready",
    featureText:"REST API",
    FeatureIcon: Server,
    githubLink:"https://github.com/impactteamtech/Perlica",
    
  },
  {
    name:"ensaf clubs",
    category:"Web Dev",
    image:"/projects/web-dev/ensaf.png",
    stackUsed:["React.js", "Tailwind CSS", "Framer Motion"],
    description:"ensaf clubs is a platform built for ENSAF (national school of applied sciences in fes) to manage and organize its clubs and events within the school .",
    status:"Production Ready",
    featureText:"REST API",
    FeatureIcon: Server,
    linkedinVideo:"https://www.linkedin.com/posts/yassine-ben-kacem-791150316_ensa-ensaf-ensafes-activity-7366538345897799680-FR03?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFAchV0BiiDo67jzBZMxnJO78qr6Vian7QU"
  }
]

const CATEGORIES = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

const ProjectCard: React.FC<{ data: ProjectCardData; index: number }> = ({ data, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className="block group w-full md:w-[550px]"
  >
    <div className="w-full flex flex-col bg-[#111111] border border-white/10 rounded-[32px] p-4 sm:p-5 transition-colors duration-500 hover:border-white/20 hover:bg-[#131313] shadow-xl">
      
      {/* Top Header */}
      <div className="flex flex-row items-start sm:items-center justify-between mb-5 sm:mb-6">
        {/* Stack Tags */}
        <div className="flex flex-wrap gap-2">
          {data.stackUsed.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 sm:py-2 bg-[#1E1E1E] border border-white/5 text-[#E0E0E0] text-xs sm:text-sm font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-2 ml-4 shrink-0">
          {data.githubLink && (
            <a
              href={data.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-[#161616] hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
            </a>
          )}
          {data.linkedinVideo && (
            <a
              href={data.linkedinVideo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-[#161616] hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
            </a>
          )}
       
        </div>
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-[#1A1A1A]">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="mt-6 flex flex-col px-1 sm:px-2">
        <h3 className="text-[28px] sm:text-3xl font-semibold text-white tracking-tight">
          {data.name}
        </h3>
        <p className="mt-3 text-[#A1A1AA] text-sm sm:text-base leading-relaxed line-clamp-2">
          {data.description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 px-1 sm:px-2">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-white/90 text-sm font-medium">{data.status}</span>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-4 bg-white/10 hidden sm:block" />

          {/* Feature */}
          <div className="hidden sm:flex items-center gap-2">
            <data.FeatureIcon className="w-4 h-4 text-[#A1A1AA]" />
            <span className="text-[#A1A1AA] text-sm font-medium">{data.featureText}</span>
          </div>
        </div>

        {/* View Project */}
        <a href="#projects" className="flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all duration-300 no-underline cursor-pointer">
          View Project
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

    </div>
  </motion.div>
)

const Work: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');

  const filteredProjects = projects.filter(p => activeFilter === 'All' || p.category === activeFilter);

  return (
    <section
      id="projects"
      className="w-full flex justify-center items-center overflow-visible"
      style={{ backgroundColor: 'rgb(15,15,15)', padding: '80px 0' }}
    >
      <div
        className="portfolio-container justify-center items-center lg:justify-between  gap-20 w-full flex flex-col  lg:flex-row"
    
      >
        {/* Title & Categories (Mobile layout) */}
        <div className="flex flex-col items-center justify-center lg:hidden w-full">
          <h2
            className="text-heading-2"
            style={{ color: '#fff', whiteSpace: 'nowrap' }}
          >
            My Projects
          </h2>

          {/* Categories bar - Visible on mobile/tablet under the title */}
          <div className="flex justify-center  flex-row flex-wrap gap-2.5 mt-6 w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="text-body-16-regular transition-all duration-300"
                style={{
                  display: 'inline-block',
                  color: activeFilter === cat ? '#0f0f0f' : 'rgba(255,255,255,0.6)',
                  backgroundColor: activeFilter === cat ? '#fff' : 'transparent',
                  border: '1px solid',
                  borderColor: activeFilter === cat ? '#fff' : 'rgba(255,255,255,0.2)',
                  borderRadius: 9999,
                  padding: '8px 18px',
                  fontSize: 14,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Title (Desktop only) */}
        <div
          className="hidden lg:flex"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingTop: 60,
            flexShrink: 0,
          }}
        >
          <h2
            className="text-heading-2"
            style={{ color: '#fff', whiteSpace: 'nowrap' }}
          >
            My Projects
          </h2>
        </div>

        {/* ProjectsWrap */}
        <div className="flex flex-col items-center :items-start w-full lg:mt-[60px]" style={{ gap: 80, flex: 1, minWidth: 0 }}>
          {filteredProjects.map((p, i) => (
            <ProjectCard key={p.name + i} data={p} index={i} />
          ))}
        </div>

        {/* CategoriesWrap (Desktop only, positioned on the right) */}
        <div
          className="hidden  lg:flex"
          style={{
            position: 'sticky',
            top: 0,
            right:10,
            height: '100vh',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            paddingBottom: 60,
            flexShrink: 0,
          }}
        >
          <div className="flex flex-col" style={{ gap: 20 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="text-body-16-regular transition-all duration-300"
                style={{
                  display: 'inline-block',
                  color: activeFilter === cat ? '#0f0f0f' : 'rgba(255,255,255,0.6)',
                  backgroundColor: activeFilter === cat ? '#fff' : 'transparent',
                  border: '1px solid',
                  borderColor: activeFilter === cat ? '#fff' : 'rgba(255,255,255,0.2)',
                  borderRadius: 9999,
                  padding: '8px 18px',
                  fontSize: 14,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Work


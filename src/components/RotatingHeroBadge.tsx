import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const RotatingHeroBadge: React.FC = () => {
  const text = "YASSINE BEN KACEM • AI • SOFTWARE • ";
  
  return (
    <motion.div
      className="absolute top-25 md:top-18 lg:top-0 left-10 xl:left-0 z-10 flex items-center justify-center cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, filter: 'contrast(1.15)' }}
    >
      <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-[#F3F3F3] rounded-full  overflow-hidden">
        
        {/* Rotating Text SVG */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800 p-[2px]">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text fill="currentColor" className="text-[10px] md:text-[10.5px] font-semibold uppercase tracking-wider" style={{ fontFamily: 'inherit' }}>
              <textPath href="#circlePath" startOffset="0%" textLength="215" lengthAdjust="spacing">
                {text}
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Inner Circle with Arrow */}
        <div className="absolute w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center">
          <motion.div
            animate={{ y: [-2, 3, -2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 md:w-5 md:h-5 text-gray-100" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RotatingHeroBadge;

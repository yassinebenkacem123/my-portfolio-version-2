import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Shooter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
  opacity: number;
}

// ─── Nebula Aurora Canvas ────────────────────────────────────────────────────
export const AuroraCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    let t = 0;

    // Shooting stars pool
    const shooters: Shooter[] = [];
    let nextShooter = 0;

    function spawnShooter(w: number) {
      const angle = (Math.random() * 25 + 15) * (Math.PI / 180); // 15-40 deg downward
      const speed = Math.random() * 4 + 4; // Slightly slower, more elegant
      shooters.push({
        x: Math.random() * w,
        y: Math.random() * 60 - 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: Math.random() * 80 + 40,
        life: 0,
        maxLife: Math.random() * 50 + 40,
        opacity: 0,
      });
    }

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      t += 0.0025; // Slower, calmer animation

      // ── Layer 1: deep base glow (Teal/Blue) ──────────────────────────────
      const cx1 = w * (0.45 + 0.08 * Math.sin(t * 0.6));
      const cy1 = h * (0.40 + 0.07 * Math.sin(t * 0.4));
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, w * 0.65);
      g1.addColorStop(0,   `rgba(15, 30, 50, ${0.4 + 0.1 * Math.sin(t)})`);
      g1.addColorStop(0.5, `rgba(10, 20, 35, ${0.2 + 0.05 * Math.sin(t * 1.3)})`);
      g1.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // ── Layer 2: secondary subtle glow (Icy Cyan) ────────────────────────
      const cx2 = w * (0.72 + 0.10 * Math.sin(t * 0.5 + 1.2));
      const cy2 = h * (0.65 + 0.10 * Math.cos(t * 0.35 + 0.7));
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, w * 0.45);
      g2.addColorStop(0,   `rgba(180, 230, 255, ${0.03 + 0.01 * Math.sin(t * 0.9)})`);
      g2.addColorStop(0.5, `rgba(100, 150, 200, ${0.015})`);
      g2.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // ── Layer 3: top-left sharp streak ───────────────────────────
      const sx = w * (-0.05 + 0.06 * Math.sin(t * 0.3));
      const sy = h * (0.15 + 0.08 * Math.sin(t * 0.45));
      const streak = ctx.createLinearGradient(sx, sy, sx + w * 0.55, sy + h * 0.25);
      streak.addColorStop(0, 'rgba(0,0,0,0)');
      streak.addColorStop(0.3, `rgba(255,255,255,${0.03 + 0.01 * Math.sin(t * 0.8)})`);
      streak.addColorStop(0.7, `rgba(200,220,255,${0.015})`);
      streak.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = streak;
      ctx.beginPath();
      const angle = 0.22;
      const thick = h * 0.14;
      ctx.moveTo(sx - thick * Math.sin(angle), sy + thick * Math.cos(angle));
      ctx.lineTo(sx + w * 0.6 - thick * Math.sin(angle), sy + h * 0.28 + thick * Math.cos(angle));
      ctx.lineTo(sx + w * 0.6 + thick * Math.sin(angle), sy + h * 0.28 - thick * Math.cos(angle));
      ctx.lineTo(sx + thick * Math.sin(angle), sy - thick * Math.cos(angle));
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── Shooting stars ─────────────────────────────────────────────────────
      nextShooter--;
      if (nextShooter <= 0) {
        spawnShooter(w);
        nextShooter = Math.floor(Math.random() * 300 + 150); 
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        
        const progress = s.life / s.maxLife;
        s.opacity = progress < 0.2
          ? progress / 0.2
          : progress > 0.7
          ? 1 - (progress - 0.7) / 0.3
          : 1;
        if (s.life >= s.maxLife) { shooters.splice(i, 1); continue; }

        const tx = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * s.len;
        const ty = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * s.len;
        const sg = ctx.createLinearGradient(tx, ty, s.x, s.y);
        sg.addColorStop(0, 'rgba(255,255,255,0)');
        sg.addColorStop(1, `rgba(255,255,255,${s.opacity * 0.6})`);
        
        ctx.save();
        ctx.strokeStyle = sg;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * 0.8})`;
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

// ─── Component ───────────────────────────────────────────────────────────────
const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.gsap-fade');
    gsap.set(elements, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex bg-black h-[650px] flex-col items-center justify-center overflow-hidden w-full"
    >
      {/* <AuroraCanvas /> */}

      {/* Edge fade gradients */}
      <div
        className="absolute -z-10 inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #000000 0%, transparent 20%, transparent 80%, #000000 100%)',
          zIndex: 3
        }}
      />
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #000000 100%)',
        }}
      />

      {/* ── 3D Vector Orbits (Planetary Rings) ── */}
      <div
        className="absolute inset-0  flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 2, perspective: '1200px' }}
      >
        {/* Outer dashed ring */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border border-dashed"
          style={{ 
            width: 750, 
            height: 750, 
            borderColor: 'rgba(255,255,255,0.15)', // Increased white opacity
            rotateX: 65,
            rotateY: 10,
            transformStyle: 'preserve-3d'
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 4, height: 4,
              top: -2, left: '50%', marginLeft: -2,
              background: 'rgba(255,255,255,0.8)',
              boxShadow: '0 0 10px 3px rgba(255,255,255,0.3)',
            }}
          />
        </motion.div>

        {/* Inner solid ring */}
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border"
          style={{ 
            width: 550, 
            height: 550, 
            borderColor: 'rgba(255,255,255,0.25)', // Increased white opacity
            borderStyle: 'double', 
            borderWidth: 1,
            rotateX: 65,
            rotateY: -10,
            transformStyle: 'preserve-3d'
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 3, height: 3,
              bottom: -1.5, left: '50%', marginLeft: -1.5,
              background: 'rgba(255,255,255,0.6)',
              boxShadow: '0 0 6px 2px rgba(255,255,255,0.25)',
            }}
          />
        </motion.div>
      </div>

      {/* ── Fine Organic Wave Curves ── */}
      <svg
        className="absolute -z-100 inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2, opacity: 0.1 }}
        viewBox="0 0 1440 600"
        fill="none"
      >
        <motion.path
          d="M -100,250 C 300,450 550,50 950,400 C 1150,500 1350,250 1550,350"
          stroke="url(#gradient1)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -24] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M -50,300 C 350,500 450,150 850,350 C 1050,450 1250,150 1450,250"
          stroke="url(#gradient2)"
          strokeWidth="0.8"
          animate={{ strokeDashoffset: [0, 20] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Main Content (Absolute Centered with Floating Animation) ── */}
      <div className="absolute  inset-0 flex flex-col items-center justify-center  pointer-events-none">
        <motion.div 
          className="gsap-fade  relative flex items-center justify-center w-[340px] h-[390px] sm:w-[480px] sm:h-[550px] select-none pointer-events-auto"
        >
          {/* Hand Image */}
          <img
            src="/holding-button.png"
            alt="Hands holding the contact button"
            className="w-full  h-full object-contain pointer-events-none opacity-50 select-none drop-shadow-2xl"
          />
          
          {/* Centered Button resting in the hands' cradle */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center bg-linear-to-br from-white/10 to-black/30 gap-5 backdrop-blur-md border border-white/10 text-white px-6 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap"
            >
              <span className="font-['Space_Grotesk_Variable',sans-serif] text-[17px] font-medium tracking-wide">
                Let's Get In Touch
              </span>
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-md">
                <ArrowRight size={18} />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
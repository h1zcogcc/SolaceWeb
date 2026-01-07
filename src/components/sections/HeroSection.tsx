import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E8B88A] via-[#F5D5B8] to-[#FDF6ED]" />

      {/* Illustrated Cairo Mosque Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <svg
          viewBox="0 0 1400 700"
          className="w-full h-full"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            {/* Sun glow */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE4B5" />
              <stop offset="60%" stopColor="#F5C67A" />
              <stop offset="100%" stopColor="#F5C67A" stopOpacity="0" />
            </radialGradient>

            {/* Dome gradient */}
            <linearGradient id="domeMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5A3C" />
              <stop offset="50%" stopColor="#6B4532" />
              <stop offset="100%" stopColor="#5A3828" />
            </linearGradient>

            {/* Building gradient */}
            <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4B896" />
              <stop offset="100%" stopColor="#C4A882" />
            </linearGradient>

            {/* Minaret gradient */}
            <linearGradient id="minaretGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8D4BC" />
              <stop offset="50%" stopColor="#D4B896" />
              <stop offset="100%" stopColor="#C4A882" />
            </linearGradient>
          </defs>

          {/* Animated Sun Rays */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "700px 320px" }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.line
                key={i}
                x1="700"
                y1="180"
                x2="700"
                y2="140"
                stroke="#FFE4B5"
                strokeWidth="3"
                opacity="0.4"
                style={{ transformOrigin: "700px 320px", transform: `rotate(${i * 30}deg)` }}
              />
            ))}
          </motion.g>

          {/* Sun */}
          <circle cx="700" cy="320" r="140" fill="url(#sunGlow)" />
          
          {/* Floating Clouds */}
          <motion.g
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          >
            <ellipse cx="180" cy="250" rx="60" ry="25" fill="#FFF" opacity="0.5" />
            <ellipse cx="210" cy="240" rx="45" ry="20" fill="#FFF" opacity="0.6" />
            <ellipse cx="150" cy="245" rx="35" ry="18" fill="#FFF" opacity="0.4" />
          </motion.g>
          
          <motion.g
            animate={{ x: [0, -25, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          >
            <ellipse cx="1150" cy="200" rx="70" ry="28" fill="#FFF" opacity="0.45" />
            <ellipse cx="1190" cy="190" rx="50" ry="22" fill="#FFF" opacity="0.55" />
            <ellipse cx="1110" cy="195" rx="40" ry="18" fill="#FFF" opacity="0.35" />
          </motion.g>
          
          <motion.g
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          >
            <ellipse cx="500" cy="150" rx="50" ry="20" fill="#FFF" opacity="0.4" />
            <ellipse cx="530" cy="142" rx="38" ry="16" fill="#FFF" opacity="0.5" />
          </motion.g>

          {/* Distant desert silhouette */}
          <path
            d="M0 550 Q200 520 400 540 Q600 520 800 535 Q1000 510 1200 530 Q1350 520 1400 540 L1400 700 L0 700 Z"
            fill="#C9A87C"
            opacity="0.4"
          />

          {/* Main Mosque Structure */}
          <g>
            {/* Main building base */}
            <rect x="400" y="420" width="600" height="280" fill="url(#buildingGradient)" />
            
            {/* Central entrance arch */}
            <path d="M620 700 L620 520 Q700 450 780 520 L780 700 Z" fill="#FDF6ED" />
            <path d="M620 700 L620 520 Q700 450 780 520 L780 700" fill="none" stroke="#A08060" strokeWidth="3" />
            
            {/* Side arched windows */}
            <ellipse cx="500" cy="540" rx="35" ry="50" fill="#FDF6ED" />
            <ellipse cx="900" cy="540" rx="35" ry="50" fill="#FDF6ED" />
            
            {/* Decorative line on building */}
            <rect x="400" y="480" width="600" height="8" fill="#B8956E" opacity="0.5" />
          </g>

          {/* Central Large Dome */}
          <g>
            <ellipse cx="700" cy="380" rx="160" ry="120" fill="url(#domeMain)" />
            {/* Dome pattern lines */}
            <path d="M540 380 Q700 260 860 380" fill="none" stroke="#4A3020" strokeWidth="1" opacity="0.3" />
            <path d="M560 400 Q700 290 840 400" fill="none" stroke="#4A3020" strokeWidth="1" opacity="0.3" />
            <path d="M700 260 L700 420" stroke="#4A3020" strokeWidth="1" opacity="0.3" />
            <path d="M620 270 L620 410" stroke="#4A3020" strokeWidth="1" opacity="0.2" />
            <path d="M780 270 L780 410" stroke="#4A3020" strokeWidth="1" opacity="0.2" />
          </g>

          {/* Central spire with crescent */}
          <g>
            <line x1="700" y1="260" x2="700" y2="200" stroke="#5A3828" strokeWidth="4" />
            <circle cx="700" cy="190" r="12" fill="#5A3828" />
            <path d="M688 185 Q700 175 712 185 Q705 195 695 195 Q688 190 688 185" fill="#FFE4B5" />
          </g>

          {/* Side smaller domes */}
          <g>
            <ellipse cx="480" cy="420" rx="70" ry="50" fill="url(#domeMain)" />
            <circle cx="480" cy="365" r="8" fill="#5A3828" />
            <ellipse cx="920" cy="420" rx="70" ry="50" fill="url(#domeMain)" />
            <circle cx="920" cy="365" r="8" fill="#5A3828" />
          </g>

          {/* Left Minaret */}
          <g>
            <rect x="280" y="280" width="50" height="420" fill="url(#minaretGradient)" />
            <rect x="272" y="340" width="66" height="20" fill="#C4A882" />
            <rect x="272" y="450" width="66" height="15" fill="#C4A882" />
            <ellipse cx="305" cy="280" rx="30" ry="22" fill="url(#domeMain)" />
            <path d="M305 220 L315 270 L295 270 Z" fill="#5A3828" />
            <circle cx="305" cy="210" r="10" fill="#5A3828" />
          </g>

          {/* Right Minaret */}
          <g>
            <rect x="1070" y="280" width="50" height="420" fill="url(#minaretGradient)" />
            <rect x="1062" y="340" width="66" height="20" fill="#C4A882" />
            <rect x="1062" y="450" width="66" height="15" fill="#C4A882" />
            <ellipse cx="1095" cy="280" rx="30" ry="22" fill="url(#domeMain)" />
            <path d="M1095 220 L1105 270 L1085 270 Z" fill="#5A3828" />
            <circle cx="1095" cy="210" r="10" fill="#5A3828" />
          </g>

          {/* Outer left small minaret */}
          <g>
            <rect x="140" y="380" width="35" height="320" fill="url(#minaretGradient)" />
            <rect x="134" y="420" width="47" height="12" fill="#C4A882" />
            <ellipse cx="157" cy="380" rx="22" ry="16" fill="url(#domeMain)" />
            <path d="M157 340 L165 372 L149 372 Z" fill="#5A3828" />
            <circle cx="157" cy="332" r="8" fill="#5A3828" />
          </g>

          {/* Outer right small minaret */}
          <g>
            <rect x="1225" y="380" width="35" height="320" fill="url(#minaretGradient)" />
            <rect x="1219" y="420" width="47" height="12" fill="#C4A882" />
            <ellipse cx="1243" cy="380" rx="22" ry="16" fill="url(#domeMain)" />
            <path d="M1243 340 L1251 372 L1235 372 Z" fill="#5A3828" />
            <circle cx="1243" cy="332" r="8" fill="#5A3828" />
          </g>

          {/* Ground */}
          <rect x="0" y="680" width="1400" height="20" fill="#B8956E" />
        </svg>
      </motion.div>

      {/* Content with readable backdrop */}
      <motion.div 
        className="container mx-auto px-4 relative z-10 pt-32 pb-20"
        style={{ opacity }}
      >
        <div className="max-w-xl">
          {/* Text backdrop for readability */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-foreground"
            >
              Solace Egypt
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-foreground mb-4 leading-relaxed"
            >
              Your Complete Path to Arabic & Quran Mastery.
              Studying and living in{' '}
              <span className="font-serif italic text-terracotta font-semibold">Cairo</span>{' '}
              made simple for international Muslim students.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base text-muted-foreground mb-8"
            >
              Meals, Accommodation, Classes, Airport Transfers and Support — all included.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                className="bg-terracotta text-white hover:bg-terracotta/90 shadow-md px-8"
              >
                Register Interest
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-foreground/20 text-foreground hover:bg-foreground/5"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Speak with us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2 bg-white/50 backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-foreground/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

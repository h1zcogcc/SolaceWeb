import { motion } from 'framer-motion';

export const MosqueSilhouette = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 400 200" className={className} fill="currentColor">
    {/* Main dome */}
    <ellipse cx="200" cy="100" rx="80" ry="60" />
    {/* Dome top crescent */}
    <circle cx="200" cy="35" r="8" />
    <path d="M200 43 L200 55" strokeWidth="2" stroke="currentColor" />
    {/* Left minaret */}
    <rect x="60" y="80" width="20" height="120" />
    <ellipse cx="70" cy="80" rx="15" ry="10" />
    <circle cx="70" cy="65" r="5" />
    {/* Right minaret */}
    <rect x="320" y="80" width="20" height="120" />
    <ellipse cx="330" cy="80" rx="15" ry="10" />
    <circle cx="330" cy="65" r="5" />
    {/* Base structure */}
    <rect x="100" y="130" width="200" height="70" />
    {/* Arched entrance */}
    <path d="M175 200 L175 160 Q200 130 225 160 L225 200 Z" fill="hsl(35 35% 97%)" />
    {/* Side domes */}
    <ellipse cx="130" cy="130" rx="25" ry="20" />
    <ellipse cx="270" cy="130" rx="25" ry="20" />
  </svg>
);

export const AnimatedMinaret = ({ 
  className = "", 
  delay = 0 
}: { 
  className?: string;
  delay?: number;
}) => (
  <motion.svg 
    viewBox="0 0 40 160" 
    className={className}
    initial={{ scaleY: 0, originY: 1 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
  >
    {/* Tower body */}
    <rect x="8" y="40" width="24" height="120" fill="currentColor" />
    {/* Balcony */}
    <rect x="4" y="50" width="32" height="8" fill="currentColor" rx="2" />
    {/* Top dome */}
    <ellipse cx="20" cy="40" rx="14" ry="10" fill="currentColor" />
    {/* Spire */}
    <path d="M20 5 L24 30 L16 30 Z" fill="currentColor" />
    {/* Crescent */}
    <circle cx="20" cy="8" r="4" fill="currentColor" />
  </motion.svg>
);

export const IslamicStar = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />
  </svg>
);

export const GeometricPattern = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="0.5">
    {/* Outer octagon */}
    <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" />
    {/* Inner octagon */}
    <polygon points="35,20 65,20 80,35 80,65 65,80 35,80 20,65 20,35" />
    {/* Diamond */}
    <polygon points="50,10 90,50 50,90 10,50" />
    {/* Center square */}
    <rect x="35" y="35" width="30" height="30" transform="rotate(45 50 50)" />
  </svg>
);

export const ArchFrame = ({ className = "", children }: { className?: string; children?: React.ReactNode }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 200 250" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="archGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(42 70% 50%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(42 70% 50%)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path 
        d="M10 250 L10 80 Q100 0 190 80 L190 250" 
        fill="none" 
        stroke="url(#archGradient)" 
        strokeWidth="3"
      />
    </svg>
    {children}
  </div>
);

export const SunRays = ({ className = "" }: { className?: string }) => (
  <motion.svg 
    viewBox="0 0 200 200" 
    className={className}
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
  >
    <defs>
      <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(42 70% 60%)" stopOpacity="0.8" />
        <stop offset="70%" stopColor="hsl(42 70% 50%)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="hsl(42 70% 50%)" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="100" fill="url(#sunGradient)" />
    {[...Array(12)].map((_, i) => (
      <line 
        key={i}
        x1="100" 
        y1="20" 
        x2="100" 
        y2="5" 
        stroke="hsl(42 70% 60%)" 
        strokeWidth="2"
        opacity="0.4"
        transform={`rotate(${i * 30} 100 100)`}
      />
    ))}
  </motion.svg>
);

export const DomeOutline = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 80" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 80 L10 50 Q60 0 110 50 L110 80" />
    <circle cx="60" cy="8" r="5" fill="currentColor" />
    <line x1="60" y1="13" x2="60" y2="25" />
  </svg>
);

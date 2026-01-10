import { motion } from 'framer-motion';

// Floating decorative star
export const FloatingStar = ({ 
  className = '', 
  delay = 0,
  size = 'md'
}: { 
  className?: string; 
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.8, 0.3],
        scale: [0.8, 1.1, 0.8],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="text-gold">
        <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.1-6.2-4.5-6.2 4.5 2.4-7.1-6.2-4.5h7.6z" />
      </svg>
    </motion.div>
  );
};

// Floating geometric diamond
export const FloatingDiamond = ({ 
  className = '', 
  delay = 0 
}: { 
  className?: string; 
  delay?: number;
}) => (
  <motion.div
    className={`absolute w-6 h-6 border-2 border-gold/30 rotate-45 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.2, 0.5, 0.2],
      y: [0, -15, 0],
      rotate: [45, 90, 45]
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// Animated crescent moon
export const FloatingCrescent = ({ 
  className = '', 
  delay = 0 
}: { 
  className?: string; 
  delay?: number;
}) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      rotate: [-10, 10, -10]
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-gold/40">
      <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
    </svg>
  </motion.div>
);

// Animated dots pattern
export const FloatingDots = ({ 
  className = '' 
}: { 
  className?: string;
}) => (
  <motion.div
    className={`absolute grid grid-cols-3 gap-2 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.1, 0.3, 0.1] }}
    transition={{ duration: 4, repeat: Infinity }}
  >
    {[...Array(9)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-terracotta/30"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ 
          duration: 2, 
          delay: i * 0.1,
          repeat: Infinity 
        }}
      />
    ))}
  </motion.div>
);

// Section divider with Islamic pattern
export const PatternDivider = ({ className = '' }: { className?: string }) => (
  <div className={`relative h-16 overflow-hidden ${className}`}>
    <svg 
      viewBox="0 0 1200 80" 
      preserveAspectRatio="none" 
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(42 70% 50% / 0)" />
          <stop offset="50%" stopColor="hsl(42 70% 50% / 0.5)" />
          <stop offset="100%" stopColor="hsl(42 70% 50% / 0)" />
        </linearGradient>
      </defs>
      {/* Central line */}
      <line x1="0" y1="40" x2="1200" y2="40" stroke="url(#dividerGradient)" strokeWidth="1" />
      {/* Center diamond */}
      <path 
        d="M600 25 L615 40 L600 55 L585 40 Z" 
        fill="hsl(42 70% 50% / 0.3)" 
        stroke="hsl(42 70% 50% / 0.5)" 
        strokeWidth="1"
      />
      {/* Side diamonds */}
      <path 
        d="M500 35 L508 40 L500 45 L492 40 Z" 
        fill="hsl(42 70% 50% / 0.2)" 
      />
      <path 
        d="M700 35 L708 40 L700 45 L692 40 Z" 
        fill="hsl(42 70% 50% / 0.2)" 
      />
    </svg>
  </div>
);

// Decorative arch accent
export const ArchAccent = ({ 
  className = '',
  side = 'left'
}: { 
  className?: string;
  side?: 'left' | 'right';
}) => (
  <motion.div
    className={`absolute ${side === 'left' ? 'left-0' : 'right-0'} ${className}`}
    initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
    whileInView={{ opacity: 0.1, x: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <svg viewBox="0 0 100 200" className="w-24 h-48 text-terracotta">
      <path 
        d="M50 0 C80 0 100 30 100 60 L100 200 L0 200 L0 60 C0 30 20 0 50 0" 
        fill="currentColor"
        transform={side === 'right' ? 'scale(-1, 1) translate(-100, 0)' : ''}
      />
    </svg>
  </motion.div>
);

// Animated line that draws itself
export const AnimatedLine = ({ 
  className = '' 
}: { 
  className?: string;
}) => (
  <motion.div className={`relative ${className}`}>
    <motion.div
      className="h-px bg-gradient-to-r from-transparent via-gold to-transparent"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true }}
    />
  </motion.div>
);

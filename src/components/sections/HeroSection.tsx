import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Camera } from 'lucide-react';
import cairoMosqueHero from '@/assets/cairo-mosque-hero.jpg';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Full-bleed Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <img 
          src={cairoMosqueHero} 
          alt="Muhammad Ali Mosque in Cairo" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 relative z-10 pt-32 pb-20"
        style={{ opacity }}
      >
        <div className="max-w-xl">
          {/* Text bubble with 30% opacity background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your Complete Path to Arabic & Quran Mastery.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-white/80 mb-6 leading-relaxed"
            >
              Studying and living in Cairo made simple for international Muslim students. 
              Meals, Accommodation, Classes, and Support — all included.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-gray-900 px-6 py-5 text-sm group"
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Watch Video
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-gray-900 px-6 py-5 text-sm group"
                asChild
              >
                <a href="/gallery">
                  <Camera className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  View Gallery
                </a>
              </Button>
              <Button 
                size="lg" 
                className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-5 text-sm shadow-lg shadow-blue-500/25 group"
              >
                Register
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-10 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/60 text-sm tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-12 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

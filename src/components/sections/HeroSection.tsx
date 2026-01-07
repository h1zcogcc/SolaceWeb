import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import mosqueHero from '@/assets/mosque-hero.jpg';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const mosqueY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section 
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Warm sunset gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5C67A] via-[#E8A862] to-[#D4905A]" />

      {/* AI-Generated Realistic Mosque Image - full coverage */}
      <motion.div 
        className="absolute inset-0 z-[1]"
        style={{ y: mosqueY }}
      >
        <img 
          src={mosqueHero} 
          alt="Cairo Mosque at sunset" 
          className="w-full h-full object-cover object-center"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent 0%, transparent 25%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.7) 50%, black 65%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 25%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.7) 50%, black 65%)'
          }}
        />
      </motion.div>

      {/* Content with readable backdrop */}
      <motion.div 
        className="container mx-auto px-4 relative z-10 pt-32 pb-20"
        style={{ opacity }}
      >
        <div className="max-w-xl">
          {/* Text backdrop for readability with hover animation */}
          <motion.div
            className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30 cursor-default"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ 
              y: -8, 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.3 }
            }}
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

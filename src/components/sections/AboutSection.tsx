import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Star, Clock } from 'lucide-react';
import { ArchFrame } from '@/components/icons/IslamicPatterns';

const stats = [
  { icon: Users, label: 'Growing', sublabel: 'Student Community' },
  { icon: Star, value: '5★', label: 'Reviews' },
  { icon: Clock, value: '24/7', label: 'Support' },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-sand/30">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with Arch Frame */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <ArchFrame className="w-full max-w-md mx-auto aspect-[3/4]">
              <div className="absolute inset-8 rounded-t-[100px] overflow-hidden bg-sand">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800&auto=format&fit=crop&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-terracotta/20 to-transparent" />
              </div>
            </ArchFrame>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-card px-4 py-3 rounded-xl shadow-elevated text-center min-w-[90px]"
                >
                  {'value' in stat ? (
                    <div className="text-xl font-bold text-terracotta">{stat.value}</div>
                  ) : (
                    <div className="text-sm font-medium text-terracotta">{stat.label}</div>
                  )}
                  {'sublabel' in stat ? (
                    <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                  ) : (
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <span className="section-label mb-4 justify-center lg:justify-start">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
              Built on Trust,{' '}
              <span className="text-gradient-gold">Rooted in Purpose</span>
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Solace Egypt was founded to provide international Muslim students with a structured, 
                safe, and spiritually enriching pathway to Arabic and Quran mastery.
              </p>
              <p>
                We handle every detail so you can focus on what matters most — your learning and growth. 
                From accommodation to classes, meals to excursions, we've built a comprehensive 
                support system that makes studying in Egypt accessible and rewarding.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button variant="heroOutline" size="lg" className="group">
                Read Our Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

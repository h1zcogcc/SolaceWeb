import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    initial: 'J',
    name: 'Jibreel',
    text: "My experience with Solace was smooth and reassuring from day one. They organised airport pickup, helped me secure accommodation, and supported me with everything I needed to settle in Cairo. The team was always responsive and made the transition incredibly easy.",
  },
  {
    initial: 'A',
    name: 'Anas',
    text: "Solace made settling into Egypt feel genuinely easy from the start. From helping me find suitable accommodation to arranging airport pickup, everything was handled professionally. The support team was always available when I needed guidance.",
  },
  {
    initial: 'I',
    name: 'Ibrahim',
    text: "Solace made going to Egypt feel way less stressful. They had the airport pickup sorted (no messing about), and gave me a SIM straight away which was helpful. The accommodation was comfortable and the whole experience exceeded my expectations.",
  },
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-sand/20 to-background" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label justify-center mb-4">
            Student Voices
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            Hear From Those Who've{' '}
            <span className="text-gradient-gold">Walked This Path Before You</span>
          </h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
              <Quote className="w-8 h-8 text-gold" />
            </div>

            {/* Testimonial Card */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-soft text-center pt-16"
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-terracotta/10 border-2 border-terracotta/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-serif font-bold text-terracotta">
                  {testimonials[activeIndex].initial}
                </span>
              </div>

              {/* Name */}
              <h4 className="font-serif text-2xl font-semibold text-foreground mb-4">
                {testimonials[activeIndex].name}
              </h4>

              {/* Quote */}
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                "{testimonials[activeIndex].text}"
              </p>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-gold/30 hover:bg-gold/10 hover:border-gold"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === activeIndex 
                        ? 'bg-terracotta w-8' 
                        : 'bg-sand-dark hover:bg-gold/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-gold/30 hover:bg-gold/10 hover:border-gold"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

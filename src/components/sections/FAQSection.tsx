import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { GeometricPattern } from '@/components/icons/IslamicPatterns';

const faqs = [
  {
    question: 'How do I apply to study with Solace Egypt?',
    answer: 'Applying is simple! Click the "Apply Now" button to fill out our application form. Our team will review your application and get back to you within 48 hours to discuss the next steps and answer any questions you may have.',
  },
  {
    question: 'What is included in the accommodation?',
    answer: 'Our accommodation packages include comfortable, safe housing in Cairo with all basic amenities included. This covers utilities, WiFi, and regular cleaning. Shared accommodation is included in the Standard package, while private rooms are available with the Premium package.',
  },
  {
    question: 'Are meals halal and what type of food is provided?',
    answer: 'Yes, all meals are 100% halal. We provide nutritious lunch and dinner daily, featuring a mix of Egyptian cuisine and international options. Special dietary requirements can be accommodated with advance notice.',
  },
  {
    question: 'What level of Arabic do I need to start?',
    answer: 'Students of all levels are welcome! Whether you\'re a complete beginner or looking to advance your existing skills, our institutions offer classes tailored to your current level. You\'ll be assessed on arrival and placed in the appropriate class.',
  },
  {
    question: 'How long are the study programmes?',
    answer: 'Our programmes are flexible and can be customised to your schedule. Most students join for terms of 3-6 months, but shorter and longer durations are available. We recommend a minimum of 3 months for meaningful progress.',
  },
  {
    question: 'Is Egypt safe for international students?',
    answer: 'Yes, Egypt and particularly Cairo has a long history of welcoming international students. Our team provides 24/7 support and guidance to ensure your safety and comfort throughout your stay. We carefully select accommodation in safe, student-friendly areas.',
  },
];

const FAQItem = ({ 
  faq, 
  index, 
  isOpen, 
  onToggle 
}: { 
  faq: typeof faqs[0]; 
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-border last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <h3 className="text-lg md:text-xl font-medium text-foreground group-hover:text-terracotta transition-colors pr-4">
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-sand flex items-center justify-center group-hover:bg-gold/20 transition-colors"
        >
          <ChevronDown className="w-5 h-5 text-terracotta" />
        </motion.div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 opacity-5">
        <GeometricPattern className="w-40 h-40 text-terracotta" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5">
        <GeometricPattern className="w-32 h-32 text-gold" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label justify-center mb-4">
            Questions & Answers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            Frequently Asked{' '}
            <span className="text-gradient-gold">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-soft p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 text-muted-foreground"
        >
          Still have questions?{' '}
          <a href="#" className="text-terracotta hover:text-terracotta-dark underline underline-offset-4">
            Get in touch with our team
          </a>
        </motion.p>
      </div>
    </section>
  );
};

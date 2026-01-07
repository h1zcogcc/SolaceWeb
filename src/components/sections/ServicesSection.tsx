import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  BookOpen, 
  BookText, 
  Home, 
  UtensilsCrossed, 
  Plane, 
  Compass, 
  Headphones, 
  FileText 
} from 'lucide-react';
import { GeometricPattern } from '@/components/icons/IslamicPatterns';

const services = [
  {
    icon: BookOpen,
    title: 'Arabic Classes',
    description: 'Study at a reputable institution with experienced teachers and a proven approach designed to help you learn Arabic quickly.',
  },
  {
    icon: BookText,
    title: 'Quran Classes',
    description: 'Master tajwīd and strengthen your memorisation with private tutors.',
  },
  {
    icon: Home,
    title: 'Accommodation',
    description: 'Comfortable, safe housing in Cairo with all amenities included, carefully selected for student wellbeing.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Daily Meals',
    description: 'Nutritious lunch and dinner provided daily, allowing you to focus entirely on your studies without worry.',
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    description: 'Seamless pickup and drop-off service ensuring a smooth arrival and departure experience in Cairo.',
  },
  {
    icon: Compass,
    title: 'Weekly Excursions',
    description: "Explore Egypt's rich Islamic heritage through guided visits to historical sites and cultural landmarks.",
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock student helpdesk and on-ground assistance for any needs or emergencies that arise.',
  },
  {
    icon: FileText,
    title: 'Egypt Study Guide',
    description: 'Comprehensive digital guide covering everything you need to know about studying and living in Egypt.',
  },
];

// Staggered reveal animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const ServiceCard = ({ 
  service, 
}: { 
  service: typeof services[0]; 
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-500 card-hover overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <GeometricPattern className="w-full h-full text-gold" />
      </div>

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-sand flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
        <service.icon className="w-7 h-7 text-terracotta group-hover:text-gold transition-colors" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-terracotta transition-colors">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {service.description}
      </p>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-gold group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
};

export const ServicesSection = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sand/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-label justify-center mb-4"
          >
            What We Offer
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight"
          >
            Everything You Need for{' '}
            <span className="text-gradient-sunset">Authentic Islamic Learning</span>
          </motion.h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

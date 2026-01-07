import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { DomeOutline } from '@/components/icons/IslamicPatterns';

const packages = [
  {
    name: 'Standard',
    badge: 'Launch Offer',
    originalPrice: '£1,200',
    price: '£600',
    description: 'Perfect for getting started with your Arabic and Quran journey',
    features: [
      'Arabic classes at reputable markaz',
      'Quran classes (tajwīd & memorisation)',
      'Airport pickup and drop-off',
      'Shared accommodation in Cairo',
      'Daily lunch and dinner',
      'Weekly excursions and activities',
      '24-hour student helpdesk',
      'On-ground support team',
    ],
    cta: 'Reserve Standard',
    featured: false,
  },
  {
    name: 'Premium',
    badge: 'Coming Soon',
    price: 'From £3,200',
    description: 'The complete immersive experience with premium amenities',
    features: [
      'All Standard package features',
      'Private accommodation option',
      'Premium markaz placement',
      'One-on-one Quran sessions',
      'Extended excursion programme',
      'Priority support access',
      'Free Egypt Study Guide (digital)',
      'Personalized study plan',
      'Certificate of completion',
    ],
    cta: 'Coming Soon',
    featured: true,
  },
];

const PackageCard = ({ 
  pkg, 
  index 
}: { 
  pkg: typeof packages[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative rounded-3xl p-8 ${
        pkg.featured 
          ? 'bg-gradient-to-br from-terracotta-dark via-terracotta to-terracotta-light text-primary-foreground shadow-xl' 
          : 'bg-card shadow-soft border border-border'
      }`}
    >
      {/* Decorative Dome */}
      <div className={`absolute top-4 right-4 ${pkg.featured ? 'opacity-20' : 'opacity-10'}`}>
        <DomeOutline className="w-16 h-12" />
      </div>

      {/* Badge */}
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
        pkg.featured 
          ? 'bg-gold/30 text-gold' 
          : 'bg-sand text-terracotta'
      }`}>
        <Sparkles className="w-3 h-3" />
        {pkg.badge}
      </div>

      {/* Name & Price */}
      <h3 className="text-3xl font-semibold mb-2">{pkg.name}</h3>
      <div className="flex items-baseline gap-2 mb-4">
        {'originalPrice' in pkg && pkg.originalPrice && (
          <span className={`text-lg line-through ${pkg.featured ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
            {pkg.originalPrice}
          </span>
        )}
        <span className={`text-4xl font-bold ${pkg.featured ? 'text-gold' : 'text-terracotta'}`}>
          {pkg.price}
        </span>
      </div>

      <p className={`mb-6 ${pkg.featured ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
        {pkg.description}
      </p>

      {/* Divider */}
      <div className={`h-px mb-6 ${pkg.featured ? 'bg-primary-foreground/20' : 'bg-border'}`} />

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="flex items-start gap-3"
          >
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              pkg.featured ? 'text-gold' : 'text-terracotta'
            }`} />
            <span className={`text-sm ${
              pkg.featured ? 'text-primary-foreground/90' : 'text-foreground'
            }`}>
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={pkg.featured ? 'gold' : 'hero'}
        size="lg"
        className="w-full group"
        disabled={pkg.badge === 'Coming Soon'}
      >
        {pkg.cta}
        {pkg.badge !== 'Coming Soon' && (
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </Button>
    </motion.div>
  );
};

export const PackagesSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="packages" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-islamic opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sand/30 rounded-full blur-3xl" />

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
            Choose Your Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            Standard or Premium?{' '}
            <span className="text-gradient-gold">Both Paths Lead to Growth</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Select the programme that best fits your needs and budget. Both packages provide 
            comprehensive support for your Arabic and Quran studies in Cairo.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.name} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

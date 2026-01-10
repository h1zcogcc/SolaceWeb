import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Sparkles, ShoppingCart } from 'lucide-react';
import { DomeOutline } from '@/components/icons/IslamicPatterns';
import { useBasket } from '@/contexts/BasketContext';
import { toast } from 'sonner';

const packages = [
  {
    name: 'Standard',
    badge: null,
    price: '£1,200',
    priceNum: 1200,
    description: 'Perfect for getting started with your Arabic and Quran journey',
    features: [
      'Arabic classes at reputable markaz',
      'Quran classes (tajwīd & memorisation)',
      'Shared accommodation in Cairo',
      'Daily lunch and dinner',
      'Weekly excursions and activities',
      'On-ground support team',
    ],
    cta: 'Add to Basket',
    featured: false,
    bestValue: false,
    showExtras: false,
  },
  {
    name: 'Enhanced',
    badge: null,
    floatingBadge: 'Popular Choice',
    price: '£2,800',
    priceNum: 2800,
    description: 'Upgraded comfort with additional learning support',
    features: [
      'All Standard package features',
      'Economy flights included',
      'Airport pickup and drop-off',
      '24-hour student helpdesk',
      'Semi-private accommodation (2 students)',
      'Extra weekly Quran session',
      'Bi-weekly excursions',
      'Priority helpdesk response',
    ],
    cta: 'Add to Basket',
    featured: false,
    bestValue: false,
    showExtras: true,
  },
  {
    name: 'Premium',
    badge: null,
    floatingBadge: null,
    originalPrice: '£4,000',
    price: '£3,200',
    priceNum: 3200,
    limitedTime: true,
    description: 'The complete immersive experience with premium amenities',
    features: [
      'All Standard and Enhanced package features',
      'Business class flights included',
      'Private accommodation option',
      'Premium markaz placement',
      'One-on-one Quran sessions',
      'Extended excursion programme',
      'Priority support access',
      'Personalized study plan',
      'Certificate of completion',
    ],
    cta: 'Add to Basket',
    featured: true,
    bestValue: true,
    showExtras: true,
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
  const { addItem, items } = useBasket();

  const handleAddToBasket = () => {
    // Check if user already has a different package
    const existingPackageTypes = new Set(items.map(item => item.packageName));
    
    if (existingPackageTypes.size > 0 && !existingPackageTypes.has(pkg.name)) {
      toast.error('You can only add one type of package', {
        description: 'Remove items from your basket to switch packages.',
      });
      return;
    }

    addItem(pkg.name, pkg.priceNum);
    toast.success(`${pkg.name} Package added!`, {
      description: pkg.showExtras && items.filter(i => i.packageName === pkg.name).length >= 1
        ? '💕 Couples discount will apply at checkout!'
        : undefined,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative rounded-3xl p-8 pt-10 ${
        pkg.featured 
          ? 'bg-gradient-to-br from-terracotta-dark via-terracotta to-terracotta-light text-primary-foreground shadow-xl' 
          : 'bg-card shadow-soft border border-border'
      }`}
    >
      {/* Decorative Dome */}
      <div className={`absolute top-4 right-4 ${pkg.featured ? 'opacity-20' : 'opacity-10'}`}>
        <DomeOutline className="w-16 h-12" />
      </div>

      {/* Floating Badge (Best Value or Popular Choice) */}
      {pkg.bestValue && (
        <div className="absolute -top-3 inset-x-0 flex justify-center z-10">
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1 bg-gold text-terracotta-dark text-xs font-bold rounded-full shadow-lg cursor-default hover:shadow-xl transition-shadow"
          >
            <motion.span
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>{' '}
            Best Value
          </motion.div>
        </div>
      )}
      {'floatingBadge' in pkg && pkg.floatingBadge && (
        <div className="absolute -top-3 inset-x-0 flex justify-center z-10">
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1 bg-sand text-terracotta text-xs font-bold rounded-full shadow-lg flex items-center gap-1 cursor-default hover:shadow-xl transition-shadow"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.div>
            {pkg.floatingBadge}
          </motion.div>
        </div>
      )}

      {/* Badge */}
      {pkg.badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
          pkg.featured 
            ? 'bg-gold/30 text-gold' 
            : 'bg-sand text-terracotta'
        }`}>
          <Sparkles className="w-3 h-3" />
          {pkg.badge}
        </div>
      )}

      {/* Name & Price */}
      <h3 className="text-3xl font-semibold mb-2">{pkg.name}</h3>
      <div className="flex flex-col mb-4">
        <div className="flex items-baseline gap-2">
          {'originalPrice' in pkg && pkg.originalPrice && (
            <span className={`text-lg line-through ${pkg.featured ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
              {pkg.originalPrice}
            </span>
          )}
          <span className={`text-4xl font-bold ${pkg.featured ? 'text-gold' : 'text-terracotta'}`}>
            {pkg.price}
          </span>
        </div>
        {'limitedTime' in pkg && pkg.limitedTime && (
          <span className={`text-xs font-medium mt-1 ${pkg.featured ? 'text-gold' : 'text-terracotta'}`}>
            🔥 Limited time offer
          </span>
        )}
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
        onClick={handleAddToBasket}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        {pkg.cta}
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Button>

      {/* Finance & Discount Labels - Only for Enhanced and Premium */}
      {pkg.showExtras && (
        <div className={`text-center text-xs mt-3 space-y-1 ${pkg.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          <p>💳 Flexible payment plans available</p>
          <p>💕 Couples: Buy 1, get 2nd {pkg.name === 'Enhanced' ? '10%' : '15%'} off</p>
          <p>👥 Groups of 3+? <a href="#contact" className={`font-medium hover:underline ${pkg.featured ? 'text-gold' : 'text-terracotta'}`}>Get in touch</a></p>
        </div>
      )}
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
            Find Your Perfect Fit{' '}
            <span className="text-gradient-gold">& Begin Your Journey</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Select the programme that best fits your needs and budget. Both packages provide 
            comprehensive support for your Arabic and Quran studies in Cairo.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.name} pkg={pkg} index={index} />
          ))}
        </div>

        {/* Donation Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-muted-foreground mt-10 text-sm font-medium"
        >
          🇵🇸 10% of all proceeds donated to Palestine.
        </motion.p>
      </div>
    </section>
  );
};

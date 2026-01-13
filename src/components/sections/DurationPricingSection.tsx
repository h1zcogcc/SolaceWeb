import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const durations = [
  { id: '2-weeks', label: '2 Weeks', weeks: 2 },
  { id: '1-month', label: '1 Month', weeks: 4 },
  { id: '3-months', label: '3 Months', weeks: 12 },
  { id: '6-months', label: '6 Months', weeks: 24 },
];

const durationPricing = {
  '2-weeks': {
    Basic: { price: 750, features: ['Arabic classes', 'Quran classes', '1 Excursion', 'On-ground support'] },
    Standard: { price: 900, features: ['Arabic classes', 'Quran classes', 'Shared accommodation', 'Daily meals', '1 Excursion', 'On-ground support'] },
    Enhanced: { price: 1400, features: ['All Standard features', 'Airport transfers', '24/7 support', 'Semi-private room', 'Priority helpdesk'] },
    Premium: { price: 1900, features: ['All Enhanced features', 'Private accommodation', 'One-on-one Quran', 'Premium markaz', 'Certificate'] },
  },
  '1-month': {
    Basic: { price: 1200, features: ['Arabic classes', 'Quran classes', '2 Excursions', 'On-ground support'] },
    Standard: { price: 1500, features: ['Arabic classes', 'Quran classes', 'Shared accommodation', 'Daily meals', 'Bi-weekly excursions', 'On-ground support'] },
    Enhanced: { price: 2400, features: ['All Standard features', 'Airport transfers', '24/7 support', 'Semi-private room', 'Priority helpdesk'] },
    Premium: { price: 3200, features: ['All Enhanced features', 'Private accommodation', 'One-on-one Quran', 'Premium markaz', 'Certificate'] },
  },
  '3-months': {
    Basic: { price: 2800, features: ['Arabic classes', 'Quran classes', '6 Excursions', 'On-ground support'] },
    Standard: { price: 3600, features: ['Arabic classes', 'Quran classes', 'Shared accommodation', 'Daily meals', 'Bi-weekly excursions', 'On-ground support'] },
    Enhanced: { price: 5500, features: ['All Standard features', 'Economy flights', 'Airport transfers', '24/7 support', 'Semi-private room'] },
    Premium: { price: 7500, features: ['All Enhanced features', 'Business flights', 'Private accommodation', 'One-on-one Quran', 'Premium markaz'] },
  },
  '6-months': {
    Basic: { price: 5000, features: ['Arabic classes', 'Quran classes', '12 Excursions', 'On-ground support'] },
    Standard: { price: 6500, features: ['Arabic classes', 'Quran classes', 'Shared accommodation', 'Daily meals', 'Bi-weekly excursions', 'On-ground support'] },
    Enhanced: { price: 9500, features: ['All Standard features', 'Economy flights', 'Airport transfers', '24/7 support', 'Semi-private room'] },
    Premium: { price: 13000, features: ['All Enhanced features', 'Business flights', 'Private accommodation', 'One-on-one Quran', 'Premium markaz', 'Certificate'] },
  },
};

type DurationKey = keyof typeof durationPricing;
type PackageKey = 'Basic' | 'Standard' | 'Enhanced' | 'Premium';

export const DurationPricingSection = () => {
  const [selectedDuration, setSelectedDuration] = useState<DurationKey>('1-month');
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const navigate = useNavigate();

  const handleSelect = (pkg: PackageKey) => {
    navigate('/get-started', { 
      state: { 
        selectedPackage: pkg, 
        selectedDuration: selectedDuration,
        price: durationPricing[selectedDuration][pkg].price 
      } 
    });
  };

  return (
    <section id="duration-pricing" className="py-16 md:py-24 relative overflow-hidden bg-sand-light/30">
      <div className="absolute inset-0 pattern-islamic opacity-10" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-12"
        >
          <span className="section-label justify-center mb-4">
            Flexible Duration
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            Buy by <span className="text-gradient-gold">Duration</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base">
            Choose your study length and find the perfect package for your budget
          </p>
        </motion.div>

        {/* Duration Tabs - Scrollable on mobile */}
        <div className="flex justify-start md:justify-center gap-2 md:gap-4 mb-8 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {durations.map((duration) => (
            <button
              key={duration.id}
              onClick={() => setSelectedDuration(duration.id as DurationKey)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-medium transition-all whitespace-nowrap text-sm md:text-base ${
                selectedDuration === duration.id
                  ? 'bg-terracotta text-white shadow-lg'
                  : 'bg-white text-foreground hover:bg-sand border border-border'
              }`}
            >
              <Clock className="w-4 h-4" />
              {duration.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {(['Basic', 'Standard', 'Enhanced', 'Premium'] as PackageKey[]).map((pkg, index) => {
            const packageData = durationPricing[selectedDuration][pkg];
            const isPremium = pkg === 'Premium';
            
            return (
              <motion.div
                key={pkg}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative rounded-2xl md:rounded-3xl p-5 md:p-6 ${
                  isPremium 
                    ? 'bg-gradient-to-br from-terracotta-dark via-terracotta to-terracotta-light text-primary-foreground shadow-xl' 
                    : 'bg-white shadow-soft border border-border'
                }`}
              >
                {isPremium && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center">
                    <span className="px-3 py-1 bg-gold text-terracotta-dark text-xs font-bold rounded-full">
                      Best Value
                    </span>
                  </div>
                )}

                <h3 className="text-xl md:text-2xl font-semibold mb-2">{pkg}</h3>
                <div className="mb-4">
                  <span className={`text-3xl md:text-4xl font-bold ${isPremium ? 'text-gold' : 'text-terracotta'}`}>
                    £{packageData.price.toLocaleString()}
                  </span>
                  <span className={`text-sm ml-1 ${isPremium ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    / {durations.find(d => d.id === selectedDuration)?.label}
                  </span>
                </div>

                <div className={`h-px mb-4 ${isPremium ? 'bg-primary-foreground/20' : 'bg-border'}`} />

                <ul className="space-y-2 mb-6 min-h-[120px] md:min-h-[160px]">
                  {packageData.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isPremium ? 'text-gold' : 'text-terracotta'}`} />
                      <span className={isPremium ? 'text-primary-foreground/90' : 'text-foreground'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isPremium ? 'gold' : 'hero'}
                  className="w-full group"
                  onClick={() => handleSelect(pkg)}
                >
                  Select
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

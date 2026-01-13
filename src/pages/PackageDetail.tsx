import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Clock, BookOpen, MapPin, Users, ShoppingCart, ArrowRight } from 'lucide-react';
import { useBasket } from '@/contexts/BasketContext';
import { toast } from 'sonner';

const packageDetails = {
  basic: {
    name: 'Basic',
    emoji: '📚',
    duration: '2 Weeks',
    price: '£750',
    priceNum: 750,
    overview: 'A focused introduction to Arabic and Qur\'an studies in Cairo, perfect for those with limited time who want a meaningful immersion experience.',
    weeklyStructure: [
      { icon: BookOpen, text: 'Arabic classes: 4–5 days per week' },
      { icon: BookOpen, text: 'Qur\'an classes: 4–5 sessions per week (tajwīd & memorisation)' },
      { icon: MapPin, text: 'Excursion: 1 cultural trip included' },
      { icon: Users, text: 'Support: On-ground team available daily' },
    ],
    activities: [
      'Islamic Cairo walking tour',
      'Local mosque visits',
      'Cultural orientation session',
    ],
    outcome: 'A solid introduction to Qur\'an recitation and basic Arabic, with initial exposure to Cairo\'s Islamic heritage.',
    features: [
      'Arabic classes at reputable markaz',
      'Quran classes (tajwīd & memorisation)',
      '1 Excursion',
      'On-ground support team',
    ],
  },
  standard: {
    name: 'Standard',
    emoji: '🕌',
    duration: '1 Month',
    price: '£1,200',
    priceNum: 1200,
    overview: 'Designed for students getting started with Arabic and Qur\'an in Cairo, combining structured study with light cultural immersion and bi-weekly excursions.',
    weeklyStructure: [
      { icon: BookOpen, text: 'Arabic classes: 4–5 days per week' },
      { icon: BookOpen, text: 'Qur\'an classes: 4–5 sessions per week (tajwīd & memorisation)' },
      { icon: MapPin, text: 'Excursions: Bi-weekly (2 per month)' },
      { icon: Users, text: 'Support: On-ground team available daily' },
    ],
    activities: [
      'Local mosque visits',
      'Islamic Cairo walking tour',
      'Khan El Khalili market visit',
      'Cultural orientation & group dinners',
    ],
    outcome: 'A strong foundation in Qur\'an recitation and basic Arabic, with first-hand exposure to Cairo\'s Islamic heritage.',
    features: [
      'Arabic classes at reputable markaz',
      'Quran classes (tajwīd & memorisation)',
      'Shared accommodation in Cairo',
      'Daily lunch and dinner',
      'Bi-weekly excursions',
      'On-ground support team',
    ],
  },
  enhanced: {
    name: 'Enhanced',
    emoji: '📖',
    duration: '3 Months',
    price: '£2,800',
    priceNum: 2800,
    overview: 'An upgraded experience offering greater comfort, additional Qur\'an support, and more structured cultural exposure alongside Arabic study.',
    weeklyStructure: [
      { icon: BookOpen, text: 'Arabic classes: 5 days per week' },
      { icon: BookOpen, text: 'Qur\'an classes: 5–6 sessions per week' },
      { icon: BookOpen, text: 'Extra Qur\'an session: 1 additional session weekly' },
      { icon: MapPin, text: 'Excursions: Bi-weekly (2 per month)' },
      { icon: Users, text: 'Student support: 24-hour helpdesk' },
    ],
    activities: [
      'Extended Islamic Cairo tours',
      'Egyptian Museum visit',
      'Nile felucca ride',
      'Group reflection & study evenings',
    ],
    outcome: 'Improved Arabic confidence, stronger Qur\'an memorisation, and deeper cultural understanding through longer immersion.',
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
  },
  premium: {
    name: 'Premium',
    emoji: '🌟',
    duration: '6 Months',
    price: '£3,200',
    priceNum: 3200,
    originalPrice: '£4,000',
    limitedTime: true,
    overview: 'A fully immersive, premium-level programme for students seeking personalised Qur\'an study, top-tier accommodation, and extended exploration of Egypt.',
    weeklyStructure: [
      { icon: BookOpen, text: 'Arabic classes: 5 days per week (premium markaz placement)' },
      { icon: BookOpen, text: 'Qur\'an sessions: Daily, including 1-to-1 support' },
      { icon: Clock, text: 'Personal study plan: Ongoing adjustments' },
      { icon: MapPin, text: 'Excursions: Monthly extended trips + local outings' },
      { icon: Users, text: 'Support: Priority access throughout' },
    ],
    activities: [
      'Advanced mosque & heritage tours',
      'Extended excursions beyond Cairo',
      'One-to-one Qur\'an mentorship',
      'Graduation & certificate ceremony',
    ],
    outcome: 'Strong Arabic proficiency, personalised Qur\'an development, and a complete spiritual and cultural immersion in Egypt.',
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
  },
};

type PackageKey = keyof typeof packageDetails;

export default function PackageDetail() {
  const { packageName } = useParams<{ packageName: string }>();
  const { addItem, items } = useBasket();
  
  const pkg = packageDetails[packageName as PackageKey];

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Package not found</h1>
          <Link to="/#packages">
            <Button variant="hero">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Packages
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToBasket = () => {
    const existingPackageTypes = new Set(items.map(item => item.packageName));
    
    if (existingPackageTypes.size > 0 && !existingPackageTypes.has(pkg.name)) {
      toast.error('You can only add one type of package', {
        description: 'Remove items from your basket to switch packages.',
      });
      return;
    }

    addItem(pkg.name, pkg.priceNum);
    toast.success(`${pkg.name} Package added!`, {
      description: (pkg.name === 'Enhanced' || pkg.name === 'Premium') && items.filter(i => i.packageName === pkg.name).length >= 1
        ? '💕 Couples discount will apply at checkout!'
        : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/#packages" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all packages
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{pkg.emoji}</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {pkg.name} Package
                </h1>
                <p className="text-xl text-muted-foreground mt-1">{pkg.duration}</p>
              </div>
            </div>
            
            <div className="flex items-baseline gap-3 mt-6">
              {'originalPrice' in pkg && pkg.originalPrice && (
                <span className="text-2xl line-through text-muted-foreground">
                  {pkg.originalPrice}
                </span>
              )}
              <span className="text-5xl font-bold text-terracotta">{pkg.price}</span>
              {'limitedTime' in pkg && pkg.limitedTime && (
                <span className="text-sm font-medium text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
                  🔥 Limited time offer
                </span>
              )}
            </div>
          </motion.div>

          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {pkg.overview}
            </p>
          </motion.section>

          {/* Weekly/Monthly Structure */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Estimated {pkg.name === 'Standard' ? 'Weekly' : 'Monthly'} Structure
            </h2>
            <div className="space-y-4">
              {pkg.weeklyStructure.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-terracotta" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Typical Activities */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6">Typical Activities (Examples)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {pkg.activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-sand/30 rounded-xl"
                >
                  <Check className="w-5 h-5 text-terracotta flex-shrink-0" />
                  <span className="text-foreground">{activity}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* What's Included */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6">What's Included</h2>
            <div className="bg-card rounded-2xl border border-border p-6">
              <ul className="space-y-3">
                {pkg.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Outcome */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Outcome</h2>
            <div className="p-6 bg-gradient-to-br from-terracotta/10 to-sand/30 rounded-2xl border border-terracotta/20">
              <p className="text-lg text-foreground leading-relaxed">
                {pkg.outcome}
              </p>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant="hero"
              size="xl"
              className="group flex-1"
              onClick={handleAddToBasket}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Basket
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/#contact" className="flex-1">
              <Button variant="outline" size="xl" className="w-full">
                Have Questions? Contact Us
              </Button>
            </Link>
          </motion.div>

          {/* Extra Info */}
          {(pkg.name === 'Enhanced' || pkg.name === 'Premium') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 text-center text-sm text-muted-foreground space-y-1"
            >
              <p>💳 Flexible payment plans available</p>
              <p>💕 Couples: Buy 1, get 2nd {pkg.name === 'Enhanced' ? '10%' : '15%'} off</p>
              <p>👥 Groups of 3+? <Link to="/#contact" className="text-terracotta hover:underline font-medium">Get in touch</Link></p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

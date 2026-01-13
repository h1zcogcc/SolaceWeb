import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { BasketDrawer } from '@/components/basket/BasketDrawer';
import solaceLogo from '@/assets/solace-logo.png';

const navItems = [
  { label: 'Programme', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'About', href: '#about' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-3 md:px-4 pt-3 md:pt-4"
    >
      <div 
        className={`mx-auto max-w-7xl transition-all duration-500 rounded-full ${
          isScrolled 
            ? 'bg-white shadow-lg py-2 md:py-3 px-4 md:px-6' 
            : 'bg-white/95 backdrop-blur-sm shadow-md py-3 md:py-4 px-5 md:px-8'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <img 
              src={solaceLogo} 
              alt="Solace Egypt" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover group-hover:scale-105 transition-transform"
            />
            <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900" style={{ 
              fontFamily: "'Cormorant Garamond', serif"
            }}>
              Solace Egypt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA & Basket */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <a 
              href="#faq" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              FAQ
            </a>
            <BasketDrawer />
            <Button 
              size="lg" 
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 md:px-6 shadow-lg shadow-blue-500/25 text-sm"
              asChild
            >
              <Link to="/get-started">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle & Basket */}
          <div className="md:hidden flex items-center gap-2">
            <BasketDrawer />
            <button
              className="p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 mx-3 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <nav className="px-5 py-4 flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-700 py-3 border-b border-gray-100 last:border-0"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#faq"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 py-3 border-b border-gray-100"
              >
                FAQ
              </motion.a>
              <Button 
                size="lg" 
                className="mt-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                asChild
              >
                <Link to="/get-started" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

import { motion } from 'framer-motion';
import { IslamicStar } from '@/components/icons/IslamicPatterns';
import solaceLogo from '@/assets/solace-logo.png';

// Payment logos
import visaLogo from '@/assets/payments/visa.svg';
import mastercardLogo from '@/assets/payments/mastercard.svg';
import amexLogo from '@/assets/payments/amex.svg';
import paypalLogo from '@/assets/payments/paypal.svg';
import klarnaLogo from '@/assets/payments/klarna.svg';
import applePayLogo from '@/assets/payments/apple-pay.svg';
import googlePayLogo from '@/assets/payments/google-pay.svg';
import stripeLogo from '@/assets/payments/stripe.svg';

const paymentMethods = [
  { name: 'Visa', logo: visaLogo },
  { name: 'Mastercard', logo: mastercardLogo },
  { name: 'American Express', logo: amexLogo },
  { name: 'PayPal', logo: paypalLogo },
  { name: 'Klarna', logo: klarnaLogo },
  { name: 'Apple Pay', logo: applePayLogo },
  { name: 'Google Pay', logo: googlePayLogo },
  { name: 'Stripe', logo: stripeLogo },
];

const footerLinks = {
  programme: [
    { label: 'Arabic Classes', href: '#services' },
    { label: 'Quran Classes', href: '#services' },
    { label: 'Accommodation', href: '#services' },
    { label: 'Excursions', href: '#services' },
  ],
  support: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Egypt Guide', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'WhatsApp', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Story', href: '#about' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-dusk text-primary-foreground py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-islamic opacity-5" />
      
      {/* Decorative Stars */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
        >
          <IslamicStar className="w-6 h-6 text-gold" />
        </div>
      ))}

      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <img 
                src={solaceLogo} 
                alt="Solace Egypt" 
                className="w-10 h-10 rounded-xl object-cover"
              />
              <span className="text-xl font-semibold">Solace Egypt</span>
            </motion.div>
            <p className="text-primary-foreground/70 max-w-xs mb-6">
              Your complete path to Arabic & Quran mastery in the heart of Cairo. 
              Studying and living in Egypt made simple.
            </p>
            <div className="flex gap-4">
              {/* Social Links */}
              {['instagram', 'twitter', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold/30 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programme</h4>
            <ul className="space-y-2">
              {footerLinks.programme.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Supported Payment Methods */}
        <div className="mb-8">
          <p className="text-center text-sm text-primary-foreground/60 mb-4">Supported Payment Methods</p>
          <div className="flex justify-center items-center gap-3 md:gap-6 flex-wrap">
            {paymentMethods.map((method) => (
              <div 
                key={method.name}
                className="bg-white rounded-lg p-1.5 md:p-2 flex items-center justify-center h-8 md:h-10 w-12 md:w-16"
                title={method.name}
              >
                <img 
                  src={method.logo} 
                  alt={method.name} 
                  className="h-4 md:h-6 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/20 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© 2025 Solace Egypt. All rights reserved.</p>
          <p>Made with ❤️ for the Muslim community</p>
        </div>
      </div>
    </footer>
  );
};

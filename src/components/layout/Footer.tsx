import { motion } from 'framer-motion';
import { IslamicStar } from '@/components/icons/IslamicPatterns';
import solaceLogo from '@/assets/solace-logo.png';

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
          <div className="flex flex-wrap justify-center items-center gap-4">
            {/* Visa */}
            <div className="bg-white rounded-md px-3 py-2 flex items-center justify-center" title="Visa">
              <svg className="h-6 w-auto" viewBox="0 0 48 16" fill="none">
                <path d="M19.5 1L17 15H13.5L16 1H19.5Z" fill="#1434CB"/>
                <path d="M32.5 1.3C31.7 1 30.6 0.7 29.3 0.7C25.9 0.7 23.5 2.5 23.5 5C23.5 6.9 25.2 8 26.5 8.7C27.8 9.4 28.3 9.9 28.3 10.5C28.3 11.4 27.2 11.9 26.1 11.9C24.6 11.9 23.8 11.7 22.5 11.1L22 10.9L21.4 14.5C22.4 15 24 15.3 25.7 15.3C29.3 15.3 31.7 13.5 31.7 10.8C31.7 9.3 30.7 8.2 28.7 7.3C27.5 6.7 26.8 6.3 26.8 5.6C26.8 5 27.5 4.3 28.9 4.3C30.1 4.3 30.9 4.5 31.5 4.8L31.9 5L32.5 1.3Z" fill="#1434CB"/>
                <path d="M38.5 1H35.7C34.8 1 34.1 1.3 33.7 2.2L28.5 15H32.1L32.8 12.9H37.2L37.6 15H40.8L38.5 1ZM33.8 10.1C34.1 9.2 35.4 5.8 35.4 5.8C35.4 5.8 35.7 5 35.9 4.4L36.2 5.7L37 10.1H33.8Z" fill="#1434CB"/>
                <path d="M12.5 1L9 10.5L8.6 8.6C7.9 6.4 5.8 4 3.5 2.9L6.5 15H10.1L16.1 1H12.5Z" fill="#1434CB"/>
                <path d="M6.5 1H1L1 1.3C5.2 2.3 8 4.9 9 8L7.9 2.3C7.7 1.4 7 1.1 6.5 1Z" fill="#F9A533"/>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="bg-white rounded-md px-3 py-2 flex items-center justify-center" title="Mastercard">
              <svg className="h-6 w-auto" viewBox="0 0 48 30" fill="none">
                <circle cx="18" cy="15" r="12" fill="#EB001B"/>
                <circle cx="30" cy="15" r="12" fill="#F79E1B"/>
                <path d="M24 5.5C26.5 7.5 28 10.5 28 14C28 17.5 26.5 20.5 24 22.5C21.5 20.5 20 17.5 20 14C20 10.5 21.5 7.5 24 5.5Z" fill="#FF5F00"/>
              </svg>
            </div>
            {/* American Express */}
            <div className="bg-[#006FCF] rounded-md px-3 py-2 flex items-center justify-center" title="American Express">
              <span className="text-white text-xs font-bold">AMEX</span>
            </div>
            {/* PayPal */}
            <div className="bg-white rounded-md px-3 py-2 flex items-center justify-center" title="PayPal">
              <svg className="h-5 w-auto" viewBox="0 0 100 24" fill="none">
                <path d="M12 3C8 3 5.5 5 5 8.5C4.5 12 6.5 14 10 14H12L11.5 17C11.5 17 11 19 11 19H14.5L15.5 14H18C22 14 24.5 12 25 8.5C25.5 5 23 3 19 3H12Z" fill="#003087"/>
                <path d="M15 6C11 6 9 8 8.5 11C8 14 10 16 14 16H15.5L15 19H18.5L19.5 14H21C25 14 27 12 27.5 9C28 6 26 4 22 4H16.5L15 6Z" fill="#009CDE"/>
                <text x="35" y="17" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="#003087">Pay</text>
                <text x="58" y="17" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="#009CDE">Pal</text>
              </svg>
            </div>
            {/* Klarna */}
            <div className="bg-[#FFB3C7] rounded-md px-3 py-2 flex items-center justify-center" title="Klarna">
              <span className="text-black text-xs font-bold">Klarna.</span>
            </div>
            {/* Apple Pay */}
            <div className="bg-black rounded-md px-3 py-2 flex items-center justify-center" title="Apple Pay">
              <span className="text-white text-xs font-medium"> Pay</span>
            </div>
            {/* Google Pay */}
            <div className="bg-white rounded-md px-3 py-2 flex items-center justify-center border border-gray-200" title="Google Pay">
              <span className="text-xs font-medium"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span> Pay</span>
            </div>
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

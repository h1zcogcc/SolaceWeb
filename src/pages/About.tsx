import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Heart, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingStar, FloatingCrescent, FloatingDots } from '@/components/decorations/FloatingElements';
import { ArchFrame } from '@/components/icons/IslamicPatterns';

const About = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const approachRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const isApproachInView = useInView(approachRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-sand/10 to-background" />
        
        {/* Floating decorations */}
        <FloatingStar className="top-[10%] left-[5%]" delay={0} size="lg" />
        <FloatingStar className="top-[20%] right-[8%]" delay={2} size="md" />
        <FloatingCrescent className="top-[35%] left-[3%]" delay={1} />
        <FloatingDots className="bottom-[30%] right-[5%]" />
        <FloatingStar className="bottom-[15%] left-[10%]" delay={1.5} size="sm" />
        
        <div className="container mx-auto px-4 relative">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/">
              <Button variant="ghost" className="group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="section-label justify-center mb-4">
              <BookOpen className="w-4 h-4" />
              About Us
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
              Born from Experience,{' '}
              <span className="text-gradient-gold">Built on Sincerity</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Solace Egypt was founded by brothers who have lived, studied, and walked the path of 
              seeking knowledge in Egypt firsthand. Some of our team are currently based in Egypt, 
              actively studying Arabic and Qur'an, while others have previously spent extended periods 
              there doing the same.
            </p>
          </motion.div>

          {/* Quranic Quotes */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border text-center"
            >
              <p className="text-2xl font-arabic text-terracotta mb-4 leading-relaxed">
                وَقُل رَّبِّ زِدْنِي عِلْمًا
              </p>
              <p className="text-muted-foreground italic mb-2">
                "And say: My Lord, increase me in knowledge."
              </p>
              <p className="text-sm text-gold font-medium">(Qur'an 20:114)</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border text-center"
            >
              <p className="text-2xl font-arabic text-terracotta mb-4 leading-relaxed">
                هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ
              </p>
              <p className="text-muted-foreground italic mb-2">
                "Are those who know equal to those who do not know?"
              </p>
              <p className="text-sm text-gold font-medium">(Qur'an 39:9)</p>
            </motion.div>
          </div>

          {/* The Journey Section */}
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0 }}
            animate={isMissionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center mb-24"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <ArchFrame className="w-full max-w-md mx-auto aspect-[3/4]">
                <div className="absolute inset-8 rounded-t-[100px] overflow-hidden bg-sand">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url('https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&auto=format&fit=crop&q=80')`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-terracotta/20 to-transparent" />
                </div>
              </ArchFrame>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                The Journey of Knowledge
              </h2>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  From the earliest generations, Muslims travelled far from their homes to seek 
                  knowledge—leaving comfort behind in pursuit of understanding the language of 
                  the Qur'an and the guidance of the Sunnah.
                </p>
                <p>
                  Egypt has long been a place of learning, hosting scholars, institutes, and 
                  students from across the Muslim world.
                </p>
              </div>
              <div className="bg-sand/50 rounded-2xl p-6 border-l-4 border-gold">
                <p className="text-foreground italic mb-2">
                  "Whoever travels a path seeking knowledge, Allah will make easy for him a path to Paradise."
                </p>
                <p className="text-sm text-gold font-medium">(Sahih Muslim)</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Our Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Solace Egypt exists to remove the unnecessary hardship that often distracts students 
              from this path. We handle the practical realities of living in Egypt—accommodation, 
              airport pickup, food, and on-ground support—so students can focus their hearts and 
              minds on learning.
            </p>
            <p className="text-muted-foreground">
              This programme is not about tourism, nor is it a short-term experience built around 
              comfort alone. It is designed for those who wish to step away from distraction, 
              immerse themselves in study, and live a rhythm centred around the Qur'an and Arabic language.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {[
              { icon: Heart, title: 'Sincerity', description: 'Rooted in genuine care for your spiritual journey' },
              { icon: Users, title: 'Community', description: 'A supportive network of fellow seekers' },
              { icon: BookOpen, title: 'Knowledge', description: 'Access to authentic learning resources' },
              { icon: MapPin, title: 'Experience', description: 'First-hand understanding of student life in Egypt' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center"
              >
                <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-terracotta" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Our Approach Section */}
          <motion.div
            ref={approachRef}
            initial={{ opacity: 0 }}
            animate={isApproachInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-terracotta-dark via-terracotta to-terracotta-light rounded-3xl p-8 md:p-12 text-center text-primary-foreground mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Approach</h2>
            <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-6">
              At Solace, we aim to create a structured, supportive environment where students can 
              study with clarity, consistency, and sincerity. Our approach is rooted in transparency, 
              reliability, and care—shaped by lived experience and a deep respect for the responsibility 
              of facilitating knowledge.
            </p>
            <p className="text-primary-foreground/80 max-w-3xl mx-auto mb-8">
              Whether someone comes for an intensive period or a longer stay, Solace Egypt provides 
              a clear pathway and a stable foundation for those who wish to invest in their relationship 
              with the Qur'an and its language.
            </p>
            <p className="text-gold italic">
              We ask Allah ﷻ to place barakah in every step taken for His sake, to make knowledge a 
              means of closeness to Him, and to allow this effort to be a source of benefit for all who take part.
            </p>
          </motion.div>

          {/* Quranic Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-3xl font-arabic text-terracotta mb-4 leading-relaxed">
              فَسِيرُوا فِي الْأَرْضِ فَانظُرُوا كَيْفَ بَدَأَ الْخَلْقَ
            </p>
            <p className="text-muted-foreground italic mb-2">
              "So travel through the land and observe how He began creation."
            </p>
            <p className="text-sm text-gold font-medium">(Qur'an 29:20)</p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-muted-foreground mb-8">
              Explore our programmes and packages to find the path that suits your goals
            </p>
            <Link to="/#packages">
              <Button variant="hero" size="xl" className="group">
                View Packages
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

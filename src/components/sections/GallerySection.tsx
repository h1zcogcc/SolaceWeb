import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, ArrowRight } from 'lucide-react';
import { FloatingStar, FloatingDots } from '@/components/decorations/FloatingElements';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import islamicCairo from '@/assets/gallery/islamic-cairo.jpg';
import khanKhalili from '@/assets/gallery/khan-khalili.jpg';
import nileFelucca from '@/assets/gallery/nile-felucca.jpg';
import mosqueInterior from '@/assets/gallery/mosque-interior.jpg';
import museum from '@/assets/gallery/museum.jpg';
import studySession from '@/assets/gallery/study-session.jpg';

const galleryImages = [
  {
    src: islamicCairo,
    alt: 'Islamic Cairo at golden hour',
    caption: 'Historic Islamic Cairo',
    category: 'Excursions',
  },
  {
    src: khanKhalili,
    alt: 'Khan El Khalili market',
    caption: 'Khan El Khalili Bazaar',
    category: 'Cultural',
  },
  {
    src: nileFelucca,
    alt: 'Felucca on the Nile at sunset',
    caption: 'Nile Felucca Ride',
    category: 'Excursions',
  },
  {
    src: mosqueInterior,
    alt: 'Beautiful mosque interior',
    caption: 'Mosque Visit',
    category: 'Spiritual',
  },
  {
    src: museum,
    alt: 'Egyptian Museum',
    caption: 'Egyptian Museum Tour',
    category: 'Cultural',
  },
  {
    src: studySession,
    alt: 'Quran study session',
    caption: 'Group Study Session',
    category: 'Learning',
  },
];

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-sand/10 to-background" />
      
      {/* Floating decorations */}
      <FloatingStar className="top-[15%] left-[5%]" delay={0} size="md" />
      <FloatingStar className="top-[25%] right-[8%]" delay={2} size="sm" />
      <FloatingDots className="bottom-[20%] left-[8%]" />
      <FloatingStar className="bottom-[15%] right-[5%]" delay={1} size="lg" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label justify-center mb-4">
            <Camera className="w-4 h-4" />
            Trip Gallery
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            Moments From{' '}
            <span className="text-gradient-gold">Our Previous Journeys</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Explore memories from past excursions, cultural experiences, and spiritual gatherings
          </p>
        </motion.div>

        {/* Masonry-style Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.slice(0, 4).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                index === 0 || index === 3 ? 'md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${index === 0 || index === 3 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay - only visible on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Caption - only visible on hover, starts completely off-screen */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <span className="inline-block px-3 py-1 bg-gold/90 text-foreground text-xs font-medium rounded-full mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-primary-foreground font-serif text-lg font-semibold">
                    {image.caption}
                  </h3>
                </div>

                {/* Zoom icon - only visible on hover */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Button variant="hero" size="lg" className="group" asChild>
            <a href="/gallery">
              View Full Gallery
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-foreground/95 border-none">
          <AnimatePresence mode="wait">
            {selectedImage !== null && (
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 bg-background/20 hover:bg-background/40 text-primary-foreground rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Navigation buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/20 hover:bg-background/40 text-primary-foreground rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/20 hover:bg-background/40 text-primary-foreground rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Image */}
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
                  <span className="inline-block px-3 py-1 bg-gold/90 text-foreground text-xs font-medium rounded-full mb-2">
                    {galleryImages[selectedImage].category}
                  </span>
                  <h3 className="text-primary-foreground font-serif text-xl font-semibold">
                    {galleryImages[selectedImage].caption}
                  </h3>
                </div>

                {/* Image counter */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
};

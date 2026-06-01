/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, Sparkles, MapPin, CheckCircle, Heart, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES, TESTIMONIALS, IMAGES } from '../data';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function HomeView({ setCurrentTab }: HomeViewProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Filter 3 popular or signature core services for preview
  const featuredServices = SERVICES.filter(s => s.category === 'core').slice(0, 3);

  return (
    <div className="overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-cream text-charcoal py-20 px-4 sm:px-6 lg:px-12 border-b border-rose-border/30">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-border/10 text-rose text-[10px] font-bold tracking-widest uppercase border border-rose-border/20 mx-auto lg:mx-0 w-fit"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bongaree's Boutique Home Brow Studio</span>
              </motion.div>
              
              <div className="space-y-5">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="serif text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.95] font-light italic text-charcoal"
                >
                  Your brows, <br />
                  <span className="not-italic">beautifully</span> <br />
                  <span className="text-rose font-light not-italic">in bloom.</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="sans text-sm text-charcoal-light max-w-md mx-auto lg:mx-0 leading-relaxed font-light"
                >
                  Not a chain. Not a rush. Just Leticia, your brows, and a peaceful home sanctuary built entirely for you.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
              >
                <button
                  id="hero-book-now-btn"
                  onClick={() => setCurrentTab('book')}
                  className="bg-sage text-white px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full hover:opacity-90 transform active:scale-95 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  Book Now
                </button>
                <button
                  id="hero-view-services-btn"
                  onClick={() => setCurrentTab('services')}
                  className="bg-transparent border border-sage/40 hover:border-sage text-sage px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full transform active:scale-95 transition-all cursor-pointer"
                >
                  View Services
                </button>
              </motion.div>
            </div>

            {/* Quick studio details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-8 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-charcoal"
            >
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-widest font-bold text-sage">Location</span>
                <a 
                  href="https://www.google.com/maps/dir/19.3602412,72.8153474/115+Goodwin+Dr,+Bongaree+QLD+4507,+Australia/@-0.2909301,27.3091573,3z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x6b93eadb893a71cd:0x2bc0e22aa94f014!2m2!1d153.1638317!2d-27.0738857?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light hover:text-rose transition-colors hover:underline"
                >
                  115 Goodwin Dr, Bongaree
                </a>
              </div>
              <div className="hidden sm:block w-[1px] h-8 bg-rose-border/30"></div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-widest font-bold text-sage">Instagram</span>
                <a 
                  href="https://www.instagram.com/thebrowmanorr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light hover:text-rose transition-colors"
                >
                  @thebrowmanorr
                </a>
              </div>
              <div className="hidden sm:block w-[1px] h-8 bg-rose-border/30"></div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-widest font-bold text-sage">Artistry By</span>
                <span className="serif italic text-[15px] text-charcoal font-medium">Leticia East</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image Column with Custom Arched hero-mask */}
          <div className="lg:col-span-6 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[340px] h-[480px]"
            >
              <div className="hero-mask w-full h-[480px] bg-rose-border/10 flex items-center justify-center overflow-hidden border-8 border-white shadow-xl relative z-10">
                <img
                  src={IMAGES.hero}
                  alt="Beautifully sculpted and dyed brows"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-700"
                />
                <div className="w-full h-full bg-gradient-to-t from-cream/30 to-transparent absolute inset-0"></div>
              </div>

              {/* Floating Testimonial Card */}
              <div className="absolute bottom-12 -left-12 z-20 bg-sage text-white p-5 rounded-2xl max-w-[260px] shadow-lg transform -rotate-2 hidden md:block">
                <div className="flex gap-1 mb-1.5 text-rose-border">★★★★★</div>
                <p className="serif text-xs italic mb-2.5 leading-relaxed">
                  "Leticia is so precise and careful. My brows have never looked so full and natural."
                </p>
                <div className="text-[9px] uppercase tracking-widest font-semibold opacity-90">— Charlotte Thompson</div>
              </div>

              {/* Decorative floating circle image */}
              <div className="absolute top-0 right-0 w-32 h-32 border-4 border-white shadow-md rounded-full -mr-16 -mt-10 overflow-hidden z-20">
                <img
                  src={IMAGES.secondary}
                  alt="Brow secondary illustration"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. STUDIO INTRO */}
      <section className="bg-cream-light py-20 px-4 border-t border-b border-cream-dark/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-sage-pale flex items-center justify-center text-sage">
              <Heart className="w-5 h-5 fill-sage/20" />
            </div>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal tracking-normal leading-snug">
            This isn't your average salon. There's no loud music, no strangers beside you, no rushed appointments. Just you, Leticia, and pure focused beauty care.
          </h2>
          
          <p className="text-md sm:text-lg text-charcoal-light leading-relaxed max-w-2xl mx-auto font-light">
            In Bloom was born from one belief — that you deserve to feel truly seen, heard, and beautifully taken care of. A home studio with heart. A brow artist with purpose.
          </p>

          <button
            id="intro-about-btn"
            onClick={() => setCurrentTab('about')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sage hover:text-sage-dark border-b-2 border-blush/40 hover:border-blush pb-1 transition-all cursor-pointer"
          >
            Meet Leticia & Discover Our Values
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. FEATURED SERVICES PREVIEW */}
      <section className="bg-cream py-24 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-rose block">
                The Core Experience
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal tracking-wide">
                Signature Brow Services
              </h2>
            </div>
            <div>
              <button
                id="view-all-services-btn"
                onClick={() => setCurrentTab('services')}
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal hover:text-rose transition-colors cursor-pointer"
              >
                View Full Treatment Menu
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div 
                key={service.id}
                id={`featured-card-${service.id}`}
                className="bg-white p-8 rounded-2xl border border-rose-border/40 hover:border-rose shadow-xs hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase tracking-widest text-sage font-semibold">
                      {service.duration}
                    </span>
                    {service.popular && (
                      <span className="bg-rose-border/10 text-rose text-[10px] font-bold uppercase py-1 px-3 rounded-full border border-rose-border/20">
                        Best Seller
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="serif text-xl sm:text-2xl font-light leading-tight text-charcoal group-hover:text-rose transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-charcoal-light font-sans leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-rose-border/20 flex justify-between items-center mt-6">
                  <div>
                    <span className="text-[10px] text-sage block uppercase tracking-widest font-bold">Price</span>
                    <span className="serif text-2xl font-semibold text-charcoal">
                      A${service.price}
                    </span>
                  </div>
                  <button
                    id={`preview-book-${service.id}`}
                    onClick={() => setCurrentTab('book')}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-sage group-hover:text-sage-dark hover:underline cursor-pointer"
                  >
                    <span>Book now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SOCIAL PROOF (TESTIMONIALS SLIDER) */}
      <section className="bg-sage-pale py-24 px-4 text-center border-t border-b border-cream-dark/30 relative">
        <div className="absolute top-10 left-10 text-sage/10 font-serif text-9xl leading-none select-none">“</div>
        
        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-sage-light">
              Client Love
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal tracking-wide">
              Words From Our Clients
            </h2>
          </div>

          {/* Testimonial Active Slider Card */}
          <div className="min-h-[220px] flex items-center justify-center">
            {TESTIMONIALS.map((t, idx) => {
              if (idx !== activeTestimonial) return null;
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex justify-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-blush-dark text-blush-dark" />
                    ))}
                  </div>

                  <p className="text-lg sm:text-xl font-serif text-charcoal leading-relaxed max-w-2xl mx-auto italic font-light px-4">
                    "{t.content}"
                  </p>

                  <div>
                    <h4 className="font-serif text-md font-semibold text-charcoal">
                      {t.name}
                    </h4>
                    {t.service && (
                      <p className="text-xs text-sage font-sans uppercase tracking-wider mt-1">
                        {t.service}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-2 pt-4">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                id={`testimonial-dot-${idx}`}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeTestimonial === idx ? 'bg-sage w-6' : 'bg-sage-light/35 hover:bg-sage-light/60'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. INSTAGRAM FEED STRIP */}
      <section className="bg-cream py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose block">
              Follow Us
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal">
              See our work on Instagram
            </h2>
            <p className="text-xs text-charcoal-light max-w-md mx-auto">
              We invite you to follow @thebrowmanorr for real updates, live availability, and our latest brow transformations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              IMAGES.lamination,
              IMAGES.dyeSculpt,
              IMAGES.eyeMask,
              IMAGES.cozyStudio,
              IMAGES.hero,
              IMAGES.secondary
            ].map((img, idx) => (
              <a 
                key={idx}
                id={`ig-item-${idx + 1}`}
                href="https://www.instagram.com/thebrowmanorr/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group aspect-square bg-cream-dark/30 rounded-xl overflow-hidden border border-rose-border/30 block"
              >
                <img
                  src={img}
                  alt={`Brow work example ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-sage/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-cream" />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.instagram.com/thebrowmanorr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-transparent border border-rose-border hover:border-rose text-charcoal hover:text-rose text-xs uppercase tracking-[0.15em] font-semibold rounded-full transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @thebrowmanorr</span>
            </a>
          </div>

        </div>
      </section>

      {/* 6. BOTTOM CONVERTING BANNER */}
      <section className="bg-sage/5 py-24 px-4 text-center border-t border-rose-border/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#d69a9a] block">
            Exclusive In-Home Indulgence
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-charcoal max-w-xl mx-auto leading-tight">
            Ready to let your brows bloom?
          </h2>
          <p className="text-sm sm:text-md text-charcoal-light leading-relaxed max-w-lg mx-auto">
            Appointments fill up quickly! Secure your slot today with a A$20 non-refundable deposit that applies directly to your final treatment price.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              id="bottom-cta-book-btn"
              onClick={() => setCurrentTab('book')}
              className="px-8 py-3.5 bg-sage hover:bg-sage-dark text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-full shadow-md transition-all whitespace-nowrap cursor-pointer transform active:scale-95"
            >
              Reserve Appointment Slot
            </button>
            <button
              id="bottom-cta-contact-btn"
              onClick={() => setCurrentTab('contact')}
              className="px-8 py-3.5 bg-transparent border border-sage/40 hover:border-sage text-sage text-xs uppercase tracking-[0.2em] font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer transform active:scale-95"
            >
              Contact Leticia
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

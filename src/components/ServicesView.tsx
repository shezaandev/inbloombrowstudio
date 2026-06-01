/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, Sparkles, Clock, Compass, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';
import { SERVICES } from '../data';

interface ServicesViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function ServicesView({ setCurrentTab }: ServicesViewProps) {
  const coreServices = SERVICES.filter((s) => s.category === 'core');
  const addonServices = SERVICES.filter((s) => s.category === 'addon');

  return (
    <div className="bg-cream py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-border/10 text-rose border border-rose-border/20 rounded-full text-xs font-bold tracking-widest uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Treatment Menu</span>
          </div>
          <h1 className="serif text-4xl sm:text-5xl font-light text-charcoal tracking-tight leading-tight">
            Our Brow Services & <span className="text-rose italic">Pricing</span>
          </h1>
          <p className="sans text-sm sm:text-base text-charcoal-light leading-relaxed max-w-2xl mx-auto font-light">
            Every treatment is crafted around you — your face shape, your hair texture, your lifestyle. Premium products. Unhurried time. Brows that genuinely bloom.
          </p>
        </div>

        {/* 1. CORE SERVICES */}
        <div className="space-y-10">
          <div className="border-b border-rose-border/30 pb-3 max-w-[280px]">
            <h2 className="serif text-2xl sm:text-3xl font-light text-charcoal tracking-wide flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose shrink-0" />
              <span>Core Services</span>
            </h2>
            <p className="text-[10px] font-sans text-sage uppercase tracking-[0.2em] font-bold mt-1">Sculpting, Tints & Laminations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreServices.map((service) => (
              <div 
                key={service.id}
                id={`core-service-${service.id}`}
                className="bg-white p-8 rounded-2xl border border-rose-border/40 hover:border-rose shadow-xs hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="serif text-xl sm:text-2xl font-light text-charcoal group-hover:text-rose transition-colors leading-tight">
                      {service.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="serif text-2xl font-semibold text-charcoal">
                        A${service.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-sans text-sage font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose" />
                      <span>{service.duration}</span>
                    </div>
                    <span>•</span>
                    <span className="uppercase tracking-widest text-[9px] bg-rose-border/10 border border-rose-border/20 px-2.5 py-1 rounded-full text-rose">Standard Treatment</span>
                  </div>

                  <p className="text-sm text-charcoal-light leading-relaxed font-light sans">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-rose-border/20 mt-6 flex justify-between items-center bg-transparent">
                  <span className="text-[11px] text-charcoal-light/70 italic font-mono">Includes full mapping consultation</span>
                  <button
                    id={`book-service-btn-${service.id}`}
                    onClick={() => setCurrentTab('book')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-sage hover:bg-sage-dark text-white text-[10px] uppercase font-bold tracking-[0.2em] rounded-full transition-all cursor-pointer transform active:scale-95"
                  >
                    <span>Book now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. ADD-ONS */}
        <div className="space-y-10">
          <div className="border-b border-rose-border/30 pb-3 max-w-[280px]">
            <h2 className="serif text-2xl sm:text-3xl font-light text-charcoal tracking-wide flex items-center gap-2">
              <Compass className="w-5 h-5 text-rose shrink-0" />
              <span>Luxury Add-ons</span>
            </h2>
            <p className="text-[10px] font-sans text-sage uppercase tracking-[0.2em] font-bold mt-1">Indulge & Melt Away Tension</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addonServices.map((service) => (
              <div 
                key={service.id}
                id={`addon-service-${service.id}`}
                className="bg-white p-6 rounded-2xl border border-rose-border/40 hover:border-rose transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="serif text-lg font-light text-charcoal group-hover:text-rose transition-colors leading-tight min-h-[48px]">
                      {service.name}
                    </h3>
                    <span className="serif text-lg font-semibold text-charcoal shrink-0">
                      A${service.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-sage italic">
                    <Clock className="w-3.5 h-3.5 text-rose" />
                    <span>{service.duration} session</span>
                  </div>

                  <p className="text-xs text-charcoal-light leading-relaxed font-light line-clamp-4 sans">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-rose-border/20 mt-6 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-rose uppercase tracking-widest">Add to sculpt</span>
                  <button 
                    id={`book-addon-${service.id}`}
                    onClick={() => setCurrentTab('book')}
                    className="text-xs font-bold text-sage hover:text-sage-dark hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. POLICY REMINDER BANNER */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-rose-border/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="serif text-3xl font-light text-charcoal leading-tight">
              Booking Policy <span className="text-rose italic">Notice</span>
            </h3>
            <p className="text-sm font-sans text-charcoal-light leading-relaxed font-light">
              We charge a flat **A$20 non-refundable deposit** for all appointment bookings to guarantee your slot. The deposit is applied directly to your final price upon payment on the day of treatment. Please read our full salon rules before reserving.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap justify-start lg:justify-end gap-3">
            <button
              id="services-policies-btn"
              onClick={() => setCurrentTab('policies')}
              className="px-6 py-3.5 bg-transparent border border-rose-border hover:border-rose text-charcoal text-xs uppercase tracking-[0.15em] font-semibold rounded-full transition-all cursor-pointer text-center transform active:scale-95"
            >
              Read Policies
            </button>
            <button
              id="services-book-now-btn"
              onClick={() => setCurrentTab('book')}
              className="px-6 py-3.5 bg-sage hover:bg-sage-dark text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-full transition-all cursor-pointer text-center transform active:scale-95 shadow-sm"
            >
              Book Sculpt Now
            </button>
          </div>
        </div>

        {/* 4. LOWER CONTACT PROMPT */}
        <div className="text-center bg-sage/5 py-16 px-4 rounded-2xl border border-rose-border/30">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-rose-border/10 border border-rose-border/20 flex items-center justify-center text-rose">
                <HelpCircle className="w-5 h-5" />
              </div>
            </div>
            <h3 className="serif text-2xl font-light text-charcoal">
              Not sure which service is right for you?
            </h3>
            <p className="text-sm text-charcoal-light leading-relaxed sans font-light">
              If you have rare brow conditions, previous scarring, chemical lamination concerns, or just need custom styling input, drop Leticia a message! She is happy to advice on the best treatment to accomplish your goals.
            </p>
            <div className="pt-2">
              <button 
                id="services-contact-btn"
                onClick={() => setCurrentTab('contact')}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-sage hover:bg-sage-dark text-white text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full shadow-md transition-all cursor-pointer transform active:scale-95"
              >
                Send Leticia a Message
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, MapPin, Smile } from 'lucide-react';
import { IMAGES } from '../data';

interface AboutViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function AboutView({ setCurrentTab }: AboutViewProps) {
  return (
    <div className="bg-cream py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Intro Grid: Photo & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-3/4 rounded-sm overflow-hidden shadow-xl border-4 border-cream-light">
              {/* Inner frame */}
              <div className="absolute inset-2 border border-sage/20 pointer-events-none z-10" />
              <img
                src={IMAGES.leticia}
                alt="Portrait of Leticia East"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-cream/95 backdrop-blur-xs px-4 py-3 border border-cream-dark/40 shadow-md rounded-xs text-center">
                <span className="block font-serif text-lg font-medium text-charcoal">Leticia East</span>
                <span className="block text-[10px] uppercase font-sans tracking-widest text-[#CFA39F] font-bold mt-0.5">Founder & Head Stylist</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#CFA39F] block">
                Meet Your Stylist
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-wide leading-tight">
                Leticia didn't open a salon. She built a sanctuary.
              </h1>
            </div>

            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed font-light">
              No two faces are the same. No two brow appointments are either. Leticia studies your bone structure, your natural hair flow, and your personal style — then creates something entirely, beautifully yours.
            </p>
            
            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed font-light">
              That\'s why I opened <span className="font-serif italic font-medium text-sage">In Bloom Brow Studio</span> inside my private, peaceful home in Bongaree, Bribie Island, QLD. I wanted to design a cozy, beautiful space where clients can fully unwind, chat like old friends, and receive premium, boutique-level treatments without the chaotic buzz of standard shopping strip salons.
            </p>

            <blockquote className="border-l-4 border-[#E5C3C0] pl-4 py-1 italic font-serif text-charcoal text-md leading-relaxed">
              "Your face is a unique canvas. I don\'t believe in massive cookie-cutter templates. I study your underlying skeletal geometry, hair flow, and personal vibes to lift and balance your features naturally."
            </blockquote>

            <div className="bg-cream-dark/35 p-6 rounded-xs border border-cream-dark/70 space-y-3">
              <a 
                href="https://www.google.com/maps/dir/19.3602412,72.8153474/115+Goodwin+Dr,+Bongaree+QLD+4507,+Australia/@-0.2909301,27.3091573,3z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x6b93eadb893a71cd:0x2bc0e22aa94f014!2m2!1d153.1638317!2d-27.0738857?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal hover:text-rose hover:underline transition-colors"
              >
                <MapPin className="w-4.5 h-4.5 text-sage" />
                <span>115 Goodwin Dr, Bongaree QLD</span>
              </a>
              <p className="text-xs text-charcoal-light leading-relaxed">
                Our cozy, high-hygiene home-salon is strictly by appointment only. We cater to one client at a time, ensuring you receive 100% of our care, focus, and luxurious styling treatments during your booked session.
              </p>
            </div>

            <div className="text-sm font-sans text-charcoal-light flex flex-wrap items-center gap-2 pt-2">
              <span>Follow my work on Instagram:</span>
              <a 
                href="https://www.instagram.com/thebrowmanorr/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose text-rose font-semibold transition-colors"
              >
                @thebrowmanorr
              </a>
            </div>

            <div className="flex pt-4">
              <button
                id="about-book-now-btn"
                onClick={() => setCurrentTab('book')}
                className="px-8 py-3.5 bg-sage hover:bg-sage-dark text-cream font-sans text-xs uppercase tracking-wider font-semibold rounded-sm shadow-md transition-all cursor-pointer"
              >
                Schedule An Appointment
              </button>
            </div>
          </div>

        </div>

        {/* Studio Values Section */}
        <div className="space-y-12 pt-12 border-t border-cream-dark/50">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#CFA39F]">Our Core Foundation</span>
            <h2 className="font-serif text-3xl font-light text-charcoal">Studio Values</h2>
            <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed">
              We focus on standard setting client practices to guarantee safe, spectacular brow transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1: Precision mapping */}
            <div className="bg-cream-light p-8 rounded-sm border border-cream-dark/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-sage-pale text-sage flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal">Precision Symmetry</h3>
              <p className="text-sm text-charcoal-light font-sans font-light leading-relaxed">
                Rather than stamping standard shapes, Leticia custom-maps your eyebrows according to your actual facial structure, achieving premium symmetry that lifts and frames your eyes.
              </p>
            </div>

            {/* Value 2: Dedicated care */}
            <div className="bg-cream-light p-8 rounded-sm border border-cream-dark/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF1EF] text-blush-dark flex items-center justify-center mx-auto">
                <Heart className="w-5 h-5 fill-blush/20" />
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal">Luxurious Comfort</h3>
              <p className="text-sm text-charcoal-light font-sans font-light leading-relaxed">
                Every detail is thought out. From premium hypoallergenic rose-infused warm wax, cooling under-eye collagen patches, calming herbal tea, to quiet aroma therapy — we provide an active luxury retreat.
              </p>
            </div>

            {/* Value 3: Personalized attention */}
            <div className="bg-cream-light p-8 rounded-sm border border-cream-dark/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-sage-pale text-sage flex items-center justify-center mx-auto">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal">Personalized Service</h3>
              <p className="text-sm text-charcoal-light font-sans font-light leading-relaxed">
                Because we schedule one client at a time, we prioritize your exact style goals. We will talk through your past styling hurdles, look photos, and map out a bulletproof plan.
              </p>
            </div>
          </div>
        </div>

        {/* 3. COZY TREATMENT TIMELINE ILLUSTRATED */}
        <div className="bg-[#FAF7F2] p-8 sm:p-16 rounded-sm border border-cream-dark/70 text-center space-y-8">
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal">
            The In Bloom Salon Journey
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-light max-w-xl mx-auto leading-relaxed">
            First time booking? Here is what you can expect when you walk into Leticia\'s home room in Bongaree, Australia:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-left pt-6">
            <div className="space-y-2">
              <span className="text-lg font-serif italic text-blush-dark font-semibold">01. Arrive Relaxed</span>
              <p className="text-xs text-charcoal-light leading-relaxed">
                Arrive exactly on time, alone, with clean skin. Climb onto our warm treatment chair while soothing ambient acoustics fade.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-lg font-serif italic text-blush-dark font-semibold">02. Mapping Consultation</span>
              <p className="text-xs text-charcoal-light leading-relaxed">
                We study your hair growth and blueprint your symmetrical bounds. You can select dyes, tints, or lamination goals.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-lg font-serif italic text-blush-dark font-semibold">03. Custom Sculpt & Melt</span>
              <p className="text-xs text-charcoal-light leading-relaxed">
                Leticia completes high-precision grooming. Elevate your sculpt with an active head massage or hydrating lips treatment.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-lg font-serif italic text-blush-dark font-semibold">04. Bloom & Nourish</span>
              <p className="text-xs text-charcoal-light leading-relaxed">
                Review your gorgeous results in the hand mirror! Receive a complimentary spoolie and customized aftercare card.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

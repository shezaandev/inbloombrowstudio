/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, Instagram, Clock, Sparkles, MapPin } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = 2025; // Stick to "© 2025 In Bloom Brow Studio" as explicitly specified by USER

  return (
    <footer className="bg-charcoal text-cream pt-16 pb-8 border-t border-rose-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-rose-border/10">
          
          {/* Logo & Intro Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-sage flex items-center justify-center text-rose">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div className="text-left font-serif text-lg font-medium tracking-tight text-white">
                In Bloom <span className="text-sage italic font-light">Brow Studio</span>
              </div>
            </div>
            
            <p className="text-sm font-sans text-cream-dark/80 leading-relaxed max-w-xs">
              A boutique, in-home brow haven in beautiful Bongaree, QLD. Leticia East provides customized, luxury brow mapping and sculpting to help your natural beauty bloom.
            </p>
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-rose font-semibold mb-5">
              Explore Studio
            </h3>
            <ul className="space-y-2.5 text-sm text-cream-dark/90 text-left">
              <li>
                <button 
                  onClick={() => handleNavClick('home')}
                  className="hover:text-rose transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('services')}
                  className="hover:text-rose transition-colors cursor-pointer text-left"
                >
                  Services & Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('gallery')}
                  className="hover:text-rose transition-colors cursor-pointer text-left"
                >
                  Gallery Showcase
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('first-visit')}
                  className="hover:text-rose transition-colors cursor-pointer text-left"
                >
                  First Visit Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('about')}
                  className="hover:text-rose transition-colors cursor-pointer text-left"
                >
                  About Leticia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('care')}
                  className="hover:text-rose transition-colors cursor-pointer text-left"
                >
                  Pre & Aftercare
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('policies')}
                  className="hover:text-rose transition-colors cursor-pointer text-left"
                >
                  Salon Policies
                </button>
              </li>
            </ul>
          </div>

          {/* Hours Col */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-rose font-semibold mb-5">
              Opening Hours
            </h3>
            <div className="space-y-3 text-sm text-cream-dark/90 text-left">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-rose shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-cream">Wednesday – Sunday</p>
                  <p className="text-xs text-cream-dark/75 mt-0.5">9:00am – 6:00pm</p>
                </div>
              </div>
              <div className="text-xs text-cream-dark/50 italic border-t border-rose-border/15 pt-2 max-w-[200px]">
                Monday – Tuesday Closed.<br />
                Appointments only.
              </div>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-rose font-semibold mb-5">
              Connect
            </h3>
            <ul className="space-y-3.5 text-sm text-cream-dark/90 text-left col-span-1">
              <li>
                <a 
                  href="tel:+61416423758" 
                  className="flex items-center gap-2.5 hover:text-rose transition-colors"
                >
                  <Phone className="w-4 h-4 text-rose" />
                  <span>+61 416 423 758</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:leticiaeast04@gmail.com" 
                  className="flex items-center gap-2.5 hover:text-rose transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-rose" />
                  <span>leticiaeast04@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.google.com/maps/dir/19.3602412,72.8153474/115+Goodwin+Dr,+Bongaree+QLD+4507,+Australia/@-0.2909301,27.3091573,3z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x6b93eadb893a71cd:0x2bc0e22aa94f014!2m2!1d153.1638317!2d-27.0738857?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-2.5 hover:text-rose transition-colors"
                >
                  <MapPin className="w-4 h-4 text-rose shrink-0 mt-0.5" />
                  <span>115 Goodwin Dr, Bongaree QLD, Australia (Home Salon)</span>
                </a>
              </li>
              <li className="pt-2">
                <a 
                  href="https://www.instagram.com/thebrowmanorr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white bg-sage hover:bg-sage/80 px-4 py-2.5 rounded-full transition-all"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@thebrowmanorr</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-cream-dark/60 gap-4">
          <p>© {currentYear} In Bloom Brow Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => handleNavClick('policies')} className="hover:underline">Studio Policy</button>
            <button onClick={() => handleNavClick('care')} className="hover:underline">Care Steps</button>
            <span>Operated by Leticia East</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Views
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import GalleryView from './components/GalleryView';
import AboutView from './components/AboutView';
import FirstVisitView from './components/FirstVisitView';
import CareView from './components/CareView';
import PoliciesView from './components/PoliciesView';
import ContactFAQView from './components/ContactFAQView';
import BookingView from './components/BookingView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Automatically scroll to the top of the viewport when changing tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentTab]);

  const renderActiveView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView setCurrentTab={setCurrentTab} />;
      case 'services':
        return <ServicesView setCurrentTab={setCurrentTab} />;
      case 'gallery':
        return <GalleryView setCurrentTab={setCurrentTab} />;
      case 'about':
        return <AboutView setCurrentTab={setCurrentTab} />;
      case 'first-visit':
        return <FirstVisitView setCurrentTab={setCurrentTab} />;
      case 'care':
        return <CareView />;
      case 'policies':
        return <PoliciesView setCurrentTab={setCurrentTab} />;
      case 'contact':
        return <ContactFAQView />;
      case 'book':
        return <BookingView />;
      default:
        return <HomeView setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal font-sans selection:bg-blush/60 selection:text-charcoal-dark">
      {/* Sticky Header Nav */}
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Screen Content with fading layout transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Brand Footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}

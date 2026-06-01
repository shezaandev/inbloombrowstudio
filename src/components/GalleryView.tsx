import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, Instagram, Image as ImageIcon, Heart } from 'lucide-react';
import { IMAGES } from '../data';

interface GalleryViewProps {
  setCurrentTab: (tab: string) => void;
}

interface GalleryItem {
  id: string;
  title: string;
  serviceName: string;
  categories: string[]; // 'lamination', 'sculpt', 'tint', 'addon'
  imageUrl?: string;
  beforeImg?: string;
  afterImg?: string;
  isSlider?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Signature Brow Lamination & Dye/Tint',
    serviceName: 'Brow Wax, Sculpt, Lamination & Dye/Tint',
    categories: ['lamination', 'tint'],
    afterImg: IMAGES.lamination,
    beforeImg: IMAGES.beforeLamination,
    isSlider: true
  },
  {
    id: 'g2',
    title: 'Precision Wax & Sculpting',
    serviceName: 'Brow Wax & Sculpt',
    categories: ['sculpt'],
    afterImg: IMAGES.dyeSculpt,
    beforeImg: IMAGES.beforeSculpt,
    isSlider: true
  },
  {
    id: 'g3',
    title: 'Hybrid Custom Brow Dye',
    serviceName: 'Brow Wax, Sculpt & Dye/Tint',
    categories: ['tint', 'sculpt'],
    imageUrl: IMAGES.dyeSculpt
  },
  {
    id: 'g4',
    title: 'Fluffy Naked Lamination',
    serviceName: 'Brow Wax, Sculpt & Naked Lamination',
    categories: ['lamination', 'sculpt'],
    imageUrl: IMAGES.lamination
  },
  {
    id: 'g5',
    title: 'Luxury Collagen Under-Eye Mask Integration',
    serviceName: 'Under Eye Mask LUXURY Add-on',
    categories: ['addon'],
    imageUrl: IMAGES.eyeMask
  },
  {
    id: 'g6',
    title: 'Detail Tweezing & Post-Wax Treatment',
    serviceName: 'Brow Wax & Sculpt',
    categories: ['sculpt'],
    imageUrl: IMAGES.hero
  }
];

const FILTER_PILLS = [
  { id: 'all', label: 'All' },
  { id: 'lamination', label: 'Brow Lamination' },
  { id: 'sculpt', label: 'Wax & Sculpt' },
  { id: 'tint', label: 'Dye/Tint' },
  { id: 'addon', label: 'Add-ons' }
];

const INSTAGRAM_POSTS = [
  {
    id: 'ig1',
    img: IMAGES.lamination,
    link: 'https://www.instagram.com/thebrowmanorr/',
    caption: 'Blowing brows out of this world! Pure sculptural symmetry for this beautiful client. 🥰✨ #InBloom #Bongaree',
    likes: '143'
  },
  {
    id: 'ig2',
    img: IMAGES.dyeSculpt,
    link: 'https://www.instagram.com/thebrowmanorr/',
    caption: 'Process makes perfect. We prioritize careful skin protection oils before touching warm wax to skin. Safe, boutique brow care.',
    likes: '98'
  },
  {
    id: 'ig3',
    img: IMAGES.eyeMask,
    link: 'https://www.instagram.com/thebrowmanorr/',
    caption: 'Drenched in custom hybrid dye. Custom mapping built exactly for these striking facial lines.',
    likes: '185'
  },
  {
    id: 'ig4',
    img: IMAGES.cozyStudio,
    link: 'https://www.instagram.com/thebrowmanorr/',
    caption: 'A view from the sanctuary. Unwind, relax, and let your brows blossom. Operated by Leticia East in Bongaree.',
    likes: '112'
  },
  {
    id: 'ig5',
    img: IMAGES.leticia,
    link: 'https://www.instagram.com/thebrowmanorr/',
    caption: 'Before vs After lamination. That incredible fluffy, full texture we are all obsessed with!',
    likes: '231'
  },
  {
    id: 'ig6',
    img: IMAGES.hero,
    link: 'https://www.instagram.com/thebrowmanorr/',
    caption: 'Our Luxury Lip & Under Eye Collagen Masks will have you leaving completely floating in bliss.',
    likes: '154'
  }
];

export default function GalleryView({ setCurrentTab }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.categories.includes(activeFilter);
  });

  return (
    <div className="bg-cream min-h-screen py-16 sm:py-24">
      
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-border/10 text-rose border border-rose-border/20 rounded-full text-xs font-bold tracking-widest uppercase">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Before & After Showcase</span>
        </div>
        <h1 className="serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal tracking-tight leading-tight">
          The results speak <span className="text-rose italic">for themselves</span>
        </h1>
        <p className="sans text-sm sm:text-base text-charcoal-light leading-relaxed max-w-2xl mx-auto font-light">
          Every set of brows you see here belongs to a real client who walked in, trusted Leticia, and left transformed. Results speak louder than words.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-center overflow-x-auto pb-4 scrollbar-none">
          <div className="flex gap-3 bg-white/50 p-1.5 rounded-full border border-rose-border/20 shadow-xs">
            {FILTER_PILLS.map((pill) => {
              const isActive = activeFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setActiveFilter(pill.id)}
                  className={`px-6 py-2.5 rounded-full text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-rose text-white shadow-xs'
                      : 'border border-rose-border/25 text-charcoal-light hover:text-rose hover:border-rose/55'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PHOTO GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                {item.isSlider ? (
                  <BeforeAfterSlider
                    beforeImg={item.beforeImg!}
                    afterImg={item.afterImg!}
                    title={item.title}
                    service={item.serviceName}
                    onBook={() => setCurrentTab('book')}
                  />
                ) : (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl group shadow-xs border border-rose-border/20 bg-white">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                    />
                    
                    {/* Dark gradient and details overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/70 via-charcoal-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <h4 className="serif text-white text-lg font-light leading-snug">{item.title}</h4>
                      <div className="flex justify-between items-center mt-1.5">
                        <span className="sans text-[10px] text-rose uppercase tracking-widest font-semibold">{item.serviceName}</span>
                        <button
                          onClick={() => setCurrentTab('book')}
                          className="text-[11px] text-white hover:text-rose uppercase tracking-wider font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          Book this ↗
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* INSTAGRAM STRIP */}
      <section className="bg-white/40 py-16 border-y border-rose-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-rose font-bold block">Follow along</span>
            <a 
              href="https://www.instagram.com/thebrowmanorr/"
              target="_blank"
              rel="noopener noreferrer"
              className="serif text-2xl sm:text-3xl font-light hover:text-rose transition-all flex items-center justify-center gap-2"
            >
              <Instagram className="w-6 h-6 text-rose" />
              <span>Follow @thebrowmanorr for the latest results</span>
            </a>
          </div>

          {/* Horizontally scrollable strip of 6 mock posts */}
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-rose-border/40 scrollbar-track-transparent">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative shrink-0 w-64 aspect-square rounded-2xl overflow-hidden border border-rose-border/30 shadow-2xs group"
              >
                <img
                  src={post.img}
                  alt="Brow detail"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white text-[11px] font-light text-left">
                  <p className="line-clamp-3 leading-snug">{post.caption}</p>
                  <div className="flex items-center gap-1 text-[10px] text-rose font-semibold uppercase tracking-wider mt-2">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{post.likes} Likes</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA BANNER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28 space-y-8">
        <h2 className="serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-charcoal">
          Love what you see? <br />
          <span className="text-rose italic">Your brows are next.</span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => setCurrentTab('book')}
            className="w-full sm:w-auto bg-sage text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold rounded-full shadow-md hover:bg-sage-dark transform active:scale-95 transition-all cursor-pointer text-center"
          >
            Book your appointment
          </button>
          <button
            onClick={() => setCurrentTab('services')}
            className="w-full sm:w-auto bg-transparent border border-sage/40 text-sage hover:border-sage px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold rounded-full transform active:scale-95 transition-all cursor-pointer text-center"
          >
            View services & pricing &rarr;
          </button>
        </div>
      </div>

    </div>
  );
}

interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
  title: string;
  service: string;
  onBook: () => void;
}

function BeforeAfterSlider({ beforeImg, afterImg, title, service, onBook }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl group shadow-xs border border-rose-border/20 bg-white">
      {/* After Image (Background) */}
      <img 
        src={afterImg} 
        alt={`${title} - After`} 
        referrerPolicy="no-referrer"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover select-none"
      />
      
      {/* Before Image (Foreground overlay with Clip-Path) */}
      <img 
        src={beforeImg} 
        alt={`${title} - Before`} 
        referrerPolicy="no-referrer"
        loading="lazy"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        className="absolute inset-0 w-full h-full object-cover select-none"
      />

      {/* Vertical Slider divider line and indicator */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-rose-border flex items-center justify-center pointer-events-none select-none">
          <span className="text-[10px] font-bold text-sage">↔</span>
        </div>
      </div>

      {/* Before / After labels */}
      <span className="absolute bottom-3 left-3 px-2 py-1 bg-charcoal/60 text-white rounded-md text-[10px] uppercase tracking-widest z-10 select-none">Before</span>
      <span className="absolute bottom-3 right-3 px-2 py-1 bg-sage/85 text-white rounded-md text-[10px] uppercase tracking-widest z-10 select-none">After</span>

      {/* Draggable transparent input slider overlay */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPos} 
        onChange={(e) => setSliderPos(Number(e.target.value))} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-25" 
      />

      {/* Absolute Header Overlay on hover */}
      <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-left">
        <h4 className="serif text-white text-lg font-light leading-snug">{title}</h4>
        <div className="flex justify-between items-center mt-1">
          <span className="sans text-[10px] text-rose uppercase tracking-widest font-semibold">{service}</span>
          <button 
            type="button"
            onClick={onBook}
            className="text-[11px] text-white hover:text-rose uppercase tracking-wider font-bold transition-colors cursor-pointer"
          >
            Book this ↗
          </button>
        </div>
      </div>
    </div>
  );
}

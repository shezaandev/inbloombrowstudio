/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Testimonial, FAQ, CareStep, Policy } from './types';

// Image paths
export const IMAGES = {
  hero: '/src/assets/images/brow-hero.jpg',
  studio: '/src/assets/images/brow-studio.jpg',
  leticia: '/src/assets/images/leticia-profile.jpg',
  lamination: '/src/assets/images/brow-lamination.jpg',
  dyeSculpt: '/src/assets/images/brow-dye-sculpt.jpg',
  cozyStudio: '/src/assets/images/cozy-studio.jpg',
  eyeMask: '/src/assets/images/brow-eye-mask.jpg',
  beforeLamination: '/src/assets/images/before-lamination.jpg',
  beforeSculpt: '/src/assets/images/before-sculpt.jpg',
  secondary: '/src/assets/images/brow-secondary.jpg',
};

// Services Data
export const SERVICES: Service[] = [
  {
    id: 'brow-wax-sculpt',
    name: 'Brow Wax & Sculpt',
    description: 'Leticia\'s signature precise custom brow mapping, soothing pre-wax oil, professional waxing, meticulous tweezing, and calming post-treatment rosewater care.',
    price: 30,
    duration: '30 min',
    category: 'core',
    popular: false,
  },
  {
    id: 'brow-wax-sculpt-tint',
    name: 'Brow Wax, Sculpt & Dye/Tint',
    description: 'Signature precision sculpt combined with a highly customized hybrid tint or intense dye. Fills in sparser areas and maps the brows perfect for your face shape.',
    price: 50,
    duration: '50 min',
    category: 'core',
    popular: true,
  },
  {
    id: 'brow-wax-sculpt-naked-lam',
    name: 'Brow Wax, Sculpt & Naked Lamination',
    description: 'Reposition, relax, and lift your natural brow hairs to achieve a fuller, fluffy, effortlessly groomed look. This custom service does not include tint — pure natural elegance.',
    price: 65,
    duration: '1 hr 10 min',
    category: 'core',
    popular: false,
  },
  {
    id: 'brow-wax-sculpt-lam-tint',
    name: 'Brow Wax, Sculpt, Lamination & Dye/Tint',
    description: 'The ultimate brow transformation. Relocates and relaxes brow hairs, sculpts to precision, and infuses custom-matched dye for a bold, beautifully fully in bloom look.',
    price: 85,
    duration: '1 hr 20 min',
    category: 'core',
    popular: true,
  },
  {
    id: 'addon-head-massage',
    name: 'Scalp Massage',
    description: 'Relax. Unwind during your treatment with a deeply soothing tension-release scalp massage with premium botanical hair oil.',
    price: 7,
    duration: '5 min',
    category: 'addon',
  },
  {
    id: 'addon-lip-wax',
    name: 'Lip Wax Add-on',
    description: 'Gentle and ultra-precise upper lip hair removal using premium organic hypoallergenic warm wax.',
    price: 10,
    duration: '5 min',
    category: 'addon',
  },
  {
    id: 'addon-lip-mask',
    name: 'Lip Mask LUXURY',
    description: 'A cooling, ultra-hydrating collagen lip treatment mask to plump, hydrate, and soften dry or chapped lips while your brows bloom.',
    price: 12,
    duration: '10 min',
    category: 'addon',
  },
  {
    id: 'addon-eye-mask',
    name: 'Under Eye Mask LUXURY',
    description: 'A deeply soothing, de-puffing collagen-infused under-eye gel treatment to soothe tired skin and reduce dark circles.',
    price: 18,
    duration: '20 min',
    category: 'addon',
  },
];

// Testimonials Data
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Charlotte Thompson',
    content: 'Leticia is an absolute brow magician! The home studio in Bongaree is so peaceful, warm, and beautifully clean. My brows have never looked so full or perfectly shaped. I got the full Brow Lamination & Dye and I am completely obsessed!',
    rating: 5,
    service: 'Brow Wax, Sculpt, Lamination & Dye/Tint',
    date: 'May 2026',
  },
  {
    id: 't2',
    name: 'Annie Pastars',
    content: 'Cannot recommend In Bloom Brow Studio enough. Leticia takes so much care, her attention to detail is unmatched. It feels like a high-end luxury spa retreat, and the deposit system makes securing a slot simple. The pre and aftercare advice has kept my lamination looking perfect for weeks.',
    rating: 5,
    service: 'Brow Wax, Sculpt & Naked Lamination',
    date: 'April 2026',
  },
  {
    id: 't3',
    name: 'Wendy Whitfield',
    content: 'What a beautiful boutique experience. Leticia is so friendly and professional, and she really listens to what you want. The tension-release scalp massage and under-eye luxury mask during my brow wax were absolute heaven!',
    rating: 5,
    service: 'Brow Wax & Sculpt + Luxury Add-ons',
    date: 'May 2026',
  },
];

// FAQs Data
export const FAQS: FAQ[] = [
  {
    id: 'faq-deposit',
    question: 'What is the A$20 deposit for, and is it refundable?',
    answer: 'A A$20 deposit is required to secure your booking. This deposit is non-refundable, but it is fully applied toward your final service price on the day of your appointment. If you cancel or reschedule at least 24 hours prior, your deposit can be rolled over to your next appointment.',
  },
  {
    id: 'faq-guests',
    question: 'Can I bring a friend, child, or pet with me?',
    answer: 'Because In Bloom is a boutique home-based salon styled for relaxation and with limited workspace, we kindly ask that you arrive to your appointment alone. If you have exceptional circumstances, please discuss this with Leticia directly before booking.',
  },
  {
    id: 'faq-early',
    question: 'How early should I arrive for my appointment?',
    answer: 'Please arrive exactly at your scheduled appointment time. Since we operate on back-to-back appointment schedules, arriving early may disrupt a client in session, while arriving more than 10 minutes late will result in the scheduled session being cancelled and forfeit of deposit.',
  },
  {
    id: 'faq-cancel',
    question: 'What happens if I need to cancel or rearrange?',
    answer: 'We require a minimum of 24 hours notice for any cancellations or reschedules. Doing so allows you to retain your A$20 deposit and apply it to a new date. Cancellations made inside the 24-hour window, or failure to attend (no-shows), will result in a forfeited deposit and potential booking restrictions.',
  },
  {
    id: 'faq-prepare',
    question: 'What do I need to do to prepare for my brow appointment?',
    answer: 'The most important steps are to ensure your brows are free of any makeup, oily creams, or powders on the day. Additionally, please avoid retinol creams, chemical exfoliants, and tanning products on your face for at least 72 hours prior. Review our full Pre & Aftercare guide for more details.',
  },
];

// Pre-care Steps
export const PRE_CARE_STEPS: CareStep[] = [
  {
    id: 'pre-1',
    stepNumber: 1,
    text: '24 hours before your appointment: Ensure your brow area is completely free of any face makeup, heavy moisturizers, oils, or powders. Clean skin ensures the wax adheres properly and tint infuses beautifully.',
    iconName: 'Sparkles',
  },
  {
    id: 'pre-2',
    stepNumber: 2,
    text: '72 hours before your appointment: Avoid applying self-tanner, retinol/Vitamin A, BHAs, or AHAs near the brow and forehead area, as these products sensitize the skin and can cause irritation or lift during waxing.',
    iconName: 'ShieldAlert',
  },
  {
    id: 'pre-3',
    stepNumber: 3,
    text: 'For optimal results: Avoid plucking, waxing, trimming, threading, or colouring your eyebrows for at least 6 weeks prior to your appointment. Let the natural hair grow so Leticia can sculpt the fullest possible shape.',
    iconName: 'CalendarRange',
  },
];

// Aftercare Steps
export const AFTER_CARE_STEPS: CareStep[] = [
  {
    id: 'after-1',
    stepNumber: 1,
    text: 'Avoid water, steam, heavy sweating, hot baths, and saunas for the first 24 hours. Moisture can disrupt the chemical bonds set during lamination and cause tint to fade prematurely.',
    iconName: 'Droplets',
  },
  {
    id: 'after-2',
    stepNumber: 2,
    text: 'Do not apply any brow serums, pencil/powder makeup, heavy oils, or foundation near the eyebrows for 24 hours to let the hair follicle settle and prevent irritation.',
    iconName: 'Ban',
  },
  {
    id: 'after-3',
    stepNumber: 3,
    text: 'Apply your complimentary brow nourishing oil or daily hydrating serum 1-2 times daily, starting 24 hours post-treatment. This maintains optimal hydration, shine, and hair health.',
    iconName: 'HeartPulse',
  },
  {
    id: 'after-4',
    stepNumber: 4,
    text: 'Avoid exfoliating facial cleansers, strong retinol serums, high-percentage vitamin C, or facial tanning products near the brow area for at least 72 hours post-session to prevent irritation or discolouration.',
    iconName: 'ZapOff',
  },
  {
    id: 'after-5',
    stepNumber: 5,
    text: 'Gently run a clean spoolie / brow brush through your brow hairs daily in an upward/outward motion to keep them set. Cleanse your face ultra-gently with non-oily wash and avoid rough rubbing.',
    iconName: 'Undo2',
  },
];

// Policy items
export const POLICY_ITEMS: Policy[] = [
  {
    id: 'p-deposit',
    title: '$20 Non-Refundable Deposit',
    description: 'To secure a booking slot with Leticia, a $20 deposit is required upon reservation. This deposit is non-refundable, but it applies fully as credit toward your completed treatments on the day.',
  },
  {
    id: 'p-timing',
    title: 'Punctuality & Late Policy',
    description: 'We respect your time and operate on a strict, prompt schedule. If you are more than 10 minutes late, your appointment will be automatically forfeited along with your deposit. We cannot run late as this directly cuts into the next client\'s boutique experience.',
  },
  {
    id: 'p-guests',
    title: 'Arrive Alone Policy',
    description: 'This is a dedicated private boutique room set up in a beautiful home salon. Due to safe space constraints, safety regulations, and maintaining a peaceful sanctuary, guests, children, and pets are strictly not permitted. Please arrive alone.',
  },
  {
    id: 'p-cxl',
    title: '24-Hour Rescheduling',
    description: 'We require a minimum of 24 hours notice to cancel or reschedule appointments. If you give at least 24 hours notice, your $20 deposit can be happily rescheduled with you. Shorter notice or last-minute changes results in instant forfeiture.',
  },
  {
    id: 'p-noshow',
    title: 'No-Show Accountability',
    description: 'Failing to attend your appointment without any prior notice (no-show) automatically forfeits your deposit. In addition, you will be blocked from using our booking services in the future.',
  },
  {
    id: 'p-refunds',
    title: 'No Refunds Policy',
    description: 'We take custom precision and client care extremely seriously, spending custom craft, tailored high-end products, and dedicated time on your brows. As such, all treatments are non-refundable.',
  },
];

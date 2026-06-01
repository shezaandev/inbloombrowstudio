/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Calendar, Clock, DollarSign, Phone, Mail, Sparkles, Check, 
  ChevronRight, ChevronLeft, AlertCircle, Info, Heart 
} from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

export default function BookingView() {
  const getFirstAvailableDate = () => {
    const today = new Date();
    const temp = new Date(today);
    for (let i = 0; i < 30; i++) {
      const dayIndex = temp.getDay();
      if (dayIndex !== 1 && dayIndex !== 2) {
        return `${temp.getFullYear()}-${String(temp.getMonth() + 1).padStart(2, '0')}-${String(temp.getDate()).padStart(2, '0')}`;
      }
      temp.setDate(temp.getDate() + 1);
    }
    return '';
  };

  const formatRawDate = (rawDateStr: string) => {
    if (!rawDateStr) return null;
    const parts = rawDateStr.split('-');
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const dateObj = new Date(year, month, day);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      dayName: days[dateObj.getDay()],
      formatted: dateObj.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
    };
  };

  const [step, setStep] = useState(1);
  const [selectedCore, setSelectedCore] = useState<Service | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(() => getFirstAvailableDate());
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    agreePolicies: false,
    agreeSolo: false,
    agreePreCare: false
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Available core & add-ons lists
  const coreServices = SERVICES.filter(s => s.category === 'core');
  const addonServices = SERVICES.filter(s => s.category === 'addon');

  const [navMonthOffset, setNavMonthOffset] = useState(0);

  const getDisplayedYearMonth = (offset: number) => {
    const today = new Date();
    const target = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    return {
      year: target.getFullYear(),
      month: target.getMonth(), // 0-indexed
      name: target.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
    };
  };

  const getDatesForCurrentMonth = () => {
    const { year, month } = getDisplayedYearMonth(navMonthOffset);
    const dates = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Get number of days in the target year/month
    const numDays = new Date(year, month + 1, 0).getDate();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let d = 1; d <= numDays; d++) {
      const checkDate = new Date(year, month, d);
      checkDate.setHours(0, 0, 0, 0);
      const dayIndex = checkDate.getDay();
      
      if (dayIndex !== 1 && dayIndex !== 2) {
        const isPast = checkDate < today;
        dates.push({
          raw: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
          dayName: days[dayIndex],
          formatted: checkDate.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }),
          isPast
        });
      }
    }
    return dates;
  };

  const datesAvailable = getDatesForCurrentMonth();

  const timeSlots = [
    '9:00 am', '10:00 am', '11:15 am', '12:30 pm', 
    '1:45 pm', '3:00 pm', '4:15 pm', '5:30 pm'
  ];

  // Logic to toggle selected addons
  const handleToggleAddon = (addon: Service) => {
    setSelectedAddons(prev => {
      const exists = prev.find(item => item.id === addon.id);
      if (exists) {
        return prev.filter(item => item.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  // Cost calculations
  const corePrice = selectedCore ? selectedCore.price : 0;
  const addonsPrice = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const totalCost = corePrice + addonsPrice;

  const handleNextStep = () => {
    if (step === 1 && !selectedCore) return;
    if (step === 3 && (!selectedDate || !selectedTime)) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const isCheckbox = type === 'checkbox';
    
    setClientInfo(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const isFormValid = () => {
    return (
      clientInfo.name.trim() !== '' &&
      clientInfo.email.trim() !== '' &&
      clientInfo.phone.trim() !== '' &&
      clientInfo.agreePolicies &&
      clientInfo.agreeSolo &&
      clientInfo.agreePreCare
    );
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const selectedDateFormatted = formatRawDate(selectedDate);
    const dateLabel = selectedDateFormatted
      ? `${selectedDateFormatted.dayName}, ${selectedDateFormatted.formatted}`
      : selectedDate;

    const addonsLabel = selectedAddons.length > 0
      ? selectedAddons.map(a => a.name).join(', ')
      : 'None';

    try {
      await emailjs.send(
        'service_gi2b928',
        'template_fmy0f5y',
        {
          client_name: clientInfo.name,
          client_email: clientInfo.email,
          client_phone: clientInfo.phone,
          service: selectedCore?.name ?? '',
          addons: addonsLabel,
          date: dateLabel,
          time: selectedTime,
          total: `A$${totalCost}`,
          deposit: 'A$20',
          remaining: `A$${totalCost - 20}`,
          notes: clientInfo.notes || 'None',
        },
        'xs287kRgirxEW_Dcz'
      );
      console.log('Booking email sent successfully');
    } catch (error) {
      console.error('EmailJS booking error:', error);
    }

    setBookingConfirmed(true);
  };

  const handleResetWizard = () => {
    setStep(1);
    setSelectedCore(null);
    setSelectedAddons([]);
    setSelectedDate('');
    setSelectedTime('');
    setClientInfo({
      name: '',
      email: '',
      phone: '',
      notes: '',
      agreePolicies: false,
      agreeSolo: false,
      agreePreCare: false
    });
    setBookingConfirmed(false);
  };

  return (
    <div className="bg-cream py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* POLICIES AND NOTICES REVELATION - Standardized */}
        {!bookingConfirmed && (
          <div className="bg-[#FAF0EE] rounded-sm border border-[#F5EAE8] p-6 mb-10 space-y-4 shadow-xs">
            <div className="flex gap-3 items-start">
              <AlertCircle className="w-5.5 h-5.5 text-blush-dark shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-serif text-[#2D2D2A] font-semibold text-base">Key Policies & Deposit Notification</h3>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  A **A$20 non-refundable deposit** is required to secure your booking. This will be safely applied to your final bill on the day of treatment.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs border-t border-blush/25">
              <div className="space-y-0.5">
                <span className="font-bold text-charcoal block">Punctuality Reminder</span>
                <span className="text-charcoal-light font-light leading-relaxed">Arrive on time — more than 10 mins late forfeits your deposit & slot.</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-charcoal block">Cozy Solo Space</span>
                <span className="text-charcoal-light font-light leading-relaxed">Please arrive alone. No guests, children, or pets due to home-salon layout.</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-charcoal block font-sans">Pre-care Adherence</span>
                <span className="text-charcoal-light font-light leading-relaxed">Follow pre-care guidelines strictly to secure skin safety & flawless dye tinting.</span>
              </div>
            </div>
          </div>
        )}

        {/* BOOKING WIZARD */}
        {bookingConfirmed ? (
          /* CONFIRMED SCREEN */
          <div className="bg-cream-light border border-cream-dark/60 rounded-sm p-8 sm:p-12 shadow-xl text-center space-y-8 animate-fade-in">
            <div className="w-16 h-16 bg-sage-pale rounded-full flex items-center justify-center text-sage mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#CFA39F] block">Booking Request Received!</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal tracking-wide">
                Your Details Have Been Submitted
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-light max-w-lg mx-auto">
                Thank you for choosing In Bloom Brow Studio! Leticia will review your booking request and get in touch with you shortly via phone or email to confirm your appointment details.
              </p>
            </div>

            {/* Receipt details */}
            <div className="bg-[#FAF7F2] p-6 rounded-xs border border-cream-dark/60 max-w-md mx-auto text-left space-y-4">
              <div className="border-b border-cream-dark pb-3 text-center">
                <span className="font-serif font-semibold text-charcoal tracking-wider uppercase text-xs">Booking Slip</span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Client:</span>
                  <span className="font-semibold text-charcoal">{clientInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Phone:</span>
                  <span className="font-semibold text-charcoal">{clientInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Treatment:</span>
                  <span className="font-semibold text-charcoal text-right">{selectedCore?.name}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Add-ons:</span>
                    <span className="font-semibold text-charcoal text-right">
                      {selectedAddons.map(a => a.name).join(', ')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-charcoal-light">Scheduled Time:</span>
                  <span className="font-semibold text-sage text-right">
                    {(() => {
                      const f = formatRawDate(selectedDate);
                      return f ? `${f.dayName}, ${f.formatted}` : selectedDate;
                    })()} @ {selectedTime}
                  </span>
                </div>
                <div className="border-t border-cream-dark/60 pt-3 space-y-1.5 font-sans">
                  <div className="flex justify-between font-semibold">
                    <span>Total Appointment Value:</span>
                    <span>A${totalCost}</span>
                  </div>
                  <div className="flex justify-between text-xs text-charcoal-light">
                    <span>Booking Deposit (due on confirmation):</span>
                    <span className="font-semibold text-charcoal">A$20</span>
                  </div>
                  <div className="flex justify-between text-xs text-sage font-bold border-t border-cream-dark/30 pt-2">
                    <span>Remaining Balance Day Of:</span>
                    <span>A${totalCost - 20}</span>
                  </div>
                  <p className="text-[10px] text-charcoal-light font-light leading-relaxed pt-1 border-t border-cream-dark/20 mt-1">
                    * A non-refundable A$20 deposit will be arranged by Leticia upon confirmation. This amount will be fully adjusted against your total on the day of your appointment.
                  </p>
                </div>
              </div>
            </div>

            {/* Post booking instructions */}
            <div className="text-xs text-charcoal-light leading-relaxed max-w-md mx-auto space-y-2 font-light">
              <p className="font-semibold text-charcoal">📍 Address Reveal Policy:</p>
              <p>
                In Bloom is a cozy home salon located at <a href="https://www.google.com/maps/dir/19.3602412,72.8153474/115+Goodwin+Dr,+Bongaree+QLD+4507,+Australia/@-0.2909301,27.3091573,3z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x6b93eadb893a71cd:0x2bc0e22aa94f014!2m2!1d153.1638317!2d-27.0738857?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="underline text-rose hover:text-rose-dark font-medium">115 Goodwin Dr, Bongaree</a>. Leticia will share complete details and parking instructions with you directly before your appointment.
              </p>
              <p>
                Need to reschedule? Please let Leticia know at least 24 hours in advance at <span className="font-bold text-charcoal">+61 416 423 758</span> or email <span className="font-bold text-charcoal">leticiaeast04@gmail.com</span> to rollover your deposit.
              </p>
            </div>

            <div className="pt-4">
              <button
                id="reset-booking-wizard-btn1"
                onClick={handleResetWizard}
                className="px-6 py-3 bg-sage hover:bg-sage-dark text-cream text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-colors cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* STEP FLOW WIZARD BUILD */
          <div className="bg-cream-light border border-cream-dark/60 rounded-sm shadow-xl p-6 sm:p-10 space-y-8">
            
            {/* Steps Indicator Bar */}
            <div className="flex justify-between items-center pb-6 border-b border-cream-dark/60 text-xs text-charcoal-light font-sans overflow-x-auto min-w-full">
              <div className={`shrink-0 flex items-center gap-1.5 pb-2 ${step >= 1 ? 'text-sage font-bold border-b-2 border-sage pb-2' : ''}`}>
                <span className="w-5 h-5 rounded-full bg-cream-dark/40 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Core Sculpt</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
              <div className={`shrink-0 flex items-center gap-1.5 pb-2 ${step >= 2 ? 'text-sage font-bold border-b-2 border-sage pb-2' : ''}`}>
                <span className="w-5 h-5 rounded-full bg-cream-dark/40 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Add-ons</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
              <div className={`shrink-0 flex items-center gap-1.5 pb-2 ${step >= 3 ? 'text-sage font-bold border-b-2 border-sage pb-2' : ''}`}>
                <span className="w-5 h-5 rounded-full bg-cream-dark/40 flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Date & Time</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
              <div className={`shrink-0 flex items-center gap-1.5 pb-2 ${step >= 4 ? 'text-sage font-bold border-b-2 border-sage pb-2' : ''}`}>
                <span className="w-5 h-5 rounded-full bg-cream-dark/40 flex items-center justify-center text-[10px] font-bold">4</span>
                <span>Consent & Details</span>
              </div>
            </div>

            {/* STEP 1: CHOOSE CORE SERVICE */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-light text-charcoal">Select Your Main Brow Service</h3>
                  <p className="text-xs text-charcoal-light">Please select one signature base treatment mapping to get started.</p>
                </div>

                <div className="space-y-4">
                  {coreServices.map((service) => {
                    const isSelected = selectedCore?.id === service.id;
                    return (
                      <button
                        key={service.id}
                        id={`wizard-select-core-${service.id}`}
                        onClick={() => setSelectedCore(service)}
                        className={`w-full text-left p-5 rounded-xs border transition-all flex justify-between items-center gap-4 cursor-pointer focus:outline-hidden ${
                          isSelected 
                            ? 'bg-[#EDF1EC] border-sage/60 shadow-xs' 
                            : 'bg-cream-light border-cream-dark/60 hover:border-blush-dark/40'
                        }`}
                      >
                        <div className="space-y-1.5 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-medium text-charcoal text-md sm:text-lg">
                              {service.name}
                            </span>
                            {service.popular && (
                              <span className="bg-blush-light text-blush-dark text-[8.5px] font-bold uppercase tracking-wider py-0.5 px-2 rounded-full font-sans">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-charcoal-light font-light leading-relaxed line-clamp-2">
                            {service.description}
                          </p>
                          <span className="block text-[10px] font-semibold text-sage-light uppercase tracking-wider font-sans">
                            Duration: {service.duration} Included
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-serif text-lg sm:text-xl font-bold text-charcoal block">A${service.price}</span>
                          <div className={`mt-2 w-5 h-5 rounded-full border flex items-center justify-center mx-auto ${isSelected ? 'bg-sage text-cream border-sage' : 'border-charcoal/20 bg-cream'}`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: CUSTOMIZE WITH ADDONS */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-light text-charcoal">Elevate Your Appointment</h3>
                  <p className="text-xs text-charcoal-light">Melt away stress by appending these relaxing and hydrating scalp or face treatments.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addonServices.map((addon) => {
                    const isSelected = selectedAddons.some(item => item.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        id={`wizard-select-addon-${addon.id}`}
                        onClick={() => handleToggleAddon(addon)}
                        className={`text-left p-5 rounded-xs border transition-all flex flex-col justify-between cursor-pointer focus:outline-hidden ${
                          isSelected 
                            ? 'bg-[#EDF1EC] border-sage/60 shadow-xs' 
                            : 'bg-cream-light border-cream-dark/60 hover:border-blush-dark/40'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-1">
                            <span className="font-serif font-medium text-charcoal text-base leading-tight">
                              {addon.name}
                            </span>
                            <span className="font-serif font-bold text-charcoal shrink-0">A${addon.price}</span>
                          </div>
                          <p className="text-xs text-charcoal-light font-light leading-relaxed min-h-[48px]">
                            {addon.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-cream-dark/30 mt-4 flex justify-between items-center w-full">
                          <span className="text-[10px] uppercase text-sans tracking-wide text-charcoal-light">{addon.duration}</span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-sage text-cream border-sage' : 'border-charcoal/20 bg-cream'}`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: DATE & TIME CHOOSE */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-light text-charcoal">Select Date & Time</h3>
                  <p className="text-xs text-charcoal-light">Wednesday through Sundays only are available in Bongaree. Check options below.</p>
                </div>

                <div className="space-y-6">
                  {/* Month Navigation Bar */}
                  <div className="flex items-center justify-between py-2 border-b border-cream-dark/40 pb-4">
                    <button
                      type="button"
                      id="prev-month-btn"
                      onClick={() => setNavMonthOffset(prev => Math.max(0, prev - 1))}
                      disabled={navMonthOffset === 0}
                      className={`w-10 h-10 flex items-center justify-center bg-transparent border rounded-xs transition-all ${
                        navMonthOffset === 0
                          ? 'border-charcoal/10 text-charcoal/30 cursor-not-allowed opacity-50'
                          : 'border-charcoal/30 hover:border-charcoal text-charcoal hover:bg-cream cursor-pointer'
                      }`}
                    >
                      ‹
                    </button>
                    <span className="font-serif text-lg font-light text-charcoal">
                      {getDisplayedYearMonth(navMonthOffset).name}
                    </span>
                    <button
                      type="button"
                      id="next-month-btn"
                      onClick={() => setNavMonthOffset(prev => Math.min(12, prev + 1))}
                      disabled={navMonthOffset >= 12}
                      className={`w-10 h-10 flex items-center justify-center bg-transparent border rounded-xs transition-all ${
                        navMonthOffset >= 12
                          ? 'border-charcoal/10 text-charcoal/30 cursor-not-allowed opacity-50'
                          : 'border-charcoal/30 hover:border-charcoal text-charcoal hover:bg-cream cursor-pointer'
                      }`}
                    >
                      ›
                    </button>
                  </div>

                  {/* Calendar Dates Grid */}
                  <div className="space-y-2.5">
                    <span className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal">Available Days (Wed – Sun)</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                      {datesAvailable.map((date) => {
                        const isSelected = selectedDate === date.raw;
                        const isDisabled = date.isPast;
                        return (
                          <button
                            key={date.raw}
                            id={`wizard-select-date-${date.raw}`}
                            type="button"
                            onClick={() => !isDisabled && setSelectedDate(date.raw)}
                            disabled={isDisabled}
                            className={`p-3.5 rounded-xs border text-center transition-all focus:outline-hidden ${
                              isSelected 
                                ? 'bg-sage text-cream border-sage shadow-md' 
                                : isDisabled
                                  ? 'bg-cream-dark/40 border-cream-dark/40 text-charcoal-light/30 cursor-not-allowed opacity-50'
                                  : 'bg-cream-light border-cream-dark/60 hover:border-sage cursor-pointer'
                            }`}
                          >
                            <span className={`block font-serif text-md font-medium ${isSelected ? 'text-cream' : isDisabled ? 'text-charcoal-light/40' : 'text-charcoal'}`}>{date.formatted}</span>
                            <span className={`block text-[10px] uppercase font-sans mt-0.5 tracking-wider ${isSelected ? 'text-cream/80' : isDisabled ? 'text-charcoal-light/30' : 'text-charcoal-light/70'}`}>{date.dayName.substring(0,3)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots grid */}
                  {selectedDate && (
                    <div className="space-y-2.5 animate-fade-in">
                      <span className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal">Available Time Slots</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {timeSlots.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              id={`wizard-select-time-${time.replace(' ', '')}`}
                              onClick={() => setSelectedTime(time)}
                              className={`p-3 rounded-xs border text-center transition-all cursor-pointer focus:outline-hidden text-xs sm:text-sm font-sans ${
                                isSelected 
                                  ? 'bg-sage text-cream border-sage shadow-md font-bold' 
                                  : 'bg-cream-light border-cream-dark/60 hover:border-sage'
                              }`}
                            >
                              <span>{time}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: CONSENT & DETAILS */}
            {step === 4 && (
              <form onSubmit={handleConfirmReservation} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-light text-charcoal">Secure Your Reservation</h3>
                  <p className="text-xs text-charcoal-light">Enter your contact info and accept the boutique salon terms to complete your booking.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal" htmlFor="client-name">
                      Full Name *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      name="name"
                      required
                      value={clientInfo.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Sarah Thompson"
                      className="w-full bg-cream border border-cream-dark focus:border-sage px-3.5 py-2.5 rounded-xs text-xs sm:text-sm focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal" htmlFor="client-email">
                      Email Address *
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      name="email"
                      required
                      value={clientInfo.email}
                      onChange={handleInputChange}
                      placeholder="e.g. sarah@gmail.com"
                      className="w-full bg-cream border border-cream-dark focus:border-sage px-3.5 py-2.5 rounded-xs text-xs sm:text-sm focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal" htmlFor="client-phone">
                      Mobile Number *
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      name="phone"
                      required
                      value={clientInfo.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +61 412 345 678"
                      className="w-full bg-cream border border-cream-dark focus:border-sage px-3.5 py-2.5 rounded-xs text-xs sm:text-sm focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal" htmlFor="client-notes">
                    Special Style Requests or Scarring / Skin Concerns
                  </label>
                  <textarea
                    id="client-notes"
                    name="notes"
                    rows={2}
                    value={clientInfo.notes}
                    onChange={handleInputChange}
                    placeholder="Provide any hair density or skin concerns here..."
                    className="w-full bg-cream border border-cream-dark focus:border-sage px-3.5 py-2.5 rounded-xs text-xs sm:text-sm focus:outline-hidden"
                  />
                </div>

                {/* Policies consents checkboxes */}
                <div className="bg-[#FAF7F2] p-5 rounded-xs border border-cream-dark/60 space-y-4 text-xs sm:text-sm">
                  <span className="block font-serif font-semibold text-charcoal uppercase tracking-wider text-[11px] border-b border-cream-dark/60 pb-2">Mandatory Booking Consents</span>
                  
                  <div className="space-y-3.5">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        id="agreePolicies-chk"
                        type="checkbox"
                        name="agreePolicies"
                        checked={clientInfo.agreePolicies}
                        onChange={handleInputChange}
                        className="mt-0.5 w-4 h-4 rounded-xs border border-charcoal accent-sage shrink-0"
                      />
                      <span className="text-charcoal-light font-light leading-snug">
                        I agree to the <span className="font-semibold text-charcoal">A$20 non-refundable deposit</span> rule. I understand that this deposit applies directly to my treatment total, but cancelling with less than 24-hours notice or failing to attend completely forfeits this deposit.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        id="agreeSolo-chk"
                        type="checkbox"
                        name="agreeSolo"
                        checked={clientInfo.agreeSolo}
                        onChange={handleInputChange}
                        className="mt-0.5 w-4 h-4 rounded-xs border border-charcoal accent-sage shrink-0"
                      />
                      <span className="text-charcoal-light font-light leading-snug">
                        I agree to the <span className="font-semibold text-charcoal">Arrive Alone policy</span>. I understand that In Bloom Brow Studio is a peaceful in-home setup and cannot accommodate extra friends, children, or animal companions.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        id="agreePreCare-chk"
                        type="checkbox"
                        name="agreePreCare"
                        checked={clientInfo.agreePreCare}
                        onChange={handleInputChange}
                        className="mt-0.5 w-4 h-4 rounded-xs border border-charcoal accent-sage shrink-0"
                      />
                      <span className="text-charcoal-light font-light leading-snug">
                        I confirm that I have read and agree to follow all <span className="font-semibold text-charcoal">Pre-Care Guidelines</span> (no makeup onset, retinol and tanner pauses, etc.) for my safety.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="confirm-reservation-booking-btn"
                    type="submit"
                    disabled={!isFormValid()}
                    className={`w-full py-4 rounded-xs font-sans text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-md ${
                      isFormValid() 
                        ? 'bg-sage hover:bg-sage-dark text-cream cursor-pointer' 
                        : 'bg-cream-dark text-charcoal-light/45 cursor-not-allowed border border-cream-dark'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Submit Booking Request</span>
                  </button>
                  {!isFormValid() && (
                    <p className="text-[10px] text-center text-red-700/80 mt-2 italic font-light font-sans">
                      * Please complete all contact fields and tick all three mandatory booking consents to unlock the reservation button.
                    </p>
                  )}
                </div>
              </form>
            )}

            {/* Navigation buttons */}
            {!bookingConfirmed && (
              <div className="flex justify-between items-center pt-8 border-t border-cream-dark/60 mt-10">
                {step > 1 ? (
                  <button
                    id="wizard-back-btn"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 bg-transparent hover:bg-cream border border-charcoal/30 hover:border-charcoal text-charcoal text-xs uppercase tracking-wider font-semibold rounded-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    id="wizard-continue-btn"
                    onClick={handleNextStep}
                    disabled={step === 1 && !selectedCore}
                    className={`px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold shadow-xs transition-all flex items-center gap-1 ${
                      step === 1 && !selectedCore 
                        ? 'bg-cream-dark text-charcoal-light/45 cursor-not-allowed' 
                        : 'bg-sage hover:bg-sage-dark text-cream cursor-pointer'
                    }`}
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            )}

          </div>
        )}

        {/* Live Bill Tally Sidebar / Summary Panel */}
        {!bookingConfirmed && selectedCore && (
          <div className="mt-8 bg-[#FAF7F2] p-5 rounded-sm border border-cream-dark/80 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#CFA39F] tracking-widest block">Live Treatment Tally</span>
              <p className="text-sm font-light text-charcoal-light">
                <span className="font-semibold text-charcoal">{selectedCore.name}</span>
                {selectedAddons.length > 0 && ` + ${selectedAddons.map(a => a.name).join(', ')}`}
              </p>
            </div>
            <div className="sm:text-right text-xs sm:text-sm font-sans space-y-1">
              <div className="flex sm:justify-end justify-between gap-5 font-light">
                <span>Subtotal Value:</span>
                <span className="font-semibold text-charcoal">A${totalCost}</span>
              </div>
              <div className="flex sm:justify-end justify-between gap-5 font-semibold text-md text-sage">
                <span>Deposit Required Today:</span>
                <span>A$20.00</span>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT FALLBACK SECTION */}
        <div className="mt-16 text-center border-t border-cream-dark/50 pt-12 space-y-4">
          <p className="text-xs sm:text-sm text-charcoal-light font-medium">
            Questions before booking? DM me on{' '}
            <a 
              href="https://www.instagram.com/thebrowmanorr/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline text-rose hover:text-rose-dark"
            >
              Instagram
            </a>{' '}
            <a 
              href="https://www.instagram.com/thebrowmanorr/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-rose hover:text-rose-dark"
            >
              @thebrowmanorr
            </a>
          </p>
          <p className="text-xs text-charcoal-light pt-2">
            Experiencing booking failures? Prefer booking directly with Leticia?
          </p>
          <div className="flex justify-center flex-wrap gap-6 text-xs font-semibold text-sage">
            <a href="tel:+61416423758" className="flex items-center gap-1.5 hover:underline">
              <Phone className="w-4 h-4" />
              <span>+61 416 423 758</span>
            </a>
            <a href="mailto:leticiaeast04@gmail.com" className="flex items-center gap-1.5 hover:underline break-all">
              <Mail className="w-4 h-4" />
              <span>leticiaeast04@gmail.com</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

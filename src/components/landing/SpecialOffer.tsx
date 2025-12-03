"use client";

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

type TimeLeft = {
  hours?: string;
  minutes?: string;
  seconds?: string;
};

const handleScrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export function SpecialOffer() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].specialOffer;

  const dailyOffers = useMemo(() => [
    t.offers.offer1,
    t.offers.offer2,
    t.offers.offer3,
  ], [t]);
  
  const [currentOffer, setCurrentOffer] = useState("");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const difference = endOfDay.getTime() - now.getTime();

      let timeLeft: TimeLeft = {};

      if (difference > 0) {
        timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
          minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
          seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0'),
        };
      } else {
        timeLeft = { hours: '00', minutes: '00', seconds: '00' };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Select a random offer for the day based on the date
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setCurrentOffer(dailyOffers[dayOfYear % dailyOffers.length]);

    return () => clearInterval(timer);
  }, [dailyOffers]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-center gap-4 md:gap-6 py-2 text-center h-16">
          <p className="hidden md:block text-lg font-semibold">{t.title}</p>
          <p className="flex-grow text-sm md:text-base font-medium text-center">{currentOffer}</p>
          <div className="hidden sm:flex items-center gap-2">
            <p className="text-sm">{t.offerEndsIn}</p>
            <div className="flex items-center gap-1 font-mono text-lg font-bold">
              {isClient && timeLeft.hours ? (
                <>
                  <span className="bg-black/20 px-2 py-1 rounded-md">{timeLeft.hours}</span>
                  <span>:</span>
                  <span className="bg-black/20 px-2 py-1 rounded-md">{timeLeft.minutes}</span>
                  <span>:</span>
                  <span className="bg-black/20 px-2 py-1 rounded-md">{timeLeft.seconds}</span>
                </>
              ) : (
                <span className="bg-black/20 p-2 rounded-lg">00:00:00</span>
              )}
            </div>
          </div>
          <Button onClick={() => handleScrollTo('order')} size="sm" className="bg-white text-red-600 hover:bg-gray-100 rounded-full shadow-md font-bold whitespace-nowrap">
            {t.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}

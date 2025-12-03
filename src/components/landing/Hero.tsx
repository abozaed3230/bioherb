"use client";

import React, { useState, useEffect, useContext, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

const handleScrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};


export function Hero() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].hero;

  const marketingTexts = useMemo(() => [
    t.taglines.tagline1,
    t.taglines.tagline2,
    t.taglines.tagline3,
    t.taglines.tagline4,
    t.taglines.tagline5,
    t.taglines.tagline6,
    t.taglines.tagline7,
    t.taglines.tagline8,
    t.taglines.tagline9,
    t.taglines.tagline10,
  ], [t]);

  const productImage = PlaceHolderImages.find(img => img.id === 'bioherb-powder-3d');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % marketingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [marketingTexts.length]);

  return (
    <section id="hero" className="w-full pt-20 pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="flex items-center justify-center lg:order-last">
             {productImage && (
                <Image
                  src={productImage.imageUrl}
                  alt={productImage.description}
                  width={1024}
                  height={576}
                  priority
                  className="rounded-lg object-cover w-full h-auto aspect-video transform transition-transform duration-500 hover:scale-105 drop-shadow-2xl"
                  data-ai-hint={productImage.imageHint}
                />
              )}
          </div>
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-right">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
              {t.title}
            </h1>
            <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl lg:mx-0">
              {t.subtitle}
            </p>
            
            <div className="relative h-20 w-full max-w-lg mx-auto lg:mx-0 overflow-hidden">
              {marketingTexts.map((text, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full flex items-center justify-center lg:justify-end transition-opacity duration-1000 ease-in-out ${
                    index === currentTextIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <p className="text-xl md:text-2xl font-medium text-gradient bg-gradient-to-r from-primary to-accent/80">{text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-end">
              <Button onClick={() => handleScrollTo('order')} size="lg" className="bg-gradient-to-r from-primary to-accent/80 text-primary-foreground hover:from-primary/90 hover:to-accent/70 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 px-10 py-8 text-2xl h-auto">
                {t.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

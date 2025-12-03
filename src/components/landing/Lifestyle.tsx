"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

const lifestyleMedia = [
  {
    id: "lifestyle-video1",
    hint: "person eating happily",
  },
  {
    id: "lifestyle2",
    hint: "friends dining",
  },
  {
    id: "lifestyle3",
    hint: "person relaxed",
  },
];

export function Lifestyle() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].lifestyle;

  return (
    <section id="lifestyle" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
            {t.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {t.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifestyleMedia.map((item) => {
            const media = PlaceHolderImages.find((m) => m.id === item.id);
            if (!media) return null;
            return (
              <Card key={item.id} className="overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                {media.videoUrl ? (
                   <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/hero-bioherb.jpg"
                    data-ai-hint={media.imageHint}
                  >
                    <source src={media.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : media.imageUrl ? (
                  <Image
                    src={media.imageUrl}
                    alt={media.description}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    data-ai-hint={media.imageHint}
                  />
                ) : null}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

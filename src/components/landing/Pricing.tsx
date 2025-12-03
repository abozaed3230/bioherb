"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Check } from 'lucide-react';
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

const handleScrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export function Pricing() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].pricing;

  const pricingTiers = [
    {
      name: t.tiers[0].name,
      price: t.tiers[0].price,
      originalPrice: t.tiers[0].originalPrice,
      description: t.tiers[0].description,
      features: t.tiers[0].features,
      imageId: 'one-month-supply',
      cta: t.cta,
      popular: false,
    },
    {
      name: t.tiers[1].name,
      price: t.tiers[1].price,
      originalPrice: t.tiers[1].originalPrice,
      description: t.tiers[1].description,
      features: t.tiers[1].features,
      imageId: 'three-month-supply',
      cta: t.cta,
      popular: true,
    },
    {
      name: t.tiers[2].name,
      price: t.tiers[2].price,
      originalPrice: t.tiers[2].originalPrice,
      description: t.tiers[2].description,
      features: t.tiers[2].features,
      imageId: 'family-pack',
      cta: t.cta,
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
            {t.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {t.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {pricingTiers.map((tier) => {
            const tierImage = PlaceHolderImages.find((img) => img.id === tier.imageId);
            return (
              <Card
                key={tier.name}
                className={`flex flex-col rounded-2xl shadow-lg border-border/50 transform transition-transform duration-300 hover:scale-105 ${
                  tier.popular ? 'border-2 border-yellow-400 shadow-yellow-400/20' : 'bg-secondary/20'
                }`}
              >
                {tier.popular && (
                  <div className="bg-yellow-400 text-accent-foreground text-center py-2 font-bold rounded-t-xl">
                    {t.mostPopular}
                  </div>
                )}
                <CardHeader className="text-center p-6">
                  <CardTitle className="text-3xl font-headline text-primary">{tier.name}</CardTitle>
                  <CardDescription className="text-lg text-secondary-foreground/80 mt-2 h-16">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow items-center p-6 text-center">
                  {tierImage && (
                    <Image
                      src={tierImage.imageUrl}
                      alt={tier.name}
                      width={200}
                      height={200}
                      className="mb-6 object-contain h-48"
                      data-ai-hint={tierImage.imageHint}
                    />
                  )}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-extrabold text-primary">{tier.price}</span>
                    {tier.originalPrice && <span className="text-xl line-through text-muted-foreground">{tier.originalPrice}</span>}
                  </div>
                  <ul className="space-y-3 mb-8 text-right w-full">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center justify-end gap-3">
                        <span className="text-muted-foreground">{feature}</span>
                        <Check className="h-5 w-5 text-green-500" />
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => handleScrollTo('order')} size="lg" className="w-full mt-auto rounded-full shadow-lg h-14 text-xl bg-green-700 text-primary-foreground hover:bg-green-800">
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

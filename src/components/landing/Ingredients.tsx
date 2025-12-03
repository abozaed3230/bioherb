
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { useContext, useMemo } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export function Ingredients() {
    const { language } = useContext(LanguageContext)!;
    const t = translations[language].ingredients;

    const ingredients = useMemo(() => [
        {
          id: 'peppermint',
          name: t.peppermint.name,
          description: t.peppermint.description,
        },
        {
          id: 'ginger',
          name: t.ginger.name,
          description: t.ginger.description,
        },
        {
          id: 'chamomile',
          name: t.chamomile.name,
          description: t.chamomile.description,
        },
        {
          id: 'licorice',
          name: t.licorice.name,
          description: t.licorice.description,
        },
    ], [t]);


  return (
    <section id="ingredients" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
            {t.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {t.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((ingredient) => {
            const ingredientImage = PlaceHolderImages.find(img => img.id === ingredient.id);
            return (
              <Card key={ingredient.id} className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 border-none">
                {ingredientImage && (
                  <Image
                    src={ingredientImage.imageUrl}
                    alt={ingredient.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                    data-ai-hint={ingredientImage.imageHint}
                  />
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold font-headline text-primary mb-2">{ingredient.name}</h3>
                  <p className="text-muted-foreground">{ingredient.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

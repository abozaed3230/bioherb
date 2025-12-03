"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, UtensilsCrossed, Zap } from "lucide-react";
import { useContext, useMemo } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export function Tips() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].tips;
  
  const tips = useMemo(() => [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: t.tip1.title,
      description: t.tip1.description,
    },
    {
      icon: <UtensilsCrossed className="h-10 w-10 text-primary" />,
      title: t.tip2.title,
      description: t.tip2.description,
    },
    {
      icon: <Droplet className="h-10 w-10 text-primary" />,
      title: t.tip3.title,
      description: t.tip3.description,
    },
  ], [t]);

  return (
    <section id="tips" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
            {t.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-secondary-foreground/80 md:text-xl">
            {t.subtitle}
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-12 md:grid-cols-3">
          {tips.map((tip, index) => (
            <Card key={index} className="bg-background/70 backdrop-blur-sm shadow-lg text-center rounded-2xl border-border/50">
              <CardHeader className="flex flex-col items-center gap-4">
                {tip.icon}
                <CardTitle className="font-headline text-xl text-primary">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

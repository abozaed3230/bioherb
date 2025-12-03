"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, CupSoda, Smile } from "lucide-react";
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export function HowItWorks() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].howItWorks;

  const steps = [
    {
      icon: <ShoppingCart className="h-12 w-12 text-primary"/>,
      title: t.step1.title,
      description: t.step1.description,
    },
    {
      icon: <CupSoda className="h-12 w-12 text-primary"/>,
      title: t.step2.title,
      description: t.step2.description,
    },
    {
      icon: <Smile className="h-12 w-12 text-primary"/>,
      title: t.step3.title,
      description: t.step3.description,
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
              {t.title}
            </h2>
            <p className="max-w-[900px] text-secondary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full bg-background/70 backdrop-blur-sm shadow-lg text-center rounded-2xl border-border/50">
                 <CardHeader className="flex flex-col items-center gap-4">
                  {step.icon}
                </CardHeader>
                <CardContent className="space-y-2 pb-6">
                  <CardTitle className="font-headline text-2xl text-primary">{step.title}</CardTitle>
                  <p className="text-muted-foreground text-base px-2">{step.description}</p>
                </CardContent>
              </Card>
               {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 hidden md:block transform -translate-y-1/2">
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/20 rtl:rotate-180">
                    <path d="M13 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

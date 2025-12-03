"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf, ShieldCheck, Sparkles, Bug } from "lucide-react";
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export function Features() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].features;

  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: t.feature1.title,
      description: t.feature1.description,
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: t.feature2.title,
      description: t.feature2.description,
    },
    {
      icon: <Bug className="h-10 w-10 text-primary" />,
      title: t.feature3.title,
      description: t.feature3.description,
    },
    {
      icon: <Leaf className="h-10 w-10 text-primary" />,
      title: t.feature4.title,
      description: t.feature4.description,
    },
  ];
  
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
              {t.title}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border/50 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 text-center rounded-2xl">
              <CardHeader className="flex flex-col items-center gap-4">
                {feature.icon}
                <CardTitle className="font-headline text-xl text-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

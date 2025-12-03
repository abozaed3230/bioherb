"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, RotateCw } from "lucide-react";
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export function Trust() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].trust;

  return (
    <section id="trust" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/80 to-green-700 text-primary-foreground p-8 rounded-2xl shadow-2xl">
            <CardContent className="flex flex-col items-center text-center gap-6">
              <ShieldCheck className="h-20 w-20 text-yellow-300" />
              <h2 className="text-3xl font-bold font-headline">
                {t.title}
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-prose">
                {t.description}
              </p>
              <div className="flex items-center gap-3 mt-4 bg-black/20 px-4 py-2 rounded-full">
                <RotateCw className="h-5 w-5" />
                <span>{t.guarantee}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

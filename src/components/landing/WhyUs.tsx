"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Leaf, ShieldCheck, Zap } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export function WhyUs() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language];

  const principles = [
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: t.whyUs.principles[0].title,
      description: t.whyUs.principles[0].description,
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: t.whyUs.principles[1].title,
      description: t.whyUs.principles[1].description,
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: t.whyUs.principles[2].title,
      description: t.whyUs.principles[2].description,
    },
  ];

  return (
    <section id="why-us" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-right">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
              {t.whyUs.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.whyUs.description}
            </p>
          </div>
          <div className="space-y-8">
            {principles.map((principle, index) => (
              <Card key={index} className="bg-secondary/30 border-0 shadow-none">
                <CardContent className="flex items-center gap-6 p-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    {principle.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">{principle.title}</h3>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

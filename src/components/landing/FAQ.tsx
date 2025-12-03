"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useContext, useMemo } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export function FAQ() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].faq;

  const faqs = useMemo(() => [
    {
      question: t.q1.question,
      answer: t.q1.answer,
    },
    {
      question: t.q2.question,
      answer: t.q2.answer,
    },
    {
      question: t.q3.question,
      answer: t.q3.answer,
    },
    {
      question: t.q4.question,
      answer: t.q4.answer,
    },
  ], [t]);

  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            {t.title}
          </h2>
          <p className="mt-4 text-secondary-foreground/80 md:text-xl">
            {t.subtitle}
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background/80 backdrop-blur-sm rounded-lg shadow-lg border-border/50 px-4">
                <AccordionTrigger className="text-right font-headline text-lg hover:no-underline text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-right text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

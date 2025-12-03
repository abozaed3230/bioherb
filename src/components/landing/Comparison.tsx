"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export function Comparison() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].comparison;

  return (
    <section id="comparison" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
            {t.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-secondary-foreground/80 md:text-xl">
            {t.subtitle}
          </p>
        </div>
        <Card className="max-w-4xl mx-auto shadow-lg rounded-2xl overflow-hidden bg-background">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="p-6 font-headline text-xl text-primary">{t.table.feature}</th>
                    <th className="p-6 font-headline text-xl text-primary border-r border-l border-primary/20">BioHerb</th>
                    <th className="p-6 font-headline text-xl text-muted-foreground">{t.table.otherProducts}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-6 font-medium text-right">{t.table.rows[0].feature}</td>
                    <td className="p-6 border-r border-l border-primary/20">
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="h-6 w-6" />
                        <span>{t.table.rows[0].bioherb}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-center gap-2 text-red-500">
                        <XCircle className="h-6 w-6" />
                        <span>{t.table.rows[0].other}</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-6 font-medium text-right">{t.table.rows[1].feature}</td>
                    <td className="p-6 border-r border-l border-primary/20">
                       <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="h-6 w-6" />
                        <span>{t.table.rows[1].bioherb}</span>
                      </div>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center justify-center gap-2 text-red-500">
                        <XCircle className="h-6 w-6" />
                        <span>{t.table.rows[1].other}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 font-medium text-right">{t.table.rows[2].feature}</td>
                    <td className="p-6 border-r border-l border-primary/20">
                       <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="h-6 w-6" />
                        <span>{t.table.rows[2].bioherb}</span>
                      </div>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center justify-center gap-2 text-red-500">
                        <XCircle className="h-6 w-6" />
                        <span>{t.table.rows[2].other}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

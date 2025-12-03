"use client";

import Link from "next/link";
import { Instagram, Send, Phone, Mail, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export function Footer() {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].footer;

  const contactEmails = [
    { email: "support@bioherb-eg.com", text: t.emails.support },
    { email: "orders@bioherb-eg.com", text: t.emails.orders },
    { email: "partners@bioherb-eg.com", text: t.emails.business },
  ];

  return (
    <footer className="w-full bg-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div className="flex flex-col items-center md:items-end gap-4">
             <Link href="#hero" className="flex items-center gap-2">
                <span className="text-3xl font-bold font-headline">
                  BioHerb
                </span>
                <Leaf className="h-10 w-10" />
              </Link>
              <p className="max-w-xs text-primary-foreground/80">
                {t.tagline}
              </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <h3 className="text-xl font-bold mb-2">{t.contactUs}</h3>
            {contactEmails.map((contact, index) => (
              <a
                key={index}
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 justify-center md:justify-end text-primary-foreground/80 hover:text-white hover:underline transition-colors"
              >
                <span>{contact.text}: {contact.email}</span>
                <Mail className="h-5 w-5"/>
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <h3 className="text-xl font-bold mb-2">{t.followUs}</h3>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" asChild className="hover:bg-primary-foreground/10 rounded-full transition-transform hover:scale-110">
                <Link href="https://www.instagram.com/bioherb.1?igsh=MWc0M2JheGtocXd0bA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:bg-primary-foreground/10 rounded-full transition-transform hover:scale-110">
                <Link href="https://t.me/BioHerb1" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <Send className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col sm:flex-row-reverse items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" aria-label={t.privacyPolicy}>
              <span className="text-sm text-primary-foreground/80 hover:text-white transition-colors">{t.privacyPolicy}</span>
            </Link>
            <Link href="/terms-of-service" aria-label={t.termsOfService}>
              <span className="text-sm text-primary-foreground/80 hover:text-white transition-colors">{t.termsOfService}</span>
            </Link>
             <Link href="/refund-policy" aria-label={t.refundPolicy}>
              <span className="text-sm text-primary-foreground/80 hover:text-white transition-colors">{t.refundPolicy}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-primary/95 mt-8 py-4">
        <div className="container mx-auto px-4 md:px-6 text-center text-primary-foreground/90">
            <p className="flex items-center justify-center gap-2 text-sm font-medium">
                <span className="text-green-400">✅</span>
                <span>{t.registration}</span>
            </p>
            <p className="text-xs text-primary-foreground/70 mt-2">
                © {new Date().getFullYear()} BioHerb. {t.copyright}
            </p>
        </div>
      </div>
    </footer>
  );
}

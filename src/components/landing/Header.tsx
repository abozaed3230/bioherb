"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Leaf, Globe } from "lucide-react";
import React, { useState, useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage } = useContext(LanguageContext)!;
  const t = translations[language];

  const navLinks = [
    { name: t.navHome, href: "#hero" },
    { name: t.navBenefits, href: "#features" },
    { name: t.navWhyUs, href: "#why-us" },
    { name: t.navHowItWorks, href: "#how-it-works" },
    { name: t.navPricing, href: "#pricing" },
    { name: t.navTestimonials, href: "#testimonials" },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  React.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);


  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'border-b border-border/50 bg-background/80 backdrop-blur-sm shadow-sm' : 'border-b border-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={toggleLanguage} className="hidden md:flex">
            <Globe className="h-5 w-5" />
            <span className="sr-only">Change language</span>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t.openMenu}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? 'right' : 'left'} className="bg-background">
                <div className="grid gap-6 p-6">
                  <Link href="#hero" className="flex items-center gap-2">
                    <Leaf className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold font-headline text-primary">
                      BioHerb
                    </span>
                  </Link>
                  <nav className="grid gap-4">
                    {[...navLinks, { name: t.navOrderNow, href: "#order" }].map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-xl font-medium text-foreground/80 transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                   <Button variant="outline" onClick={toggleLanguage}>
                    <Globe className="mr-2 h-5 w-5" />
                    {language === 'ar' ? 'English' : 'العربية'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
           <div className="hidden md:block">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent/80 text-primary-foreground hover:from-primary/90 hover:to-accent/70 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
              <Link href="#order">{t.navOrderNow}</Link>
            </Button>
          </div>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Link href="#hero" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-headline text-primary">
            BioHerb
          </span>
          <Leaf className="h-8 w-8 text-primary" />
        </Link>
      </div>
    </header>
  );
}

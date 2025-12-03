"use client";

import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].scrollToTop;

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      aria-label={t.ariaLabel}
      className={cn(
        'fixed bottom-6 left-6 z-50 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110',
        'bg-primary/80 text-primary-foreground hover:bg-primary',
        'h-12 w-12',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
}

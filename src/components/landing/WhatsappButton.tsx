"use client";

import Link from "next/link";
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-8 w-8"
    fill="currentColor"
  >
    <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.7-.8.9-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.8-1.1-.7-.6-1.1-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.2.4-.4.1-.1.2-.2.2-.4.1-.1.1-.3 0-.4-.1-.1-1.5-1.8-1.7-2.3-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.2-.6.4-.2.2-.8.8-.8 1.9s.8 2.2 1 2.3c.1.1 1.5.7 3.5 2.5.5.4 1.2.7 1.6.9.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.5.2-1 .1-1.1l-.3-.1z M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
  </svg>
);

const TelegramIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="currentColor"
    >
      <path d="M21.854 2.147-1.146 9.646a.5.5 0 0 0 .025.938l7.93 3.18a2 2 0 0 1 1.11 1.11l3.18 7.93a.5.5 0 0 0 .937.025l6.5-19a.499.499 0 0 0-.635-.635Z" />
    </svg>
);

export function WhatsappButton({ phoneNumber, telegramUrl }: { phoneNumber: string, telegramUrl: string }) {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language].whatsapp;
  const message = t.message;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white rounded-full p-3 shadow-lg transform transition-transform duration-300 hover:scale-110 flex items-center justify-center"
          aria-label={t.ariaLabel}
        >
          <WhatsAppIcon />
        </Link>
        <Link
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0088cc] text-white rounded-full p-3 shadow-lg transform transition-transform duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Contact us on Telegram"
        >
          <TelegramIcon />
        </Link>
    </div>
  );
}

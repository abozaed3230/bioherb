"use client";

import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import { useContext, useEffect } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';

function AppContent({ children }: { children: React.ReactNode }) {
    const { language } = useContext(LanguageContext)!;

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    return (
        <>
            {children}
            <Toaster />
        </>
    );
}


export default function App({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <AppContent>{children}</AppContent>
        </LanguageProvider>
    );
}

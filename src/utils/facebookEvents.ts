'use client';

// دالة لتعقب الأحداث المخصصة
export const trackFacebookEvent = (
  eventName: string, 
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && typeof fbq !== 'undefined') {
    fbq('track', eventName, parameters);
  }
};

// أحداث جاهزة لاستخدامها
export const facebookEvents = {
  // أحداث التجارة الإلكترونية
  viewContent: (contentName?: string) => 
    trackFacebookEvent('ViewContent', contentName ? { content_name: contentName } : undefined),
  
  addToCart: (value?: number, currency?: string) => 
    trackFacebookEvent('AddToCart', { 
      value, 
      currency: currency || 'EGP' 
    }),
  
  initiateCheckout: (value?: number) => 
    trackFacebookEvent('InitiateCheckout', { value }),
  
  purchase: (value: number, currency = 'EGP') => 
    trackFacebookEvent('Purchase', { value, currency }),
  
  // أحداث التحويل
  lead: () => trackFacebookEvent('Lead'),
  
  contact: () => trackFacebookEvent('Contact'),
  
  submitApplication: () => trackFacebookEvent('SubmitApplication'),
  
  // تخصيص إضافي
  custom: (eventName: string, data?: any) => 
    trackFacebookEvent(eventName, data),
};

// مثال للاستخدام:
// facebookEvents.purchase(199, 'EGP');
// facebookEvents.lead();
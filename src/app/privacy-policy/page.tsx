import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية',
  description: 'تعرف على كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدامك لموقع وخدمات بايو هيرب.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary mb-8 text-center">
              سياسة الخصوصية
            </h1>
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed text-right">
              <p>
                نحن في BioHerb ("الموقع"، "نحن"، "لدينا") نلتزم بحماية خصوصية زوارنا وعملائنا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدامك لموقعنا الإلكتروني وخدماتنا.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">المعلومات التي نجمعها</h2>
              <p>
                نقوم بجمع معلومات تقدمها لنا مباشرة عند القيام بطلب شراء، وتشمل:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-5">
                <li>الاسم الكامل</li>
                <li>رقم الهاتف</li>
                <li>عنوان الشحن بالتفصيل</li>
              </ul>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">كيف نستخدم معلوماتك</h2>
              <p>
                نستخدم المعلومات التي نجمعها للأغراض التالية:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-5">
                <li>لمعالجة وتوصيل طلبك.</li>
                <li>للتواصل معك بخصوص طلبك وتأكيده.</li>
                <li>لتحسين خدماتنا وتجربة المستخدم.</li>
              </ul>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">مشاركة المعلومات</h2>
              <p>
                نحن لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية. قد نشارك معلوماتك فقط مع شركاء الشحن والتوصيل لإتمام عملية تسليم طلبك.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">أمن المعلومات</h2>
              <p>
                نتخذ إجراءات أمنية معقولة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو الإتلاف. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100%.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">التغييرات على سياسة الخصوصية</h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإعلامك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة. ننصحك بمراجعة هذه الصفحة بشكل دوري للاطلاع على أي تغييرات.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">اتصل بنا</h2>
              <p>
                إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معنا عبر البريد الإلكتروني: contact@bioherb.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

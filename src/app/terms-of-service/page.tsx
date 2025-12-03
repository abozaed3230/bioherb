import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شروط الخدمة',
  description: 'اقرأ شروط الخدمة التي تحكم استخدامك لموقع ومنتجات بايو هيرب. استخدامك للموقع يعني موافقتك على هذه الشروط.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary mb-8 text-center">
              شروط الخدمة
            </h1>
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed text-right">
              <p>
                مرحبًا بك في BioHerb. من خلال الوصول إلى موقعنا أو استخدامه، فإنك توافق على الالتزام بشروط الخدمة هذه ("الشروط"). إذا كنت لا توافق على هذه الشروط، فلا يجوز لك استخدام خدماتنا.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">1. استخدام الموقع</h2>
              <p>
                أنت توافق على استخدام الموقع فقط للأغراض المشروعة ووفقًا لهذه الشروط. لا يجوز لك استخدام موقعنا بأي طريقة قد تلحق الضرر بالموقع أو تعطل الوصول إليه.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">2. المنتجات والطلبات</h2>
              <p>
                جميع الطلبات المقدمة عبر الموقع تخضع للموافقة والتوافر. نحتفظ بالحق في رفض أو إلغاء أي طلب لأي سبب من الأسباب، بما في ذلك الأخطاء في الأسعار أو وصف المنتج. الأسعار قابلة للتغيير دون إشعار مسبق.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">3. الملكية الفكرية</h2>
              <p>
                المحتوى الموجود على هذا الموقع، بما في ذلك النصوص والرسومات والشعارات والصور، هو ملك لـ BioHerb ومحمي بموجب قوانين حقوق النشر والعلامات التجارية. لا يجوز لك نسخ أو توزيع أو تعديل أي جزء من المحتوى دون إذن كتابي مسبق منا.
              </p>
              
              <h2 className="text-2xl font-bold font-headline text-primary pt-4">4. إخلاء المسؤولية الطبية</h2>
               <p>
                المعلومات المقدمة على هذا الموقع هي لأغراض إعلامية فقط ولا تشكل بديلاً عن الاستشارة الطبية المتخصصة. منتج BioHerb هو مكمل غذائي طبيعي لدعم وظائف الجهاز الهضمي، وقد تم تقييم مكوناته من قبل هيئة سلامة الغذاء. نوصي دائمًا باستشارة مختص في الرعاية الصحية بخصوص حالتك الصحية.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">5. تحديد المسؤولية</h2>
              <p>
                إلى أقصى حد يسمح به القانون، لن يكون BioHerb مسؤولاً عن أي أضرار غير مباشرة أو عرضية أو خاصة تنشأ عن أو فيما يتعلق باستخدامك للموقع أو منتجاتنا.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">6. القانون الحاكم</h2>
              <p>
                تخضع هذه الشروط وتُفسر وفقًا لقوانين جمهورية مصر العربية، دون اعتبار لتعارضها مع أحكام القانون.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">7. التغييرات على الشروط</h2>
              <p>
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة. استمرارك في استخدام الموقع بعد نشر التغييرات يشكل موافقتك على الشروط المعدلة.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

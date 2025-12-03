import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسة الاسترجاع والاستبدال',
  description: 'اطلع على شروط وإجراءات الاسترجاع والاستبدال لمنتجات بايو هيرب. نضمن رضاك التام عن منتجاتنا.',
  robots: {
    index: true,
    follow: true,
  },
};


export default function RefundPolicyPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary mb-8 text-center">
              سياسة الاسترجاع والاستبدال
            </h1>
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed text-right">
              <p>
                رضاكم هو أولويتنا في BioHerb. إذا لم تكن راضيًا تمامًا عن عملية الشراء، فنحن هنا للمساعدة.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">شروط الاسترجاع</h2>
              <p>
                يحق للعميل استرجاع المنتج خلال **14 يومًا** من تاريخ استلام الطلب، بشرط استيفاء الشروط التالية:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-5">
                <li>أن يكون المنتج في حالته الأصلية، غير مستخدم، وفي عبوته الأصلية محكمة الإغلاق.</li>
                <li>أن يتم تقديم فاتورة الشراء الأصلية (أو إثبات الشراء).</li>
                <li>المنتجات التي تم فتحها أو استخدامها غير قابلة للاسترجاع حفاظًا على الصحة العامة والسلامة.</li>
              </ul>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">شروط الاستبدال</h2>
              <p>
                يمكن استبدال المنتج بمنتج آخر خلال **14 يومًا** من تاريخ الشراء في الحالات التالية:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-5">
                <li>إذا كان المنتج يحتوي على عيب في التصنيع.</li>
                <li>إذا تم استلام منتج خاطئ عن طريق الخطأ.</li>
                <li>يجب أن يكون المنتج المراد استبداله في عبوته الأصلية ولم يتم فتحه.</li>
              </ul>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">إجراءات الاسترجاع والاستبدال</h2>
              <p>
                1. تواصل مع فريق خدمة العملاء لدينا عبر الهاتف على الرقم 01040757693 أو عبر البريد الإلكتروني contact@bioherb.com لتقديم طلب الاسترجاع أو الاستبدال.
                <br/>
                2. يرجى تزويدنا برقم الطلب وتفاصيل المنتج وسبب الاسترجاع/الاستبدال.
                <br/>
                3. بعد الموافقة على الطلب، سيتم ترتيب عملية استلام المنتج منك.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">استرداد المبلغ</h2>
              <p>
                بمجرد استلام المنتج المرتجع وفحصه، سنقوم بإعلامك بحالة طلبك. في حال تمت الموافقة، سيتم إعادة المبلغ بنفس طريقة الدفع الأصلية خلال 7-14 يوم عمل. يتحمل العميل تكاليف الشحن الخاصة بالاسترجاع ما لم يكن الخطأ من جانبنا.
              </p>

              <h2 className="text-2xl font-bold font-headline text-primary pt-4">ملاحظات هامة</h2>
              <p>
                لا يمكن استرجاع أو استبدال المنتجات التي تم شراؤها خلال فترة العروض والتخفيضات إلا في حالة وجود عيب في التصنيع.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

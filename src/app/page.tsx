
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { OrderForm } from "@/components/landing/OrderForm";
import { Footer } from "@/components/landing/Footer";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FAQ } from "@/components/landing/FAQ";
import { Pricing } from "@/components/landing/Pricing";
import { WhyUs } from "@/components/landing/WhyUs";
import { Comparison } from "@/components/landing/Comparison";
import { Lifestyle } from "@/components/landing/Lifestyle";
import { Trust } from "@/components/landing/Trust";
import { WhatsappButton } from "@/components/landing/WhatsappButton";
import { Tips } from "@/components/landing/Tips";
import { ScrollToTopButton } from "@/components/landing/ScrollToTopButton";


export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <WhyUs />
        <HowItWorks />
        <Comparison />
        <Lifestyle />
        <Pricing />
        <Testimonials />
        <Trust />
        <Tips />
        <FAQ />
        <OrderForm />
      </main>
      <Footer />
      <WhatsappButton phoneNumber="201040757693" telegramUrl="https://t.me/BioHerb1" />
      <ScrollToTopButton />
    </div>
  );
}

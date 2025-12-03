"use client";

import React, { useContext, useMemo, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LanguageContext } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1" dir="ltr" aria-label={`rating ${rating} of 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-accent fill-accent" : "text-muted-foreground/30"
        }`}
      />
    ))}
  </div>
);

export function Testimonials() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const { language } = useContext(LanguageContext)!;

  const t = translations[language].testimonials;

  // كل الـ avatars المتاحة (avatar1, avatar2, …)
  const avatarIds = useMemo(
    () =>
      PlaceHolderImages
        .filter((img) => typeof img.id === "string" && img.id.toLowerCase().startsWith("avatar"))
        .map((img) => img.id),
    []
  );
  const fallbackAvatarIds = avatarIds.length ? avatarIds : ["avatar1"];

  // نجمع أي عنصر يحتوي name و quote غير فاضيين ونرتّبهم بالأرقام لو موجودة
  const testimonials = useMemo(() => {
    const entries = Object.entries(t).filter(([, v]) => {
      if (!v || typeof v !== "object") return false;
      const obj = v as Record<string, unknown>;
      const name = typeof obj.name === "string" ? obj.name.trim() : "";
      const quote = typeof obj.quote === "string" ? obj.quote.trim() : "";
      return !!name && !!quote;
    });

    entries.sort((a, b) => {
      const na = parseInt(a[0].replace(/\D/g, ""), 10) || 0;
      const nb = parseInt(b[0].replace(/\D/g, ""), 10) || 0;
      return na - nb;
    });

    return entries.map(([key, v], i) => {
      const obj = v as Record<string, unknown>;
      const name = typeof obj.name === "string" ? obj.name : "";
      const quote = typeof obj.quote === "string" ? obj.quote : "";

      const n = parseInt(key.replace(/\D/g, ""), 10) || i + 1;
      const preferredId = `avatar${n}`;
      const avatarId = avatarIds.includes(preferredId)
        ? preferredId
        : fallbackAvatarIds[i % fallbackAvatarIds.length];

      return { name, quote, avatarId, rating: 5 };
    });
  }, [t, avatarIds, fallbackAvatarIds]);

  if (!testimonials.length) {
    return (
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            {t.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t.subtitle}</p>
          <p className="text-muted-foreground">
            {language === "ar" ? "لا توجد آراء متاحة حالياً." : "No reviews available yet."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            {t.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t.subtitle}</p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
          className="w-full max-w-4xl mx-auto mt-12"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const avatar = PlaceHolderImages.find((img) => img.id === testimonial.avatarId);
              return (
                <CarouselItem key={`${testimonial.name}-${index}`}>
                  <div className="p-4 h-full">
                    <Card className="h-full flex flex-col justify-between shadow-lg rounded-2xl border-border/50 bg-secondary">
                      <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                        <Avatar className="w-24 h-24 border-4 border-primary/50">
                          {avatar?.imageUrl ? (
                            <AvatarImage
                              src={avatar.imageUrl}
                              alt={testimonial.name}
                              data-ai-hint={avatar.imageHint}
                            />
                          ) : null}
                          <AvatarFallback>{testimonial.name?.charAt(0) ?? "U"}</AvatarFallback>
                        </Avatar>

                        <p className="text-xl font-bold font-headline text-primary">
                          {testimonial.name}
                        </p>
                        <StarRating rating={testimonial.rating} />

                        <blockquote className="text-secondary-foreground text-lg mt-2 max-w-prose">
                          “{testimonial.quote}”
                        </blockquote>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-[-1rem] md:left-[-2rem] bg-background/50 hover:bg-background" />
          <CarouselNext className="right-[-1rem] md:right-[-2rem] bg-background/50 hover:bg-background" />
        </Carousel>
      </div>
    </section>
  );
}

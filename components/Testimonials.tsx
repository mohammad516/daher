"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  order: number;
};

type TestimonialsProps = {
  testimonials: Testimonial[];
  testimonialsAr?: Testimonial[];
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

export default function Testimonials({ testimonials: dbTestimonialsEn, testimonialsAr: dbTestimonialsAr, sc: scEn, scAr = {} }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isAr } = useLanguage();

  const sc = isAr ? scAr : scEn;
  const dbTestimonials = isAr ? (dbTestimonialsAr || dbTestimonialsEn) : dbTestimonialsEn;

  // DB for EN, static for AR (or DB if scAr has it)
  const sectionTitle = sc["testimonials.title"] || t.testimonials.title;

  const items =
    dbTestimonials && dbTestimonials.length > 0
      ? dbTestimonials
      : t.testimonials.items;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll("[data-animate]") || [];
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="bg-[#f2f1eb] py-20 lg:py-28 text-[#111827]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className={`mb-14 ${isAr ? "text-right" : ""}`}>
          <h2 data-animate className="text-3xl sm:text-4xl font-bold text-[#1f2937] opacity-0 tracking-tight">
            {sectionTitle}
          </h2>
        </div>

        {/* Testimonials List */}
        <div className="flex flex-col">
          {items.map((item, index) => (
            <div
              key={index}
              data-animate
              className="flex flex-col opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <p className={`text-[15px] sm:text-base leading-relaxed text-[#4b5563] mb-5 ${isAr ? "text-right" : ""}`}>
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className={`text-[14px] text-[#4b5563] mb-8 ${isAr ? "text-right" : ""}`}>
                {item.name}, {item.role}
              </p>
              {/* Divider line */}
              <div className="w-full h-px bg-[#1f2937] mb-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

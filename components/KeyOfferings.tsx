"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef } from "react";

type MaintenancePlan = {
  id: string;
  title: string;
  features: string[];
  order: number;
};

type KeyOfferingsProps = {
  plans: MaintenancePlan[];
  plansAr?: MaintenancePlan[];
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

export default function KeyOfferings({ plans: dbPlansEn, plansAr: dbPlansAr, sc: scEn, scAr = {} }: KeyOfferingsProps) {
  const { t, isAr } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const sc = isAr ? scAr : scEn;
  const dbPlans = isAr ? (dbPlansAr || dbPlansEn) : dbPlansEn;

  const sectionTitle = sc["maintenance.title"] || t.maintenancePlans?.title || "Maintenance Plans";

  // Use DB plans for EN, fall back to static translations
  const plans =
    dbPlans && dbPlans.length > 0
      ? dbPlans
      : (t.maintenancePlans?.items || []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll("[data-animate]") || [];
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [isAr]);

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="py-20 lg:py-24 bg-[#F2F0EA] text-[#111827]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          data-animate
          className={`text-3xl md:text-4xl font-bold mb-16 opacity-0 ${isAr ? "text-right" : "text-left"}`}
        >
          {sectionTitle}
        </h2>

        <div className={`grid md:grid-cols-3 gap-12 ${isAr ? "text-right" : "text-left"}`}>
          {plans.map((item: any, i: number) => (
            <div
              key={item.id || item.title || i}
              data-animate
              className="opacity-0 bg-white p-8 rounded-2xl shadow-sm flex flex-col h-full hover:shadow-md transition-shadow"
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: "forwards" }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[#3C4BA1]">
                {item.title}
              </h3>
              <ul className="text-gray-600 leading-relaxed text-sm md:text-base space-y-3 list-none flex-grow">
                {(item.features || []).map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#538DD3] mt-1 text-lg leading-none">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

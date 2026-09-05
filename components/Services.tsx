"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Service = {
  id: string;
  title: string;
  desc: string;
  features: string[];
  image: string;
  order: number;
};

type ServicesProps = {
  services: Service[];
  servicesAr?: Service[];
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

const FALLBACK_IMAGES = [
  "/her1.png", "/her2.png", "/herr3.png", "/her1.png",
];

export default function Services({ services: dbServicesEn, servicesAr: dbServicesAr, sc: scEn, scAr = {} }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isAr } = useLanguage();

  const sc = isAr ? scAr : scEn;
  const dbServices = isAr ? (dbServicesAr || dbServicesEn) : dbServicesEn;

  // DB content for EN, static for AR (or DB if scAr has it)
  const sectionTitle = sc["services.title"] || t.services.title;
  const subtitle = sc["services.subtitle"] || t.services.subtitle;
  const viewMore = sc["services.view_more"] || t.services.viewMore;
  const viewLess = sc["services.view_less"] || t.services.viewLess;
  const ourProjects = sc["services.our_projects"] || t.services.ourProjects;

  // Use DB services for EN, fall back to static translations mapped with fallback images
  const services =
    dbServices && dbServices.length > 0
      ? dbServices.map((s, i) => ({
          title: s.title,
          desc: s.desc,
          features: s.features,
          image: s.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
        }))
      : t.services.items.map((item, i) => ({
          ...item,
          image: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
        }));

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
    <section id="services" ref={sectionRef} className="bg-[#f2f1eb] py-24 lg:py-32 text-[#111827]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className={`mb-14 ${isAr ? "text-right" : ""}`}>
          <h2 data-animate className="text-4xl sm:text-5xl font-extrabold text-[#1f2937] mb-3 opacity-0 tracking-tight">
            {sectionTitle}
          </h2>
          <p data-animate className="text-[15px] font-medium text-[#6b7280] opacity-0 animation-delay-100">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-14">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                data-animate
                className="flex flex-col opacity-0 group"
                style={{ animationDelay: `${(index % 3) * 150}ms` }}
              >
                {/* Image */}
                <div className="relative w-full aspect-[3/4] mb-7 overflow-hidden bg-gray-200">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className={`text-center px-2 flex flex-col flex-1 ${isAr ? "text-right" : ""}`}>
                  <h3 className="text-lg font-bold text-[#1f2937] mb-3">{service.title}</h3>
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-1 text-[#538DD3] opacity-50 cursor-not-allowed text-sm font-semibold"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Our Projects Button */}
        <div data-animate className="mt-16 text-center opacity-0 animation-delay-200">
          <a
            href="/projects"
            className="inline-flex items-center justify-center gap-2 bg-[#538DD3] hover:bg-[#457bb8] text-white font-bold px-10 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#538DD3]/30 hover:-translate-y-1"
          >
            {ourProjects}
            <span className={`text-xl ${isAr ? "rotate-180" : ""}`}>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

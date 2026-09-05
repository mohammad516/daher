"use client";

import { useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

type FounderProps = {
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

export default function Founder({ sc: scEn, scAr = {} }: FounderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isAr } = useLanguage();

  const sc = isAr ? scAr : scEn;

  // DB content for EN, static for AR (or DB if scAr has it)
  const f = t.founder;
  const title = sc["founder.title"] || f.title;
  const p1 = sc["founder.p1"] || `${f.p1a}${f.p1b}${f.p1c}`;
  const p2 = sc["founder.p2"] || `${f.p2a}${f.p2b}${f.p2c}`;
  const p3 = sc["founder.p3"] || `${f.p3a}${f.p3b}${f.p3c}`;
  const founderName = sc["founder.name"] || f.founderName;
  const founderRole = sc["founder.role"] || f.founderRole;
  const founderImage = sc["founder.image"] || "/image2.png";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const animClass = el.dataset.animateClass || "animate-fade-in-up";
            el.classList.add(animClass);
            el.classList.remove("opacity-0");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );
    const elements = sectionRef.current?.querySelectorAll("[data-animate]") || [];
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white section-divider overflow-hidden relative"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#3C4BA1]/4 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#538DD3]/6 rounded-full blur-3xl translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-20 items-center ${isAr ? "lg:flex lg:flex-row-reverse" : ""}`}>

          {/* ── Image Column ── */}
          <div
            data-animate
            data-animate-class="animate-fade-in-left"
            className="relative opacity-0"
          >
            {/* Main photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={founderImage}
                alt="Mustapha Daher Center Founder"
                className="w-full h-[480px] sm:h-[540px] object-cover object-top"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629]/40 via-transparent to-transparent" />
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#3C4BA1]/10 to-[#538DD3]/5 rounded-3xl -z-10 blur-2xl" />
          </div>

          {/* ── Text Column ── */}
          <div className={`flex flex-col justify-center ${isAr ? "lg:pr-8 text-right" : "lg:pl-8"}`}>

            {/* Title */}
            <h2
              data-animate
              className="text-4xl sm:text-5xl font-extrabold text-[#0f1629] mb-8 opacity-0 animation-delay-100 leading-tight"
            >
              {title}
            </h2>

            {/* Body paragraphs */}
            <div data-animate className="space-y-5 opacity-0 animation-delay-200">
              <p className="text-[15px] sm:text-base leading-relaxed text-[#4b5563]">{p1}</p>
              <p className="text-[15px] sm:text-base leading-relaxed text-[#4b5563]">{p2}</p>
              <p className="text-[15px] sm:text-base leading-relaxed text-[#4b5563]">{p3}</p>
            </div>

            {/* Signature / attribution */}
            <div data-animate className="opacity-0 animation-delay-400 mt-10 pt-8 border-t border-gray-100">
              <div className={`flex items-center gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3C4BA1] to-[#2d3a8c] flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div className={isAr ? "text-right" : ""}>
                  <p className="font-bold text-[#0f1629] text-lg">{founderName}</p>
                  <p className="text-sm text-gray-500 font-medium">{founderRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

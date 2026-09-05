"use client";

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type AboutProps = {
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

export default function About({ sc: scEn, scAr = {} }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, isAr } = useLanguage();

  const sc = isAr ? scAr : scEn;

  // DB content for EN, static translations for AR (or DB if scAr has it)
  const title = sc["about.title"] || t.about.title;
  const p1 = sc["about.p1"] || t.about.p1;
  const p2 = sc["about.p2"] || t.about.p2;
  const p3 = sc["about.p3"] || t.about.p3;
  const p4 = sc["about.p4"] || t.about.p4;
  const readMore = sc["about.read_more"] || t.about.readMore;
  const readLess = sc["about.read_less"] || t.about.readLess;
  const yearsLabel = sc["about.years_label"] || t.about.yearsLabel;
  const excellenceLabel = sc["about.excellence_label"] || t.about.excellenceLabel;
  const mainImage = sc["about.image"] || "/herr3.png";
  const secondaryImage = sc["about.image_secondary"] || "/small.png";

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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll("[data-animate]") || [];
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#f2f1eb] section-divider overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image Stack */}
          <div
            data-animate
            data-animate-class="animate-fade-in-left"
            className={`relative opacity-0 ${isAr ? "lg:order-last" : ""}`}
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl img-overlay">
              <img
                src={mainImage}
                alt="Mustapha Daher Center professional engineer with solar panels"
                className="w-full h-[420px] sm:h-[480px] object-cover object-top"
              />
              {/* Experience badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl animate-float z-20">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#538DD3] leading-none">20+</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">{yearsLabel}<br />{excellenceLabel}</div>
              </div>
            </div>

            {/* Floating secondary image */}
            <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 w-36 h-36 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white animate-float z-10 bg-white/95 backdrop-blur-sm p-2">
              <img
                src={secondaryImage}
                alt="Solar energy planning consultation"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#3C4BA1]/10 to-transparent rounded-3xl -z-10 blur-2xl" />
          </div>

          {/* ── Text Content ── */}
          <div className={`flex flex-col justify-center lg:pl-8 ${isAr ? "lg:pr-8 lg:pl-0 text-right lg:order-first" : ""}`}>
            <h2
              data-animate
              data-animate-class="animate-fade-in-up"
              className="text-3xl sm:text-4xl font-bold text-[#1f2937] mb-8 opacity-0 tracking-tight leading-snug lg:whitespace-nowrap"
            >
              {title}
            </h2>

            <div
              data-animate
              data-animate-class="animate-fade-in-up"
              className="opacity-0 animation-delay-200 space-y-4"
            >
              <p className="text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
                <strong className="text-[#0f1629]">{p1} {p2}</strong>
              </p>
            </div>

            <div
              data-animate
              data-animate-class="animate-fade-in-up"
              className="opacity-0 animation-delay-400 mt-8"
            >
              <a
                href="/about"
                className="inline-block bg-[#538DD3] hover:bg-[#457bb8] text-white font-semibold px-8 py-3 rounded-full text-sm transition-colors"
              >
                {readMore}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

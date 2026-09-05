"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Phone, MapPin, ArrowRight, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type HeroSlide = {
  id: string;
  headline: string;
  highlight: string;
  sub: string;
  image: string;
  order: number;
};

type HeroProps = {
  slides: HeroSlide[];
  slidesAr?: HeroSlide[];
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

// Fallback images if DB slides have no image set
const FALLBACK_IMAGES = ["/image5.png", "/image3.png", "/image4.png"];

export default function Hero({ slides: dbSlidesEn, slidesAr: dbSlidesAr, sc: scEn, scAr = {} }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { t, isAr } = useLanguage();

  const sc = isAr ? scAr : scEn;
  const dbSlides = isAr ? (dbSlidesAr || dbSlidesEn) : dbSlidesEn;

  // Use DB slides if available, otherwise fall back to static translations
  const slides =
    dbSlides && dbSlides.length > 0
      ? dbSlides.map((s, i) => ({
          headline: s.headline,
          highlight: s.highlight,
          sub: s.sub,
          image: s.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
        }))
      : t.hero.slides.map((s, i) => ({
          ...s,
          image: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
        }));

  // Fallbacks using SC (which is already `scAr` or `scEn`)
  const badge = sc["hero.badge"] || t.hero.badge;
  const phone = sc["hero.phone"] || "+961 3 581 180";
  const location = sc["hero.location"] || t.hero.location;
  const discoverServices = sc["hero.cta_services"] || t.hero.discoverServices;

  const stats = [
    { value: sc["hero.stat1_value"] || "500+", label: sc["hero.stat1_label"] || t.hero.stats[0].label },
    { value: sc["hero.stat2_value"] || "20+",  label: sc["hero.stat2_label"] || t.hero.stats[1].label },
    { value: sc["hero.stat3_value"] || "3h",   label: sc["hero.stat3_label"] || t.hero.stats[2].label },
    { value: sc["hero.stat4_value"] || "24/7", label: sc["hero.stat4_label"] || t.hero.stats[3].label },
  ];

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goTo = (i: number) => {
    setCurrent(i);
    startAutoPlay();
  };

  const slide = slides[current];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* ── Background Slides ── */}
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${s.image}')`,
              opacity: i === current ? 1 : 0,
              transform: i === current ? "scale(1.04)" : "scale(1)",
              transition: "opacity 1.2s ease, transform 7s ease",
            }}
          />
        ))}

        {/* ── Overlays ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1629]/70 via-[#0f1629]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629]/55 via-transparent to-transparent" />
        <div className="absolute inset-0 dot-pattern opacity-15" />

        {/* ── Decorative rings (desktop only) ── */}
        <div className="absolute right-[6%] top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none opacity-30">
          <div className="w-[480px] h-[480px] rounded-full border border-white/10 animate-spin-slow" style={{ animationDuration: "30s" }} />
          <div className="absolute inset-10 rounded-full border border-white/8 animate-spin-slow" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
        </div>

        {/* ── Main Content ── */}
        <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-44 ${isAr ? "text-right" : ""}`}>
          <div className="max-w-2xl">

            {/* Badge */}
            <div
              className="section-badge mb-7 opacity-0 animate-fade-in-up"
              style={{
                animationDelay: "0.1s",
                animationFillMode: "forwards",
                background: "rgba(60, 75, 161, 0.25)",
                borderColor: "rgba(99, 102, 241, 0.45)",
                color: "#c7d2fe",
              }}
            >
              <Zap size={11} className="fill-current text-[#a5b4fc]" />
              {badge}
            </div>

            {/* Headline */}
            <h1
              key={`h-${current}`}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] mb-5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              {slide.headline}
              <br />
              <span className="gradient-text-light">{slide.highlight}</span>
            </h1>

            {/* Sub-text */}
            <p
              key={`sub-${current}`}
              className="text-white/85 text-base sm:text-lg max-w-lg mb-9 leading-relaxed opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.28s", animationFillMode: "forwards" }}
            >
              {slide.sub}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-3 mb-6 opacity-0 animate-fade-in-up ${isAr ? "flex-row-reverse" : ""}`}
              style={{ animationDelay: "0.42s", animationFillMode: "forwards" }}
            >
              <button
                onClick={() => scrollTo("#services")}
                className="btn-glow group flex items-center gap-2 bg-[#538DD3] hover:bg-[#457bb8] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-[#538DD3]/40 hover:-translate-y-0.5"
              >
                {discoverServices}
                <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${isAr ? "rotate-180" : ""}`} />
              </button>

              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 border border-white/20 hover:border-[#3C4BA1]/60 hover:bg-white/8 hover:text-[#a5b4fc]"
              >
                <Phone size={15} />
                <span dir="ltr">{phone}</span>
              </a>
            </div>

            {/* Location */}
            <p
              className={`flex items-center gap-2 text-white/60 text-xs opacity-0 animate-fade-in-up ${isAr ? "flex-row-reverse" : ""}`}
              style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
            >
              <MapPin size={13} className="text-[#a5b4fc]" />
              {location}
            </p>
          </div>
        </div>

        {/* ── Stats Bar (pinned to bottom) ── */}
        <div
          className="absolute bottom-14 left-0 right-0 z-10 px-6 sm:px-8 lg:px-12 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="glass rounded-2xl px-6 py-4 inline-flex items-center gap-8 sm:gap-12">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-white leading-none">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Slide Dots ── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-500 ${
                i === current
                  ? "w-8 h-2 bg-[#538DD3]"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Scroll Arrow ── */}
        <button
          onClick={() => scrollTo("#about")}
          className="absolute bottom-5 right-6 text-white/35 hover:text-[#538DD3] transition-colors animate-bounce z-10"
          aria-label="Scroll down"
        >
          <ArrowDown size={22} />
        </button>
      </section>
    </>
  );
}

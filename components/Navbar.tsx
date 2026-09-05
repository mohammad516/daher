"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import LangToggle from "./GoogleTranslate";
import { useLanguage } from "@/context/LanguageContext";

type NavbarProps = {
  logoUrl?: string;
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

export default function Navbar({ logoUrl, sc: scEn, scAr = {} }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { t, isAr } = useLanguage();

  const sc = isAr ? scAr : scEn;

  // DB for EN, static for AR (or DB if scAr has it)
  const logo = logoUrl || "/daher.png";
  const navLabels = {
    about: sc["nav.about"] || t.nav.about,
    services: sc["nav.services"] || t.nav.services,
    products: sc["nav.products"] || t.nav.products,
    testimonials: sc["nav.testimonials"] || t.nav.testimonials,
    projects: sc["nav.projects"] || t.nav.projects || "Projects",
    contact: sc["nav.contact"] || t.nav.contact,
    getQuote: sc["nav.get_quote"] || t.nav.getQuote,
  };

  const navLinks = [
    { label: navLabels.about,        href: "#about" },
    { label: navLabels.services,     href: "#services" },
    { label: navLabels.products,     href: "#products" },
    { label: navLabels.projects,     href: "/projects" },
    { label: navLabels.testimonials, href: "#testimonials" },
    { label: navLabels.contact,      href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "about", "services", "testimonials", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (window.location.pathname !== "/") {
        window.location.href = `/${href}`;
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-20 lg:h-28 ${isAr ? "flex-row-reverse" : ""}`}>

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleClick("#home"); }}
            className="flex items-center group flex-shrink-0 lg:ms-6 xl:ms-10"
          >
            <div className="relative flex items-center justify-center">
              <img
                src={logo}
                alt="Daher"
                className={`h-14 lg:h-16 w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
                  !scrolled ? "brightness-0 invert drop-shadow-md opacity-95" : ""
                }`}
              />
            </div>
          </a>

          {/* Right Section: Nav + CTA */}
          <div className={`hidden lg:flex items-center gap-5 ${isAr ? "flex-row-reverse" : ""}`}>
            {/* Desktop Nav */}
            <nav className={`flex items-center gap-1 ${isAr ? "flex-row-reverse" : ""}`}>
            {navLinks.map((link) => {
              const id = link.href.startsWith("#") ? link.href.replace("#", "") : link.href.replace("/", "");
              const isActive = active === id || (typeof window !== "undefined" && window.location.pathname === link.href);
              const isDisabled = link.href === "/projects";
              return isDisabled ? (
                <span
                  key={link.href}
                  className={`relative flex items-center gap-1 px-3 lg:px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg cursor-not-allowed opacity-40 ${
                    scrolled ? "text-gray-400" : "text-white/40"
                  }`}
                >
                  {link.label}
                </span>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  className={`relative flex items-center gap-1 px-3 lg:px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${
                    isActive
                      ? scrolled
                        ? "text-[#3C4BA1] bg-[#F0F3FA]"
                        : "text-white bg-white/10"
                      : scrolled
                      ? "text-gray-600 hover:text-[#3C4BA1] hover:bg-[#F0F3FA]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {(link.href === "#services" || link.href === "#products") && (
                    <ChevronDown size={14} className="opacity-70" />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3C4BA1] rounded-full" />
                  )}
                </a>
              );
            })}
            </nav>

            {/* Divider Line */}
            <div className={`w-px h-8 ${scrolled ? "bg-gray-300" : "bg-white/20"}`}></div>

            {/* Desktop CTA */}
            <div className={`flex items-center gap-5 ${isAr ? "flex-row-reverse" : ""}`}>
            <a
              href="tel:+9613581180"
              className={`flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                scrolled ? "text-gray-600 hover:text-[#3C4BA1]" : "text-white/70 hover:text-white"
              }`}
            >
              <Phone size={15} />
              <span dir="ltr">+961 3 581 180</span>
            </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleClick("#contact"); }}
                className="flex items-center gap-2 bg-[#538DD3] hover:bg-[#457bb8] text-white whitespace-nowrap px-4 lg:px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-[#538DD3]/30 hover:-translate-y-0.5"
              >
                {navLabels.getQuote}
                <ArrowRight size={16} className={isAr ? "rotate-180" : ""} />
              </a>
              <LangToggle scrolled={scrolled} />
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <LangToggle scrolled={scrolled} />
            <button
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X size={22} className={scrolled ? "text-[#0f1629]" : "text-white"} />
              ) : (
                <Menu size={22} className={scrolled ? "text-[#0f1629]" : "text-white"} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-2xl animate-fade-in">
          <nav className={`max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1 ${isAr ? "items-end" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                className={`px-4 py-3 text-[#0f1629] hover:text-[#3C4BA1] hover:bg-[#F0F3FA] rounded-xl transition-colors text-sm font-medium w-full ${isAr ? "text-right" : ""}`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 mt-2 flex flex-col gap-2">
              <a
                href="tel:+9613581180"
                className="flex items-center gap-2 px-4 py-3 text-gray-600 text-sm font-medium"
              >
                <Phone size={15} />
                <span dir="ltr">+961 6 610061</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleClick("#contact"); }}
                className="bg-[#538DD3] hover:bg-[#457bb8] text-white px-6 py-3.5 rounded-xl text-sm font-bold text-center transition-all"
              >
                {navLabels.getQuote}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

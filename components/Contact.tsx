"use client";

import { useRef, useEffect, useState } from "react";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type ContactProps = {
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

export default function Contact({ sc: scEn, scAr = {} }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const { t, isAr } = useLanguage();

  const sc = isAr ? scAr : scEn;

  // DB for EN, static for AR (or DB if scAr has it)
  const badge = sc["contact.badge"] || t.contact.badge;
  const title = sc["contact.title"] || t.contact.title;
  const titleHighlight = sc["contact.title_highlight"] || t.contact.titleHighlight;
  const subtitle = sc["contact.subtitle"] || t.contact.subtitle;
  const emergencyLine = sc["contact.emergency_label"] || t.contact.emergencyLine;
  const needHelp = sc["contact.need_help"] || t.contact.needHelp;
  const phone = sc["contact.phone"] || "+961 3 581 180";
  const email = sc["contact.email"] || "dahercenter@gmail.com";
  const address = sc["contact.address"] || "Daher Bldg., Régie area, behind the WHITE petrol station, Ghazieh, South Lebanon";
  const supportHours = sc["contact.support_hours"] || t.contact.cards[3]?.value || "24/7 — We're always here for you";
  const formSend = sc["contact.form_send"] || t.contact.form?.send || "Send Message";
  const formThankYou = sc["contact.form_thankyou"] || t.contact.form?.thankYou || "Thank You!";
  const formReceived = sc["contact.form_received"] || t.contact.form?.received || "We'll be in touch soon.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.08 }
    );
    const elements = sectionRef.current?.querySelectorAll("[data-animate]") || [];
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactIconBgs = ["bg-[#3C4BA1]", "bg-[#538DD3]", "bg-[#3C4BA1]", "bg-[#538DD3]"];
  const contactHrefs = [`tel:${phone.replace(/\s/g, "")}`, `mailto:${email}`, "#", "#"];
  const contactIcons = [Phone, Mail, MapPin, Clock];

  // Build contact cards from DB data
  const cards = [
    { label: isAr ? "هاتف" : "Phone",    value: phone },
    { label: isAr ? "بريد" : "Email",    value: email },
    { label: isAr ? "عنوان" : "Address", value: address },
    { label: isAr ? "دعم" : "Support",   value: supportHours },
  ];

  const contactCards = cards.map((card: any, i: number) => ({
    ...card,
    icon: contactIcons[i],
    iconBg: contactIconBgs[i],
    href: contactHrefs[i],
  }));

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white section-divider overflow-hidden relative"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3C4BA1]/4 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3C4BA1]/4 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div data-animate className="section-badge mb-6 opacity-0 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3C4BA1] inline-block" />
            {badge}
          </div>
          <h2 data-animate className="text-4xl sm:text-5xl font-extrabold text-[#0f1629] mb-4 opacity-0 animation-delay-100">
            {title}{" "}
            <span className="gradient-text">{titleHighlight}</span>
          </h2>
          <p data-animate className="text-lg text-gray-500 leading-relaxed opacity-0 animation-delay-200">
            {subtitle}
          </p>
        </div>

        {/* Emergency Banner */}
        <div data-animate className="relative overflow-hidden rounded-2xl mb-16 opacity-0 animation-delay-300">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3C4BA1] to-[#2d3a8c]" />
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className={`relative z-10 p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 ${isAr ? "sm:flex-row-reverse text-right" : ""}`}>
            <div>
              <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-1">{emergencyLine}</p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">{needHelp}</h3>
            </div>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={`btn-glow flex items-center gap-3 bg-white text-[#3C4BA1] font-bold px-8 py-4 rounded-xl text-lg transition-all hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5 flex-shrink-0 group ${isAr ? "flex-row-reverse" : ""}`}
            >
              <Phone size={20} />
              <span dir="ltr">{phone}</span>
              <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${isAr ? "rotate-180" : ""}`} />
            </a>
          </div>
        </div>

        {/* Contact Cards + Form */}
        <div className={`grid lg:grid-cols-5 gap-12 lg:gap-16 ${isAr ? "lg:flex lg:flex-row-reverse" : ""}`}>
          {/* Left: Cards */}
          <div data-animate className="lg:col-span-2 space-y-4 opacity-0 animation-delay-200">
            <h3 className={`text-xl font-bold text-[#0f1629] mb-6 ${isAr ? "text-right" : ""}`}>{t.contact.contactInfo}</h3>
            {contactCards.map((item: any, i: number) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.href}
                  className={`group flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-[#F0F3FA] border border-gray-100 hover:border-[#3C4BA1]/20 transition-all hover-lift ${isAr ? "flex-row-reverse text-right" : ""}`}
                >
                  <div className={`w-11 h-11 ${item.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div
                      className="text-sm font-semibold text-[#0f1629] group-hover:text-[#3C4BA1] transition-colors leading-snug"
                      dir={item.href.startsWith("tel:") ? "ltr" : undefined}
                    >
                      {item.value}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Right: Form */}
          <div data-animate className="lg:col-span-3 opacity-0 animation-delay-400">
            {submitted ? (
              <div className="bg-[#F0F3FA] border border-[#3C4BA1]/20 rounded-3xl p-14 text-center">
                <div className="w-20 h-20 bg-[#3C4BA1] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <CheckCircle size={36} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0f1629] mb-3">{formThankYou}</h3>
                <p className="text-gray-500 text-lg">{formReceived}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-100 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-semibold text-[#0f1629] mb-2 ${isAr ? "text-right" : ""}`}>
                      {t.contact.form?.fullName} <abbr title="required" className="text-red-500 no-underline">*</abbr>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#3C4BA1] focus:ring-2 focus:ring-[#3C4BA1]/15 outline-none transition-all text-[#0f1629] placeholder:text-gray-400 ${isAr ? "text-right" : ""}`}
                      placeholder={t.contact.form?.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-semibold text-[#0f1629] mb-2 ${isAr ? "text-right" : ""}`}>
                      {t.contact.form?.email} <abbr title="required" className="text-red-500 no-underline">*</abbr>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#3C4BA1] focus:ring-2 focus:ring-[#3C4BA1]/15 outline-none transition-all text-[#0f1629] placeholder:text-gray-400"
                      placeholder={t.contact.form?.emailPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className={`block text-sm font-semibold text-[#0f1629] mb-2 ${isAr ? "text-right" : ""}`}>
                    {t.contact.form?.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#3C4BA1] focus:ring-2 focus:ring-[#3C4BA1]/15 outline-none transition-all text-[#0f1629] placeholder:text-gray-400 text-left"
                    placeholder={t.contact.form?.phonePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-semibold text-[#0f1629] mb-2 ${isAr ? "text-right" : ""}`}>
                    {t.contact.form?.message} <abbr title="required" className="text-red-500 no-underline">*</abbr>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#3C4BA1] focus:ring-2 focus:ring-[#3C4BA1]/15 outline-none transition-all text-[#0f1629] placeholder:text-gray-400 resize-none ${isAr ? "text-right" : ""}`}
                    placeholder={t.contact.form?.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn-glow w-full sm:w-auto bg-[#538DD3] hover:bg-[#457bb8] text-white font-bold px-10 py-4 rounded-xl text-base transition-all duration-200 hover:shadow-xl hover:shadow-[#538DD3]/30 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group ${isAr ? "flex-row-reverse" : ""}`}
                >
                  <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  {formSend}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef } from "react";

type Client = {
  id: string;
  name: string;
  logo: string;
  order: number;
};

type ClientsProps = {
  clients: Client[];
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

export default function Clients({ clients: dbClients, sc: scEn, scAr = {} }: ClientsProps) {
  const { t, isAr } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const sc = isAr ? scAr : scEn;

  const sectionTitle = sc["clients.title"] || t.clients.title;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll("[data-animate]") || [];
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  // Filter to only show clients that have a logo OR a name
  const displayClients = dbClients && dbClients.length > 0
    ? dbClients.filter((c) => c.logo || c.name)
    : [];

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-[#EBE7DF] text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          data-animate
          className="text-3xl md:text-4xl font-bold mb-16 text-center opacity-0"
        >
          {sectionTitle}
        </h2>

        <div
          data-animate
          className={`flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-0 ${isAr ? "flex-row-reverse" : ""}`}
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          {displayClients.length > 0 ? (
            displayClients.map((client, index) => (
              <div
                key={client.id || index}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name || `Client ${index + 1}`}
                    className="h-12 sm:h-16 max-w-[140px] object-contain"
                  />
                ) : (
                  <span className="text-xl md:text-2xl font-semibold">{client.name}</span>
                )}
              </div>
            ))
          ) : (
            // Placeholder while no clients added yet
            ["Client 1", "Client 2", "Client 3", "Client 4", "Client 5"].map((name, i) => (
              <div key={i} className="text-xl md:text-2xl font-semibold opacity-60 hover:opacity-100 transition-opacity duration-300">
                {name}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

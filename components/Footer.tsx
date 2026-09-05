"use client";

import { useLanguage } from "@/context/LanguageContext";

type FooterProps = {
  sc: Record<string, string>;
  scAr?: Record<string, string>;
};

export default function Footer({ sc: scEn, scAr = {} }: FooterProps) {
  const { t, isAr } = useLanguage();

  const sc = isAr ? scAr : scEn;

  // DB for EN, static for AR (or DB if scAr has it)
  const logo = sc["site.logo_url"] || "/daher.png";
  const phone = sc["contact.phone"] || "+961 3 581 180";
  const email = sc["contact.email"] || "dahercenter@gmail.com";
  const address = sc["contact.address"] || "Daher Bldg., Régie area, behind the WHITE petrol station, Ghazieh, South Lebanon";
  const privacy = sc["footer.privacy"] || t.footer?.privacy || "Privacy Policy";
  const accessibility = sc["footer.accessibility"] || t.footer?.accessibility || "Accessibility Statement";
  const copyright = sc["footer.copyright"] || t.footer?.copyright || "by Mustapha Daher Center.";
  const fbUrl = sc["footer.facebook_url"] || "#";
  const igUrl = sc["footer.instagram_url"] || "#";
  const liUrl = sc["footer.linkedin_url"] || "#";
  const ttUrl = sc["footer.tiktok_url"] || "#";

  return (
    <footer className="bg-[#eeeff0] text-[#111827] pt-20 pb-16 px-8 md:px-16 lg:px-24 w-full">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* Top section: Logo */}
        <div className={isAr ? "flex justify-end" : ""}>
          <a href="#home" className="flex items-center w-fit group">
            <div className="relative flex items-center justify-center">
              <img src={logo} alt="Mustapha Daher Center" className="h-24 lg:h-28 w-auto object-contain transition-transform group-hover:scale-105" />
            </div>
          </a>
        </div>

        {/* Phone/Email */}
        <div className={`text-[13px] text-[#4b5563] leading-relaxed ${isAr ? "text-right" : ""}`}>
          <p><span dir="ltr">{phone}</span></p>
          <p>{email}</p>
        </div>

        {/* Address (Left) & Policies (Right) */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-8 text-[13px] text-[#4b5563] leading-relaxed ${isAr ? "md:flex-row-reverse" : ""}`}>
          <div className={isAr ? "text-right" : ""}>
            {isAr ? (
              <>
                <p>طرابلس، شارع رياض الصلح،</p>
                <p>مبنى ريجنسي 520، الطابق الثاني</p>
              </>
            ) : (
              address.split(",").map((line, i) => (
                <p key={i}>{line.trim()}{i < address.split(",").length - 1 ? "," : ""}</p>
              ))
            )}
          </div>
          <div className={`flex flex-col gap-1 ${isAr ? "items-start" : "md:items-end"}`}>
            <a href="#" className="underline hover:text-[#111827] transition-colors underline-offset-[3px] decoration-1">{privacy}</a>
            <a href="#" className="underline hover:text-[#111827] transition-colors underline-offset-[3px] decoration-1">{accessibility}</a>
          </div>
        </div>

        {/* Social (Left) & Copyright (Right) */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-4 ${isAr ? "md:flex-row-reverse" : ""}`}>
          <div className="flex items-center gap-4">
            <a href={fbUrl} className="text-[#111827] hover:text-[#538DD3] transition-colors" aria-label="Facebook">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href={igUrl} className="text-[#111827] hover:text-[#538DD3] transition-colors" aria-label="Instagram">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href={liUrl} className="text-[#111827] hover:text-[#538DD3] transition-colors" aria-label="LinkedIn">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href={ttUrl} className="text-[#111827] hover:text-[#538DD3] transition-colors" aria-label="TikTok">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.18-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.63-5.46-.22-2.39.81-4.79 2.65-6.17 1.54-1.15 3.51-1.55 5.39-1.16.2.04.4.09.6.14V14.1c-.24-.04-.49-.07-.74-.08-1.11-.03-2.22.45-2.92 1.29-.69.83-.94 1.98-.67 3.04.28 1.13 1.18 2.05 2.29 2.37 1.18.34 2.51.09 3.44-.72.82-.72 1.25-1.81 1.27-2.92.05-6.24.03-12.49.03-18.73.01-.11.02-.22.02-.33Z" />
              </svg>
            </a>
          </div>
          <div className={`text-[13px] text-[#4b5563] ${isAr ? "text-right" : ""}`}>
            © {new Date().getFullYear()} {copyright} <a href="https://veyra.website" className="underline hover:text-[#111827] transition-colors underline-offset-[3px] decoration-1">Veyra</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

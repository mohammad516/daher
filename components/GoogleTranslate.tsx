"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LangToggle({ scrolled = true }: { scrolled?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center mx-2 z-50">
      <div className={`flex items-center rounded-lg p-1 border backdrop-blur-sm ${scrolled ? 'bg-gray-100/50 border-gray-200' : 'bg-white/10 border-white/20'}`}>
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
            lang === 'en'
              ? 'bg-[#3C4BA1] text-white shadow-sm'
              : scrolled ? 'text-gray-600 hover:text-[#3C4BA1] hover:bg-gray-200/50' : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          EN
        </button>
        <button
          disabled
          className={`px-3 py-1 text-xs font-bold rounded-md transition-all font-arabic cursor-not-allowed opacity-40 ${
            scrolled ? 'text-gray-400' : 'text-white/40'
          }`}
        >
          عربي
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";

type ImageDividerProps = {
  imageUrl?: string;
};

export default function ImageDivider({ imageUrl }: ImageDividerProps) {
  const src = imageUrl || "/her2.png";

  return (
    <>
      <section className="relative w-full h-[200px] sm:h-[300px] md:h-[380px] lg:h-[460px] overflow-hidden bg-[#0f1629]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: `url('${src}')`,
            backgroundPosition: "30% 15%",
          }}
        />

        {/* Subtle overlays for visual integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff]/5 via-transparent to-[#0a0f1e]/20 pointer-events-none" />

        {/* Aesthetic Borders */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3C4BA1]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3C4BA1]/30 to-transparent" />
      </section>

      {/* White gap space between divider and footer */}
      <div className="w-full h-12 sm:h-16 md:h-20 bg-white" />
    </>
  );
}

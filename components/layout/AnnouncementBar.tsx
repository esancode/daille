"use client";

import React, { useState, useEffect } from "react";

const frases = [
  "Peças selecionadas com acabamento impecável",
  "Joias atemporais para destacar sua essência",
  "Prata 925 legítima • Elegância para todos os momentos",
  "Frete grátis para compras acima de R$299",
  "Design exclusivo que valoriza quem você é",
  "Qualidade certificada • Brilho que não desbota",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % frases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0A1F5C] overflow-hidden relative h-[32px] md:h-[36px] flex items-center justify-center">
      {frases.map((frase, i) => (
        <p
          key={i}
          className={`text-center font-sans text-[11px] md:text-[12px] font-medium tracking-widest uppercase text-white transition-all duration-500 absolute w-full ${
            index === i
              ? "opacity-100 translate-x-0"
              : i === (index - 1 + frases.length) % frases.length
              ? "opacity-0 -translate-x-full"
              : "opacity-0 translate-x-full"
          }`}
        >
          {frase}
        </p>
      ))}
    </div>
  );
}

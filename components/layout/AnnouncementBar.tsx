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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % frases.length);
        setVisible(true);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0A1F5C] py-2 overflow-hidden">
      <p
        className={`text-center font-sans text-[11px] md:text-[12px] font-medium tracking-widest uppercase text-white transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {frases[index]}
      </p>
    </div>
  );
}

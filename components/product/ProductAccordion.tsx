"use client";

import React, { useState } from "react";

interface ProductAccordionProps {
  descricao: string;
}

export function ProductAccordion({ descricao }: ProductAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>("detalhes");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full max-w-xl mt-8 flex flex-col border-t border-outline-variant">
      {/* Detalhes */}
      <div className="border-b border-outline-variant">
        <button 
          onClick={() => toggleSection("detalhes")}
          className="w-full py-4 flex justify-between items-center text-primary hover:text-secondary transition-colors"
        >
          <span className="font-label-caps text-label-caps tracking-[0.15em] uppercase">DETALHES</span>
          <span className="material-symbols-outlined text-primary text-xl transition-transform duration-300" style={{ transform: openSection === "detalhes" ? "rotate(180deg)" : "rotate(0deg)" }}>
            expand_more
          </span>
        </button>
        <div 
          className={`overflow-hidden transition-all duration-300 ease-premium ${openSection === "detalhes" ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
            {descricao}
          </p>
        </div>
      </div>

      {/* Certificação */}
      <div className="border-b border-outline-variant">
        <button 
          onClick={() => toggleSection("certificacao")}
          className="w-full py-4 flex justify-between items-center text-primary hover:text-secondary transition-colors"
        >
          <span className="font-label-caps text-label-caps tracking-[0.15em] uppercase">CERTIFICAÇÃO E GARANTIAS</span>
          <span className="material-symbols-outlined text-primary text-xl transition-transform duration-300" style={{ transform: openSection === "certificacao" ? "rotate(180deg)" : "rotate(0deg)" }}>
            expand_more
          </span>
        </button>
        <div 
          className={`overflow-hidden transition-all duration-300 ease-premium ${openSection === "certificacao" ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
            Joia confeccionada em Prata 925 legítima. Garantia vitalícia quanto à autenticidade do material.
          </p>
        </div>
      </div>

      {/* Troca e Devolução */}
      <div className="border-b border-outline-variant">
        <button 
          onClick={() => toggleSection("troca")}
          className="w-full py-4 flex justify-between items-center text-primary hover:text-secondary transition-colors"
        >
          <span className="font-label-caps text-label-caps tracking-[0.15em] uppercase">TROCA E DEVOLUÇÃO</span>
          <span className="material-symbols-outlined text-primary text-xl transition-transform duration-300" style={{ transform: openSection === "troca" ? "rotate(180deg)" : "rotate(0deg)" }}>
            expand_more
          </span>
        </button>
        <div 
          className={`overflow-hidden transition-all duration-300 ease-premium ${openSection === "troca" ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
            Não serviu? Troca gratuita em até 30 dias.<br />
            Devolução gratuita em até 7 dias a partir da data de recebimento.
          </p>
        </div>
      </div>
    </div>
  );
}

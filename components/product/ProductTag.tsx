import React from 'react';

export const PRODUCT_TAGS_CONFIG: Record<string, { label: string, color: string }> = {
  "LANCAMENTO": { label: "LANÇAMENTO", color: "bg-[#F7E7CE] text-primary" },
  "DESTAQUE": { label: "DESTAQUE", color: "bg-[#0A1F5C] text-white" },
  "MAIS_VENDIDO": { label: "MAIS VENDIDO", color: "bg-black text-white" },
  "EXCLUSIVO": { label: "EXCLUSIVO", color: "bg-[#F7E7CE] text-primary" },
  "COLECAO_NOVA": { label: "COLEÇÃO NOVA", color: "bg-white text-primary border border-[#C0C0C0]" },
  "PRESENTE": { label: "IDEIA DE PRESENTE", color: "bg-[#0A1F5C] text-white" },
  "FAVORITO": { label: "FAVORITO", color: "bg-white text-primary border border-outline-variant" },
  "PRATA_925": { label: "PRATA 925", color: "bg-white text-primary border border-[#C0C0C0]" },
  "ULTIMAS": { label: "ÚLTIMAS UNIDADES", color: "bg-[#8B0000] text-white" },
  "OFERTA": { label: "OFERTA", color: "bg-black text-white" },
  "DESCONTO": { label: "DESCONTO", color: "bg-[#F7E7CE] text-primary" },
  "FRETE_GRATIS": { label: "FRETE GRÁTIS", color: "bg-[#0A1F5C] text-white" },
  "INDISPONIVEL": { label: "INDISPONÍVEL", color: "bg-gray-400 text-white" },
};

interface ProductTagProps {
  tag?: string | null;
  className?: string;
}

export function ProductTag({ tag, className = "" }: ProductTagProps) {
  if (!tag || !PRODUCT_TAGS_CONFIG[tag]) return null;

  const { label, color } = PRODUCT_TAGS_CONFIG[tag];

  return (
    <div className={`px-2 py-1 text-[9px] font-bold tracking-widest uppercase z-10 shadow-sm ${color} ${className}`}>
      {label}
    </div>
  );
}

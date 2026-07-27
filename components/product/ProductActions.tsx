"use client";

import React from "react";
import { Produto } from "@/types";
import { useCart } from "@/hooks/useCart";

interface ProductActionsProps {
  produto: Produto;
}

export function ProductActions({ produto }: ProductActionsProps) {
  const { addToCart } = useCart();

  const handleBuyOnWhatsApp = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
    const message = `Olá! Tenho interesse no produto: ${produto.nome} (Código: ${produto.codigo}).`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="pt-unit-xs w-full max-w-xl flex flex-col gap-unit-xs mb-unit-xs">
      <button 
        onClick={() => addToCart(produto)}
        className="w-full px-12 py-6 btn-premium bg-primary text-on-primary font-button-text text-button-text uppercase tracking-widest border-2 border-primary"
      >
        ADICIONAR À SACOLA
      </button>
      <button 
        onClick={handleBuyOnWhatsApp}
        className="w-full px-12 py-6 btn-premium bg-surface text-primary font-button-text text-button-text uppercase tracking-widest border-2 border-primary"
      >
        COMPRAR PELO WHATSAPP
      </button>
    </div>
  );
}

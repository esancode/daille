"use client";

import React from "react";
import { Produto } from "@/types";
import { useCart } from "@/hooks/useCart";

interface ProductActionsProps {
  produto: Produto;
}

export function ProductActions({ produto }: ProductActionsProps) {
  const { cart, addToCart } = useCart();
  const inCart = cart.some(item => item.produto.id === produto.id);

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
        className="w-full px-6 py-4 btn-premium bg-primary text-on-primary text-xs font-bold uppercase tracking-widest border border-primary"
      >
        {inCart ? "ADICIONAR À SACOLA (1 Disponível)" : "ADICIONAR À SACOLA"}
      </button>
      <button 
        onClick={handleBuyOnWhatsApp}
        className="w-full px-6 py-4 btn-premium bg-surface text-primary text-xs font-bold uppercase tracking-widest border border-primary"
      >
        COMPRAR PELO WHATSAPP
      </button>
    </div>
  );
}

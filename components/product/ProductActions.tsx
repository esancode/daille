"use client";

import React from "react";
import { Produto } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { trackEvent } from '@/services/recommendations';

interface ProductActionsProps {
  produto: Produto;
}

export function ProductActions({ produto }: ProductActionsProps) {
  const { cart, addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const inCart = cart.some(item => item.produto.id === produto.id);
  const isFav = isFavorite(produto.id);

  const handleBuyOnWhatsApp = () => {
    trackEvent(produto.id, 'wpp_click');
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
    const message = encodeURIComponent(`Olá! Gostaria de comprar o produto: ${produto.nome} (R$ ${produto.preco.toFixed(2).replace('.', ',')})`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleAddToCart = () => {
    trackEvent(produto.id, 'cart_add');
    addToCart(produto);
  };

  return (
    <div className="pt-unit-xs w-full flex flex-col gap-unit-xs mb-unit-xs">
      <button 
        onClick={handleAddToCart}
        className="w-full px-4 md:px-6 py-4 btn-premium bg-primary text-on-primary text-[10px] md:text-xs font-bold uppercase tracking-widest border border-primary hover:opacity-80 transition-opacity"
      >
        {inCart ? "ADICIONAR À SACOLA (1)" : "ADICIONAR À SACOLA"}
      </button>
      <button 
        onClick={handleBuyOnWhatsApp}
        className="w-full px-6 py-4 btn-premium bg-surface text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest border border-primary hover:bg-surface-container transition-colors"
      >
        COMPRAR PELO WHATSAPP
      </button>
    </div>
  );
}

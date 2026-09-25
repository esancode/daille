"use client";

import React, { useState } from "react";
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
  const [quantity, setQuantity] = useState(1);
  
  const inCart = cart.some(item => item.produto.id === produto.id);
  const isFav = isFavorite(produto.id);

  const handleBuyOnWhatsApp = () => {
    trackEvent(produto.id, 'wpp_click');
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
    const message = encodeURIComponent(`Olá! Gostaria de comprar o produto: ${produto.nome} (R$ ${produto.preco.toFixed(2).replace('.', ',')}) - ${quantity} unidade(s)`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleAddToCart = () => {
    trackEvent(produto.id, 'cart_add');
    // Implementação temporária: no mundo real, `addToCart` suportaria quantidade.
    // Como addToCart atual no useCart parece aceitar apenas (produto), chamamos N vezes ou se a loja lida apenas com 1, ignoramos
    for(let i=0; i<quantity; i++){
      addToCart(produto);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Quantity */}
      <div className="flex flex-col gap-2">
        <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] text-[#0A101A] uppercase">
          QUANTIDADE
        </span>
        <div className="flex items-center border border-[#E0E0E0] rounded-[4px] w-fit">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#0A101A] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
          <span className="w-8 text-center font-sans text-[13px] text-[#0A101A]">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#0A101A] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-[#0A101A] text-white rounded-[4px] py-4 font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[16px] font-light">local_mall</span>
          ADICIONAR À SACOLA
        </button>
        
        <button 
          onClick={handleBuyOnWhatsApp}
          className="w-full bg-white border border-[#0A101A] text-[#0A101A] rounded-[4px] py-4 font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-[#F5F5F5] transition-colors cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.01 2.003A9.998 9.998 0 0 0 2.003 12.01c0 1.764.457 3.493 1.332 5.01L2 22l5.127-1.344A9.982 9.982 0 0 0 12.01 21.99h.003c5.517 0 10-4.484 10-10.003s-4.483-10-10.003-10z" fill="currentColor"/>
            <path d="M17.472 14.81c-.274-.138-1.62-.801-1.872-.894-.25-.09-.433-.137-.615.138-.182.274-.707.893-.867 1.077-.16.183-.32.205-.595.068-.274-.137-1.157-.426-2.203-1.36-.814-.726-1.364-1.623-1.523-1.897-.16-.275-.017-.424.12-.56.124-.124.275-.32.41-.482.138-.16.184-.275.275-.458.09-.182.046-.343-.023-.48-.068-.138-.614-1.482-.84-2.03-.22-.533-.443-.46-.614-.468l-.525-.008c-.182 0-.48.068-.732.343-.25.275-.956.936-.956 2.28 0 1.345.98 2.645 1.116 2.828.137.184 1.93 2.946 4.673 4.132.654.282 1.163.45 1.56.577.656.208 1.254.178 1.722.108.525-.078 1.62-.663 1.848-1.303.227-.64.227-1.188.16-1.304-.067-.114-.25-.183-.524-.32z" fill="#FFF"/>
          </svg>
          COMPRAR PELO WHATSAPP
        </button>

        {/* Botão bloqueado */}
        <button 
          disabled
          className="w-full bg-[#F5F5F5] border border-[#E0E0E0] text-[#999999] rounded-[4px] py-4 font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[16px] font-light">lock</span>
          COMPRAR AGORA
        </button>
      </div>

      {/* Informativo Temporário */}
      <div className="bg-[#F9F9F9] border border-[#E0E0E0] rounded-[4px] p-4 flex gap-3">
        <span className="material-symbols-outlined text-[#0A101A] text-[20px] shrink-0">info</span>
        <p className="font-sans text-[12px] text-[#666666] leading-relaxed">
          <strong className="text-[#0A101A]">Compras liberadas pelo WhatsApp.</strong> Nossas novas funções de Checkout Expresso e Cálculo de Frete estão em fase final de testes e chegarão muito em breve.
        </p>
      </div>

      {/* Calcular Frete */}
      <div className="flex flex-col gap-3 pt-4 border-t border-[#E0E0E0]">
        <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] text-[#0A101A] uppercase">
          CALCULAR FRETE E PRAZO
        </span>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="00000-000" 
            disabled
            className="flex-1 bg-[#F5F5F5] border border-[#E0E0E0] rounded-[4px] px-4 py-3 font-sans text-[13px] text-[#999999] cursor-not-allowed focus:outline-none placeholder:text-[#BBBBBB]"
          />
          <button disabled className="bg-[#F5F5F5] text-[#999999] border border-[#E0E0E0] rounded-[4px] px-6 font-sans text-[11px] font-bold tracking-[0.15em] cursor-not-allowed">
            OK
          </button>
        </div>
      </div>

      <button 
        onClick={() => toggleFavorite(produto)}
        className="flex items-center gap-2 text-[#0A101A] hover:text-[#666666] transition-colors self-start mt-2"
      >
        <span 
          className="material-symbols-outlined text-[20px]" 
          style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
        >
          favorite
        </span>
        <span className="font-sans text-[13px]">
          {isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        </span>
      </button>
    </div>
  );
}

"use client";

import React from "react";
import { Produto } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";

export function FavoriteIcon({ produto }: { produto: Produto }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(produto.id);

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(produto);
      }}
      className={`absolute top-4 right-4 text-[#0A101A] transition-opacity z-10 cursor-pointer ${isFav ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
      title="Adicionar aos favoritos"
    >
      <span className={`material-symbols-outlined text-[20px] md:text-[22px] ${isFav ? 'text-[#0A1931] opacity-100' : ''}`} style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}>
        favorite
      </span>
    </button>
  );
}

export function CartIcon({ produto }: { produto: Produto }) {
  const { addToCart, setIsCartOpen } = useCart();

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(produto);
        setIsCartOpen(true);
      }}
      className="text-[#0A101A] opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
      title="Adicionar à sacola"
    >
      <span className="material-symbols-outlined text-[20px] md:text-[24px]">local_mall</span>
    </button>
  );
}

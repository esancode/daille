"use client";

import React from "react";
import { Produto } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";
import { trackEvent } from '@/services/recommendations';

export function FavoriteButton({ produto }: { produto: Produto }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(produto.id);

  const handleToggle = () => {
    if (!isFav) {
      trackEvent(produto.id, 'favorite_add');
    }
    toggleFavorite(produto);
  };

  return (
    <button 
      onClick={handleToggle}
      className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
      title="Adicionar aos favoritos"
    >
      <span className={`material-symbols-outlined text-2xl ${isFav ? 'text-primary' : 'text-primary/50 hover:text-primary'}`} style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}>
        favorite
      </span>
    </button>
  );
}

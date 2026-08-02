"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Produto } from "@/types";

interface FavoritesContextType {
  favorites: Produto[];
  toggleFavorite: (produto: Produto) => void;
  isFavorite: (produtoId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Produto[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("velune_favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        localStorage.removeItem("velune_favorites");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("velune_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (produto: Produto) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === produto.id);
      if (exists) {
        return prev.filter((item) => item.id !== produto.id);
      }
      return [...prev, produto];
    });
  };

  const isFavorite = (produtoId: string) => {
    return favorites.some((item) => item.id === produtoId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites deve ser usado dentro de um FavoritesProvider");
  }
  return context;
}

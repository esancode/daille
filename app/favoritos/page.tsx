"use client";

import React from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { ProductTag } from "@/components/product/ProductTag";
import { FadeIn } from "@/components/ui/FadeIn";

export default function Favoritos() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl">
        <div className="flex justify-between items-end mb-unit-lg border-b border-tertiary pb-unit-sm">
          <h1 className="font-headline-md text-headline-md uppercase text-[20px] md:text-[28px] tracking-widest text-primary">
            SEUS FAVORITOS
          </h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body-md text-secondary text-lg mb-8 uppercase tracking-widest">Você ainda não salvou nenhum produto.</p>
            <Link href="/catalogo" className="btn-premium px-8 py-4 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest inline-block hover:opacity-80 transition-opacity">
              EXPLORAR COLEÇÃO
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
            {favorites.map((item, index) => (
              <FadeIn key={item.id} delay={index * 50} className="flex flex-col group relative">
                <Link href={`/produto/${item.id}`} className="relative aspect-square overflow-hidden mb-unit-md bg-surface-container max-h-[380px]">
                  {item.tag && <ProductTag tag={item.tag} className="absolute top-2 right-2" />}
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" 
                    src={item.imagens && item.imagens.length > 0 ? item.imagens[0].url : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"} 
                    alt={item.nome} 
                  />
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(item);
                  }}
                  className="absolute top-2 left-2 z-10 w-8 h-8 flex items-center justify-center bg-surface/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-surface transition-colors cursor-pointer"
                  title="Remover dos favoritos"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                </button>
                <div className="flex flex-col flex-1">
                  <p className="font-label-caps text-label-caps uppercase text-primary mb-1 line-clamp-1">{item.nome}</p>
                  <p className="font-body-sm text-body-sm font-bold text-primary mb-unit-sm">R$ {item.preco.toFixed(2).replace('.', ',')}</p>
                  <div className="mt-auto">
                    <Link href={`/produto/${item.id}`} className="font-label-caps text-label-caps border-b border-transparent group-hover:border-primary transition-all inline-block uppercase text-[10px] text-primary">
                      VER DETALHES
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

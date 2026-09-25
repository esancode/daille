"use client";

import React from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { FavoriteIcon } from "@/components/product/ProductIcons";
import { FadeIn } from "@/components/ui/FadeIn";

export default function Favoritos() {
  const { favorites } = useFavorites();

  return (
    <div className="bg-[#FDFDFD] min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-12 md:pt-16 pb-20">
        
        <div className="flex flex-col mb-12 md:mb-16">
          <h1 className="text-2xl md:text-[32px] uppercase leading-none text-[#0A101A] font-bold tracking-tight mb-4">
            SEUS FAVORITOS
          </h1>
          <div className="w-full h-px bg-[#E0E0E0]"></div>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#F5F5F5] border border-[#E0E0E0] rounded-[4px]">
            <p className="font-sans text-[14px] md:text-[16px] text-[#666666] mb-6 tracking-wide">
              Você ainda não salvou nenhum produto.
            </p>
            <Link 
              href="/catalogo" 
              className="px-8 py-4 bg-[#0A101A] text-white font-sans text-[11px] md:text-[12px] font-bold tracking-[0.15em] uppercase hover:opacity-90 transition-opacity rounded-[4px]"
            >
              EXPLORAR COLEÇÃO
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
            {favorites.map((produto, index) => {
              const image = produto.imagens && produto.imagens.length > 0 
                ? produto.imagens[0].url 
                : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";

              return (
                <FadeIn key={produto.id} delay={index * 50} className="group flex flex-col h-full">
                  {/* Image Container */}
                  <div className="aspect-square overflow-hidden mb-4 relative bg-[#F5F5F5] shrink-0 flex items-center justify-center">
                    <FavoriteIcon produto={produto} />
                    <Link href={`/produto/${produto.id}`} className="w-full h-full block">
                      <img 
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                        src={image} 
                        alt={produto.nome} 
                      />
                    </Link>
                  </div>

                  {/* Text Data Container */}
                  <div className="flex flex-col flex-1 px-1">
                    <Link href={`/produto/${produto.id}`}>
                      <p className="font-sans text-[13px] md:text-[14px] text-[#333333] mb-3 line-clamp-1 hover:underline" title={produto.nome}>
                        {produto.nome}
                      </p>
                    </Link>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <p className="font-sans text-[12px] md:text-[14px] font-bold text-[#0A101A]">
                        R$ {produto.preco.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

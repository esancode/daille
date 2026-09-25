"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Produto } from '@/types';
import { FavoriteIcon, CartIcon } from '@/components/product/ProductIcons';

interface ProductShowcaseProps {
  title: string;
  subtitle?: string;
  produtos: Produto[];
  viewAllLink?: string;
}

export function ProductShowcase({ title, subtitle, produtos, viewAllLink }: ProductShowcaseProps) {
  const [itemsPerView, setItemsPerView] = useState(4); // Padrão desktop para o server-side render
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth < 1024 ? 2 : 4);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const total = produtos?.length || 0;
  const isLooping = total > itemsPerView;

  // Se houver loop, começamos no segundo set (índice = total)
  useEffect(() => {
    setCurrentIndex(isLooping ? total : 0);
  }, [isLooping, total]);

  if (!produtos || total === 0) return null;

  // Triplica os produtos para criar a ilusão de loop infinito visualmente
  const extendedProdutos = isLooping 
    ? [...produtos, ...produtos, ...produtos]
    : produtos;

  const handleNext = () => {
    if (isAnimating) return;
    
    if (!isLooping) {
      const maxIndex = total - itemsPerView;
      if (currentIndex >= maxIndex) return;
      setIsAnimating(true);
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
      return;
    }

    setIsAnimating(true);
    setIsTransitioning(true);
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    setTimeout(() => {
      // Quando ultrapassamos o set central, voltamos 1 set pra trás de forma invisível
      if (nextIndex >= total * 2) {
        setIsTransitioning(false);
        setCurrentIndex(nextIndex - total);
        setTimeout(() => {
          setIsTransitioning(true);
          setIsAnimating(false);
        }, 50);
      } else {
        setIsAnimating(false);
      }
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;

    if (!isLooping) {
      if (currentIndex <= 0) return;
      setIsAnimating(true);
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
      return;
    }

    setIsAnimating(true);
    setIsTransitioning(true);
    const nextIndex = currentIndex - 1;
    setCurrentIndex(nextIndex);

    setTimeout(() => {
      // Quando recuamos para antes do set central, saltamos 1 set pra frente de forma invisível
      if (nextIndex <= total - 1) {
        setIsTransitioning(false);
        setCurrentIndex(nextIndex + total);
        setTimeout(() => {
          setIsTransitioning(true);
          setIsAnimating(false);
        }, 50);
      } else {
        setIsAnimating(false);
      }
    }, 500);
  };

  const showControls = isLooping ? true : total > itemsPerView;

  return (
    <section className="w-full bg-page-bg py-16 md:py-24 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16">
        
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-14 gap-6">
          <div className="flex flex-col flex-1 min-w-0">
            {subtitle && (
              <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#666666] uppercase mb-3">
                {subtitle}
              </span>
            )}
            <div className="flex items-center gap-6">
              <h2 className="font-cinzel text-[#0A101A] text-[28px] md:text-[42px] lg:text-[48px] leading-none">
                {title}
              </h2>
            </div>
          </div>
          
          {viewAllLink && (
            <Link href={viewAllLink} className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] text-[#0A101A] hover:opacity-60 transition-opacity flex items-center gap-2 uppercase md:pb-2">
              VER TODOS
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          )}
        </div>

        {/* Carrossel */}
        <div className="relative overflow-hidden w-full">
          <div className="-mx-2 md:-mx-4">
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: `translateX(calc(-100% * ${currentIndex} / ${itemsPerView}))` }}
            >
              {extendedProdutos.map((produto, i) => {
                const image = produto.imagens && produto.imagens.length > 0 
                  ? produto.imagens[0].url 
                  : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";
                  
                return (
                  <div 
                    key={`${produto.id}-${i}`} 
                    className="flex-shrink-0 px-2 md:px-4"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="group flex flex-col h-full">
                      
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
                          <CartIcon produto={produto} />
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Controles do Carrossel (Setas) */}
        {showControls && (
          <div className="flex items-center justify-center gap-12 mt-12 md:mt-16">
            <button 
              onClick={handlePrev}
              disabled={isAnimating}
              className={`text-[#0A101A] transition-opacity cursor-pointer flex items-center justify-center ${isAnimating ? 'opacity-30' : 'hover:opacity-60'}`}
            >
              <span className="material-symbols-outlined text-[24px]">chevron_left</span>
            </button>
            
            <button 
              onClick={handleNext}
              disabled={isAnimating}
              className={`text-[#0A101A] transition-opacity cursor-pointer flex items-center justify-center ${isAnimating ? 'opacity-30' : 'hover:opacity-60'}`}
            >
              <span className="material-symbols-outlined text-[24px]">chevron_right</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

"use client";

import React, { useState } from 'react';
import { Produto } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';

interface ProductImageGalleryProps {
  images: { url: string }[];
  altText: string;
  produto: Produto;
}

export function ProductImageGallery({ images, altText, produto }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(produto?.id);

  if (!images || images.length === 0) {
    images = [{ url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop" }];
  }

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full h-full">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:w-[80px] flex-shrink-0 custom-scrollbar pb-2 md:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[3/4] md:aspect-square w-20 md:w-full bg-[#F5F5F5] border ${activeIndex === idx ? 'border-[#0A101A]' : 'border-transparent hover:border-[#E0E0E0]'} overflow-hidden transition-colors shrink-0`}
            >
              <img src={img.url} alt={`${altText} thumbnail ${idx + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}
      
      {/* Main Image Container */}
      <div className="flex-1 bg-[#F5F5F5] relative overflow-hidden flex items-center justify-center aspect-square w-full">
        <img 
          className="w-full h-full object-cover mix-blend-multiply transition-all duration-300" 
          src={images[activeIndex].url} 
          alt={altText} 
        />
        
        {/* Top Right Heart */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (produto) toggleFavorite(produto);
          }}
          className={`absolute top-4 right-4 transition-all duration-300 z-10 ${isFav ? 'text-[#0A101A] scale-110' : 'text-[#666666] hover:text-[#0A101A]'}`}
        >
          <span 
            className="material-symbols-outlined font-light text-[28px] drop-shadow-md"
            style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Bottom Left Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-6 text-white font-sans text-[11px] font-bold tracking-widest drop-shadow-md">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Bottom Right Controls */}
        {images.length > 1 && (
          <div className="absolute bottom-6 right-6 flex items-center gap-3">
            <button onClick={prevImage} className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#0A101A] transition-all backdrop-blur-sm">
              <span className="material-symbols-outlined font-light text-[20px]">arrow_back</span>
            </button>
            <button onClick={nextImage} className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#0A101A] transition-all backdrop-blur-sm">
              <span className="material-symbols-outlined font-light text-[20px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

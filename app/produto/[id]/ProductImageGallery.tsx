"use client";

import React, { useState } from 'react';

interface ProductImageGalleryProps {
  images: { url: string }[];
  altText: string;
}

export function ProductImageGallery({ images, altText }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.5)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)'
    });
  };
  
  if (!images || images.length === 0) {
    return (
      <div className="w-[85%] md:w-[75%] max-w-[480px] mx-auto aspect-square bg-surface-container overflow-hidden relative">
        <img 
          className="w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop" 
          alt={altText} 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2 overflow-x-auto md:w-24 flex-shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square w-20 md:w-full border ${activeIndex === idx ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'} overflow-hidden transition-all`}
            >
              <img src={img.url} alt={`${altText} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
      
      {/* Main Image */}
      <div 
        className="w-full max-w-[480px] mx-auto aspect-square bg-surface-container overflow-hidden relative cursor-zoom-in group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          className="w-full h-full object-cover transition-transform duration-200 ease-out" 
          style={zoomStyle}
          src={images[activeIndex].url} 
          alt={altText} 
        />
      </div>
    </div>
  );
}

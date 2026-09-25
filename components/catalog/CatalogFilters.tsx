"use client";

import React, { useState } from 'react';
import { FilterDrawer } from './FilterDrawer';

export function CatalogFilters() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="flex items-center gap-2 font-sans text-[11px] font-bold tracking-[0.15em] text-[#0A101A] uppercase border border-[#E0E0E0] px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">tune</span>
        FILTRAR
      </button>

      <FilterDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
}

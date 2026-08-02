"use client";

import React, { useState } from 'react';
import { FilterDrawer } from './FilterDrawer';

export function CatalogFilters() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="flex items-center gap-2 font-label-caps text-label-caps uppercase text-primary hover:opacity-70 transition-opacity cursor-pointer"
      >
        <span>FILTROS</span>
        <span className="material-symbols-outlined text-[16px]">tune</span>
      </button>

      <FilterDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
}

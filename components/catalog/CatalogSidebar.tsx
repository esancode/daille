"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function CatalogSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get('category') || 'todos';
  const currentSort = searchParams.get('sort') || '';
  
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== 'todos') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Always reset to page 1 when changing filters
    params.delete('page');
    
    router.push(`/catalogo?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push('/catalogo', { scroll: false });
  };

  const categories = [
    { label: 'Todos', value: 'todos' },
    { label: 'Colares', value: 'colares' },
    { label: 'Brincos', value: 'brincos' },
    { label: 'Anéis', value: 'aneis' },
    { label: 'Pulseiras', value: 'pulseiras' },
    { label: 'Conjuntos', value: 'conjuntos' }
  ];

  const sortOptions = [
    { label: 'Novidades', value: '' },
    { label: 'Menor Preço', value: 'price_asc' },
    { label: 'Maior Preço', value: 'price_desc' }
  ];

  return (
    <aside className="w-[280px] shrink-0 sticky top-32 self-start flex flex-col gap-10">
      <div className="flex items-center gap-3 text-[#0A101A] mb-2">
        <span className="material-symbols-outlined text-[20px]">tune</span>
        <h2 className="font-sans text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase">FILTRAR</h2>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-4">
        <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A101A] border-b border-[#E0E0E0] pb-2 flex justify-between items-center">
          CATEGORIA
          <span className="material-symbols-outlined text-[16px]">expand_more</span>
        </h3>
        <div className="flex flex-col gap-3">
          {categories.map((cat) => {
            const isSelected = currentCategory.toLowerCase() === cat.value;
            return (
              <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-[#0A101A] bg-[#0A101A]' : 'border-[#CCCCCC] group-hover:border-[#0A101A]'}`}>
                  {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                </div>
                <span className={`font-sans text-[13px] md:text-[14px] transition-colors ${isSelected ? 'text-[#0A101A] font-semibold' : 'text-[#666666] group-hover:text-[#0A101A]'}`}>
                  {cat.label}
                </span>
                <input 
                  type="radio" 
                  name="category" 
                  className="hidden" 
                  checked={isSelected}
                  onChange={() => updateFilter('category', cat.value)}
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div className="flex flex-col gap-4">
        <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A101A] border-b border-[#E0E0E0] pb-2 flex justify-between items-center">
          ORDENAR POR
          <span className="material-symbols-outlined text-[16px]">expand_more</span>
        </h3>
        <div className="flex flex-col gap-3">
          {sortOptions.map((sort) => {
            const isSelected = currentSort === sort.value;
            return (
              <label key={sort.label} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-[#0A101A] bg-[#0A101A]' : 'border-[#CCCCCC] group-hover:border-[#0A101A]'}`}>
                  {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                </div>
                <span className={`font-sans text-[13px] md:text-[14px] transition-colors ${isSelected ? 'text-[#0A101A] font-semibold' : 'text-[#666666] group-hover:text-[#0A101A]'}`}>
                  {sort.label}
                </span>
                <input 
                  type="radio" 
                  name="sort" 
                  className="hidden" 
                  checked={isSelected}
                  onChange={() => updateFilter('sort', sort.value)}
                />
              </label>
            );
          })}
        </div>
      </div>

      <button 
        onClick={clearFilters}
        className="flex items-center gap-2 font-sans text-[11px] font-bold tracking-[0.15em] text-[#0A101A] uppercase hover:opacity-60 transition-opacity mt-4"
      >
        <span className="material-symbols-outlined text-[18px]">refresh</span>
        LIMPAR FILTROS
      </button>
    </aside>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [selectedSort, setSelectedSort] = useState(currentSort);

  useEffect(() => {
    setSelectedCategory(currentCategory);
    setSelectedSort(currentSort);
  }, [currentCategory, currentSort, isOpen]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedSort) params.set('sort', selectedSort);
    
    router.push(`/catalogo?${params.toString()}`);
    onClose();
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSort('');
    router.push('/catalogo');
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[400px] bg-surface shadow-2xl transform transition-transform duration-500 ease-premium flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-unit-lg border-b border-tertiary">
          <h2 className="font-headline-md text-headline-md uppercase text-[20px] tracking-widest text-primary">FILTROS</h2>
          <button onClick={onClose} className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity">
            close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-unit-lg flex flex-col gap-10">
          
          {/* Categoria */}
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary border-b border-outline-variant pb-2">CATEGORIA</h3>
            <div className="flex flex-col gap-3">
              {['Anéis', 'Brincos', 'Colares', 'Pulseiras', 'Conjuntos'].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-colors ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'bg-primary border-primary' : 'border-outline-variant group-hover:border-primary'}`}>
                    {selectedCategory.toLowerCase() === cat.toLowerCase() && (
                      <span className="material-symbols-outlined text-[14px] text-on-primary">check</span>
                    )}
                  </div>
                  <span className="font-body-sm text-[14px] text-primary">{cat}</span>
                  <input 
                    type="radio" 
                    name="category" 
                    className="hidden" 
                    checked={selectedCategory.toLowerCase() === cat.toLowerCase()}
                    onChange={() => setSelectedCategory(cat.toLowerCase())}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Ordenação */}
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary border-b border-outline-variant pb-2">ORDENAR POR</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Novidades', value: '' },
                { label: 'Menor Preço', value: 'price_asc' },
                { label: 'Maior Preço', value: 'price_desc' }
              ].map((sort) => (
                <label key={sort.label} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedSort === sort.value ? 'border-primary' : 'border-outline-variant group-hover:border-primary'}`}>
                    {selectedSort === sort.value && (
                      <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <span className="font-body-sm text-[14px] text-primary">{sort.label}</span>
                  <input 
                    type="radio" 
                    name="sort" 
                    className="hidden" 
                    checked={selectedSort === sort.value}
                    onChange={() => setSelectedSort(sort.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-unit-lg border-t border-tertiary flex gap-4 bg-surface">
          <button 
            onClick={clearFilters}
            className="flex-1 border border-primary text-primary py-4 font-button-text text-button-text uppercase hover:bg-surface-container transition-colors"
          >
            LIMPAR
          </button>
          <button 
            onClick={applyFilters}
            className="flex-1 bg-primary text-on-primary py-4 font-button-text text-button-text uppercase hover:opacity-80 transition-opacity"
          >
            APLICAR
          </button>
        </div>
      </div>
    </>
  );
}

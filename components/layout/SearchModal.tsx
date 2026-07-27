"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-surface w-full max-w-2xl p-margin-mobile md:p-margin-desktop relative animate-fade-in shadow-2xl" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-unit-md right-unit-md material-symbols-outlined text-secondary hover:text-primary transition-colors"
        >
          close
        </button>
        <h2 className="font-headline-md text-headline-md uppercase text-primary mb-unit-lg">PESQUISAR</h2>
        <form onSubmit={handleSearch} className="flex border-b-2 border-primary">
          <input 
            type="text" 
            placeholder="O QUE VOCÊ ESTÁ PROCURANDO?" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none py-unit-md focus:ring-0 font-label-caps text-label-caps uppercase placeholder:text-secondary outline-none"
            autoFocus
          />
          <button type="submit" className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity">search</button>
        </form>
      </div>
    </div>
  );
}

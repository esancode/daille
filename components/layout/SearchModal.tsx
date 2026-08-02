"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setResults([]);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 1) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/produtos/search?q=${encodeURIComponent(searchTerm)}`);
          if (res.ok) {
            const data = await res.json();
            setResults(data);
          } else {
            setResults([]);
          }
        } catch (error) {
          console.error(error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 bg-black/50 backdrop-blur-sm px-margin-mobile" onClick={onClose}>
      <div className="bg-surface w-full max-w-2xl p-margin-mobile md:p-margin-desktop relative animate-fade-in shadow-2xl flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-unit-md right-unit-md material-symbols-outlined text-secondary hover:text-primary transition-colors cursor-pointer"
        >
          close
        </button>
        <h2 className="font-headline-md text-headline-md uppercase text-primary mb-unit-lg">PESQUISAR</h2>
        
        <form onSubmit={handleSearch} className="flex border-b-2 border-primary mb-4">
          <input 
            type="text" 
            placeholder="O QUE VOCÊ ESTÁ PROCURANDO?" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none py-unit-md focus:ring-0 font-label-caps text-label-caps uppercase placeholder:text-secondary outline-none"
            autoFocus
          />
          <button type="submit" className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity">
            {isLoading ? 'hourglass_empty' : 'search'}
          </button>
        </form>

        {/* Resultados da Busca em Tempo Real */}
        {results.length > 0 && (
          <div className="flex flex-col gap-4 overflow-y-auto pb-4">
            <p className="font-label-caps text-[10px] tracking-widest text-secondary uppercase">Resultados Sugeridos</p>
            {results.map((produto) => (
              <Link 
                key={produto.id} 
                href={`/produto/${produto.id}`}
                onClick={onClose}
                className="flex items-center gap-4 group p-2 hover:bg-surface-container transition-colors"
              >
                <div className="w-16 h-16 relative bg-surface-container shrink-0">
                  <Image 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[12px] uppercase text-primary group-hover:underline">{produto.nome}</span>
                  <span className="font-body-sm font-bold text-primary">R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
                </div>
              </Link>
            ))}
            <button 
              onClick={handleSearch}
              className="font-label-caps text-[10px] tracking-widest uppercase text-primary hover:underline self-start mt-2"
            >
              Ver todos os resultados
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

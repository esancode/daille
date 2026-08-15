"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick?: () => void;
}

export function NavigationDrawer({ isOpen, onClose, onSearchClick }: NavigationDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-500 ease-premium ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 left-0 z-[110] w-[80vw] max-w-sm bg-surface flex flex-col shadow-2xl transition-transform duration-500 ease-premium transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-unit-lg border-b border-tertiary gap-4">
          <Image src="/logo_daille_transparent.png" alt="Daille" width={180} height={45} className="object-contain w-full max-w-[55%] h-auto" style={{ width: 'auto', height: 'auto' }} />
          <button onClick={onClose} className="material-symbols-outlined text-primary hover:text-secondary transition-colors cursor-pointer text-2xl flex-shrink-0">
            close
          </button>
        </div>
        
        <nav className="flex-1 flex flex-col py-10 px-margin-mobile gap-8 overflow-y-auto">
          <Link href="/" onClick={onClose} className="font-headline-md text-headline-md uppercase text-primary hover:text-secondary transition-colors">HOME</Link>
          
          <div className="flex flex-col gap-5">
            <Link href="/catalogo" onClick={onClose} className="font-headline-md text-headline-md uppercase text-primary hover:text-secondary transition-colors">CATÁLOGO</Link>
            <div className="flex flex-col gap-4 pl-4 border-l border-tertiary/20 ml-2">
              <Link href="/catalogo?category=Aneis" onClick={onClose} className="font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors">ANÉIS</Link>
              <Link href="/catalogo?category=Colares" onClick={onClose} className="font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors">COLARES</Link>
              <Link href="/catalogo?category=Brincos" onClick={onClose} className="font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors">BRINCOS</Link>
              <Link href="/catalogo?category=Pulseiras" onClick={onClose} className="font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors">PULSEIRAS</Link>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:hidden mt-2">
            <button 
              onClick={() => {
                onClose();
                if (onSearchClick) onSearchClick();
              }} 
              className="font-headline-md text-headline-md uppercase text-primary hover:text-secondary transition-colors text-left flex items-center justify-between cursor-pointer"
            >
              PESQUISAR
              <span className="material-symbols-outlined text-[20px] text-tertiary">search</span>
            </button>
            <Link 
              href="/favoritos" 
              onClick={onClose} 
              className="font-headline-md text-headline-md uppercase text-primary hover:text-secondary transition-colors flex items-center justify-between"
            >
              FAVORITOS
              <span className="material-symbols-outlined text-[20px] text-tertiary">favorite</span>
            </Link>
          </div>
        </nav>
        
        <div className="p-margin-mobile pb-8 border-t border-tertiary flex flex-col gap-4 bg-surface">
          <a href="#" className="font-label-caps text-[10px] uppercase tracking-widest text-secondary hover:text-primary transition-colors">
            AJUDA E CUIDADOS
          </a>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="font-label-caps text-[10px] uppercase tracking-widest text-secondary hover:text-primary transition-colors">
            CONTATO VIA WHATSAPP
          </a>
        </div>
      </div>
    </>
  );
}

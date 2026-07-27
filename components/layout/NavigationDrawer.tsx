"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavigationDrawer({ isOpen, onClose }: NavigationDrawerProps) {
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
        <div className="p-margin-mobile flex justify-between items-center border-b border-tertiary">
          <Image src="/logo_nova.png" alt="Velune Pratas" width={140} height={40} className="object-contain" />
          <button onClick={onClose} className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity cursor-pointer">
            close
          </button>
        </div>
        
        <nav className="flex-1 flex flex-col py-unit-lg px-margin-mobile gap-unit-md overflow-y-auto">
          <Link href="/" onClick={onClose} className="font-headline-md text-headline-md uppercase text-primary hover:text-secondary transition-colors">HOME</Link>
          <div className="editorial-line my-unit-sm"></div>
          <Link href="/catalogo" onClick={onClose} className="font-headline-md text-headline-md uppercase text-primary hover:text-secondary transition-colors">CATÁLOGO</Link>
          <Link href="/catalogo" onClick={onClose} className="font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors pl-unit-md">ANÉIS</Link>
          <Link href="/catalogo" onClick={onClose} className="font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors pl-unit-md">COLARES</Link>
          <Link href="/catalogo" onClick={onClose} className="font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors pl-unit-md">BRINCOS</Link>
          <Link href="/catalogo" onClick={onClose} className="font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors pl-unit-md">PULSEIRAS</Link>
          <div className="editorial-line my-unit-sm"></div>
          <Link href="/cliente" onClick={onClose} className="font-headline-md text-headline-md uppercase text-primary hover:text-secondary transition-colors">MINHA CONTA</Link>
        </nav>
        
        <div className="p-margin-mobile border-t border-tertiary flex flex-col gap-unit-md bg-surface-container">
          <a href="#" className="font-label-caps text-label-caps uppercase text-primary hover:text-secondary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">help</span>
            AJUDA E CUIDADOS
          </a>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="font-label-caps text-label-caps uppercase text-primary hover:text-secondary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            CONTATO VIA WHATSAPP
          </a>
        </div>
      </div>
    </>
  );
}

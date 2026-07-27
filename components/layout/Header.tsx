"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { SearchModal } from './SearchModal';
import { NavigationDrawer } from './NavigationDrawer';

export function Header() {
  const { setIsCartOpen, cartCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="w-full bg-tertiary text-on-tertiary py-unit-sm text-center font-label-caps text-label-caps tracking-widest px-margin-mobile">
        FRETE GRÁTIS PARA COMPRAS ACIMA DE R$299
      </div>
      <header 
        className={`sticky top-0 z-50 border-b border-tertiary w-full transition-all duration-500 ease-premium ${
          isScrolled ? 'bg-surface/90 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-surface py-unit-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center w-full">
          <div className="flex items-center gap-unit-md">
            <button onClick={() => setIsMenuOpen(true)} className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity cursor-pointer">menu</button>
          </div>
          <Link href="/" className="font-headline-md text-headline-md text-primary tracking-tighter uppercase flex items-center justify-center">
            <Image src="/logo_nova.png" alt="Velune Pratas" width={180} height={24} className="object-contain h-6 w-auto" priority />
          </Link>
          <div className="flex items-center gap-unit-md">
            <button onClick={() => setIsSearchOpen(true)} className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity cursor-pointer">search</button>
            <button onClick={() => setIsCartOpen(true)} className="relative material-symbols-outlined text-primary hover:opacity-70 transition-opacity cursor-pointer">
              shopping_bag
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-on-error rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

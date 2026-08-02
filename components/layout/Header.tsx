"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { SearchModal } from './SearchModal';
import { NavigationDrawer } from './NavigationDrawer';
import { AnnouncementBar } from './AnnouncementBar';

export function Header() {
  const { setIsCartOpen, cartCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= 100) {
        setIsHidden(false);
      }

      setIsScrolled(currentScrollY > 0);
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-surface/90 backdrop-blur-md shadow-sm py-2' : 'bg-surface py-3'
        } ${isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop w-full">
          <div className="w-1/3 flex items-center justify-start">
            <button onClick={() => setIsMenuOpen(true)} className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity cursor-pointer">menu</button>
          </div>
          <Link href="/" className="font-headline-md text-headline-md text-primary tracking-tighter uppercase flex items-center justify-center w-1/3 cursor-pointer">
            <Image src="/logo_daille.png" alt="Daille" width={320} height={40} className="object-contain h-8 md:h-12 w-auto" priority />
          </Link>
          <div className="flex items-center justify-end gap-4 text-primary w-1/3">
            <button onClick={() => setIsSearchOpen(true)} className="hover:opacity-70 transition-opacity flex items-center justify-center p-2 cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <Link href="/favoritos" className="hover:opacity-70 transition-opacity flex items-center justify-center p-2 cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
            </Link>
            <button 
              className="hover:opacity-70 transition-opacity relative flex items-center justify-center p-2 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-0 -right-1 w-5 h-5 bg-tertiary text-on-tertiary text-[10px] font-bold rounded-full flex items-center justify-center" style={{ borderRadius: "50%" }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Categorias (Desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-10 pt-4 text-[13px] font-medium tracking-[0.15em] text-primary w-full px-margin-mobile md:px-margin-desktop">
          <Link href="/catalogo?category=Aneis" className="hover:text-primary transition-colors py-2 md:py-0">ANÉIS</Link>
          <Link href="/catalogo?category=Colares" className="hover:text-primary transition-colors py-2 md:py-0">COLARES</Link>
          <Link href="/catalogo?category=Brincos" className="hover:text-primary transition-colors py-2 md:py-0">BRINCOS</Link>
          <Link href="/catalogo?category=Pulseiras" className="hover:text-primary transition-colors py-2 md:py-0">PULSEIRAS</Link>
          <Link href="/catalogo?category=Conjuntos" className="hover:text-primary transition-colors py-2 md:py-0">CONJUNTOS</Link>
        </nav>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

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
        <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop w-full gap-2 md:gap-4">
          <div className="flex-1 flex items-center justify-start">
            <button onClick={() => setIsMenuOpen(true)} className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity cursor-pointer">menu</button>
          </div>
          <Link href="/" className="flex-none flex items-center justify-center cursor-pointer max-w-[120px] md:max-w-[180px]">
            <Image src="/logo_nova_branca.png" alt="Daille" width={320} height={50} className="object-contain w-full h-auto" style={{ width: 'auto', height: 'auto' }} priority />
          </Link>
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4 text-primary">
            <button onClick={() => setIsSearchOpen(true)} className="hover:opacity-70 transition-opacity hidden md:flex items-center justify-center p-1 md:p-2 cursor-pointer">
              <span className="material-symbols-outlined text-[20px] md:text-[24px]">search</span>
            </button>
            <Link href="/favoritos" className="hover:opacity-70 transition-opacity hidden md:flex items-center justify-center p-1 md:p-2 cursor-pointer">
              <span className="material-symbols-outlined text-[20px] md:text-[24px]">favorite</span>
            </Link>
            <button 
              className="hover:opacity-70 transition-opacity relative flex items-center justify-center p-1 md:p-2 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <span className="material-symbols-outlined text-[20px] md:text-[24px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-0 -right-1 w-4 h-4 md:w-5 md:h-5 bg-tertiary text-on-tertiary text-[9px] md:text-[10px] font-bold rounded-full flex items-center justify-center" style={{ borderRadius: "50%" }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Categorias (Desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-10 pt-4 text-[13px] font-medium tracking-[0.15em] text-primary w-full px-margin-mobile md:px-margin-desktop">
          <Link href="/catalogo?category=Aneis" className="relative hover:text-tertiary transition-colors py-2 md:py-0 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-tertiary after:transition-all after:duration-300 hover:after:w-full">ANÉIS</Link>
          <Link href="/catalogo?category=Colares" className="relative hover:text-tertiary transition-colors py-2 md:py-0 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-tertiary after:transition-all after:duration-300 hover:after:w-full">COLARES</Link>
          <Link href="/catalogo?category=Brincos" className="relative hover:text-tertiary transition-colors py-2 md:py-0 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-tertiary after:transition-all after:duration-300 hover:after:w-full">BRINCOS</Link>
          <Link href="/catalogo?category=Pulseiras" className="relative hover:text-tertiary transition-colors py-2 md:py-0 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-tertiary after:transition-all after:duration-300 hover:after:w-full">PULSEIRAS</Link>
          <Link href="/catalogo?category=Conjuntos" className="relative hover:text-tertiary transition-colors py-2 md:py-0 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-tertiary after:transition-all after:duration-300 hover:after:w-full">CONJUNTOS</Link>
        </nav>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onSearchClick={() => setIsSearchOpen(true)} />
    </>
  );
}

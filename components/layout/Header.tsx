"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { SearchModal } from './SearchModal';
import { NavigationDrawer } from './NavigationDrawer';


export function Header() {
  const { setIsCartOpen, cartCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div className="w-full shrink-0 h-[78px] md:h-[83px]" /> {/* Placeholder Fixo e Exato */}
      <header className={`w-full bg-page-bg pt-8 pb-6 z-50 fixed top-0 left-0 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0 shadow-sm' : '-translate-y-full shadow-none'}`}>
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 flex items-center justify-between">
          
          {/* Logo (Left, aligned with page content) */}
          <Link href="/" className="flex-1 flex items-center justify-start cursor-pointer">
            <Image 
              src="/logo_daille_transparent.png" 
              alt="Daille" 
              width={320} 
              height={50} 
              className="object-contain w-[140px] md:w-[170px] h-auto brightness-0 drop-shadow-[0_0_0.4px_#0A101A] transition-all" 
              priority 
            />
          </Link>

          {/* Navigation (Pushed to the right of center) */}
          <nav className="hidden md:flex flex-none items-center justify-center gap-10 font-sans text-[13px] tracking-[0.15em] font-semibold text-text-main uppercase pl-24 lg:pl-48 xl:pl-64">
            <Link href="/" className="hover:text-accent hover:opacity-70 transition-all">INÍCIO</Link>
            <Link href="/catalogo" className="hover:text-accent hover:opacity-70 transition-all">LOJA</Link>
            <Link href="/sobre" className="hover:text-accent hover:opacity-70 transition-all">SOBRE</Link>
            <Link href="/contato" className="hover:text-accent hover:opacity-70 transition-all">CONTATO</Link>
          </nav>

          {/* Icons (Right, flush with page content) */}
          <div className="flex-1 flex items-center justify-end gap-5 text-text-main">
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-hover hover:opacity-70 transition-all flex items-center justify-center cursor-pointer">
              <span className="material-symbols-outlined text-[20px] md:text-[22px]">search</span>
            </button>
            <Link href="/favoritos" className="hover:text-hover hover:opacity-70 transition-all flex items-center justify-center cursor-pointer">
              <span className="material-symbols-outlined text-[20px] md:text-[22px]">favorite</span>
            </Link>
            <button 
              className="hover:text-hover hover:opacity-70 transition-all relative flex items-center justify-center cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <span className="material-symbols-outlined text-[20px] md:text-[22px]">local_mall</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onSearchClick={() => setIsSearchOpen(true)} />
    </>
  );
}

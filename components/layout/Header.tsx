"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setShowNav(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) < 10) return;

      if (currentScrollY > 120) {
        if (diff > 0) {
          setShowNav(false);
        } else if (diff < -15) {
          setShowNav(true);
        }
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="sticky top-0 z-30 w-full">
      <header className="w-full bg-white h-20 transition-all duration-200">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-10">
          <div className="flex-1 flex justify-start">
            <Link href="/" className="relative block cursor-pointer">
              <img
                src="/logo/logo_horizontal_v2.png"
                alt="Velune Pratas"
                className="h-20 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-zinc-50 border border-zinc-200 rounded-[4px] px-3 py-1.5 flex items-center"
            >
              <input
                type="text"
                placeholder="Buscar joias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 md:w-48 text-[12px] font-sans text-zinc-900 bg-transparent focus:outline-none placeholder-zinc-400"
              />
            </form>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-zinc-800 hover:text-zinc-500 transition-colors p-1 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D7C2A0] text-zinc-950 text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white animate-cart-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <nav className={`w-full bg-white border-b border-zinc-200 transition-all duration-300 ease-in-out ${showNav ? "h-11 opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-full overflow-hidden"}`}>
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between h-11">
          <Link
            href="/catalogo"
            className="relative font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-700 hover:text-[#D7C2A0] transition-colors cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#D7C2A0] hover:after:w-full after:transition-all after:duration-300"
          >
            Catálogo
          </Link>
          <Link
            href="/catalogo?categoria=Anéis"
            className="relative font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-700 hover:text-[#D7C2A0] transition-colors cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#D7C2A0] hover:after:w-full after:transition-all after:duration-300"
          >
            Anéis
          </Link>
          <Link
            href="/catalogo?categoria=Colares"
            className="relative font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-700 hover:text-[#D7C2A0] transition-colors cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#D7C2A0] hover:after:w-full after:transition-all after:duration-300"
          >
            Colares
          </Link>
          <Link
            href="/catalogo?categoria=Brincos"
            className="relative font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-700 hover:text-[#D7C2A0] transition-colors cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#D7C2A0] hover:after:w-full after:transition-all after:duration-300"
          >
            Brincos
          </Link>
        </div>
      </nav>
    </div>
  );
}
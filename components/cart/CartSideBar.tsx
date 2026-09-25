"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

export function CartSidebar() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isCartOpen
      ) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, setIsCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
    let itensStr = "";
    cart.forEach((item) => {
      itensStr += `- ${item.produto.nome} x${item.quantidade} (Código: ${item.produto.codigo})\n`;
    });
    const totalStr = cartTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const message = `Olá! Tenho interesse nos seguintes produtos:\n\n${itensStr}\nTotal estimado: ${totalStr}\n\nGostaria de finalizar minha compra.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <>
      {/* Overlay Background */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar Panel */}
      <aside
        ref={sidebarRef}
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-[440px] bg-[#FDFDFD] flex flex-col transition-transform duration-500 ease-in-out transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } shadow-2xl`}
      >
        {/* Header */}
        <div className="flex flex-col px-8 pt-8 pb-4">
          <div className="flex items-center justify-between mb-8">
            <Image 
              src="/logo_daille_transparent.png" 
              alt="Daille" 
              width={140} 
              height={30} 
              className="object-contain w-[120px] h-auto brightness-0" 
            />
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[#0A101A] hover:opacity-60 transition-opacity cursor-pointer"
            >
              <span className="material-symbols-outlined font-light text-[28px]">close</span>
            </button>
          </div>
          
          <div className="flex items-end justify-between border-b border-[#E0E0E0] pb-4">
            <h2 className="font-cinzel text-[26px] text-[#0A101A] leading-none">
              SUA SACOLA
            </h2>
            <span className="font-sans text-[12px] text-[#666666] mb-1">
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </span>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-8 py-4 flex flex-col gap-8 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
              <span className="material-symbols-outlined text-[48px] text-[#E0E0E0]">shopping_bag</span>
              <div>
                <p className="font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-[#0A101A]">
                  SEU CARRINHO ESTÁ VAZIO
                </p>
                <p className="font-sans text-[12px] text-[#666666] mt-2">
                  Adicione joias exclusivas para começar.
                </p>
              </div>
            </div>
          ) : (
            cart.map((item) => {
              const image =
                item.produto.imagens && item.produto.imagens.length > 0
                  ? item.produto.imagens[0].url
                  : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";
              return (
                <div key={item.produto.id} className="flex gap-5">
                  {/* Product Image */}
                  <Link href={`/produto/${item.produto.id}`} className="w-[100px] h-[100px] bg-[#F5F5F5] flex-shrink-0 cursor-pointer overflow-hidden flex items-center justify-center">
                    <img
                      src={image}
                      alt={item.produto.nome}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/produto/${item.produto.id}`} className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#0A101A] line-clamp-2 hover:underline cursor-pointer pr-4 leading-relaxed">
                          {item.produto.nome}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.produto.id)}
                          className="text-[#999999] hover:text-[#0A101A] transition-colors cursor-pointer -mt-1"
                        >
                          <span className="material-symbols-outlined font-light text-[20px]">close</span>
                        </button>
                      </div>
                      <p className="font-sans text-[11px] text-[#888888] mt-1">
                        Prata 925
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#E0E0E0] rounded-[4px] bg-white">
                        <button
                          onClick={() => updateQuantity(item.produto.id, item.quantidade - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#0A101A] hover:bg-[#F5F5F5] transition-colors font-light text-[14px]"
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center font-sans text-[12px] text-[#0A101A]">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.produto.id, item.quantidade + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#0A101A] hover:bg-[#F5F5F5] transition-colors font-light text-[14px]"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Price */}
                      <p className="font-sans text-[13px] font-bold text-[#0A101A]">
                        {(item.produto.preco * item.quantidade).toLocaleString(
                          "pt-BR",
                          { style: "currency", currency: "BRL" }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="px-8 py-6 bg-[#FDFDFD] flex flex-col gap-4 mt-auto">
            {/* Totals */}
            <div className="flex flex-col gap-3 mb-2">
              <div className="flex justify-between items-center">
                <span className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase text-[#888888]">
                  SUBTOTAL
                </span>
                <span className="font-sans text-[13px] font-bold text-[#0A101A]">
                  {cartTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase text-[#888888]">
                  FRETE
                </span>
                <span className="font-sans text-[11px] text-[#666666]">
                  Calcular no checkout
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-sans text-[12px] font-bold tracking-[0.15em] uppercase text-[#0A101A]">
                  TOTAL
                </span>
                <span className="font-sans text-[16px] font-bold text-[#0A101A]">
                  {cartTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <button
              onClick={handleCheckout}
              className="w-full bg-[#0A101A] text-white rounded-[4px] py-4 font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-[#1A2533] transition-colors cursor-pointer group"
            >
              FINALIZAR COMPRA
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-white border border-[#0A101A] text-[#0A101A] rounded-[4px] py-4 font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-[#F5F5F5] transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.01 2.003A9.998 9.998 0 0 0 2.003 12.01c0 1.764.457 3.493 1.332 5.01L2 22l5.127-1.344A9.982 9.982 0 0 0 12.01 21.99h.003c5.517 0 10-4.484 10-10.003s-4.483-10-10.003-10z" fill="currentColor"/>
                <path d="M17.472 14.81c-.274-.138-1.62-.801-1.872-.894-.25-.09-.433-.137-.615.138-.182.274-.707.893-.867 1.077-.16.183-.32.205-.595.068-.274-.137-1.157-.426-2.203-1.36-.814-.726-1.364-1.623-1.523-1.897-.16-.275-.017-.424.12-.56.124-.124.275-.32.41-.482.138-.16.184-.275.275-.458.09-.182.046-.343-.023-.48-.068-.138-.614-1.482-.84-2.03-.22-.533-.443-.46-.614-.468l-.525-.008c-.182 0-.48.068-.732.343-.25.275-.956.936-.956 2.28 0 1.345.98 2.645 1.116 2.828.137.184 1.93 2.946 4.673 4.132.654.282 1.163.45 1.56.577.656.208 1.254.178 1.722.108.525-.078 1.62-.663 1.848-1.303.227-.64.227-1.188.16-1.304-.067-.114-.25-.183-.524-.32z" fill="#FFF"/>
              </svg>
              COMPRAR PELO WHATSAPP
            </button>

            {/* Security Note */}
            <div className="flex items-center gap-2 mt-4 text-[#888888]">
              <span className="material-symbols-outlined font-light text-[14px]">lock</span>
              <p className="font-sans text-[11px]">Compra segura e protegida</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
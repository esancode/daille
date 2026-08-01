"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
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

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        ref={sidebarRef}
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-[420px] bg-surface border-l border-tertiary flex flex-col transition-transform duration-500 ease-premium transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-margin-mobile border-b border-tertiary">
          <h2 className="font-headline-md text-headline-md uppercase text-primary">
            CARRINHO
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity cursor-pointer"
          >
            close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-margin-mobile flex flex-col gap-unit-lg">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-unit-md">
              <span className="material-symbols-outlined text-4xl text-secondary">shopping_bag</span>
              <div>
                <p className="font-headline-md text-headline-md uppercase text-primary">
                  SEU CARRINHO ESTÁ VAZIO
                </p>
                <p className="font-label-caps text-label-caps uppercase text-secondary mt-unit-sm">
                  ADICIONE JOIAS DO CATÁLOGO PARA COMEÇAR.
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
                <div
                  key={item.produto.id}
                  className="flex gap-unit-md pb-unit-md border-b border-tertiary last:border-0 last:pb-0"
                >
                  <Link href={`/produto/${item.produto.id}`} className="w-24 h-32 bg-surface-container overflow-hidden flex-shrink-0 cursor-pointer">
                    <img
                      src={item.produto.imagens?.[0]?.url || "https://images.unsplash.com/photo-1605100804763-247f67b3557e"}
                      alt={item.produto.nome}
                      className="w-full h-full object-cover object-center"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-unit-xs">
                        <Link href={`/produto/${item.produto.id}`} className="font-headline-md text-[14px] uppercase text-primary line-clamp-2 hover:underline cursor-pointer">
                          {item.produto.nome}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.produto.id)}
                          className="material-symbols-outlined text-[18px] text-secondary hover:text-primary transition-colors cursor-pointer"
                        >
                          delete
                        </button>
                      </div>
                      <p className="font-label-caps text-[10px] text-secondary mt-1">
                        COD: {item.produto.codigo}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-unit-sm">
                      <div className="flex items-center border border-tertiary">
                        <button
                          onClick={() =>
                            updateQuantity(item.produto.id, item.quantidade - 1)
                          }
                          className="px-unit-sm py-1 text-primary hover:bg-tertiary hover:text-on-tertiary transition-colors font-headline-md cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-unit-sm font-label-caps text-label-caps text-primary min-w-[24px] text-center">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.produto.id, item.quantidade + 1)
                          }
                          className="px-unit-sm py-1 text-primary hover:bg-tertiary hover:text-on-tertiary transition-colors font-headline-md cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-label-caps text-[14px] font-bold tracking-widest text-primary">
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

        {cart.length > 0 && (
          <div className="p-margin-mobile bg-surface border-t border-tertiary flex flex-col gap-unit-md">
            <div className="flex justify-between items-center mb-unit-xs">
              <span className="font-label-caps text-label-caps uppercase text-secondary">
                SUBTOTAL
              </span>
              <span className="font-headline-md text-[20px] text-primary">
                {cartTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-on-primary border-2 border-primary py-unit-md font-button-text text-button-text uppercase tracking-widest hover:bg-transparent hover:text-primary transition-all active:scale-[0.98] cursor-pointer"
            >
              FINALIZAR COMPRA
            </button>
            <p className="text-center font-label-caps text-[10px] uppercase tracking-widest text-secondary">
              FINALIZAÇÃO E PAGAMENTO VIA WHATSAPP.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
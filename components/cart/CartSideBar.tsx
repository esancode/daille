"use client";

import React, { useEffect, useRef } from "react";
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

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        ref={sidebarRef}
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <h2 className="font-playfair text-[20px] font-medium uppercase tracking-wider text-zinc-900">
            Meu Carrinho
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-zinc-400 hover:text-zinc-600 transition-colors p-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <svg
                className="w-12 h-12 text-zinc-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <div>
                <p className="font-playfair text-[16px] font-medium text-zinc-800 uppercase tracking-wider">
                  Seu carrinho está vazio
                </p>
                <p className="font-sans text-[13px] text-zinc-400 mt-1">
                  Adicione joias do catálogo para começar.
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
                  className="flex gap-4 pb-6 border-b border-zinc-100 last:border-0 last:pb-0"
                >
                  <div className="w-20 h-20 bg-zinc-50 rounded-[4px] overflow-hidden flex-shrink-0 border border-zinc-100">
                    <img
                      src={image}
                      alt={item.produto.nome}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-playfair text-[13px] font-medium uppercase tracking-wider text-zinc-900 line-clamp-1">
                          {item.produto.nome}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.produto.id)}
                          className="text-zinc-300 hover:text-red-500 transition-colors p-0.5"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="font-sans text-[11px] text-zinc-400 mt-0.5">
                        Cod: {item.produto.codigo}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-zinc-200 rounded-[4px]">
                        <button
                          onClick={() =>
                            updateQuantity(item.produto.id, item.quantidade - 1)
                          }
                          className="px-2.5 py-1 text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 text-[12px] font-sans text-zinc-800 min-w-[20px] text-center">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.produto.id, item.quantidade + 1)
                          }
                          className="px-2.5 py-1 text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-sans text-[13px] font-semibold text-zinc-800">
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
          <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-[13px] uppercase tracking-wider text-zinc-500">
                Total Estimado
              </span>
              <span className="font-playfair text-[20px] font-medium text-zinc-900">
                {cartTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <button
              onClick={() => {
                alert("Fluxo do WhatsApp será finalizado na Fase 6!");
              }}
              className="w-full bg-zinc-950 text-white rounded-[4px] py-4 text-[13px] font-sans font-semibold uppercase tracking-widest hover:bg-zinc-900 active:bg-zinc-800 transition-all cursor-pointer text-center"
            >
              Finalizar pelo WhatsApp
            </button>
            <p className="text-center font-sans text-[11px] text-zinc-400">
              A finalização e fechamento da compra serão efetuados via WhatsApp.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
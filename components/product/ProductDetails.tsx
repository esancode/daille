"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Produto } from "@/types";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";

interface ProductDetailsProps {
  produto: Produto;
}

export function ProductDetails({ produto }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const imagens = produto.imagens && produto.imagens.length > 0
    ? produto.imagens
    : [{ id: "fallback", url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop", ordem: 1 }];

  const [selectedImage, setSelectedImage] = useState(imagens[0].url);

  return (
    <div className="w-full bg-white py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-widest text-zinc-400 mb-10">
          <Link href="/" className="hover:text-zinc-800 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-zinc-800 transition-colors">
            Catálogo
          </Link>
          <span>/</span>
          <span className="text-zinc-800 line-clamp-1">{produto.nome}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="flex flex-col gap-4">
            <div className="aspect-square w-full overflow-hidden rounded-[4px] bg-zinc-50 border border-zinc-100 relative">
              <img
                src={selectedImage}
                alt={produto.nome}
                className="w-full h-full object-cover object-center transition-transform duration-300"
              />
            </div>

            {imagens.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {imagens.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.url)}
                    className={`w-20 h-20 bg-zinc-50 rounded-[4px] overflow-hidden border flex-shrink-0 transition-all ${
                      selectedImage === img.url
                        ? "border-zinc-950 scale-95"
                        : "border-zinc-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${produto.nome} detalhe`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  Código: {produto.codigo}
                </span>
                <h1 className="font-playfair text-[28px] md:text-[36px] font-light uppercase tracking-wider text-zinc-950">
                  {produto.nome}
                </h1>
                <p className="font-sans text-[20px] font-medium text-zinc-900 mt-2">
                  {produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>

              <div className="w-full h-[1px] bg-zinc-100" />

              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  Descrição
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-zinc-600 font-light">
                  {produto.descricao}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  Detalhes Técnicos
                </h3>
                <ul className="list-disc pl-5 font-sans text-[13px] leading-relaxed text-zinc-600 font-light flex flex-col gap-1">
                  <li>Material: Prata de Lei 925</li>
                  <li>Acabamento: Polido de Alta Brilho</li>
                  <li>Antialérgico (Livre de Níquel)</li>
                  <li>Garantia Vitalícia do teor do metal</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-10 md:mt-0">
              <Button
                variant="primary"
                onClick={() => addToCart(produto)}
                className="w-full py-4 text-[13px] tracking-widest uppercase"
              >
                Adicionar ao Carrinho
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  alert("Compra individual via WhatsApp será finalizada na Fase 6!");
                }}
                className="w-full py-4 text-[13px] tracking-widest uppercase"
              >
                Comprar pelo WhatsApp
              </Button>
              <p className="text-center font-sans text-[11px] text-zinc-400">
                Peça exclusiva. Disponibilidade garantida para envio imediato.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

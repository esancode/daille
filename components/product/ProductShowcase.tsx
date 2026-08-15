import React from 'react';
import Link from 'next/link';
import { Produto } from '@/types';
import { FadeIn } from '@/components/ui/FadeIn';
import { ProductTag } from '@/components/product/ProductTag';

interface ProductShowcaseProps {
  title: string;
  produtos: Produto[];
  viewAllLink?: string;
}

export function ProductShowcase({ title, produtos, viewAllLink }: ProductShowcaseProps) {
  if (!produtos || produtos.length === 0) return null;

  return (
    <section className="py-8 md:py-12 px-margin-mobile md:px-margin-desktop bg-surface">
      <FadeIn>
        <div className="flex flex-wrap justify-between items-end mb-6 md:mb-8 border-b border-tertiary pb-2 gap-4">
          <h2 className="font-headline-md text-[clamp(16px,5vw,24px)] leading-tight uppercase flex-1 min-w-0 break-words">{title}</h2>
          {viewAllLink && (
            <Link href={viewAllLink} className="font-label-caps text-label-caps hover:opacity-60 transition-opacity flex-shrink-0 mb-1">
              VER TUDO
            </Link>
          )}
        </div>
      </FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
        {produtos.map((produto, index) => {
          const image = produto.imagens && produto.imagens.length > 0 
            ? produto.imagens[0].url 
            : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";
            
          return (
            <FadeIn key={produto.id} delay={index * 100}>
              <Link href={`/produto/${produto.id}`} className="group cursor-pointer block">
                <div className="aspect-[3/4] overflow-hidden mb-unit-md relative bg-surface-container max-h-[380px]">
                  {produto.tag && <ProductTag tag={produto.tag} className="absolute top-2 right-2" />}
                  <img className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" src={image} alt={produto.nome} />
                </div>
                <p className="font-label-caps text-label-caps uppercase text-primary mb-1 line-clamp-2" title={produto.nome}>{produto.nome}</p>
                <p className="font-body-sm text-body-sm font-bold mb-unit-sm">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                <span className="font-label-caps text-label-caps border-b border-transparent group-hover:border-primary transition-all inline-block uppercase text-[10px]">VER DETALHES</span>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

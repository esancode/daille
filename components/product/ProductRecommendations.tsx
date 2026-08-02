import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPopularProducts } from '@/services/recommendations';

export async function ProductRecommendations({ produtoId }: { produtoId: string }) {
  // Num cenário ideal com IA/Muitos dados, buscaríamos produtos similares.
  // Como fallback determinístico e sem IA, vamos trazer os Populares.
  // Em uma implementação mais robusta, essa query poderia ser "onde categoria = x order by popularity"
  let recommendations = await getPopularProducts(5);
  recommendations = recommendations.filter(p => p.id !== produtoId).slice(0, 4);

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mt-24 md:mt-32">
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <h2 className="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg uppercase text-primary tracking-wide">
          Você também pode gostar
        </h2>
        <Link href="/catalogo" className="font-button-text text-button-text text-secondary hover:text-primary transition-colors uppercase border-b border-secondary hover:border-primary pb-1 hidden md:block">
          Ver mais
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-unit-md gap-y-unit-lg">
        {recommendations.map((produto) => (
          <Link href={`/produto/${produto.id}`} key={produto.id} className="group block cursor-pointer">
            <div className="relative aspect-[4/5] bg-surface-container overflow-hidden mb-4">
              {produto.imagens && produto.imagens.length > 0 ? (
                <Image
                  src={produto.imagens[0].url}
                  alt={produto.nome}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-premium"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-tertiary">Sem imagem</div>
              )}
            </div>
            
            <div className="flex flex-col items-start gap-1">
              <span className="font-label-caps text-label-caps text-secondary uppercase">
                {produto.categoria}
              </span>
              <h3 className="font-body-md text-body-md text-primary line-clamp-1 group-hover:opacity-80 transition-opacity">
                {produto.nome}
              </h3>
              <p className="font-body-md text-body-md text-primary mt-1">
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

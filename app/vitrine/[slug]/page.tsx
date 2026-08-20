import React from 'react';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPopularProducts, getTrendingProducts, getFreshProducts } from '@/services/recommendations';
import { getProdutosDestaque } from '@/services/products';
import { FadeIn } from '@/components/ui/FadeIn';
import { ProductTag } from '@/components/product/ProductTag';
import { Produto } from '@/types';

interface VitrineParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VitrineParams): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let title = "Vitrine Exclusiva";
  if (slug === 'em-alta') title = "Em Alta - Tendências";
  if (slug === 'novidades') title = "Novidades - Acabaram de Chegar";
  if (slug === 'popular' || slug === 'mais-procurados') title = "Mais Desejados - Os favoritos";

  return {
    title: `${title} | Daille`,
    description: `Descubra as joias em Prata 925 da coleção ${title}. Peças selecionadas exclusivamente para o seu estilo.`,
  };
}

export default async function VitrinePage({ params }: VitrineParams) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Renderiza a quantidade ideal de produtos (ex: 24)
  const LIMIT = 24;
  let produtos: Produto[] = [];
  let title = "Nossa Seleção";
  let description = "Descubra as joias perfeitas para você.";

  if (slug === 'em-alta') {
    title = "EM ALTA";
    description = "As joias que estão dominando as tendências neste momento.";
    produtos = await getTrendingProducts(LIMIT);
  } else if (slug === 'novidades') {
    title = "NOVIDADES";
    description = "Os últimos lançamentos em Prata 925 que acabaram de chegar.";
    produtos = await getFreshProducts(LIMIT);
  } else if (slug === 'popular' || slug === 'mais-procurados') {
    title = "MAIS DESEJADOS";
    description = "Os maiores clássicos e favoritos absolutos das nossas clientes.";
    produtos = await getPopularProducts(LIMIT);
  }

  // Fallback elegante se estiver vazio (banco novo)
  if (produtos.length === 0) {
    const destaques = await getProdutosDestaque();
    produtos = destaques.slice(0, LIMIT);
  }

  return (
    <main className="bg-surface min-h-screen px-margin-mobile md:px-margin-desktop py-12 md:py-20">
      {/* Breadcrumbs */}
      <div className="text-[9px] uppercase tracking-widest text-secondary mb-8 md:mb-12 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">INÍCIO</Link>
        <span className="text-tertiary">/</span>
        <span className="text-primary truncate">VITRINE</span>
        <span className="text-tertiary">/</span>
        <span className="text-primary truncate">{title}</span>
      </div>

      {/* Header */}
      <FadeIn className="mb-12 md:mb-16 border-b border-tertiary pb-8">
        <h1 className="font-headline-lg text-[clamp(28px,8vw,40px)] leading-tight uppercase text-primary mb-4 break-words">{title}</h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-2xl">{description}</p>
      </FadeIn>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-16">
        {produtos.map((produto, index) => {
          const image = produto.imagens && produto.imagens.length > 0 
            ? produto.imagens[0].url 
            : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";
            
          return (
            <FadeIn key={produto.id} delay={index * 50}>
              <Link href={`/produto/${produto.id}`} className="group cursor-pointer flex flex-col h-full">
                <div className="aspect-[3/4] overflow-hidden mb-unit-md relative bg-surface-container shrink-0">
                  {produto.tag && <ProductTag tag={produto.tag} className="absolute top-2 right-2" />}
                  <img className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" src={image} alt={produto.nome} />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="font-label-caps text-label-caps uppercase text-primary mb-1 line-clamp-2 break-words" title={produto.nome}>{produto.nome}</p>
                  <p className="font-body-sm text-body-sm font-bold mb-1 text-primary">
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                    {produto.preco_prazo && produto.parcelas && <span className="text-[9px] font-normal ml-1 lowercase text-secondary">à vista</span>}
                  </p>
                  {produto.preco_prazo && produto.parcelas && (
                    <p className="text-[10px] text-secondary font-medium mb-unit-sm">
                      ou {produto.parcelas}x R$ {(produto.preco_prazo / produto.parcelas).toFixed(2).replace('.', ',')}
                    </p>
                  )}
                  {!produto.preco_prazo && <div className="mb-unit-sm" />}
                  <div className="mt-auto pt-2">
                    <span className="font-label-caps text-label-caps border-b border-transparent group-hover:border-primary transition-all inline-block uppercase text-[10px]">VER DETALHES</span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      {/* Pagination Falsa Elegante */}
      {produtos.length === LIMIT && (
        <div className="flex justify-center border-t border-tertiary pt-12">
          <button className="btn-premium font-button-text text-button-text bg-surface text-primary border border-primary px-8 py-3 uppercase hover:opacity-70 transition-opacity">
            CARREGAR MAIS
          </button>
        </div>
      )}
    </main>
  );
}

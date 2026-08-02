import Image from 'next/image';
import Link from 'next/link';
import { getProdutos } from '@/services/products';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { FadeIn } from '@/components/ui/FadeIn';
import { ProductTag } from "@/components/product/ProductTag";

import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ category?: string, sort?: string, q?: string, page?: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category;
  
  const title = category 
    ? `${category.toUpperCase()} | Daille` 
    : "Catálogo Completo | Todas as Joias";
    
  const description = category
    ? `Explore nossa coleção exclusiva de ${category} em Prata 925. Peças autênticas e atemporais.`
    : "Explore o catálogo completo da Daille. Joias em Prata 925 certificada com garantia vitalícia.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Catalogo({ searchParams }: { searchParams: Promise<{ category?: string, sort?: string, q?: string, page?: string }> }) {
  const resolvedParams = await searchParams;
  let produtos = await getProdutos();
  
  if (resolvedParams.category) {
    const cat = resolvedParams.category.toLowerCase();
    produtos = produtos.filter(p => p.categoria.toLowerCase() === cat);
  }

  if (resolvedParams.q) {
    const query = resolvedParams.q.toLowerCase();
    produtos = produtos.filter(p => p.nome.toLowerCase().includes(query) || p.descricao?.toLowerCase().includes(query));
  }

  if (resolvedParams.sort === 'price_asc') {
    produtos = produtos.sort((a, b) => a.preco - b.preco);
  } else if (resolvedParams.sort === 'price_desc') {
    produtos = produtos.sort((a, b) => b.preco - a.preco);
  }

  // Pagination Logic
  const ITEMS_PER_PAGE = 8;
  const currentPage = parseInt(resolvedParams.page || '1', 10);
  const totalPages = Math.ceil(produtos.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedProdutos = produtos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Helper function to generate URL for pagination
  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (resolvedParams.category) params.set('category', resolvedParams.category);
    if (resolvedParams.sort) params.set('sort', resolvedParams.sort);
    if (resolvedParams.q) params.set('q', resolvedParams.q);
    if (pageNumber > 1) params.set('page', pageNumber.toString());
    
    return `/catalogo?${params.toString()}`;
  };

  const categoryName = resolvedParams.category ? resolvedParams.category.toUpperCase() : "TODAS AS JOIAS";
  const productCount = produtos.length;

  return (
    <div className="bg-surface min-h-screen">
      {/* Page Title & Filter Bar */}
      <section className="border-b border-tertiary mb-unit-lg">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-unit-lg">
          {/* Breadcrumbs */}
          <div className="text-[9px] uppercase tracking-widest text-secondary mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">INÍCIO</Link>
            <span className="text-tertiary">/</span>
            {resolvedParams.category ? (
              <>
                <Link href="/catalogo" className="hover:text-primary transition-colors">CATÁLOGO</Link>
                <span className="text-tertiary">/</span>
                <span className="text-primary truncate">{categoryName}</span>
              </>
            ) : (
              <span className="text-primary truncate">CATÁLOGO</span>
            )}
          </div>
          <div className="flex flex-wrap justify-between items-end gap-4 pb-unit-sm">
            <div className="flex flex-wrap items-baseline gap-3 min-w-0 flex-1">
              <h1 className="font-headline-md uppercase text-[clamp(18px,6vw,28px)] leading-tight tracking-widest text-primary break-words">
                {categoryName}
              </h1>
              <span className="font-body-sm text-[12px] md:text-sm text-secondary tracking-widest">
                ({productCount} {productCount === 1 ? 'PRODUTO' : 'PRODUTOS'})
              </span>
            </div>
            <div className="flex items-center gap-unit-sm text-primary flex-shrink-0">
              <CatalogFilters />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-section-gap">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          {paginatedProdutos.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body-md text-secondary text-lg uppercase tracking-widest">Nenhuma joia encontrada.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-gutter gap-y-section-gap">
            {paginatedProdutos.map((item, index) => (
              <FadeIn key={item.id} delay={index * 50} className="flex flex-col group">
                <Link href={`/produto/${item.id}`} className="relative aspect-square overflow-hidden mb-unit-md bg-surface-container max-h-[380px]">
                  {item.tag && <ProductTag tag={item.tag} className="absolute top-2 right-2" />}
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" 
                    src={item.imagens && item.imagens.length > 0 ? item.imagens[0].url : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"} 
                    alt={item.nome} 
                  />
                </Link>
                <div className="flex flex-col gap-unit-xs">
                  <Link href={`/produto/${item.id}`} className="font-label-caps text-label-caps uppercase text-primary hover:underline line-clamp-1">
                    {item.nome}
                  </Link>
                  <p className="font-body-sm text-body-sm font-bold text-primary">R$ {item.preco.toFixed(2).replace('.', ',')}</p>
                  <button className="mt-unit-sm btn-premium bg-primary text-on-primary py-unit-sm font-button-text text-button-text uppercase w-full border border-primary">
                    COMPRAR
                  </button>
                </div>
              </FadeIn>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="pb-section-gap">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex justify-center items-center gap-unit-sm">
            {/* Prev Button */}
            {safePage > 1 ? (
              <Link href={getPageUrl(safePage - 1)} className="w-10 h-10 border border-tertiary flex items-center justify-center hover:bg-tertiary hover:text-on-tertiary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </Link>
            ) : (
              <button disabled className="w-10 h-10 border border-tertiary flex items-center justify-center opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
            )}

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === safePage;
              return (
                <Link 
                  key={pageNum} 
                  href={getPageUrl(pageNum)} 
                  className={`w-10 h-10 border border-tertiary flex items-center justify-center font-label-caps text-label-caps transition-colors cursor-pointer ${
                    isActive ? 'bg-tertiary text-on-tertiary' : 'hover:bg-tertiary hover:text-on-tertiary'
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}

            {/* Next Button */}
            {safePage < totalPages ? (
              <Link href={getPageUrl(safePage + 1)} className="w-10 h-10 border border-tertiary flex items-center justify-center hover:bg-tertiary hover:text-on-tertiary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            ) : (
              <button disabled className="w-10 h-10 border border-tertiary flex items-center justify-center opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

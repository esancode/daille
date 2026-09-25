import Image from 'next/image';
export const revalidate = 60;
import Link from 'next/link';
import { getProdutos } from '@/services/products';
import { CatalogSidebar } from '@/components/catalog/CatalogSidebar';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';

import { ProductTag } from "@/components/product/ProductTag";
import { FavoriteIcon, CartIcon } from '@/components/product/ProductIcons';

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
  const ITEMS_PER_PAGE = 12;
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
    <div className="bg-page-bg min-h-screen flex flex-col">
      {/* Hero Banner Catalog */}
      <section className="w-full flex flex-col md:flex-row min-h-[350px] md:min-h-[450px]">
        {/* Left Side: Dark Blue Text Area */}
        <div className="w-full md:w-1/2 bg-[#06152B] flex flex-col items-center justify-center py-16 px-8 relative">
          <div className="w-full max-w-[400px] flex flex-col items-start relative z-10">
            <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#E0E0E0] uppercase mb-4 opacity-80">
              NOSSA COLEÇÃO
            </span>
            
            <h2 className="font-cinzel text-white text-[38px] md:text-[50px] lg:text-[60px] leading-[1.05] mb-6">
              TODAS AS JOIAS
            </h2>
            
            <p className="font-sans text-[13px] md:text-[14px] text-[#E0E0E0] font-medium leading-relaxed opacity-90 max-w-[340px]">
              Descubra peças únicas em prata 925, cuidadosamente selecionadas para realçar sua beleza em todos os momentos.
            </p>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center md:bg-[center_20%]"
            style={{ backgroundImage: "url('/imagemherocompleta.jfif')" }}
          ></div>
        </div>
      </section>

      {/* Catalog Layout */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-20 flex flex-col md:flex-row gap-8 md:gap-16">
        
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A101A]">
            {productCount} RESULTADOS
          </span>
          <CatalogFilters />
        </div>

        {/* Sidebar (Desktop) */}
        <div className="hidden md:block">
          <CatalogSidebar />
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="hidden md:flex justify-between items-center mb-10 pb-4">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A101A]">
              {productCount} RESULTADOS
            </span>
          </div>

          {/* Grid */}
          {paginatedProdutos.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
              {paginatedProdutos.map((produto, i) => {
                const image = produto.imagens && produto.imagens.length > 0 
                  ? produto.imagens[0].url 
                  : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";
                
                return (
                  <div key={produto.id} className="group flex flex-col h-full">
                    {/* Image Container */}
                    <div className="aspect-square overflow-hidden mb-4 relative bg-[#F5F5F5] shrink-0 flex items-center justify-center">
                      <FavoriteIcon produto={produto} />
                      <Link href={`/produto/${produto.id}`} className="w-full h-full block">
                        <img 
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                          src={image} 
                          alt={produto.nome} 
                        />
                      </Link>
                    </div>

                    {/* Text Data Container */}
                    <div className="flex flex-col flex-1 px-1">
                      <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#666666] uppercase mb-1.5">
                        {produto.categoria}
                      </span>
                      <Link href={`/produto/${produto.id}`}>
                        <p className="font-sans text-[13px] md:text-[14px] text-[#333333] mb-3 line-clamp-2 hover:underline" title={produto.nome}>
                          {produto.nome}
                        </p>
                      </Link>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <p className="font-sans text-[13px] md:text-[15px] font-bold text-[#0A101A]">
                          R$ {produto.preco.toFixed(2).replace('.', ',')}
                        </p>
                        <CartIcon produto={produto} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-[48px] text-[#E0E0E0] mb-4">search_off</span>
              <p className="font-sans text-[14px] text-[#666666] max-w-sm">Nenhum produto encontrado para os filtros selecionados.</p>
              <Link href="/catalogo" className="mt-6 border border-[#0A101A] text-[#0A101A] px-6 py-2 rounded-full font-sans text-[11px] font-bold tracking-[0.1em] hover:bg-[#0A101A] hover:text-white transition-colors">
                VER TODOS
              </Link>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 pt-8 border-t border-[#E0E0E0] flex justify-center items-center gap-2">
              {safePage > 1 && (
                <Link href={getPageUrl(safePage - 1)} className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#0A101A] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </Link>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link 
                  key={p} 
                  href={getPageUrl(p)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-[12px] font-bold transition-all ${p === safePage ? 'bg-[#0A101A] text-white' : 'text-[#666666] hover:bg-[#F5F5F5] hover:text-[#0A101A]'}`}
                >
                  {p}
                </Link>
              ))}

              {safePage < totalPages && (
                <Link href={getPageUrl(safePage + 1)} className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#0A101A] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </Link>
              )}
            </div>
          )}

        </div>
      </section>

      {/* Banner 4: Prata 925 */}
      <section className="w-full relative min-h-[350px] md:min-h-[450px] flex items-center overflow-hidden bg-[#0A101A]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-[center_top] md:bg-[center_30%] bg-[url('/banners/banner2mobile.jfif')] md:bg-[url('/banners/imagemcorrigida.jfif')]" 
        ></div>

        {/* Shadow Overlay for text readability (in case image is bright) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A101A]/90 via-[#0A101A]/40 to-transparent"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 flex items-center">
          <div className="flex flex-col items-start relative py-16 md:py-20 w-full max-w-xl">
            
            <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#E0E0E0] uppercase mb-4 opacity-90">
              QUALIDADE E AUTENTICIDADE
            </span>

            <h2 className="font-cinzel text-white flex flex-col items-start leading-[1.05] mb-6 drop-shadow-sm">
              <span className="text-[32px] md:text-[45px] lg:text-[50px] tracking-wide whitespace-nowrap">PRATA 925</span>
              <span className="text-[32px] md:text-[45px] lg:text-[50px] tracking-wide whitespace-nowrap">É PARA SEMPRE</span>
            </h2>

            <p className="font-sans text-[13px] md:text-[14px] text-[#E0E0E0] font-medium mb-10 max-w-[340px] md:max-w-[400px] leading-relaxed opacity-90 drop-shadow-sm">
              Todas as nossas joias são produzidas em prata 925, com garantia de autenticidade e qualidade.
            </p>

            <Link href="/sobre" className="border border-white/60 text-white px-8 py-3.5 rounded-full font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] flex items-center gap-3 hover:bg-white hover:text-[#0A101A] transition-all group backdrop-blur-sm bg-black/10">
              SAIBA MAIS
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}

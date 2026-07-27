import Image from 'next/image';
import Link from 'next/link';
import { getProdutos } from '@/services/products';
import { SortSelect } from './SortSelect';
import { FadeIn } from '@/components/ui/FadeIn';

export default async function Catalogo({ searchParams }: { searchParams: Promise<{ category?: string, sort?: string }> }) {
  const resolvedParams = await searchParams;
  let produtos = await getProdutos();
  
  if (resolvedParams.category) {
    const cat = resolvedParams.category.toLowerCase();
    produtos = produtos.filter(p => p.categoria.toLowerCase() === cat);
  }

  if (resolvedParams.sort === 'price_asc') {
    produtos = produtos.sort((a, b) => a.preco - b.preco);
  } else if (resolvedParams.sort === 'price_desc') {
    produtos = produtos.sort((a, b) => b.preco - a.preco);
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Page Title & Filter Bar */}
      <section className="border-b border-tertiary">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-unit-lg">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase mb-unit-lg">
            TODAS AS JOIAS
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center py-unit-sm gap-unit-md">
            <div className="flex gap-unit-md overflow-x-auto py-2">
              <Link href="/catalogo?category=aneis" className="font-label-caps text-label-caps uppercase whitespace-nowrap text-primary opacity-40 hover:opacity-100 cursor-pointer">ANÉIS</Link>
              <Link href="/catalogo?category=colares" className="font-label-caps text-label-caps uppercase whitespace-nowrap text-primary opacity-40 hover:opacity-100 cursor-pointer">COLARES</Link>
              <Link href="/catalogo?category=brincos" className="font-label-caps text-label-caps uppercase whitespace-nowrap text-primary opacity-40 hover:opacity-100 cursor-pointer">BRINCOS</Link>
              <Link href="/catalogo?category=pulseiras" className="font-label-caps text-label-caps uppercase whitespace-nowrap text-primary opacity-40 hover:opacity-100 cursor-pointer">PULSEIRAS</Link>
            </div>
            <div className="flex items-center gap-unit-sm pt-unit-sm md:pt-0 text-primary">
              <SortSelect />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-section-gap">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-gutter gap-y-section-gap">
          {produtos.map((item, index) => (
            <FadeIn key={item.id} delay={index * 50} className="flex flex-col group">
              <Link href={`/produto/${item.id}`} className="relative aspect-square overflow-hidden mb-unit-md bg-surface-container">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105 filter grayscale" 
                  src={item.imagens && item.imagens.length > 0 ? item.imagens[0].url : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"} 
                  alt={item.nome} 
                />
              </Link>
              <div className="flex flex-col gap-unit-xs">
                <Link href={`/produto/${item.id}`} className="font-label-caps text-label-caps uppercase text-primary hover:underline">
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
        </div>
      </section>

      {/* Pagination */}
      <section className="pb-section-gap">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex justify-center items-center gap-unit-sm">
          <button className="w-10 h-10 border border-tertiary flex items-center justify-center hover:bg-tertiary hover:text-on-tertiary transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-primary">
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
          <button className="w-10 h-10 border border-tertiary bg-tertiary text-on-tertiary flex items-center justify-center font-label-caps text-label-caps hover:bg-tertiary/90 transition-colors">1</button>
          <button className="w-10 h-10 border border-tertiary flex items-center justify-center font-label-caps text-label-caps hover:bg-tertiary hover:text-on-tertiary transition-colors">2</button>
          <button className="w-10 h-10 border border-tertiary flex items-center justify-center font-label-caps text-label-caps hover:bg-tertiary hover:text-on-tertiary transition-colors">3</button>
          <button className="w-10 h-10 border border-tertiary flex items-center justify-center hover:bg-tertiary hover:text-on-tertiary transition-colors">
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  );
}

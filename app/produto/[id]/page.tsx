import Image from 'next/image';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { getProdutoById, getProdutosDestaque } from '@/services/products';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductAccordion } from '@/components/product/ProductAccordion';
import { ProductTag } from '@/components/product/ProductTag';
import { FavoriteButton } from '@/components/product/FavoriteButton';
import { FadeIn } from '@/components/ui/FadeIn';
import { ProductViewTracker } from '@/components/product/ProductViewTracker';
import { ProductRecommendations } from '@/components/product/ProductRecommendations';
import { ProductShowcase } from '@/components/product/ProductShowcase';
import { getTrendingProducts, getFreshProducts } from '@/services/recommendations';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const produto = await getProdutoById(resolvedParams.id);
  
  if (!produto) {
    return {
      title: 'Produto não encontrado | Daille',
    };
  }

  const imagemPrincipal = produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].url : "/hero.png";
  const title = `${produto.nome} | Daille`;
  
  return {
    title,
    description: produto.descricao || `Compre ${produto.nome} em Prata 925 na Daille.`,
    openGraph: {
      title,
      description: produto.descricao || `Compre ${produto.nome} em Prata 925 na Daille.`,
      images: [
        {
          url: imagemPrincipal,
          width: 800,
          height: 800,
          alt: produto.nome,
        },
      ],
    },
  };
}

export default async function Produto({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const produto = await getProdutoById(resolvedParams.id);
  const destaques = await getProdutosDestaque();
  
  let trending = await getTrendingProducts(4);
  let fresh = await getFreshProducts(4);
  
  if (trending.length === 0) trending = destaques.slice(0, 4);
  if (fresh.length === 0) fresh = destaques.slice(4, 8).length > 0 ? destaques.slice(4, 8) : destaques.slice(0, 4);

  if (!produto) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline-lg text-headline-lg uppercase text-primary mb-4">Produto não encontrado</h1>
          <Link href="/catalogo" className="font-button-text text-button-text bg-primary text-on-primary px-6 py-3 uppercase">
            Voltar ao Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const imagemPrincipal = produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].url : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="bg-surface min-h-screen overflow-x-hidden">
      <main className="w-full px-margin-mobile md:px-margin-desktop pt-12 md:pt-20 pb-24 md:pb-32">
        <ProductViewTracker produtoId={produto.id} />
        {/* Breadcrumbs */}
        <div className="text-[9px] uppercase tracking-widest text-secondary mb-8 md:mb-12 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">INÍCIO</Link>
          <span className="text-tertiary">/</span>
          <Link href="/catalogo" className="hover:text-primary transition-colors">CATÁLOGO</Link>
          <span className="text-tertiary">/</span>
          <span className="text-primary truncate max-w-[200px] md:max-w-md">{produto.nome}</span>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-unit-xl items-start">
          {/* Hero Image */}
          <div className="w-full">
            <ProductImageGallery 
              images={produto.imagens || []} 
              altText={produto.nome} 
            />
          </div>

          {/* Product Info */}
          <FadeIn direction="right" delay={200} className="flex flex-col justify-center h-full space-y-unit-md w-full mt-8 md:mt-0">
            <div className="space-y-unit-xs">
              {produto.tag && (
                <div className="mb-2">
                  <ProductTag tag={produto.tag} className="inline-block" />
                </div>
              )}
              <h1 className="text-2xl md:text-3xl uppercase leading-none text-primary font-bold tracking-tight">{produto.nome}</h1>
              <div className="flex items-center justify-between">
                <p className="text-lg md:text-xl font-bold text-primary">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                <FavoriteButton produto={produto} />
              </div>
            </div>
            
            <ProductActions produto={produto} />

            <ProductAccordion descricao={produto.descricao} />
          </FadeIn>
        </div>

        {/* You May Also Like Section (Recommendations) */}
        <ProductRecommendations produtoId={produto.id} />

      </main>

      {/* Middle Banner */}
      <div className="w-full bg-tertiary py-unit-lg px-margin-mobile border-y border-outline-variant overflow-hidden">
        <FadeIn direction="none" className="max-w-4xl mx-auto text-center">
          <h3 className="font-headline-md text-headline-md text-on-tertiary uppercase leading-tight tracking-widest text-[20px] md:text-[28px]">
            PRATA 925 CERTIFICADA. O TOQUE DE LUXO QUE VOCÊ MERECE.
          </h3>
        </FadeIn>
      </div>

      <ProductShowcase title="EM ALTA" produtos={trending} viewAllLink="/vitrine/em-alta" />
      <ProductShowcase title="NOVIDADES" produtos={fresh} viewAllLink="/vitrine/novidades" />

      {/* Galeria de Estilo Section */}
      <section className="px-margin-mobile md:px-margin-desktop py-unit-lg border-t border-tertiary">
        <div className="mb-unit-md">
          <h3 className="font-headline-md text-headline-md uppercase text-center text-primary">GALERIA DE ESTILO</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="space-y-gutter">
            <FadeIn direction="left" delay={100} className="aspect-[16/9] overflow-hidden border border-tertiary relative group">
              <img className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop" alt="Look 1" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-on-tertiary font-label-caps tracking-widest cursor-pointer underline-slide">VER LOOK</span>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={200} className="aspect-square overflow-hidden border border-tertiary relative group">
              <img className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop" alt="Look 2" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-on-tertiary font-label-caps tracking-widest cursor-pointer underline-slide">VER LOOK</span>
              </div>
            </FadeIn>
          </div>
          <div className="space-y-gutter">
            <FadeIn direction="right" delay={100} className="aspect-square overflow-hidden border border-tertiary relative group">
              <img className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop" alt="Look 3" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-on-tertiary font-label-caps tracking-widest cursor-pointer underline-slide">VER LOOK</span>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={200} className="aspect-[16/9] overflow-hidden border border-tertiary relative group">
              <img className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop" alt="Look 4" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-on-tertiary font-label-caps tracking-widest cursor-pointer underline-slide">VER LOOK</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}

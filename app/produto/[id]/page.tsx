import Image from 'next/image';
import Link from 'next/link';
import { getProdutoById, getProdutosDestaque } from '@/services/products';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductActions } from '@/components/product/ProductActions';
import { FadeIn } from '@/components/ui/FadeIn';

export default async function Produto({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const produto = await getProdutoById(resolvedParams.id);
  const destaques = await getProdutosDestaque();
  const displayProducts = destaques.filter(p => p.id !== resolvedParams.id).slice(0, 4);

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
      <main className="w-full px-margin-mobile md:px-margin-desktop py-unit-lg">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-unit-lg items-start">
          {/* Hero Image */}
          <div className="w-full">
            <ProductImageGallery 
              images={produto.imagens || []} 
              altText={produto.nome} 
            />
          </div>

          {/* Product Info */}
          <FadeIn direction="right" delay={200} className="flex flex-col justify-center h-full space-y-unit-md w-full">
            <div className="space-y-unit-xs">
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase leading-none text-primary">{produto.nome}</h1>
              <p className="font-headline-md text-headline-md font-bold text-primary">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
            </div>
            
            <p className="font-body-lg text-body-lg text-secondary max-w-xl">
              {produto.descricao}
            </p>

            <ProductActions produto={produto} />
          </FadeIn>
        </div>
      </main>

      {/* Middle Banner */}
      <div className="w-full bg-tertiary py-unit-lg px-margin-mobile border-y border-outline-variant overflow-hidden">
        <FadeIn direction="none" className="max-w-4xl mx-auto text-center">
          <h3 className="font-headline-md text-headline-md text-on-tertiary uppercase leading-tight md:text-[40px]">
            PRATA 925 CERTIFICADA. O TOQUE DE LUXO QUE VOCÊ MERECE.
          </h3>
        </FadeIn>
      </div>

      {/* Mais Desejados Grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-unit-lg">
        <div className="mb-unit-md">
          <h3 className="font-headline-md text-headline-md uppercase text-center md:text-left text-primary">MAIS DESEJADOS</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {displayProducts.map((produto, index) => {
            const image = produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].url : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";
            return (
              <FadeIn key={produto.id} delay={index * 100}>
                <Link href={`/produto/${produto.id}`} className="group cursor-pointer block">
                  <div className="aspect-[3/4] overflow-hidden mb-unit-md border border-outline-variant">
                    <img className="w-full h-full object-cover grayscale transition-transform duration-700 ease-premium group-hover:scale-105" src={image} alt={produto.nome} />
                  </div>
                  <p className="font-label-caps text-label-caps uppercase text-primary mb-1">{produto.nome}</p>
                  <p className="font-body-sm text-body-sm font-bold mb-unit-sm">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                  <span className="font-label-caps text-label-caps border-b border-transparent group-hover:border-primary transition-all inline-block uppercase text-[10px]">VER DETALHES</span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Galeria de Estilo Section */}
      <section className="px-margin-mobile md:px-margin-desktop py-unit-lg border-t border-tertiary">
        <div className="mb-unit-md">
          <h3 className="font-headline-md text-headline-md uppercase text-center text-primary">GALERIA DE ESTILO</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="space-y-gutter">
            <FadeIn direction="left" delay={100} className="aspect-[16/9] overflow-hidden border border-tertiary relative group">
              <img className="w-full h-full object-cover grayscale transition-transform duration-700 ease-premium group-hover:scale-105" src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop" alt="Look 1" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-on-tertiary font-label-caps tracking-widest cursor-pointer underline-slide">VER LOOK</span>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={200} className="aspect-square overflow-hidden border border-tertiary relative group">
              <img className="w-full h-full object-cover grayscale transition-transform duration-700 ease-premium group-hover:scale-105" src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop" alt="Look 2" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-on-tertiary font-label-caps tracking-widest cursor-pointer underline-slide">VER LOOK</span>
              </div>
            </FadeIn>
          </div>
          <div className="space-y-gutter">
            <FadeIn direction="right" delay={100} className="aspect-square overflow-hidden border border-tertiary relative group">
              <img className="w-full h-full object-cover grayscale transition-transform duration-700 ease-premium group-hover:scale-105" src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop" alt="Look 3" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-on-tertiary font-label-caps tracking-widest cursor-pointer underline-slide">VER LOOK</span>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={200} className="aspect-[16/9] overflow-hidden border border-tertiary relative group">
              <img className="w-full h-full object-cover grayscale transition-transform duration-700 ease-premium group-hover:scale-105" src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop" alt="Look 4" />
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

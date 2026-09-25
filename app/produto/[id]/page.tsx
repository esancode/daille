import Image from 'next/image';
export const revalidate = 60;
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { getProdutoById, getProdutosDestaque } from '@/services/products';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductActions } from '@/components/product/ProductActions';
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

  const [destaques, trendingRes, freshRes] = await Promise.all([
    getProdutosDestaque(),
    getTrendingProducts(4),
    getFreshProducts(4)
  ]);

  let trending = trendingRes;
  let fresh = freshRes;

  if (trending.length === 0) trending = destaques.slice(0, 4);
  if (fresh.length === 0) fresh = destaques.slice(4, 8).length > 0 ? destaques.slice(4, 8) : destaques.slice(0, 4);

  const imagemPrincipal = produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].url : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="bg-surface min-h-screen overflow-x-hidden">
      <main className="w-full px-margin-mobile md:px-margin-desktop pt-12 md:pt-16 pb-8 md:pb-12">
        <ProductViewTracker produtoId={produto.id} />
        <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start w-full max-w-[1200px] mx-auto mt-4">
          <div className="w-full relative flex flex-col gap-6 lg:sticky lg:top-32">
            <ProductImageGallery 
              images={produto.imagens || []} 
              altText={produto.nome} 
              produto={produto}
            />
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col w-full">
            
            <div className="mb-6">
              <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] text-[#0A101A] uppercase mb-3 block">
                COLEÇÃO ATEMPORAL
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-[32px] uppercase leading-none text-[#0A101A] font-bold tracking-tight mb-6">
                {produto.nome}
              </h1>
              
              <div className="mb-6">
                <p className="text-xl md:text-2xl font-sans text-[#0A101A]">
                  R$ {produto.preco.toFixed(2).replace('.', ',')}
                </p>
                {produto.preco_prazo && produto.parcelas ? (
                  <p className="text-[13px] text-[#666666] font-sans mt-1">
                    ou em até {produto.parcelas}x de R$ {(produto.preco_prazo / produto.parcelas).toFixed(2).replace('.', ',')} no cartão
                  </p>
                ) : (
                  <p className="text-[13px] text-[#666666] font-sans mt-1">
                    ou até 12x no cartão
                  </p>
                )}
              </div>

              {produto.descricao && (
                <div className="text-[#666666] font-sans text-[14px] leading-relaxed mb-8">
                  {produto.descricao}
                </div>
              )}
            </div>

            {/* Benefits Icons Grid */}
            <div className="grid grid-cols-4 gap-4 mb-10 pb-10 border-b border-[#E0E0E0]/0">
              <div className="flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-[#0A101A] text-[28px] font-light">diamond</span>
                <span className="font-sans text-[10px] text-[#0A101A] uppercase tracking-wider">Prata 925 legítima</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-[#0A101A] text-[28px] font-light">flare</span>
                <span className="font-sans text-[10px] text-[#0A101A] uppercase tracking-wider">Zircônia de alto brilho</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-[#0A101A] text-[28px] font-light">spa</span>
                <span className="font-sans text-[10px] text-[#0A101A] uppercase tracking-wider">Hipoalergênico</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-[#0A101A] text-[28px] font-light">workspace_premium</span>
                <span className="font-sans text-[10px] text-[#0A101A] uppercase tracking-wider">Garantia vitalícia</span>
              </div>
            </div>
            
            <ProductActions produto={produto} />
          </div>
        </div>
      </main>

      <div className="w-full bg-[#FDFDFD] pt-6 pb-16">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[28px] text-[#0A101A] font-light">local_shipping</span>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-bold tracking-[0.15em] text-[#0A101A] uppercase">ENTREGA SEGURA</span>
              <span className="font-sans text-[13px] text-[#666666]">Em todo o Brasil</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[28px] text-[#0A101A] font-light">support_agent</span>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-bold tracking-[0.15em] text-[#0A101A] uppercase">ATENDIMENTO ESPECIALIZADO</span>
              <span className="font-sans text-[13px] text-[#666666]">Segunda a Sexta - 8h às 18h</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[28px] text-[#0A101A] font-light">lock</span>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-bold tracking-[0.15em] text-[#0A101A] uppercase">PAGAMENTO SEGURO</span>
              <span className="font-sans text-[13px] text-[#666666]">Diversas formas de pagamento</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ProductShowcase title="VOCÊ TAMBÉM PODE GOSTAR" produtos={trending} viewAllLink="/catalogo" />
      </div>
    </div>
  );
}

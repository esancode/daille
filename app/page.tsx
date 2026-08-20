import Image from 'next/image';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
import Link from 'next/link';
import { getProdutosDestaque } from '@/services/products';
import { getPopularProducts, getTrendingProducts, getFreshProducts } from '@/services/recommendations';
import { FadeIn } from '@/components/ui/FadeIn';
import { ProductShowcase } from '@/components/product/ProductShowcase';

export default async function Home() {
  const populares = await getPopularProducts(4);
  const trending = await getTrendingProducts(4);
  const fresh = await getFreshProducts(4);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <Link href="/catalogo" className="block cursor-pointer group">
        <section className="relative w-full min-h-[707px] flex flex-col md:flex-row items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" 
              style={{ backgroundImage: "url('/hero_horizontal.png')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none"></div>
          </div>
          <FadeIn delay={200} className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-start px-margin-mobile md:px-margin-desktop py-section-gap bg-transparent">
            {/* Títulos Anteriores Guardados... */}
            <div className="flex flex-col items-start">
              <h1 className="text-white mb-5 drop-shadow-sm flex flex-col items-start">
                <span className="font-playfair text-[60px] md:text-[90px] leading-[0.85] -ml-1">
                  Essência
                </span>
                <span className="font-sans text-[26px] md:text-[34px] font-light tracking-[0.02em] opacity-95 mt-3 md:mt-4">
                  da prata 925
                </span>
              </h1>
              <p className="font-sans text-[15px] md:text-[17px] text-white/85 font-light mb-8 max-w-lg tracking-wide drop-shadow-sm">
                Minimalismo atemporal para um estilo autêntico.
              </p>
              <span className="font-sans text-[12px] md:text-[13px] font-bold uppercase tracking-[0.15em] text-white border-b-[1.5px] border-white pb-1 hover:opacity-70 transition-opacity inline-block drop-shadow-sm cursor-pointer">
                VER A COLEÇÃO
              </span>
            </div>
          </FadeIn>
        </section>
      </Link>

      <ProductShowcase title="EM ALTA (TENDÊNCIAS)" produtos={trending} viewAllLink="/vitrine/em-alta" />
      <ProductShowcase title="MAIS DESEJADOS" produtos={populares} viewAllLink="/vitrine/mais-procurados" />
      <ProductShowcase title="NOVIDADES" produtos={fresh} viewAllLink="/vitrine/novidades" />

      {/* Middle Banner */}
      <div className="w-full bg-tertiary py-unit-lg px-margin-mobile border-y border-outline-variant overflow-hidden">
        <FadeIn direction="none" className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline-md text-headline-md text-on-tertiary uppercase leading-tight tracking-widest text-[20px] md:text-[28px]">
            PRATA 925 CERTIFICADA. O TOQUE DE LUXO QUE VOCÊ MERECE.
          </h2>
        </FadeIn>
      </div>

      {/* Galeria de Estilo */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-md text-headline-md uppercase mb-unit-lg text-center">GALERIA DE ESTILO</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-unit-md h-[707px] md:h-[1060px]">
          <FadeIn direction="left" delay={100} className="relative group overflow-hidden border border-tertiary">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-premium group-hover:scale-105" style={{ backgroundImage: "url('/galeria2.jpeg')" }}></div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-on-tertiary font-label-caps tracking-widest underline-slide">COMPRAR LOOK</span>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={200} className="relative group overflow-hidden border border-tertiary row-span-2">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-premium group-hover:scale-105" style={{ backgroundImage: "url('/galeria1.jpeg')" }}></div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-on-tertiary font-label-caps tracking-widest cursor-pointer underline-slide">VER GALERIA</span>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={150} className="relative group overflow-hidden border border-tertiary">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-premium group-hover:scale-105" style={{ backgroundImage: "url('/galeria3.jpeg')" }}></div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-on-tertiary font-label-caps tracking-widest underline-slide">CURADORIA</span>
            </div> 
          </FadeIn>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container border-t border-tertiary">
        <div className="grid md:grid-cols-2 gap-unit-lg items-center">
          <div>
            <h2 className="font-headline-md text-headline-md uppercase mb-unit-md">JUNTE-SE AO NOSSO ARQUIVO</h2>
            <p className="font-body-lg text-body-lg max-w-md">Receba acesso antecipado a novas coleções e drops exclusivos do mundo Daille.</p>
          </div>
          <div className="flex flex-col gap-unit-md">
            <div className="relative border-b-2 border-tertiary">
              <input className="w-full bg-transparent border-none py-unit-md focus:ring-0 font-label-caps placeholder:text-secondary" placeholder="SEU EMAIL" type="email" />
            </div>
            <button className="bg-primary text-on-primary font-button-text text-button-text uppercase py-unit-md hover:bg-on-primary hover:text-primary border border-primary transition-all">INSCREVER-SE</button>
          </div>
        </div>
      </section>
    </div>
  );
}


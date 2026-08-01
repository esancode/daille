import Image from 'next/image';
import Link from 'next/link';
import { getProdutosDestaque } from '@/services/products';
import { FadeIn } from '@/components/ui/FadeIn';
import { ProductTag } from '@/components/product/ProductTag';

export default async function Home() {
  const destaques = await getProdutosDestaque();
  const displayProducts = destaques.slice(0, 4);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-[707px] flex flex-col md:flex-row items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center grayscale contrast-125" 
            style={{ backgroundImage: "url('/hero.png')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none"></div>
        </div>
        <FadeIn delay={200} className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-start px-margin-mobile md:px-margin-desktop py-section-gap bg-transparent">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-unit-lg leading-none text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-300 drop-shadow-lg">
            PRATA 925<br/>CERTIFICADA
          </h1>
          <Link href="/catalogo" className="btn-premium font-button-text text-button-text uppercase px-unit-lg py-unit-md border bg-surface text-primary border-surface hover:opacity-80 transition-opacity">
            SABER MAIS
          </Link>
        </FadeIn>
      </section>

      {/* Mais Desejados Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface">
        <FadeIn>
          <div className="flex justify-between items-end mb-unit-lg border-b border-tertiary pb-unit-sm">
            <h2 className="font-headline-md text-headline-md uppercase">MAIS DESEJADOS</h2>
            <Link href="/catalogo" className="font-label-caps text-label-caps hover:opacity-60 transition-opacity">VER TUDO</Link>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {displayProducts.map((produto, index) => {
            const image = produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].url : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";
            return (
              <FadeIn key={produto.id} delay={index * 100}>
                <Link href={`/produto/${produto.id}`} className="group cursor-pointer block">
                  <div className="aspect-[3/4] overflow-hidden mb-unit-md border border-outline-variant relative">
                    {produto.tag && <ProductTag tag={produto.tag} className="absolute top-2 right-2" />}
                    <img className="w-full h-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" src={image} alt={produto.nome} />
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

      {/* Middle Banner */}
      <div className="w-full bg-tertiary py-unit-lg px-margin-mobile border-y border-outline-variant overflow-hidden">
        <FadeIn direction="none" className="max-w-4xl mx-auto text-center">
          <h3 className="font-headline-md text-headline-md text-on-tertiary uppercase leading-tight md:text-[40px]">
            PRATA 925 CERTIFICADA. O TOQUE DE LUXO QUE VOCÊ MERECE.
          </h3>
        </FadeIn>
      </div>

      {/* Galeria de Estilo */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-md text-headline-md uppercase mb-unit-lg text-center">GALERIA DE ESTILO</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-unit-md h-[707px] md:h-[1060px]">
          <FadeIn direction="left" delay={100} className="relative group overflow-hidden border border-tertiary">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-premium group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoYFmG5B7fQUQ2UMx2LLBt9rg0NEN-zhCWvw3yECVysBDKZmqVNEmWP3Z5P9Yqk1OTi8cjMvEnZ9Xbiuu09ESmho5WnzzxQrI1b4_iGJ3GBDBH1pfioayQSvbu03eZLoNDYQJ4TaDD7jNewmKq6F8k4Z0_0ZNBv3AeSoHwDk25HL5lgoNtZ0zaqRdmNwU_kHzq8SXQ5MbSX_uu5bGWgbWhkzp8zxYoYpJhYYqy9N4UfB-YWraca2OrmmVbYOBEf9IjvGR5wkkUR3rN')" }}></div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-on-tertiary font-label-caps tracking-widest underline-slide">COMPRAR LOOK</span>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={200} className="relative group overflow-hidden border border-tertiary row-span-2">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-premium group-hover:scale-105" style={{ backgroundImage: "url('/gallery.png')" }}></div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-on-tertiary font-label-caps tracking-widest cursor-pointer underline-slide">VER GALERIA</span>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={150} className="relative group overflow-hidden border border-tertiary">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-premium group-hover:scale-105" style={{ backgroundImage: "url('/curated.png')" }}></div>
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
            <p className="font-body-lg text-body-lg max-w-md">Receba acesso antecipado a novas coleções e drops exclusivos do mundo Velune.</p>
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


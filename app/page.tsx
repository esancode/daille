import Link from "next/link";
import { getProdutosDestaque } from "@/services/products";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroSlider } from "@/components/layout/HeroSlider";

export default async function Home() {
  const produtosDestaque = await getProdutosDestaque();

  return (
    <div className="w-full flex flex-col">
      <HeroSlider />

      <div className="w-full bg-white pt-8">
        <div className="w-full bg-[#FAF6EE] py-4">
          <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 gap-y-2 text-[11px] md:text-[13px] text-zinc-800 font-sans tracking-wider font-medium">
            <span>Frete Grátis*</span>
            <span className="text-zinc-300">|</span>
            <span>Parcele até 10x sem juros</span>
            <span className="text-zinc-300">|</span>
            <span>Bônus em todas as compras*</span>
            <span className="text-zinc-300">|</span>
            <span>5% OFF com PIX</span>
            <span className="text-zinc-300">|</span>
            <span>5% OFF com Código de Vendedor</span>
          </div>
        </div>
      </div>

      <section className="w-full pt-10 pb-20 md:pt-14 md:pb-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-center gap-4 mb-10 md:mb-12 text-center">
            <h2 className="font-playfair text-[24px] md:text-[30px] font-medium tracking-[2px] uppercase text-zinc-950">
              Mais Desejados
            </h2>
            <Link
              href="/catalogo"
              className="font-sans text-[12px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Ver tudo
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-12">
            {produtosDestaque.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#0F0F0F] text-white overflow-hidden py-8 md:py-0 md:h-[500px] flex items-end">
        <div className="mx-auto max-w-7xl px-6 md:px-10 w-full h-full flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="w-full md:w-[55%] flex flex-col justify-center items-start gap-6 pb-12 md:pb-0 h-full">
            <h2 className="font-playfair text-[26px] md:text-[36px] font-light leading-tight tracking-[2px] uppercase">
              Prata 925 Certificada. <br />
              O Toque de Luxo Que Você Merece.
            </h2>
            <Link href="/catalogo">
              <button className="px-8 py-3.5 bg-[linear-gradient(110deg,#d4d4d8,35%,#fafafa,50%,#a1a1aa)] bg-[length:250%_100%] bg-[100%_0] hover:bg-[0_0] text-zinc-950 font-sans text-[13px] font-bold uppercase tracking-widest rounded-[4px] border border-zinc-200 shadow-md transition-[background-position] duration-700 ease-in-out cursor-pointer">
                Saber Mais
              </button>
            </Link>
          </div>

          <div className="w-full md:w-[45%] flex items-end justify-center md:justify-end h-[300px] md:h-full relative">
            <img
              src=""
              alt=""
              className="object-contain object-center scale-500"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-28 bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col gap-12">
          <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-3">
            <h2 className="font-playfair text-[22px] md:text-[26px] font-medium tracking-[2px] uppercase text-zinc-900">
              Galeria de Estilo
            </h2>
            <p className="font-sans text-[13px] text-zinc-500">
              Inspire-se em nossa seleção de joias elegantes e minimalistas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="aspect-[3/4] overflow-hidden rounded-[4px] bg-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop"
                alt="Inspiração 1"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-[4px] bg-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop"
                alt="Inspiração 2"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-[4px] bg-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop"
                alt="Inspiração 3"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-[4px] bg-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop"
                alt="Inspiração 4"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
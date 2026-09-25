import Image from 'next/image';
export const revalidate = 60;
import Link from 'next/link';
import { getProdutosDestaque } from '@/services/products';
import { getPopularProducts, getTrendingProducts, getFreshProducts } from '@/services/recommendations';
import { FadeIn } from '@/components/ui/FadeIn';
import { ProductShowcase } from '@/components/product/ProductShowcase';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';

export default async function Home() {
  const populares = await getPopularProducts(10);
  const trending = await getTrendingProducts(10);
  const fresh = await getFreshProducts(10);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/imagemherocompleta.jfif')" }}
        ></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 flex items-center">
          
          <div className="flex flex-col items-start relative max-w-xl xl:max-w-2xl py-20">
            {/* Main Title */}
            <h1 className="font-cinzel text-[#0A101A] flex flex-col items-start leading-[1.05] mb-6">
              <span className="text-[42px] md:text-[64px] lg:text-[75px] tracking-wide whitespace-nowrap">PRATA 925</span>
              <span className="text-[42px] md:text-[64px] lg:text-[75px] tracking-wide whitespace-nowrap">QUE REALÇA</span>
              <span className="text-[42px] md:text-[64px] lg:text-[75px] tracking-wide whitespace-nowrap">O SEU MELHOR</span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-[12px] md:text-[14px] text-text-main font-medium mb-10 max-w-[240px] sm:max-w-[340px] md:max-w-[400px] leading-relaxed opacity-90">
              Joias atemporais, minimalistas e cheias de significado. Feitas para durar, assim como os seus melhores momentos.
            </p>

            {/* Button */}
            <Link href="/catalogo" className="bg-[#0A101A] text-white px-8 py-4 rounded-full font-sans text-[10px] md:text-[12px] font-bold tracking-[0.15em] flex items-center gap-3 hover:bg-[#1A2533] transition-all shadow-md group">
              VER COLEÇÃO
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          
        </div>
      </section>

      {/* Category Links Section */}
      <section className="w-full bg-page-bg py-8 md:py-12">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          
          <Link href="/catalogo?category=colares" className="group flex flex-col cursor-pointer">
            <div className="aspect-square bg-page-bg mb-4 flex items-center justify-center border-[1.5px] border-transparent group-hover:border-[#0A101A]">
              <img src="/categorias/colar.jfif" alt="Colares" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2 text-accent">
              <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.15em] uppercase">COLARES</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>
          
          <Link href="/catalogo?category=aneis" className="group flex flex-col cursor-pointer">
            <div className="aspect-square bg-page-bg mb-4 flex items-center justify-center border-[1.5px] border-transparent group-hover:border-[#0A101A]">
              <img src="/categorias/aneis.jfif" alt="Anéis" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2 text-accent">
              <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.15em] uppercase">ANÉIS</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

          <Link href="/catalogo?category=brincos" className="group flex flex-col cursor-pointer">
            <div className="aspect-square bg-page-bg mb-4 flex items-center justify-center border-[1.5px] border-transparent group-hover:border-[#0A101A]">
              <img src="/categorias/brincos.jfif" alt="Brincos" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2 text-accent">
              <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.15em] uppercase">BRINCOS</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

          <Link href="/catalogo?category=pulseiras" className="group flex flex-col cursor-pointer">
            <div className="aspect-square bg-page-bg mb-4 flex items-center justify-center border-[1.5px] border-transparent group-hover:border-[#0A101A]">
              <img src="/categorias/pulseiras.jfif" alt="Pulseiras" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2 text-accent">
              <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.15em] uppercase">PULSEIRAS</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>

        </div>
      </section>

      {/* Coleção Essencial Section */}
      <section className="w-full bg-page-bg py-10 md:py-16 overflow-visible">
        <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Image */}
          <div className="w-full md:w-[45%] flex justify-center md:justify-start mb-8 md:mb-0">
            <img 
              src="/colecao/imagem_2.jfif" 
              alt="Coleção Essencial" 
              className="w-full max-w-[400px] aspect-[4/5] object-cover bg-[#F5F5F5]" 
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-[55%] flex flex-col items-start relative pb-10 md:pb-0 z-10">
            
            {/* Text Wrapper (Shifted Left) */}
            <div className="flex flex-col items-start md:-ml-16 lg:-ml-32">
              <span className="font-sans text-[11px] md:text-[13px] font-bold tracking-[0.2em] text-[#0A101A] uppercase mb-3">
                COLEÇÃO
              </span>
              
              <h2 className="font-cinzel text-[#0A101A] text-[45px] md:text-[60px] lg:text-[75px] leading-[1] mb-6">
                ESSENCIAL
              </h2>
              
              <p className="font-sans text-[14px] md:text-[15px] text-text-main leading-relaxed max-w-[380px] mb-10">
                Peças que combinam com todos os momentos. Do casual ao sofisticado, a coleção Essencial é sobre versatilidade, elegância e autenticidade.
              </p>

              <Link href="/catalogo?colecao=essencial" className="border border-[#0A101A] text-[#0A101A] px-8 py-3.5 rounded-full font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] flex items-center gap-3 hover:bg-[#0A101A] hover:text-white transition-all group bg-page-bg">
                EXPLORAR COLEÇÃO
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            {/* Circular Stamp */}
            <div className="absolute -right-10 -bottom-24 md:-right-20 lg:-right-32 md:-bottom-[180px] lg:-bottom-[280px] w-[250px] h-[250px] md:w-[600px] md:h-[600px] opacity-90 pointer-events-none z-0">
              <Image src="/colecao/circulo2-removebg-preview.png" alt="Autenticidade Garantida" fill className="object-contain" />
            </div>

          </div>
          
        </div>
      </section>

      {/* Histórias Banner Section */}
      <section className="w-full relative min-h-[450px] md:min-h-[550px] flex items-center overflow-hidden bg-[#0A101A]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center md:bg-[center_top] bg-[url('/banners/bannermobile.jfif')] md:bg-[url('/banners/banner1.jfif')]" 
        ></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 flex items-center">
          <div className="flex flex-col items-start relative max-w-xl py-16 md:py-24">
            <span className="font-sans text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-[#E0E0E0] uppercase mb-4 opacity-90">
              MAIS QUE JOIAS
            </span>
            
            <h2 className="font-cinzel text-white flex flex-col items-start leading-[1.05] mb-6">
              <span className="text-[40px] md:text-[55px] lg:text-[65px] tracking-wide whitespace-nowrap">É SOBRE</span>
              <span className="text-[40px] md:text-[55px] lg:text-[65px] tracking-wide whitespace-nowrap">HISTÓRIAS</span>
            </h2>

            <p className="font-sans text-[13px] md:text-[15px] text-[#E0E0E0] font-medium mb-10 max-w-[340px] md:max-w-[420px] leading-relaxed opacity-90">
              Cada peça da Daille carrega um propósito: celebrar quem você é e o que te faz única. Nossas joias são feitas para acompanhar todas as fases da sua vida.
            </p>

            <Link href="/sobre" className="border border-white/60 text-white px-8 py-3.5 rounded-full font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] flex items-center gap-3 hover:bg-white hover:text-[#0A101A] transition-all group backdrop-blur-sm bg-black/10">
              CONHEÇA A DAILLE
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <ProductShowcase title="ESCOLHAS ESPECIAIS" subtitle="DESTAQUES DA COLEÇÃO" produtos={trending} viewAllLink="/vitrine/destaques" />

      {/* Atemporal Banner Section */}
      <section className="w-full relative min-h-[450px] md:min-h-[550px] flex items-center overflow-hidden bg-[#0A101A]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center md:bg-right" 
          style={{ backgroundImage: "url('/banners/banner2.jfif')" }}
        ></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 flex items-center">
          <div className="flex flex-col items-start relative max-w-xl py-16 md:py-24">
            <span className="font-sans text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-[#E0E0E0] uppercase mb-4 opacity-90">
              COLEÇÃO
            </span>
            
            <h2 className="font-cinzel text-white flex flex-col items-start leading-[1.05] mb-6 drop-shadow-sm">
              <span className="text-[40px] md:text-[55px] lg:text-[75px] tracking-wide whitespace-nowrap">ATEMPORAL</span>
            </h2>

            <p className="font-sans text-[13px] md:text-[15px] text-[#E0E0E0] font-medium mb-10 max-w-[340px] md:max-w-[420px] leading-relaxed opacity-90 drop-shadow-sm">
              Clássicos que nunca saem de moda. Peças que se adaptam ao seu estilo e te acompanham em todas as fases.
            </p>

            <Link href="/catalogo?colecao=atemporal" className="border border-white/60 text-white px-8 py-3.5 rounded-full font-sans text-[10px] md:text-[11px] font-bold tracking-[0.15em] flex items-center gap-3 hover:bg-white hover:text-[#0A101A] transition-all group backdrop-blur-sm bg-black/10">
              VER COLEÇÃO
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <ProductShowcase title="MAIS VENDIDOS" produtos={[...populares].reverse()} viewAllLink="/vitrine/mais-vendidos" />

      {/* Detalhes Banner Section */}
      <section className="w-full relative min-h-[450px] md:min-h-[550px] flex items-center overflow-hidden bg-[#0A101A]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-[80%_center] sm:bg-right md:bg-[center_top]" 
          style={{ backgroundImage: "url('/banners/banner3.jfif')" }}
        ></div>

        {/* Shadow Overlay for text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A101A]/80 via-[#0A101A]/40 to-transparent"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 flex items-center">
          <div className="flex flex-col items-start relative py-16 md:py-24 w-full">
            
            <h2 className="font-cinzel text-white flex flex-col items-start leading-[1.05] mb-6 drop-shadow-sm">
              <span className="text-[36px] md:text-[45px] lg:text-[55px] tracking-wide whitespace-nowrap">DETALHES</span>
              <span className="text-[36px] md:text-[45px] lg:text-[55px] tracking-wide whitespace-nowrap">QUE FAZEM</span>
              <span className="text-[36px] md:text-[45px] lg:text-[55px] tracking-wide whitespace-nowrap">A DIFERENÇA</span>
            </h2>

            <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full mt-2 gap-8 md:gap-0">
              <p className="font-sans text-[13px] md:text-[15px] text-[#E0E0E0] font-medium max-w-[340px] md:max-w-[380px] leading-relaxed opacity-90 drop-shadow-sm mb-0">
                A beleza está nos detalhes. Por isso, cada peça é cuidadosamente pensada para entregar sofisticação, qualidade e autenticidade.
              </p>

              <Link href="/sobre" className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] shrink-0 rounded-full border border-white/60 text-white flex items-center justify-center hover:bg-white hover:text-[#0A101A] transition-colors backdrop-blur-sm bg-black/10">
                <span className="material-symbols-outlined text-[20px] md:text-[24px]">arrow_forward</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Prata 925 Features Section */}
      <section className="w-full bg-page-bg py-16 md:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            
            {/* Images Container */}
            <div className="w-full md:w-[65%] flex gap-4 md:gap-6 shrink-0">
              <div className="flex-1 max-w-[400px] aspect-[4/5] overflow-hidden bg-[#F5F5F5]">
                <img src="/banners/imagem_vertical_1.jfif" alt="Prata 925 Detalhe 1" className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <div className="flex-1 max-w-[400px] aspect-[4/5] overflow-hidden bg-[#F5F5F5]">
                <img src="/banners/imagem_vertical_2.jfif" alt="Prata 925 Detalhe 2" className="w-full h-full object-cover object-right mix-blend-multiply" />
              </div>
            </div>

            {/* Text Container */}
            <div className="w-full md:w-[35%] flex flex-col items-start md:pl-4">
              <h3 className="font-sans text-[12px] md:text-[14px] font-bold tracking-[0.35em] text-[#0A101A] uppercase mb-10">
                PRATA 925
              </h3>
              
              <ul className="flex flex-col gap-5 text-[#333333] font-sans text-[14px] md:text-[16px] font-medium tracking-wide mb-10">
                <li>Hipoalergênica</li>
                <li>Durável</li>
                <li>Brilho duradouro</li>
                <li>Alta qualidade</li>
              </ul>
              
              <div className="w-[40px] h-[1px] bg-[#0A101A]/30"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section - Comentado até termos depoimentos reais */}
      {/* 
      <section className="w-full bg-page-bg pb-16 pt-8 md:pb-24 md:pt-12">
        <TestimonialCarousel />
      </section> 
      */}

      {/* Email Banner Section */}
      <section className="w-full relative min-h-[300px] flex items-center overflow-hidden bg-[#0A101A]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center mix-blend-screen opacity-80" 
          style={{ backgroundImage: "url('/banners/banner_email.jfif')" }}
        ></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col items-center text-center py-16 md:py-20">
          <h2 className="font-sans text-[18px] md:text-[22px] font-medium tracking-[0.05em] text-white uppercase mb-4 drop-shadow-sm">
            FAÇA PARTE DO NOSSO MUNDO
          </h2>
          <p className="font-sans text-[13px] md:text-[15px] text-[#E0E0E0] mb-10 max-w-xl drop-shadow-sm">
            Receba novidades, lançamentos e condições exclusivas.
          </p>

          <form className="flex flex-col md:flex-row items-center gap-4 w-full max-w-[550px]">
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              className="w-full bg-transparent border border-white/40 rounded-full px-6 py-3 md:py-3.5 text-white placeholder:text-[#A0A0A0] font-sans text-[14px] focus:outline-none focus:border-white transition-colors"
              required
            />
            <button 
              type="submit" 
              className="w-full md:w-auto px-10 py-3 md:py-3.5 rounded-full border border-white/40 text-white font-sans text-[11px] md:text-[12px] font-bold tracking-[0.1em] hover:bg-white hover:text-[#0A101A] transition-colors shrink-0 uppercase"
            >
              INSCREVER
            </button>
          </form>
        </div>
      </section>



    </div>
  );
}


import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-[#FDFDFD] px-6 text-center py-20">
      <div className="w-16 h-16 border border-[#E0E0E0] rounded-full flex items-center justify-center mb-8 bg-[#F5F5F5]">
        <span className="material-symbols-outlined text-[24px] text-[#0A101A] font-light">auto_awesome</span>
      </div>
      <h1 className="font-cinzel text-[32px] md:text-[46px] text-[#0A101A] mb-4 leading-none">
        EM CONSTRUÇÃO
      </h1>
      <p className="font-sans text-[14px] md:text-[16px] text-[#666666] max-w-[420px] mx-auto mb-12 leading-relaxed">
        Nossa história é preciosa demais para ser contada às pressas. Estamos preparando um espaço especial para compartilhar a essência e o propósito da Daille com você.
      </p>
      <Link href="/" className="border border-[#0A101A] text-[#0A101A] px-8 py-4 rounded-full font-sans text-[11px] font-bold tracking-[0.15em] hover:bg-[#0A101A] hover:text-white transition-all flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        VOLTAR AO INÍCIO
      </Link>
    </div>
  );
}

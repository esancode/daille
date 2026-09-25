import Link from 'next/link';
import Image from 'next/image';

export function Footer({ inverted = false }: { inverted?: boolean }) {
  const bgClass = inverted ? "bg-[#0A101A]" : "bg-[#FDFDFD]";
  const textMainClass = inverted ? "text-[#FDFDFD]" : "text-[#0A101A]";
  const textMutedClass = inverted ? "text-[#E0E0E0]" : "text-[#4A5568]";
  const textSubClass = inverted ? "text-[#CCCCCC]" : "text-[#333333]";
  const borderClass = inverted ? "border-white/10" : "border-[#0A101A]/10";
  const logoClass = inverted ? "brightness-0 invert drop-shadow-[0_0_0.4px_#FFFFFF]" : "brightness-0 drop-shadow-[0_0_0.4px_#0A101A]";

  return (
    <footer className={`${bgClass} ${textMainClass} pt-16 md:pt-20 pb-8 w-full mt-auto transition-colors duration-300`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 w-full">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* Brand */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex flex-col items-center md:items-start cursor-pointer hover:opacity-80 transition-opacity">
              <Image 
                src="/logo_daille_transparent.png" 
                alt="Daille" 
                width={320} 
                height={50} 
                className={`object-contain w-[140px] md:w-[170px] h-auto transition-all ${logoClass}`} 
              />
            </Link>
            <div className="mt-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={textMainClass}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-4">
            <h3 className={`font-sans text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-2 ${textSubClass}`}>Navegação</h3>
            <Link href="/" className={`font-sans text-[13px] md:text-[14px] ${textMutedClass} hover:${textMainClass} transition-colors`}>Início</Link>
            <Link href="/catalogo" className={`font-sans text-[13px] md:text-[14px] ${textMutedClass} hover:${textMainClass} transition-colors`}>Loja</Link>
            <Link href="/sobre" className={`font-sans text-[13px] md:text-[14px] ${textMutedClass} hover:${textMainClass} transition-colors`}>Sobre</Link>
            <Link href="/contato" className={`font-sans text-[13px] md:text-[14px] ${textMutedClass} hover:${textMainClass} transition-colors`}>Contato</Link>
          </div>

          {/* Help & Support */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start gap-4">
            <h3 className={`font-sans text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-2 ${textSubClass}`}>Atendimento</h3>
            <p className={`font-sans text-[13px] md:text-[14px] ${textMutedClass} mb-2 text-center md:text-left`}>
              Segunda a Sexta<br/>08h às 18h
            </p>
            <a href="https://wa.me/5574991319262" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 font-sans text-[13px] md:text-[14px] ${textMutedClass} hover:${textMainClass} transition-colors mt-2`}>
              <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
              +55 74 9131-9262
            </a>
            <a href="mailto:contato@daille.com" className={`flex items-center gap-2 font-sans text-[13px] md:text-[14px] ${textMutedClass} hover:${textMainClass} transition-colors mt-1`}>
              <span className="material-symbols-outlined text-[18px]">mail</span>
              contato@daille.com
            </a>
          </div>

          {/* Social */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start gap-4">
            <h3 className={`font-sans text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-2 ${textSubClass}`}>Redes Sociais</h3>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://www.instagram.com/daillejoias/" target="_blank" rel="noopener noreferrer" className={`${textMainClass} hover:opacity-70 transition-opacity`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className={`${textMainClass} hover:opacity-70 transition-opacity`} onClick={(e) => e.preventDefault()}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
              <a href="#" className={`${textMainClass} hover:opacity-70 transition-opacity`} onClick={(e) => e.preventDefault()}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="22"></line><path d="M12 8s-3-2-3-4a3 3 0 0 1 6 0c0 2-3 4-3 4z"></path></svg>
              </a>
              <a href="#" className={`${textMainClass} hover:opacity-70 transition-opacity`} onClick={(e) => e.preventDefault()}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Badges */}
        <div className={`flex flex-col md:flex-row items-center justify-between border-t ${borderClass} pt-8 pb-4 gap-6`}>
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className={`font-sans text-[12px] md:text-[13px] ${textMutedClass}`}>
              © {new Date().getFullYear()} Daille. Todos os direitos reservados.
            </p>
            <p className={`font-sans text-[10px] ${inverted ? 'text-white/50 hover:text-white/80' : 'text-[#A0A0A0] hover:opacity-100'} mt-1 transition-opacity`}>
              Desenvolvido por Erick Vicente
            </p>
          </div>
          
          <div className={`flex items-center gap-2 font-sans text-[12px] md:text-[13px] ${textMutedClass}`}>
            <span>Prata 925</span>
            <span className={inverted ? 'text-white/40' : 'text-[#A0A0A0]'}>|</span>
            <span>Brasil</span>
            <span className="ml-1 text-[14px]">🇧🇷</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

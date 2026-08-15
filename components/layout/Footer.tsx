import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-tertiary text-on-tertiary pt-section-gap pb-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand & Mission */}
          <div className="flex flex-col items-start gap-6">
            <Link href="/" className="flex items-center justify-start cursor-pointer hover:opacity-80 transition-opacity">
              <Image src="/logo_footer.png" alt="Daille" width={180} height={50} className="object-contain" style={{ width: 'auto', height: 'auto' }} priority />
            </Link>
            <p className="font-body-sm text-[13px] opacity-80 leading-relaxed max-w-xs">
              A elegância da Prata 925 na sua pele. Peças exclusivas e atemporais, pensadas para o seu brilho diário.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-label-caps uppercase tracking-widest font-bold mb-2">Navegação</h3>
            <Link href="/catalogo" className="font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity">Catálogo Completo</Link>
            <Link href="/catalogo?category=aneis" className="font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity">Anéis</Link>
            <Link href="/catalogo?category=colares" className="font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity">Colares</Link>
            <Link href="/favoritos" className="font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity">Meus Favoritos</Link>
          </div>

          {/* Help & Support */}
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-label-caps uppercase tracking-widest font-bold mb-2">Ajuda e Suporte</h3>
            <Link href="#" className="font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity">Dúvidas Frequentes</Link>
            <Link href="#" className="font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity">Trocas e Devoluções</Link>
            <Link href="#" className="font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity">Cuidados com a Prata</Link>
            <Link href="#" className="font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity">Contato</Link>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-label-caps uppercase tracking-widest font-bold mb-2">Siga-nos</h3>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-2 font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                Instagram
              </a>
              <a href="#" className="flex items-center gap-2 font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                TikTok
              </a>
              <a href="#" className="flex items-center gap-2 font-body-sm text-[13px] opacity-70 hover:opacity-100 transition-opacity mt-2">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                contato@daille.com.br
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Badges */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-on-tertiary/20 pt-8 gap-6">
          <div className="flex flex-col items-center md:items-start gap-1 font-label-caps text-[10px] tracking-widest uppercase">
            <p className="opacity-50">
              © {new Date().getFullYear()} DAILLE. TODOS OS DIREITOS RESERVADOS.
            </p>
            <p className="opacity-30">
              Desenvolvido por Erick Vicente
            </p>
          </div>
          
          <div className="flex items-center gap-4 opacity-70">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="font-label-caps text-[9px] tracking-wider uppercase">Compra Segura</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="font-label-caps text-[9px] tracking-wider uppercase">SSL Certificado</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

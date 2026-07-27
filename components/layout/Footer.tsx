import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-tertiary text-on-tertiary py-section-gap w-full">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center gap-unit-lg w-full">
        <Link href="/" className="mb-unit-md flex items-center justify-center invert">
          <Image src="/logo.png" alt="Velune Pratas" width={220} height={70} className="object-contain" priority />
        </Link>
        <div className="flex flex-wrap justify-center gap-unit-lg mb-unit-lg">
          <Link href="/catalogo" className="font-label-caps text-label-caps uppercase opacity-80 hover:opacity-100 hover:underline transition-all">VER TUDO</Link>
          <Link href="/catalogo" className="font-label-caps text-label-caps uppercase opacity-80 hover:opacity-100 hover:underline transition-all">COLEÇÕES</Link>
          <Link href="#" className="font-label-caps text-label-caps uppercase opacity-80 hover:opacity-100 hover:underline transition-all">CUIDADOS</Link>
          <Link href="#" className="font-label-caps text-label-caps uppercase opacity-80 hover:opacity-100 hover:underline transition-all">FRETE</Link>
          <Link href="/cliente" className="font-label-caps text-label-caps uppercase opacity-80 hover:opacity-100 hover:underline transition-all">CONTATO</Link>
        </div>
        <div className="mb-unit-lg">
          <a href="#" className="border border-on-tertiary px-unit-lg py-unit-sm font-label-caps text-label-caps hover:bg-on-tertiary hover:text-tertiary transition-all duration-300">INSTAGRAM</a>
        </div>
        <p className="font-label-caps text-[10px] tracking-widest opacity-50 uppercase text-center">
          © 2026 VELUNE PRATAS. TODOS OS DIREITOS RESERVADOS.
        </p>
      </div>
    </footer>
  );
}

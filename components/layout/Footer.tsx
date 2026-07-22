import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#0F0F0F] text-zinc-400 py-16 px-6 border-t border-zinc-900">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-12">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/logo/logo_vertical_velune.png"
            alt="Velune Joias em Prata 925"
            className="h-20 w-auto object-contain brightness-0 invert"
          />
          <p className="font-playfair text-[14px] italic tracking-widest text-zinc-500 uppercase mt-2">
            Joias em Prata 925
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-[4px] font-sans text-[11px] font-semibold uppercase tracking-widest transition-colors cursor-pointer border border-zinc-800"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth={1.5} />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={1.5} />
            </svg>
            Instagram
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <Link
            href="/catalogo"
            className="font-sans text-[11px] font-semibold uppercase tracking-widest hover:text-white transition-colors"
          >
            Coleções
          </Link>
          <Link
            href="/politicas"
            className="font-sans text-[11px] font-semibold uppercase tracking-widest hover:text-white transition-colors"
          >
            Políticas de Privacidade
          </Link>
          <Link
            href="/termos"
            className="font-sans text-[11px] font-semibold uppercase tracking-widest hover:text-white transition-colors"
          >
            Termos de Uso
          </Link>
          <Link
            href="/contato"
            className="font-sans text-[11px] font-semibold uppercase tracking-widest hover:text-white transition-colors"
          >
            Contato
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4 py-4 border-t border-zinc-900 w-full max-w-md">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            Formas de Pagamento
          </span>
          <div className="flex items-center justify-center gap-5 text-zinc-500">
            <svg className="w-10 h-7" viewBox="0 0 38 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="0.6" y="0.6" width="36.8" height="22.8" rx="3.4" fill="transparent" />
              <path d="M12 12h14M19 8v8" strokeWidth="1.5" />
              <circle cx="19" cy="12" r="5" strokeWidth="1" />
            </svg>

            <svg className="w-10 h-7" viewBox="0 0 38 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="0.6" y="0.6" width="36.8" height="22.8" rx="3.4" fill="transparent" />
              <circle cx="16" cy="12" r="5.5" fill="currentColor" fillOpacity="0.1" />
              <circle cx="22" cy="12" r="5.5" fill="currentColor" fillOpacity="0.1" />
            </svg>

            <svg className="w-10 h-7" viewBox="0 0 38 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="0.6" y="0.6" width="36.8" height="22.8" rx="3.4" fill="transparent" />
              <path d="M10 9h18M10 12h12M10 15h15" />
            </svg>

            <svg className="w-10 h-7" viewBox="0 0 38 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="0.6" y="0.6" width="36.8" height="22.8" rx="3.4" fill="transparent" />
              <path d="M12 9l7 6 7-6" />
              <path d="M12 15h14" />
            </svg>

            <svg className="w-10 h-7" viewBox="0 0 38 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="0.6" y="0.6" width="36.8" height="22.8" rx="3.4" fill="transparent" />
              <path d="M9 8h2v8H9zM15 8h2v8h-2zM21 8h2v8h-2zM27 8h2v8h-2z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="font-sans text-[11px] text-zinc-600 tracking-wider">
            © {new Date().getFullYear()} Velune Pratas. Todos os direitos reservados.
          </p>
          <p className="font-sans text-[11px] text-zinc-600 hover:text-zinc-500 transition-colors">
            www.velune.com.br
          </p>
        </div>
      </div>
    </footer>
  );
}
import Image from "next/image";

export function Header() {
  return (
    <header className="w-full border-b border-zinc-800">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <div>
          <Image
            src="/logo/logo_horizontal_velune.png"
            alt="Velune Pratas"
            width={180}
            height={45}
            />
        </div>
        
        <nav className="flex gap-10">
          <a>Catálogo</a>
          <a>Sobre</a>
        </nav>

        <div className="flex gap-6">
          <span>Buscar</span>
          <span>Carrinho</span>
        </div>

      </div>

    </header>
  );
}
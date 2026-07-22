import Link from "next/link";
import { getProdutos, getCategorias } from "@/services/products";
import { ProductCard } from "@/components/product/ProductCard";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    categoria?: string;
  }>;
}

export default async function CatalogoPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const categoriaSelecionada = params.categoria || "";

  const [todosProdutos, categorias] = await Promise.all([
    getProdutos(),
    getCategorias(),
  ]);

  let produtosFiltrados = todosProdutos.filter((prod) => prod.status === "disponivel");

  if (categoriaSelecionada) {
    produtosFiltrados = produtosFiltrados.filter(
      (prod) => prod.categoria.toLowerCase() === categoriaSelecionada.toLowerCase()
    );
  }

  if (query) {
    const qLower = query.toLowerCase();
    produtosFiltrados = produtosFiltrados.filter(
      (prod) =>
        prod.nome.toLowerCase().includes(qLower) ||
        prod.codigo.toLowerCase().includes(qLower) ||
        prod.descricao.toLowerCase().includes(qLower)
    );
  }

  const getLinkHref = (newCategory?: string) => {
    const category = newCategory !== undefined ? newCategory : categoriaSelecionada;
    
    const paramsList: string[] = [];
    if (category) paramsList.push(`categoria=${encodeURIComponent(category)}`);
    if (query) paramsList.push(`q=${encodeURIComponent(query)}`);
    
    return paramsList.length > 0 ? `/catalogo?${paramsList.join("&")}` : "/catalogo";
  };

  return (
    <div className="w-full bg-white py-12 md:py-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-widest text-zinc-400">
            <Link href="/" className="hover:text-zinc-800 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-zinc-800">Catálogo</span>
          </div>

          <h1 className="font-playfair text-[32px] md:text-[40px] font-light uppercase tracking-wider text-zinc-950">
            {query
              ? `Resultado para "${query}"`
              : categoriaSelecionada
              ? categoriaSelecionada
              : "Todas as Joias"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={getLinkHref("")}
            className={`px-5 py-2 rounded-[4px] font-sans text-[11px] font-semibold uppercase tracking-widest border transition-all ${
              !categoriaSelecionada
                ? "bg-zinc-950 text-white border-transparent"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
            }`}
          >
            Todos
          </Link>
          {categorias.map((cat) => (
            <Link
              key={cat.id}
              href={getLinkHref(cat.nome)}
              className={`px-5 py-2 rounded-[4px] font-sans text-[11px] font-semibold uppercase tracking-widest border transition-all ${
                categoriaSelecionada.toLowerCase() === cat.nome.toLowerCase()
                  ? "bg-zinc-950 text-white border-transparent"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
              }`}
            >
              {cat.nome}
            </Link>
          ))}
        </div>

        {produtosFiltrados.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center gap-4">
            <svg
              className="w-16 h-16 text-zinc-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <div className="flex flex-col gap-1">
              <p className="font-playfair text-[18px] font-medium uppercase tracking-wider text-zinc-800">
                Nenhuma joia encontrada
              </p>
              <p className="font-sans text-[13px] text-zinc-400">
                Tente buscar por outro termo ou selecione uma categoria diferente.
              </p>
            </div>
            <Link
              href="/catalogo"
              className="mt-2 font-sans text-[12px] font-semibold uppercase tracking-widest bg-zinc-950 text-white px-8 py-3 rounded-[4px] hover:bg-zinc-900 transition-colors"
            >
              Limpar Filtros
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {produtosFiltrados.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

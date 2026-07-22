import Link from "next/link";
import { getProdutoById } from "@/services/products";
import { ProductDetails } from "@/components/product/ProductDetails";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProdutoPage({ params }: ProductPageProps) {
  const { id } = await params;
  const produto = await getProdutoById(id);

  if (!produto) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center gap-6 px-6 bg-white">
        <svg
          className="w-16 h-16 text-zinc-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex flex-col gap-2">
          <h1 className="font-playfair text-[24px] font-medium uppercase tracking-wider text-zinc-900">
            Joia não encontrada
          </h1>
          <p className="font-sans text-[14px] text-zinc-500 max-w-md">
            Lamentamos, mas o produto solicitado não existe ou está temporariamente indisponível.
          </p>
        </div>
        <Link
          href="/catalogo"
          className="font-sans text-[12px] font-semibold uppercase tracking-widest bg-zinc-950 text-white px-8 py-3.5 rounded-full hover:bg-zinc-900 transition-colors"
        >
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  return <ProductDetails produto={produto} />;
}

import Link from "next/link";
import { Produto } from "@/types";

interface ProductCardProps {
  produto: Produto;
}

export function ProductCard({ produto }: ProductCardProps) {
  const fallbackUrl = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop";
  const img1 = produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].url : fallbackUrl;
  const img2 = produto.imagens && produto.imagens.length > 1 ? produto.imagens[1].url : null;

  return (
    <div className="group flex flex-col gap-4 h-full">
      <Link href={`/produto/${produto.id}`} className="relative block aspect-square w-full overflow-hidden rounded-[4px] bg-zinc-50 border border-zinc-100">
        <img
          src={img1}
          alt={produto.nome}
          className={`h-full w-full object-cover object-center transition-all duration-500 ease-in-out ${
            img2 ? "absolute inset-0 group-hover:opacity-0" : "transition-transform duration-500 ease-out group-hover:scale-105"
          }`}
        />
        {img2 && (
          <img
            src={img2}
            alt={`${produto.nome} detalhe`}
            className="h-full w-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:scale-105"
          />
        )}
      </Link>

      <div className="flex flex-col gap-1.5 px-1 flex-1">
        <h3 className="font-playfair text-[14px] font-medium uppercase tracking-wider text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-2" title={produto.nome}>
          {produto.nome}
        </h3>
        <p className="font-sans text-[15px] font-bold text-zinc-950">
          {produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <Link
          href={`/produto/${produto.id}`}
          className="inline-flex items-center text-[12px] font-bold font-sans uppercase tracking-widest text-zinc-950 hover:opacity-75 transition-opacity mt-auto pt-2 underline underline-offset-4 decoration-zinc-950"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}
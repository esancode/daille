"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface SortSelectProps {
  ordenar: string;
}

export function SortSelect({ ordenar }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("ordenar", value);
    } else {
      params.delete("ordenar");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={ordenar}
      onChange={handleChange}
      className="appearance-none bg-zinc-50 border border-zinc-200 rounded-full pl-5 pr-10 py-2 font-sans text-[11px] font-semibold uppercase tracking-widest text-zinc-800 focus:outline-none focus:border-zinc-400 cursor-pointer"
    >
      <option value="">Novidades</option>
      <option value="menor-preco">Menor Preço</option>
      <option value="maior-preco">Maior Preço</option>
    </select>
  );
}

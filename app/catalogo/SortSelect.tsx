"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    router.push(`/catalogo?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center">
      <select 
        className="font-label-caps text-label-caps uppercase bg-transparent appearance-none text-primary hover:opacity-70 cursor-pointer pr-6 py-1 focus:outline-none"
        onChange={handleSortChange}
        defaultValue={searchParams.get("sort") || ""}
      >
        <option value="">ORDENAR POR</option>
        <option value="price_asc">MENOR PREÇO</option>
        <option value="price_desc">MAIOR PREÇO</option>
      </select>
      <span className="material-symbols-outlined text-[16px] absolute right-0 pointer-events-none">expand_more</span>
    </div>
  );
}

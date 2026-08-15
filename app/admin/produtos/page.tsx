"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTodosProdutosAdmin, marcarComoVendido, deleteProduto } from "@/services/products";
import { Produto } from "@/types";

export default function AdminProdutosList() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const carregarProdutos = async () => {
    setLoading(true);
    const data = await getTodosProdutosAdmin();
    setProdutos(data);
    setLoading(false);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleMarcarVendido = async (id: string) => {
    const success = await marcarComoVendido(id);
    if (success) {
      router.refresh();
      carregarProdutos();
    } else {
      alert("Erro ao marcar produto como vendido.");
    }
  };

  const handleExcluir = async (id: string) => {
    const success = await deleteProduto(id);
    if (success) {
      setConfirmDeleteId(null);
      router.refresh();
      carregarProdutos();
    } else {
      alert("Erro ao excluir produto.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-playfair text-[28px] font-light uppercase tracking-wider">
            Produtos
          </h1>
          <p className="text-[12px] text-zinc-500 uppercase tracking-widest mt-1">
            Gerencie o catálogo da loja
          </p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="px-6 py-3.5 bg-white text-zinc-950 text-[11px] font-semibold uppercase tracking-widest rounded-[4px] hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          Novo Produto
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : produtos.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[4px] bg-zinc-900/20">
          <p className="text-[13px] text-zinc-500 uppercase tracking-wider">
            Nenhum produto cadastrado.
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 text-zinc-500 text-[10px] font-semibold uppercase tracking-widest">
                <th className="py-4 px-4 w-20">Foto</th>
                <th className="py-4 px-4 hidden md:table-cell">Código</th>
                <th className="py-4 px-4">Nome</th>
                <th className="py-4 px-4">Preço</th>
                <th className="py-4 px-4 hidden md:table-cell">Status</th>
                <th className="py-4 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => {
                const fotoPrincipal =
                  produto.imagens && produto.imagens.length > 0
                    ? produto.imagens[0].url
                    : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=100&auto=format&fit=crop";

                return (
                  <tr key={produto.id} className="border-b border-zinc-900 hover:bg-zinc-900/20 transition-colors text-[13px]">
                    <td className="py-4 px-4">
                      <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-[4px] overflow-hidden">
                        <img
                          src={fotoPrincipal}
                          alt={produto.nome}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-zinc-400 hidden md:table-cell">{produto.codigo}</td>
                    <td className="py-4 px-4 font-playfair uppercase tracking-wider text-white font-medium">
                      {produto.nome}
                    </td>
                    <td className="py-4 px-4 text-zinc-300">
                      {produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider ${
                          produto.status === "disponivel"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-900/50"
                            : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                        }`}
                      >
                        {produto.status === "disponivel" ? "Disponível" : "Vendido"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex flex-wrap md:flex-nowrap justify-end gap-2">
                        <Link
                          href={`/admin/produtos/editar/${produto.id}`}
                          className="px-2.5 py-1.5 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 rounded-[4px] text-[10px] font-semibold uppercase tracking-wider transition-colors"
                        >
                          Editar
                        </Link>
                        {produto.status === "disponivel" && (
                          <button
                            onClick={() => handleMarcarVendido(produto.id)}
                            className="px-2.5 py-1.5 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 rounded-[4px] text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Vendido
                          </button>
                        )}
                        <button
                          onClick={() => setConfirmDeleteId(produto.id)}
                          className="px-2.5 py-1.5 bg-red-950 text-red-400 hover:bg-red-900 rounded-[4px] text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-6">
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 p-8 rounded-[4px] flex flex-col gap-6">
            <div>
              <h3 className="font-playfair text-[18px] font-light uppercase tracking-wider text-white">
                Excluir Produto
              </h3>
              <p className="text-[12px] text-zinc-400 mt-2">
                Tem certeza que deseja remover este produto permanentemente? Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-semibold uppercase tracking-widest rounded-[4px] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleExcluir(confirmDeleteId)}
                className="flex-1 py-3 bg-red-700 hover:bg-red-600 text-white text-[10px] font-semibold uppercase tracking-widest rounded-[4px] transition-colors cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

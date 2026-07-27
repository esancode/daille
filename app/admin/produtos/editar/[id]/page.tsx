"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCategorias, getProdutoById, updateProduto } from "@/services/products";
import { Categoria, Produto, ImagemProduto } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditarProdutoPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [status, setStatus] = useState<"disponivel" | "indisponivel" | "vendido">("disponivel");
  const [destaque, setDestaque] = useState(false);

  const [imagensAtuais, setImagensAtuais] = useState<ImagemProduto[]>([]);
  const [imagensRemovidasUrls, setImagensRemovidasUrls] = useState<string[]>([]);
  const [novasFotos, setNovasFotos] = useState<File[]>([]);
  const [novasPreviews, setNovasPreviews] = useState<string[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [cats, prod] = await Promise.all([getCategorias(), getProdutoById(id)]);
        setCategorias(cats);
        if (prod) {
          setNome(prod.nome);
          setCodigo(prod.codigo);
          setDescricao(prod.descricao);
          setPreco(prod.preco.toString().replace(".", ","));
          setCategoria(prod.categoria);
          setStatus(prod.status as "disponivel" | "indisponivel" | "vendido");
          setDestaque(prod.destaque);
          
          if (prod.imagens) {
            setImagensAtuais(prod.imagens as ImagemProduto[]);
          }
        } else {
          alert("Produto não encontrado.");
          router.push("/admin/produtos");
        }
      } catch {
        alert("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [id, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setNovasFotos((prev) => [...prev, ...selectedFiles]);

      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
      setNovasPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveFotoNova = (index: number) => {
    setNovasFotos((prev) => prev.filter((_, i) => i !== index));
    setNovasPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleRemoveFotoAtual = (imagem: Imagem) => {
    setImagensAtuais((prev) => prev.filter((img) => img.id !== imagem.id));
    setImagensRemovidasUrls((prev) => [...prev, imagem.url]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    if (imagensAtuais.length === 0 && novasFotos.length === 0) {
      alert("O produto deve ter pelo menos uma foto.");
      return;
    }

    setSaving(true);

    try {
      const precoNum = parseFloat(preco.replace(",", "."));
      if (isNaN(precoNum) || precoNum <= 0) {
        alert("Por favor, insira um preço válido.");
        setSaving(false);
        return;
      }

      const prodData = {
        nome,
        codigo,
        descricao,
        preco: precoNum,
        categoria,
        status,
        destaque,
      };

      const result = await updateProduto(id, prodData, novasFotos, imagensRemovidasUrls);

      if (result) {
        router.push("/admin/produtos");
      } else {
        alert("Erro ao atualizar produto.");
      }
    } catch {
      alert("Ocorreu um erro inesperado.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/produtos"
          className="text-zinc-500 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="font-playfair text-[28px] font-light uppercase tracking-wider">
            Editar Produto
          </h1>
          <p className="text-[12px] text-zinc-500 uppercase tracking-widest mt-1">
            Atualize as informações da joia
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6 bg-zinc-900 border border-zinc-800 p-8 rounded-[4px]">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Nome do Produto
            </label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-[13px] rounded-[4px] focus:outline-none focus:border-zinc-500"
              placeholder="Ex: Anel Minimalista Prata 925"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Código / SKU
              </label>
              <input
                type="text"
                required
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-[13px] rounded-[4px] focus:outline-none focus:border-zinc-500"
                placeholder="Ex: AN01"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Preço (R$)
              </label>
              <input
                type="text"
                required
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-[13px] rounded-[4px] focus:outline-none focus:border-zinc-500"
                placeholder="Ex: 129,90"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Descrição
            </label>
            <textarea
              required
              rows={5}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-[13px] rounded-[4px] focus:outline-none focus:border-zinc-500 resize-y"
              placeholder="Descreva a joia, material, acabamento..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Categoria
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-[13px] rounded-[4px] focus:outline-none focus:border-zinc-500"
              >
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nome}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-[13px] rounded-[4px] focus:outline-none focus:border-zinc-500"
              >
                <option value="disponivel">Disponível</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id="destaque"
              checked={destaque}
              onChange={(e) => setDestaque(e.target.checked)}
              className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 focus:ring-0 focus:ring-offset-0 text-white cursor-pointer"
            />
            <label
              htmlFor="destaque"
              className="text-[11px] font-semibold uppercase tracking-widest text-zinc-300 cursor-pointer select-none"
            >
              Destacar na Home
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-zinc-900 border border-zinc-800 p-8 rounded-[4px] h-fit">
          <div>
            <h2 className="font-playfair text-[18px] font-light uppercase tracking-wider text-white">
              Fotos do Produto
            </h2>
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1">
              Gerencie a galeria de imagens
            </p>
          </div>

          {imagensAtuais.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Fotos Atuais
              </span>
              <div className="grid grid-cols-3 gap-3">
                {imagensAtuais.map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-square bg-zinc-850 rounded-[4px] overflow-hidden border border-zinc-800 group"
                  >
                    <img src={img.url} alt="Foto atual" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveFotoAtual(img)}
                      className="absolute top-1 right-1 bg-red-650/80 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative border-2 border-dashed border-zinc-800 hover:border-zinc-700 transition-colors rounded-[4px] p-6 text-center flex flex-col items-center justify-center gap-3 min-h-[120px] cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <svg
              className="w-6 h-6 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Adicionar mais fotos
            </span>
          </div>

          {novasPreviews.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Novas Fotos
              </span>
              <div className="grid grid-cols-3 gap-3">
                {novasPreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-zinc-850 rounded-[4px] overflow-hidden border border-zinc-800 group"
                  >
                    <img src={preview} alt={`Nova foto ${index}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveFotoNova(index)}
                      className="absolute top-1 right-1 bg-red-650/80 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4.5 bg-white text-zinc-950 text-[11px] font-semibold uppercase tracking-widest rounded-[4px] hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-4 cursor-pointer"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCategorias, createProduto } from "@/services/products";
import { Categoria } from "@/types";

export default function NovoProduto() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [saving, setSaving] = useState(false);

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [status, setStatus] = useState<"disponivel" | "indisponivel" | "vendido">("disponivel");
  const [destaque, setDestaque] = useState(false);
  const [tag, setTag] = useState("");
  const [fotos, setFotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    getCategorias().then((data) => {
      setCategorias(data);
      if (data.length > 0) {
        setCategoria(data[0].nome);
      }
      setLoadingCategorias(false);
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFotos((prev) => [...prev, ...selectedFiles]);

      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveFoto = (index: number) => {
    setFotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    if (fotos.length === 0) {
      alert("Por favor, selecione pelo menos uma foto para o produto.");
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
        tag: tag || undefined,
      };

      const result = await createProduto(prodData, fotos);

      if (result) {
        router.push("/admin/produtos");
      } else {
        alert("Ocorreu um erro ao salvar o produto. Verifique sua conexão ou tente novamente.");
      }
    } catch {
      alert("Ocorreu um erro inesperado.");
    } finally {
      setSaving(false);
    }
  };

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
            Novo Produto
          </h1>
          <p className="text-[12px] text-zinc-500 uppercase tracking-widest mt-1">
            Cadastre uma nova joia no acervo
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
              {loadingCategorias ? (
                <div className="w-full h-11 bg-zinc-800 border border-zinc-700 animate-pulse rounded-[4px]" />
              ) : (
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
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "disponivel" | "indisponivel" | "vendido")}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-[13px] rounded-[4px] focus:outline-none focus:border-zinc-500"
              >
                <option value="disponivel">Disponível</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Tag do Produto
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-[13px] rounded-[4px] focus:outline-none focus:border-zinc-500"
              >
                <option value="">(Nenhuma tag)</option>
                <option value="LANCAMENTO">LANÇAMENTO (Champagne)</option>
                <option value="DESTAQUE">DESTAQUE (Azul-marinho)</option>
                <option value="MAIS_VENDIDO">MAIS VENDIDO (Preto)</option>
                <option value="EXCLUSIVO">EXCLUSIVO (Champagne)</option>
                <option value="COLECAO_NOVA">COLEÇÃO NOVA (Branco/Prata)</option>
                <option value="PRESENTE">IDEIA DE PRESENTE (Azul-marinho)</option>
                <option value="FAVORITO">FAVORITO (Branco)</option>
                <option value="PRATA_925">PRATA 925 (Branco/Prata)</option>
                <option value="ULTIMAS">ÚLTIMAS UNIDADES (Vermelho)</option>
                <option value="OFERTA">OFERTA (Preto)</option>
                <option value="DESCONTO">DESCONTO (Champagne)</option>
                <option value="FRETE_GRATIS">FRETE GRÁTIS (Azul-marinho)</option>
                <option value="INDISPONIVEL">INDISPONÍVEL (Cinza)</option>
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
              Adicione imagens de alta qualidade
            </p>
          </div>

          <div className="relative border-2 border-dashed border-zinc-800 hover:border-zinc-700 transition-colors rounded-[4px] p-6 text-center flex flex-col items-center justify-center gap-3 min-h-[150px] cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <svg
              className="w-8 h-8 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Selecionar fotos
            </span>
          </div>

          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-zinc-850 rounded-[4px] overflow-hidden border border-zinc-800 group"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFoto(index)}
                    className="absolute top-1 right-1 bg-red-650/80 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4.5 bg-white text-zinc-950 text-[11px] font-semibold uppercase tracking-widest rounded-[4px] hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-4 cursor-pointer"
          >
            {saving ? "Salvando..." : "Salvar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
}

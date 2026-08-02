import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json([]);
  }

  try {
    // 1. Buscamos produtos cujo nome contenha o termo buscado (case-insensitive)
    const { data: produtos, error: prodError } = await supabase
      .from("produtos")
      .select("*")
      .eq("status", "disponivel")
      .ilike("nome", `%${q}%`)
      .limit(5);

    if (prodError || !produtos || produtos.length === 0) {
      return NextResponse.json([]);
    }

    // 2. Buscamos a primeira imagem de cada produto encontrado para a miniatura
    const produtoIds = produtos.map((p) => p.id);
    const { data: imagens, error: imgError } = await supabase
      .from("imagens")
      .select("*")
      .in("produto_id", produtoIds)
      .eq("ordem", 1);

    const imagensMap: { [key: string]: string } = {};
    if (!imgError && imagens) {
      imagens.forEach((img) => {
        imagensMap[img.produto_id] = img.url;
      });
    }

    // 3. Montamos a resposta simplificada
    const resultados = produtos.map((prod) => ({
      id: prod.id,
      nome: prod.nome,
      preco: prod.preco,
      imagem: imagensMap[prod.id] || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
    }));

    return NextResponse.json(resultados);
  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}

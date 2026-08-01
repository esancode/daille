import { supabase } from "@/lib/supabase";
import { Produto, Categoria } from "@/types";

export async function getCategorias(): Promise<Categoria[]> {
  try {
    const { data, error } = await supabase.from("categorias").select("*").order("nome");
    if (error || !data || data.length === 0) {
      return [];
    }
    return data;
  } catch {
    return [];
  }
}

export async function getProdutos(): Promise<Produto[]> {
  try {
    const { data: produtos, error: prodError } = await supabase
      .from("produtos")
      .select("*")
      .eq("status", "disponivel")
      .order("criado_em", { ascending: false });

    if (prodError || !produtos || produtos.length === 0) {
      return [];
    }

    const { data: imagens, error: imgError } = await supabase
      .from("imagens")
      .select("*")
      .order("ordem");

    const imagensMap: { [key: string]: any[] } = {};
    if (!imgError && imagens) {
      imagens.forEach((img) => {
        if (!imagensMap[img.produto_id]) {
          imagensMap[img.produto_id] = [];
        }
        imagensMap[img.produto_id].push(img);
      });
    }

    return produtos.map((prod) => ({
      ...prod,
      imagens: imagensMap[prod.id] || []
    }));
  } catch {
    return [];
  }
}

export async function getProdutoById(id: string): Promise<Produto | null> {
  try {
    const { data: prod, error: prodError } = await supabase
      .from("produtos")
      .select("*")
      .eq("id", id)
      .single();

    if (prodError || !prod) {
      return null;
    }

    const { data: imagens, error: imgError } = await supabase
      .from("imagens")
      .select("*")
      .eq("produto_id", id)
      .order("ordem");

    return {
      ...prod,
      imagens: !imgError && imagens ? imagens : []
    };
  } catch {
    return null;
  }
}

export async function getProdutosDestaque(): Promise<Produto[]> {
  const produtos = await getProdutos();
  return produtos.filter((p) => p.destaque);
}

export async function getTodosProdutosAdmin(): Promise<Produto[]> {
  try {
    const { data: produtos, error: prodError } = await supabase
      .from("produtos")
      .select("*")
      .order("criado_em", { ascending: false });

    if (prodError || !produtos || produtos.length === 0) {
      if (prodError) console.error(prodError);
      return [];
    }

    const { data: imagens, error: imgError } = await supabase
      .from("imagens")
      .select("*")
      .order("ordem");

    const imagensMap: { [key: string]: any[] } = {};
    if (!imgError && imagens) {
      imagens.forEach((img) => {
        if (!imagensMap[img.produto_id]) {
          imagensMap[img.produto_id] = [];
        }
        imagensMap[img.produto_id].push(img);
      });
    }

    return produtos.map((prod) => ({
      ...prod,
      imagens: imagensMap[prod.id] || []
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getAdminEstatisticas(): Promise<{ total: number; disponiveis: number; vendidos: number }> {
  try {
    const { data: produtos, error } = await supabase.from("produtos").select("status");
    if (error || !produtos) {
      if (error) console.error(error);
      return { total: 0, disponiveis: 0, vendidos: 0 };
    }

    const total = produtos.length;
    const disponiveis = produtos.filter(p => p.status === "disponivel").length;
    const vendidos = produtos.filter(p => p.status === "vendido").length;

    return { total, disponiveis, vendidos };
  } catch (e) {
    console.error(e);
    return { total: 0, disponiveis: 0, vendidos: 0 };
  }
}

export async function createProduto(
  produto: Omit<Produto, "id" | "criado_em" | "imagens">,
  imagens: File[]
): Promise<Produto | null> {
  try {
    const { data: novoProd, error: prodError } = await supabase
      .from("produtos")
      .insert([
        {
          codigo: produto.codigo,
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          categoria: produto.categoria,
          status: produto.status,
          destaque: produto.destaque,
          tag: produto.tag
        }
      ])
      .select()
      .single();

    if (prodError || !novoProd) {
      if (prodError) console.error(prodError);
      return null;
    }

    const imagensInseridas = [];

    for (let i = 0; i < imagens.length; i++) {
      const file = imagens[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${novoProd.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("produtos")
        .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
      }

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from("produtos")
          .getPublicUrl(filePath);

        const { data: imgData, error: dbImgError } = await supabase
          .from("imagens")
          .insert([
            {
              produto_id: novoProd.id,
              url: publicUrlData.publicUrl,
              ordem: i + 1
            }
          ])
          .select()
          .single();

        if (dbImgError) {
          console.error(dbImgError);
        }

        if (!dbImgError && imgData) {
          imagensInseridas.push(imgData);
        }
      }
    }

    return {
      ...novoProd,
      imagens: imagensInseridas
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function updateProduto(
  id: string,
  produto: Partial<Omit<Produto, "id" | "criado_em" | "imagens">>,
  novasImagens?: File[],
  imagensRemovidasUrls?: string[]
): Promise<Produto | null> {
  try {
    const { data: prodAtualizado, error: prodError } = await supabase
      .from("produtos")
      .update(produto)
      .eq("id", id)
      .select()
      .single();

    if (prodError || !prodAtualizado) {
      if (prodError) console.error(prodError);
      return null;
    }

    if (imagensRemovidasUrls && imagensRemovidasUrls.length > 0) {
      const { error: delImgError } = await supabase
        .from("imagens")
        .delete()
        .eq("produto_id", id)
        .in("url", imagensRemovidasUrls);

      if (delImgError) console.error(delImgError);

      for (const url of imagensRemovidasUrls) {
        const pathMatch = url.match(/produtos\/(.+)$/);
        if (pathMatch && pathMatch[1]) {
          const decodePath = decodeURIComponent(pathMatch[1]);
          const { error: remError } = await supabase.storage.from("produtos").remove([decodePath]);
          if (remError) console.error(remError);
        }
      }
    }

    const { data: imagensExistentes, error: getImgError } = await supabase
      .from("imagens")
      .select("*")
      .eq("produto_id", id)
      .order("ordem");

    if (getImgError) console.error(getImgError);

    let proximaOrdem = 1;
    if (!getImgError && imagensExistentes && imagensExistentes.length > 0) {
      proximaOrdem = Math.max(...imagensExistentes.map(img => img.ordem)) + 1;
    }

    const imagensNovasInseridas = [];

    if (novasImagens && novasImagens.length > 0) {
      for (let i = 0; i < novasImagens.length; i++) {
        const file = novasImagens[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `${id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("produtos")
          .upload(filePath, file);

        if (uploadError) console.error(uploadError);

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from("produtos")
            .getPublicUrl(filePath);

          const { data: imgData, error: dbImgError } = await supabase
            .from("imagens")
            .insert([
              {
                produto_id: id,
                url: publicUrlData.publicUrl,
                ordem: proximaOrdem + i
              }
            ])
            .select()
            .single();

          if (dbImgError) console.error(dbImgError);

          if (!dbImgError && imgData) {
            imagensNovasInseridas.push(imgData);
          }
        }
      }
    }

    const { data: imagensFinais, error: getFinalImgError } = await supabase
      .from("imagens")
      .select("*")
      .eq("produto_id", id)
      .order("ordem");

    if (getFinalImgError) console.error(getFinalImgError);

    return {
      ...prodAtualizado,
      imagens: imagensFinais || []
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteProduto(id: string): Promise<boolean> {
  try {
    const { data: imagens, error: getImgError } = await supabase
      .from("imagens")
      .select("url")
      .eq("produto_id", id);

    if (getImgError) console.error(getImgError);

    if (!getImgError && imagens && imagens.length > 0) {
      for (const img of imagens) {
        const pathMatch = img.url.match(/produtos\/(.+)$/);
        if (pathMatch && pathMatch[1]) {
          const decodePath = decodeURIComponent(pathMatch[1]);
          const { error: remError } = await supabase.storage.from("produtos").remove([decodePath]);
          if (remError) console.error(remError);
        }
      }
    }

    const { error: delImgsError } = await supabase.from("imagens").delete().eq("produto_id", id);
    if (delImgsError) console.error(delImgsError);

    const { error: prodError } = await supabase
      .from("produtos")
      .delete()
      .eq("id", id);

    if (prodError) console.error(prodError);

    return !prodError;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function marcarComoVendido(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("produtos")
      .update({ status: "vendido" })
      .eq("id", id);

    if (error) console.error(error);

    return !error;
  } catch (e) {
    console.error(e);
    return false;
  }
}

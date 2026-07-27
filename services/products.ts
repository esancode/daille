import { supabase } from "@/lib/supabase";
import { Produto, Categoria } from "@/types";

const MOCK_CATEGORIAS: Categoria[] = [
  { id: "1", nome: "Anéis" },
  { id: "2", nome: "Brincos" },
  { id: "3", nome: "Colares" },
  { id: "4", nome: "Pulseiras" }
];

const MOCK_PRODUTOS: Produto[] = [
  {
    id: "1",
    codigo: "AN01",
    nome: "ANEL TRABALHADO PRATA 925",
    descricao: "Anel trabalhado em prata de lei 925 de alta qualidade, apresentando um padrão geométrico elegante e sofisticado. Uma peça perfeita para adicionar estilo ao seu dia a dia.",
    preco: 129.90,
    categoria: "Anéis",
    status: "disponivel",
    destaque: true,
    criado_em: new Date().toISOString(),
    imagens: [
      { id: "img1-1", produto_id: "1", url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop", ordem: 1 },
      { id: "img1-2", produto_id: "1", url: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop", ordem: 2 }
    ]
  },
  {
    id: "2",
    codigo: "BR01",
    nome: "BRINCOS DELICADOS PRATA 925",
    descricao: "Brincos de argola ou gota em prata de lei 925, leves e confortáveis, com acabamento polido brilhante que reflete a luz graciosamente.",
    preco: 99.90,
    categoria: "Brincos",
    status: "disponivel",
    destaque: true,
    criado_em: new Date().toISOString(),
    imagens: [
      { id: "img2-1", produto_id: "2", url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop", ordem: 1 },
      { id: "img2-2", produto_id: "2", url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop", ordem: 2 }
    ]
  },
  {
    id: "3",
    codigo: "CO01",
    nome: "COLAR CORAÇÃO PRATA 925",
    descricao: "Corrente veneziana fina com pingente em formato de coração minimalista em prata 925 maciça. Símbolo de amor e elegância atemporal.",
    preco: 149.90,
    categoria: "Colares",
    status: "disponivel",
    destaque: true,
    criado_em: new Date().toISOString(),
    imagens: [
      { id: "img3-1", produto_id: "3", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop", ordem: 1 },
      { id: "img3-2", produto_id: "3", url: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop", ordem: 2 }
    ]
  },
  {
    id: "4",
    codigo: "PU01",
    nome: "PULSEIRA ELEGANCE PRATA 925",
    descricao: "Pulseira delicada em elos entrelaçados em prata 925 polida. Possui fecho boia seguro e extensor para melhor ajuste.",
    preco: 189.90,
    categoria: "Pulseiras",
    status: "disponivel",
    destaque: true,
    criado_em: new Date().toISOString(),
    imagens: [
      { id: "img4-1", produto_id: "4", url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop", ordem: 1 },
      { id: "img4-2", produto_id: "4", url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop", ordem: 2 }
    ]
  },
  {
    id: "5",
    codigo: "AN02",
    nome: "ANEL SOLITÁRIO CLASSIC",
    descricao: "Anel clássico solitário em prata de lei 925 com zircônia lapidada central de alto brilho.",
    preco: 159.90,
    categoria: "Anéis",
    status: "disponivel",
    destaque: true,
    criado_em: new Date().toISOString(),
    imagens: [
      { id: "img5-1", produto_id: "5", url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop", ordem: 1 },
      { id: "img5-2", produto_id: "5", url: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop", ordem: 2 }
    ]
  },
  {
    id: "6",
    codigo: "CO02",
    nome: "COLAR PONTO DE LUZ",
    descricao: "Colar gargantilha com pingente ponto de luz em zircônia transparente e corrente de prata 925.",
    preco: 119.90,
    categoria: "Colares",
    status: "disponivel",
    destaque: false,
    criado_em: new Date().toISOString(),
    imagens: [
      { id: "img6-1", produto_id: "6", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop", ordem: 1 },
      { id: "img6-2", produto_id: "6", url: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop", ordem: 2 }
    ]
  }
];

export async function getCategorias(): Promise<Categoria[]> {
  try {
    const { data, error } = await supabase.from("categorias").select("*").order("nome");
    if (error || !data || data.length === 0) {
      return MOCK_CATEGORIAS;
    }
    return data;
  } catch {
    return MOCK_CATEGORIAS;
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
      return MOCK_PRODUTOS;
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
    return MOCK_PRODUTOS;
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
      const mockProd = MOCK_PRODUTOS.find((p) => p.id === id);
      return mockProd || null;
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
    const mockProd = MOCK_PRODUTOS.find((p) => p.id === id);
    return mockProd || null;
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
      return MOCK_PRODUTOS;
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
    return MOCK_PRODUTOS;
  }
}

export async function getAdminEstatisticas(): Promise<{ total: number; disponiveis: number; vendidos: number }> {
  try {
    const { data: produtos, error } = await supabase.from("produtos").select("status");
    if (error || !produtos) {
      if (error) console.error(error);
      const mockTotal = MOCK_PRODUTOS.length;
      const mockDisponiveis = MOCK_PRODUTOS.filter(p => p.status === "disponivel").length;
      const mockVendidos = MOCK_PRODUTOS.filter(p => p.status === "vendido").length;
      return { total: mockTotal, disponiveis: mockDisponiveis, vendidos: mockVendidos };
    }

    const total = produtos.length;
    const disponiveis = produtos.filter(p => p.status === "disponivel").length;
    const vendidos = produtos.filter(p => p.status === "vendido").length;

    return { total, disponiveis, vendidos };
  } catch (e) {
    console.error(e);
    const mockTotal = MOCK_PRODUTOS.length;
    const mockDisponiveis = MOCK_PRODUTOS.filter(p => p.status === "disponivel").length;
    const mockVendidos = MOCK_PRODUTOS.filter(p => p.status === "vendido").length;
    return { total: mockTotal, disponiveis: mockDisponiveis, vendidos: mockVendidos };
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
          destaque: produto.destaque
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

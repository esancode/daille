export interface Categoria {
  id: string;
  nome: string;
}

export interface ImagemProduto {
  id: string;
  produto_id: string;
  url: string;
  ordem: number;
}

export interface Produto {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  status: "disponivel" | "indisponivel" | "vendido";
  destaque: boolean;
  criado_em: string;
  tag?: string;
  imagens?: ImagemProduto[];
}

export interface CartItem {
  produto: Produto;
  quantidade: number;
}

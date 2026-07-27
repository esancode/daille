import { getTodosProdutosAdmin } from '@/services/products';

export default async function Admin() {
  const produtos = await getTodosProdutosAdmin();
  const totalProdutos = produtos.length;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-lg text-[24px] md:text-[32px] uppercase text-white tracking-widest">
          VISÃO GERAL
        </h1>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 rounded-[4px]">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">TOTAL DE PRODUTOS</h3>
          <p className="text-2xl font-light tracking-wider text-white">{totalProdutos}</p>
          <p className="text-[12px] text-zinc-400 mt-2">
            No catálogo ativo
          </p>
        </div>
      </div>
    </div>
  );
}

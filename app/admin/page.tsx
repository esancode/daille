import Link from 'next/link';
import { getTodosProdutosAdmin } from '@/services/products';

export default async function Admin() {
  const produtos = await getTodosProdutosAdmin();
  const totalProdutos = produtos.length;
  
  // Calculate some dummy stats for now, but based on actual product count
  const vendasHoje = "R$ 2.450,00";
  const pedidosPendentes = 14;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-lg text-[24px] md:text-[32px] uppercase text-white tracking-widest">
          VISÃO GERAL
        </h1>
        <button className="bg-white text-zinc-950 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest rounded-[4px] flex items-center gap-2 hover:bg-zinc-200 transition-colors">
          <span className="material-symbols-outlined text-[16px]">download</span>
          RELATÓRIO
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 rounded-[4px]">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">VENDAS (HOJE)</h3>
          <p className="text-2xl font-light tracking-wider text-white">{vendasHoje}</p>
          <p className="text-[12px] text-green-500 mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +12% vs ontem
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 rounded-[4px]">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">PEDIDOS PENDENTES</h3>
          <p className="text-2xl font-light tracking-wider text-white">{pedidosPendentes}</p>
          <p className="text-[12px] text-red-500 mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            Ação necessária
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 rounded-[4px]">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">TOTAL DE PRODUTOS</h3>
          <p className="text-2xl font-light tracking-wider text-white">{totalProdutos}</p>
          <p className="text-[12px] text-zinc-400 mt-2">
            No catálogo ativo
          </p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="border border-zinc-800 bg-zinc-900/50 rounded-[4px] overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
          <h2 className="text-[14px] font-semibold uppercase tracking-widest text-white">PEDIDOS RECENTES</h2>
          <Link href="/admin/pedidos" className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors underline">VER TODOS</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="p-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">ID</th>
                <th className="p-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">CLIENTE</th>
                <th className="p-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">DATA</th>
                <th className="p-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">STATUS</th>
                <th className="p-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <td className="p-4 text-[13px] text-white">#10295</td>
                <td className="p-4 text-[13px] text-zinc-300">Ana Beatriz Silva</td>
                <td className="p-4 text-[13px] text-zinc-500">27 Jul, 14:30</td>
                <td className="p-4"><span className="bg-zinc-800 text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded">PAGO</span></td>
                <td className="p-4 text-[13px] text-white">R$ 540,00</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <td className="p-4 text-[13px] text-white">#10294</td>
                <td className="p-4 text-[13px] text-zinc-300">Maria Fernanda Oliveira</td>
                <td className="p-4 text-[13px] text-zinc-500">27 Jul, 10:15</td>
                <td className="p-4"><span className="bg-zinc-800 text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded">PAGO</span></td>
                <td className="p-4 text-[13px] text-white">R$ 448,00</td>
              </tr>
              <tr className="hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <td className="p-4 text-[13px] text-white">#10293</td>
                <td className="p-4 text-[13px] text-zinc-300">Carlos Eduardo</td>
                <td className="p-4 text-[13px] text-zinc-500">26 Jul, 18:45</td>
                <td className="p-4"><span className="border border-zinc-700 text-zinc-400 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded">AGUARDANDO PAGAMENTO</span></td>
                <td className="p-4 text-[13px] text-white">R$ 159,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

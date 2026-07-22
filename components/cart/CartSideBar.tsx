export function CartSidebar() {
  return (
    <aside className="w-96 h-screen bg-white shadow-xl p-6">
      <h2 className="text-2xl font-semibold">Meu Carrinho</h2>

      <div className="py-4 border-b">
        Produto 1
      </div>

      <div className="py-4 border-b">
        Produto 2
      </div>

      <hr />

      <p>Total</p>

      <button className="w-full rounded-full py-3">
        Finalizar pelo WhatsApp
      </button>
    </aside>
  );
}
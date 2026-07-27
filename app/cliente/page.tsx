import Link from 'next/link';

export default function Cliente() {
  return (
    <div className="bg-surface min-h-screen">
      {/* Dashboard Layout */}
      <section className="flex flex-col md:flex-row w-full min-h-[calc(100vh-100px)]">
        {/* Left Sidebar */}
        <div className="w-full md:w-64 border-r border-tertiary flex flex-col">
          <Link href="/cliente" className="p-unit-md font-label-caps text-label-caps uppercase bg-tertiary text-on-tertiary transition-colors">MEUS PEDIDOS</Link>
          <Link href="/cliente/dados" className="p-unit-md font-label-caps text-label-caps uppercase text-primary border-b border-tertiary hover:bg-surface-container transition-colors">MEUS DADOS</Link>
          <Link href="/cliente/enderecos" className="p-unit-md font-label-caps text-label-caps uppercase text-primary border-b border-tertiary hover:bg-surface-container transition-colors">ENDEREÇOS</Link>
          <Link href="#" className="p-unit-md font-label-caps text-label-caps uppercase text-error hover:bg-surface-container transition-colors mt-auto border-t border-tertiary">SAIR</Link>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-margin-mobile md:p-margin-desktop flex flex-col">
          <div className="mb-section-gap">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase text-primary leading-none mb-unit-lg">
              BEM-VINDA, MARIA!
            </h1>
            
            {/* Personal Data Snippet */}
            <div className="border border-tertiary p-unit-lg max-w-md bg-white">
              <h2 className="font-label-caps text-label-caps uppercase text-secondary mb-unit-md">SEUS DADOS</h2>
              <p className="font-body-lg font-bold text-primary mb-1">Maria Silva</p>
              <p className="font-body-sm text-secondary mb-unit-md">maria.silva@email.com</p>
              <button className="border border-tertiary px-unit-md py-unit-sm font-label-caps text-label-caps uppercase hover:bg-tertiary hover:text-on-tertiary transition-colors">
                EDITAR DADOS
              </button>
            </div>
          </div>

          <h2 className="font-headline-md text-headline-md uppercase text-primary mb-unit-lg border-b border-tertiary pb-unit-sm">
            MEUS PEDIDOS
          </h2>
          
          <div className="flex flex-col gap-unit-md">
            {/* Order Item */}
            <div className="border border-tertiary p-unit-md flex flex-col md:flex-row justify-between items-start md:items-center bg-white">
              <div className="mb-unit-md md:mb-0">
                <p className="font-label-caps text-label-caps uppercase text-secondary mb-1">PEDIDO #10294</p>
                <p className="font-body-lg font-bold text-primary">R$ 448,00</p>
                <p className="font-body-sm text-secondary mt-1">24 de Julho de 2026</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-unit-md">
                <span className="bg-primary text-on-primary px-unit-sm py-unit-xs font-label-caps text-label-caps uppercase">ENTREGUE</span>
                <button className="border border-primary text-primary px-unit-md py-unit-sm font-label-caps text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-colors">VER DETALHES</button>
              </div>
            </div>

            <div className="border border-tertiary p-unit-md flex flex-col md:flex-row justify-between items-start md:items-center bg-white">
              <div className="mb-unit-md md:mb-0">
                <p className="font-label-caps text-label-caps uppercase text-secondary mb-1">PEDIDO #10155</p>
                <p className="font-body-lg font-bold text-primary">R$ 159,00</p>
                <p className="font-body-sm text-secondary mt-1">10 de Junho de 2026</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-unit-md">
                <span className="bg-tertiary text-on-tertiary px-unit-sm py-unit-xs font-label-caps text-label-caps uppercase">ENTREGUE</span>
                <button className="border border-primary text-primary px-unit-md py-unit-sm font-label-caps text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-colors">VER DETALHES</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

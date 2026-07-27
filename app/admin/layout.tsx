"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setAuthError(error.message);
      }
    } catch {
      setAuthError("Erro desconhecido ao tentar fazer login.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-[12px] uppercase tracking-widest text-zinc-400">
            Carregando painel...
          </span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6 font-sans">
        <div className="w-full max-w-sm flex flex-col gap-8 bg-zinc-900 border border-zinc-800 p-8 rounded-[4px]">
          <div className="flex flex-col items-center gap-2">
            <img
              src="/logo/logo_vertical_velune.png"
              alt="Velune Pratas"
              className="h-16 w-auto object-contain brightness-0 invert"
            />
            <h1 className="font-playfair text-[20px] font-light uppercase tracking-widest text-white mt-4">
              Painel Admin
            </h1>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-[13px] rounded-[4px] focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white text-[13px] rounded-[4px] focus:outline-none focus:border-zinc-500"
              />
            </div>

            {authError && (
              <p className="text-red-500 text-[11px] font-semibold uppercase tracking-wider text-center mt-1">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-4.5 bg-white text-zinc-950 text-[11px] font-semibold uppercase tracking-widest rounded-[4px] hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-2 cursor-pointer"
            >
              {authLoading ? "Acessando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Produtos", href: "/admin/produtos" },
    { name: "Novo Produto", href: "/admin/produtos/novo" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-950 text-white font-sans">
      <header className="md:hidden w-full h-16 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between px-6 fixed top-0 left-0 z-30">
        <Link href="/admin">
          <img
            src="/logo/logo_vertical_velune.png"
            alt="Velune"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-zinc-400 hover:text-white p-2 focus:outline-none cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 border-r border-zinc-900 bg-zinc-950 flex flex-col justify-between p-6 flex-shrink-0 z-50 transform transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <Link href="/admin" onClick={() => setIsSidebarOpen(false)}>
              <img
                src="/logo/logo_vertical_velune.png"
                alt="Velune"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-zinc-500 hover:text-white p-1 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-widest rounded-[4px] transition-colors ${
                    isActive
                      ? "bg-white text-zinc-950"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={() => {
            setIsSidebarOpen(false);
            handleLogout();
          }}
          className="w-full py-3.5 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-[11px] font-semibold uppercase tracking-widest rounded-[4px] transition-colors cursor-pointer"
        >
          Sair
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 pt-22 md:pt-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

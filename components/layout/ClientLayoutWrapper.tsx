"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSideBar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface relative">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <CartSidebar />
    </div>
  );
}

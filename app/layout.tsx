import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Velune Pratas | Joias em Prata 925",
  description: "Descubra a elegância da prata 925. Anéis, brincos, colares e pulseiras com design exclusivo e acabamento premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className={`${inter.variable} ${montserrat.variable} bg-surface text-on-surface font-sans`}>
        <CartProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter, Montserrat, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { FavoritesProvider } from "@/hooks/useFavorites";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const cinzel = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://daille.com.br"),
  title: "Daille | Joias em Prata 925",
  description: "Descubra a elegância da prata 925. Anéis, brincos, colares e pulseiras com design exclusivo e acabamento premium.",
  openGraph: {
    title: "Daille | A elegância da Prata 925 na sua pele.",
    description: "Descubra a elegância da prata 925. Anéis, brincos, colares e pulseiras com design exclusivo e acabamento premium.",
    url: "https://daille.com.br",
    siteName: "Daille",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Daille - Coleção Premium",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
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
      <body className={`${cinzel.variable} ${montserrat.variable} ${inter.variable} bg-[#FDFDFD] font-sans antialiased`} suppressHydrationWarning>
        <div className="w-full bg-[#FDFDFD] min-h-screen relative flex flex-col overflow-x-hidden">
          <FavoritesProvider>
            <CartProvider>
              <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            </CartProvider>
          </FavoritesProvider>
        </div>
      </body>
    </html>
  );
}
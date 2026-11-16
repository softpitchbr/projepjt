import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "600", "800"] });
import { RoleProvider } from "@/components/RoleProvider";
import { Sidebar } from "@/components/Sidebar";
import { DemoBanner } from "@/components/DemoBanner";

export const metadata: Metadata = {
  title: "Projepjt — protótipo",
  description: "Protótipo clicável do sistema de gestão da Progep (dados fictícios)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-soft text-ink">
        <RoleProvider>
          <DemoBanner />
          <div className="flex flex-col md:flex-row">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </RoleProvider>
      </body>
    </html>
  );
}

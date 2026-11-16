import type { Metadata } from "next";
import "./globals.css";
import { RoleProvider } from "@/components/RoleProvider";
import { Sidebar } from "@/components/Sidebar";
import { DemoBanner } from "@/components/DemoBanner";

export const metadata: Metadata = {
  title: "Projepjt — protótipo",
  description: "Protótipo clicável do sistema de gestão da Progep (dados fictícios)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-900">
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

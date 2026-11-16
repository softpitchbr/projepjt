"use client";
import { Guard } from "@/components/Guard";
import { KpiCard } from "@/components/KpiCard";
import { BarsChart } from "@/components/Chart";
import { useRole } from "@/components/RoleProvider";
import { commercialMonths, memberResults } from "@/data/commercial";
import { brl, noShowRate, pct, rate, vsAverage } from "@/lib/metrics";

export default function Comercial() {
  const { role } = useRole();
  const com = commercialMonths[commercialMonths.length - 1];
  const rows = role === "consultor" ? memberResults.slice(0, 1) : memberResults;
  const sales = memberResults.map((m) => m.sales);
  return (
    <Guard route="/comercial">
      <h1 className="mb-4 text-2xl font-extrabold text-snow">Comercial</h1>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Faturamento" value={brl(com.revenue)} delta={`Meta ${brl(com.goalRevenue)}`} />
        <KpiCard label="Conversão proposta→venda" value={pct(rate(com.sales, com.proposals))} />
        <KpiCard label="No-show" value={pct(noShowRate({ scheduled: com.meetingsScheduled, noShow: com.noShows }))} />
        <KpiCard label="Vendas" value={String(com.sales)} />
      </div>
      <BarsChart data={commercialMonths} x="month" series={[{ key: "revenue", name: "Realizado", color: "#3ddc97" }, { key: "goalRevenue", name: "Meta", color: "#4a6b5b" }]} />
      <h2 className="mb-2 mt-6 font-semibold">{role === "consultor" ? "Meu desempenho" : "Ranking por membro"}</h2>
      {rows.length === 0 ? <p>Nenhum membro.</p> : (
        <table className="w-full hud text-sm">
          <thead><tr className="text-left font-mono text-xs uppercase text-muted"><th className="p-2">Membro</th><th>Reuniões</th><th>No-show</th><th>Vendas</th><th>vs. média</th></tr></thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.memberId} className="border-t border-line">
                <td className="p-2">{m.name}</td><td>{m.meetings}</td><td>{m.noShow}</td><td>{m.sales}</td>
                <td className={vsAverage(sales, m.sales) >= 0 ? "text-brand-light" : "text-accent-light"}>{vsAverage(sales, m.sales).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Guard>
  );
}

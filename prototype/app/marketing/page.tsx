"use client";
import { Guard } from "@/components/Guard";
import { KpiCard } from "@/components/KpiCard";
import { BarsChart, LinesChart } from "@/components/Chart";
import { marketingMonths } from "@/data/marketing";
import { brl, rate, pct } from "@/lib/metrics";

export default function Marketing() {
  const m = marketingMonths[marketingMonths.length - 1];
  const data = marketingMonths.map((x) => ({ ...x, cpl: x.leads === 0 ? 0 : Math.round(x.spend / x.leads) }));
  return (
    <Guard route="/marketing">
      <h1 className="mb-4 text-2xl font-extrabold text-snow">Marketing</h1>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Leads" value={String(m.leads)} delta={`Planejado ${m.plannedLeads}`} />
        <KpiCard label="Custo por lead" value={brl(m.leads === 0 ? 0 : m.spend / m.leads)} />
        <KpiCard label="Leads qualificados" value={pct(rate(m.qualified, m.leads))} />
        <KpiCard label="Investimento" value={brl(m.spend)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <BarsChart data={data} x="month" series={[{ key: "leads", name: "Leads", color: "#3ddc97" }, { key: "plannedLeads", name: "Planejado", color: "#4a6b5b" }]} />
        <LinesChart data={data} x="month" series={[{ key: "cpl", name: "Custo por lead (R$)", color: "#ff6b9a" }]} />
      </div>
    </Guard>
  );
}

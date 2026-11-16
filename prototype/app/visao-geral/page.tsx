"use client";
import { Guard } from "@/components/Guard";
import { KpiCard } from "@/components/KpiCard";
import { BarsChart } from "@/components/Chart";
import { commercialMonths } from "@/data/commercial";
import { marketingMonths } from "@/data/marketing";
import { crossFunnel, brl, noShowRate, pct } from "@/lib/metrics";
import { projects } from "@/data/projects";

export default function VisaoGeral() {
  const com = commercialMonths[commercialMonths.length - 1];
  const mkt = marketingMonths[marketingMonths.length - 1];
  const funnel = crossFunnel(mkt, com);
  return (
    <Guard route="/visao-geral">
      <h1 className="mb-4 text-2xl font-extrabold text-ink">Visão geral</h1>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Faturamento do mês" value={brl(com.revenue)} delta={`Meta ${brl(com.goalRevenue)}`} />
        <KpiCard label="Leads" value={String(mkt.leads)} delta={`Planejado ${mkt.plannedLeads}`} />
        <KpiCard label="No-show" value={pct(noShowRate({ scheduled: com.meetingsScheduled, noShow: com.noShows }))} />
        <KpiCard label="Projetos em atenção" value={String(projects.filter((p) => p.status !== "No prazo").length)} />
      </div>
      <h2 className="mb-2 font-semibold">Funil cruzado: projetado vs. realizado</h2>
      <BarsChart data={funnel} x="stage" series={[{ key: "planned", name: "Projetado", color: "#a8bdb1" }, { key: "actual", name: "Realizado", color: "#1e8a5c" }]} />
    </Guard>
  );
}

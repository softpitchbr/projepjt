"use client";
import { Guard } from "@/components/Guard";
import { BarsChart } from "@/components/Chart";
import { CountUp, Gauge, HudPanel, InsightRow, LiveClock } from "@/components/Hud";
import { commercialMonths } from "@/data/commercial";
import { marketingMonths } from "@/data/marketing";
import { projects } from "@/data/projects";
import { crossFunnel, brl, noShowRate, pct } from "@/lib/metrics";
import { NO_SHOW_TARGET, generateInsights } from "@/lib/insights";

export default function VisaoGeral() {
  const com = commercialMonths[commercialMonths.length - 1];
  const mkt = marketingMonths[marketingMonths.length - 1];
  const insights = generateInsights({ commercial: com, marketing: mkt, projects });
  const level = (id: string) => insights.find((i) => i.id === id)!.level;
  const ns = noShowRate({ scheduled: com.meetingsScheduled, noShow: com.noShows });
  const funnel = crossFunnel(mkt, com);
  const alerts = insights.filter((i) => i.level !== "ok").length;

  return (
    <Guard route="/visao-geral">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-light">Centro de comando · {com.month}</div>
          <h1 className="text-3xl font-extrabold text-snow">Projep em um olhar</h1>
        </div>
        <LiveClock />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <HudPanel title="Faturamento vs. meta" delay={0}>
          <Gauge fraction={com.revenue / com.goalRevenue} level={level("receita")} label={brl(com.revenue)} sub={`meta ${brl(com.goalRevenue)}`}>
            <CountUp value={(com.revenue / com.goalRevenue) * 100} format={(n) => `${Math.round(n)}%`} />
          </Gauge>
        </HudPanel>
        <HudPanel title="Leads vs. planejado" delay={120}>
          <Gauge fraction={mkt.leads / mkt.plannedLeads} level={level("leads")} label={`${mkt.leads} leads`} sub={`planejado ${mkt.plannedLeads}`}>
            <CountUp value={(mkt.leads / mkt.plannedLeads) * 100} format={(n) => `${Math.round(n)}%`} />
          </Gauge>
        </HudPanel>
        <HudPanel title="No-show (menor é melhor)" delay={240}>
          <Gauge fraction={ns / 0.3} level={level("noshow")} label={pct(ns)} sub={`limite ${pct(NO_SHOW_TARGET)}`}>
            <CountUp value={ns * 100} format={(n) => `${n.toFixed(1)}%`} />
          </Gauge>
        </HudPanel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <HudPanel title={`Análise automática · ${alerts} ponto(s) de atenção`} className="lg:col-span-2" delay={360}>
          <ul className="space-y-2">
            {insights.map((i, n) => <InsightRow key={i.id} i={i} delay={500 + n * 220} />)}
          </ul>
        </HudPanel>
        <HudPanel title="Funil cruzado: projetado vs. realizado" className="lg:col-span-3" delay={480}>
          <BarsChart data={funnel} x="stage" series={[{ key: "planned", name: "Projetado", color: "#4a6b5b" }, { key: "actual", name: "Realizado", color: "#3ddc97" }]} />
        </HudPanel>
      </div>
    </Guard>
  );
}

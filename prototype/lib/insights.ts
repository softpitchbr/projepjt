import type { CommercialMonth } from "../data/commercial";
import type { MarketingMonth } from "../data/marketing";
import type { Project } from "../data/projects";
import { brl, noShowRate, pct } from "./metrics";

export const NO_SHOW_TARGET = 0.15;
const NO_SHOW_RISK = 0.25;

export type Level = "ok" | "atenção" | "risco";
export type Insight = { id: string; level: Level; title: string; detail: string; action: string };

const ORDER: Record<Level, number> = { risco: 0, "atenção": 1, ok: 2 };

export function generateInsights(d: { commercial: CommercialMonth; marketing: MarketingMonth; projects: Project[] }): Insight[] {
  const { commercial: c, marketing: m, projects } = d;
  const out: Insight[] = [];

  const ratio = c.goalRevenue === 0 ? 1 : c.revenue / c.goalRevenue;
  out.push({
    id: "receita",
    level: ratio >= 1 ? "ok" : ratio >= 0.85 ? "atenção" : "risco",
    title: ratio >= 1 ? "Meta de faturamento batida" : "Faturamento abaixo da meta",
    detail: `${brl(c.revenue)} de ${brl(c.goalRevenue)} (${pct(ratio)} da meta).`,
    action: ratio >= 1 ? "Manter o ritmo e antecipar a projeção do próximo mês." : "Revisar propostas em aberto e priorizar as de maior valor.",
  });

  const ns = noShowRate({ scheduled: c.meetingsScheduled, noShow: c.noShows });
  out.push({
    id: "noshow",
    level: ns > NO_SHOW_RISK ? "risco" : ns > NO_SHOW_TARGET ? "atenção" : "ok",
    title: ns > NO_SHOW_TARGET ? "No-show acima do limite" : "No-show sob controle",
    detail: `${pct(ns)} das reuniões marcadas (limite ${pct(NO_SHOW_TARGET)}).`,
    action: ns > NO_SHOW_TARGET ? "Reforçar confirmação 24h antes e qualificar melhor na pré-venda." : "Sem ação necessária.",
  });

  const leadRatio = m.plannedLeads === 0 ? 1 : m.leads / m.plannedLeads;
  out.push({
    id: "leads",
    level: leadRatio >= 0.95 ? "ok" : leadRatio >= 0.8 ? "atenção" : "risco",
    title: leadRatio >= 0.95 ? "Geração de leads no plano" : "Leads abaixo do planejado",
    detail: `${m.leads} leads para ${m.plannedLeads} planejados (${pct(leadRatio)}).`,
    action: leadRatio >= 0.95 ? "Acompanhar o custo por lead." : "Revisar campanhas e orçamento do tráfego pago.",
  });

  const late = projects.filter((p) => p.status === "Atrasado");
  const warn = projects.filter((p) => p.status === "Atenção");
  const flagged = [...late, ...warn];
  out.push({
    id: "projetos",
    level: late.length > 0 ? "risco" : warn.length > 0 ? "atenção" : "ok",
    title: flagged.length === 0 ? "Projetos no prazo" : `${flagged.length} projeto(s) precisam de atenção`,
    detail: flagged.length === 0 ? "Nenhum projeto com desvio." : flagged.map((p) => `${p.client} (${p.status.toLowerCase()})`).join(", ") + ".",
    action: flagged.length === 0 ? "Sem ação necessária." : "Alinhar com os gerentes de projeto antes da próxima RG.",
  });

  return out.sort((a, b) => ORDER[a.level] - ORDER[b.level]);
}

import type { MarketingMonth } from "../data/marketing";
import type { CommercialMonth } from "../data/commercial";

export type Meetings = { scheduled: number; noShow: number };

export function rate(part: number, total: number): number {
  return total === 0 ? 0 : part / total;
}

export function noShowRate(m: Meetings): number {
  return rate(m.noShow, m.scheduled);
}

export function vsAverage(values: number[], v: number): number {
  if (values.length === 0) return 0;
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return v - avg;
}

export type FunnelStage = { stage: string; planned: number; actual: number };

export function crossFunnel(mkt: MarketingMonth, com: CommercialMonth): FunnelStage[] {
  return [
    { stage: "Leads", planned: mkt.plannedLeads, actual: mkt.leads },
    { stage: "Reuniões marcadas", planned: com.planned.meetings, actual: com.meetingsScheduled },
    { stage: "Reuniões realizadas", planned: com.planned.held, actual: com.meetingsScheduled - com.noShows },
    { stage: "Propostas", planned: com.planned.proposals, actual: com.proposals },
    { stage: "Vendas", planned: com.planned.sales, actual: com.sales },
  ];
}

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

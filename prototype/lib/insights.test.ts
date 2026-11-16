import { describe, it, expect } from "vitest";
import { generateInsights, NO_SHOW_TARGET } from "./insights";
import type { CommercialMonth } from "../data/commercial";
import type { MarketingMonth } from "../data/marketing";
import type { Project } from "../data/projects";

const com = (o: Partial<CommercialMonth> = {}): CommercialMonth => ({
  month: "Nov", meetingsScheduled: 100, noShows: 10, proposals: 30, sales: 10, revenue: 50000, goalRevenue: 44000,
  planned: { meetings: 100, held: 90, proposals: 30, sales: 10 }, ...o,
});
const mkt = (o: Partial<MarketingMonth> = {}): MarketingMonth => ({ month: "Nov", spend: 2000, leads: 220, plannedLeads: 220, qualified: 80, ...o });
const proj = (status: Project["status"], client = "C"): Project => ({ id: 1, client, manager: "M", sprint: "S", progress: 0.5, status, notes: [] });

describe("generateInsights", () => {
  it("meta batida gera insight ok", () => {
    const i = generateInsights({ commercial: com(), marketing: mkt(), projects: [] });
    expect(i.find((x) => x.id === "receita")?.level).toBe("ok");
  });
  it("receita abaixo de 85% da meta é risco", () => {
    const i = generateInsights({ commercial: com({ revenue: 30000 }), marketing: mkt(), projects: [] });
    expect(i.find((x) => x.id === "receita")?.level).toBe("risco");
  });
  it("no-show acima da meta gera atenção com ação sugerida", () => {
    const i = generateInsights({ commercial: com({ noShows: 20 }), marketing: mkt(), projects: [] });
    const n = i.find((x) => x.id === "noshow");
    expect(NO_SHOW_TARGET).toBe(0.15);
    expect(n?.level).toBe("atenção");
    expect(n?.action.length).toBeGreaterThan(0);
  });
  it("no-show acima de 25% é risco", () => {
    const i = generateInsights({ commercial: com({ noShows: 30 }), marketing: mkt(), projects: [] });
    expect(i.find((x) => x.id === "noshow")?.level).toBe("risco");
  });
  it("sem reuniões marcadas não gera NaN nem alerta", () => {
    const i = generateInsights({ commercial: com({ meetingsScheduled: 0, noShows: 0 }), marketing: mkt(), projects: [] });
    expect(i.find((x) => x.id === "noshow")?.level).toBe("ok");
  });
  it("projeto atrasado é risco e cita o cliente", () => {
    const i = generateInsights({ commercial: com(), marketing: mkt(), projects: [proj("Atrasado", "Cliente Delta"), proj("No prazo")] });
    const p = i.find((x) => x.id === "projetos");
    expect(p?.level).toBe("risco");
    expect(p?.detail).toContain("Cliente Delta");
  });
  it("leads entre 80% e 95% do plano geram atenção", () => {
    const i = generateInsights({ commercial: com(), marketing: mkt({ leads: 190 }), projects: [] });
    expect(i.find((x) => x.id === "leads")?.level).toBe("atenção");
  });
  it("leads abaixo de 80% do plano são risco", () => {
    const i = generateInsights({ commercial: com(), marketing: mkt({ leads: 150 }), projects: [] });
    expect(i.find((x) => x.id === "leads")?.level).toBe("risco");
  });
  it("ordena do mais grave para o menos grave", () => {
    const i = generateInsights({ commercial: com({ revenue: 30000 }), marketing: mkt(), projects: [] });
    const order = { risco: 0, "atenção": 1, ok: 2 } as const;
    const sorted = [...i].sort((a, b) => order[a.level] - order[b.level]);
    expect(i.map((x) => x.id)).toEqual(sorted.map((x) => x.id));
  });
});

import { describe, it, expect } from "vitest";
import { rate, noShowRate, vsAverage, crossFunnel } from "./metrics";
import { members } from "../data/members";
import { marketingMonths } from "../data/marketing";
import { commercialMonths } from "../data/commercial";

describe("metrics", () => {
  it("rate retorna 0 quando o total é 0", () => {
    expect(rate(1, 0)).toBe(0);
  });
  it("rate calcula a proporção", () => {
    expect(rate(15, 100)).toBe(0.15);
  });
  it("noShowRate sem reuniões marcadas é 0", () => {
    expect(noShowRate({ scheduled: 0, noShow: 0 })).toBe(0);
  });
  it("vsAverage com lista vazia não quebra", () => {
    expect(vsAverage([], 5)).toBe(0);
  });
  it("vsAverage devolve a diferença para a média", () => {
    expect(vsAverage([2, 4], 5)).toBe(2);
  });
  it("crossFunnel devolve etapas com planejado e realizado", () => {
    const f = crossFunnel(marketingMonths[0], commercialMonths[0]);
    expect(f.length).toBeGreaterThanOrEqual(4);
    expect(f.every((s) => s.planned > 0 && s.actual >= 0)).toBe(true);
  });
  it("members tem entre 40 e 60 membros", () => {
    expect(members.length).toBeGreaterThanOrEqual(40);
    expect(members.length).toBeLessThanOrEqual(60);
  });
});

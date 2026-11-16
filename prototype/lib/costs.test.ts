import { describe, it, expect } from "vitest";
import { TIERS, monthlyCostBrl, projection, paybackMonths } from "./costs";

describe("costs", () => {
  it("custo mensal em reais = itens em dólar x cotação + itens em reais", () => {
    const t = { name: "x", description: "", usd: [{ label: "a", value: 10 }, { label: "b", value: 5 }], brl: [{ label: "c", value: 20 }] };
    expect(monthlyCostBrl(t, 5)).toBe(15 * 5 + 20);
  });
  it("tiers ficam em ordem crescente de custo", () => {
    const c = TIERS.map((t) => monthlyCostBrl(t, 5.5));
    expect([...c].sort((a, b) => a - b)).toEqual(c);
  });
  it("projeção acumula com crescimento anual", () => {
    expect(projection(12, 100, 0)).toBe(1200);
    expect(projection(24, 100, 0.1)).toBeCloseTo(100 * 12 + 110 * 12);
  });
  it("projeção com 0 meses é 0", () => {
    expect(projection(0, 100, 0.1)).toBe(0);
  });
  it("payback: investimento / (economia - custo mensal)", () => {
    expect(paybackMonths(10000, 1500, 500)).toBe(10);
  });
  it("payback é null quando a economia não cobre o custo", () => {
    expect(paybackMonths(10000, 400, 500)).toBeNull();
  });
  it("payback sem investimento inicial é 0", () => {
    expect(paybackMonths(0, 1500, 500)).toBe(0);
  });
});

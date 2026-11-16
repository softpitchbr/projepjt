import { describe, it, expect } from "vitest";
import { estimateLoad, CURRENT, PROPOSED } from "./capacity";

describe("estimateLoad", () => {
  it("rps cresce com usuários", () => {
    expect(estimateLoad(60, PROPOSED).rps).toBeGreaterThan(estimateLoad(10, PROPOSED).rps);
  });
  it("arquitetura proposta fica saudável com 60 usuários", () => {
    const r = estimateLoad(60, PROPOSED);
    expect(r.status).toBe("ok");
    expect(r.p95Ms).toBeLessThan(500);
  });
  it("arquitetura proposta ainda aguenta 100 usuários", () => {
    expect(estimateLoad(100, PROPOSED).status).not.toBe("risco");
  });
  it("setup atual (sem cache, plano gratuito) entra em risco com 60 usuários", () => {
    expect(estimateLoad(60, CURRENT).status).toBe("risco");
  });
  it("0 usuários não gera NaN", () => {
    const r = estimateLoad(0, PROPOSED);
    expect(Number.isFinite(r.p95Ms)).toBe(true);
    expect(r.rps).toBe(0);
  });
});

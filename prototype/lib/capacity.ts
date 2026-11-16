export type Assumptions = {
  label: string;
  reqPerUserPerMin: number;
  peakFactor: number;
  queriesPerReq: number;
  cacheHit: number;
  dbMaxQps: number;
  avgQueryMs: number;
  baseMs: number;
};

export type LoadResult = {
  rps: number;
  dbQps: number;
  utilization: number;
  dbConnections: number;
  p95Ms: number;
  status: "ok" | "atenção" | "risco";
};

const COMMON = { reqPerUserPerMin: 8, peakFactor: 3, queriesPerReq: 3, avgQueryMs: 15, baseMs: 120 };

export const CURRENT: Assumptions = { ...COMMON, label: "Site atual (plano gratuito, sem cache)", cacheHit: 0, dbMaxQps: 20 };
export const PROPOSED: Assumptions = { ...COMMON, label: "Arquitetura proposta (banco gerenciado, pool e cache)", cacheHit: 0.85, dbMaxQps: 400 };

export function estimateLoad(users: number, a: Assumptions): LoadResult {
  const u = Math.max(0, users);
  const rps = (u * a.reqPerUserPerMin * a.peakFactor) / 60;
  const dbQps = rps * (1 - a.cacheHit) * a.queriesPerReq;
  const utilization = dbQps / a.dbMaxQps;
  const dbConnections = Math.ceil((dbQps * a.avgQueryMs) / 1000);
  const p95Ms = Math.round(a.baseMs / (1 - Math.min(utilization, 0.95)));
  const status = utilization < 0.6 ? "ok" : utilization < 0.85 ? "atenção" : "risco";
  return { rps, dbQps, utilization, dbConnections, p95Ms, status };
}

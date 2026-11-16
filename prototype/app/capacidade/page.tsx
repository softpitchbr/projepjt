"use client";
import { useState } from "react";
import { Guard } from "@/components/Guard";
import { LinesChart } from "@/components/Chart";
import { CURRENT, PROPOSED, estimateLoad, type Assumptions } from "@/lib/capacity";
import { pct } from "@/lib/metrics";

const badge = { ok: "bg-brand-light/15 text-brand-light", "atenção": "bg-cta/15 text-cta", risco: "bg-accent-light/15 text-accent-light" } as const;
const label = { ok: "Saudável", "atenção": "Atenção", risco: "Em risco" } as const;

function Panel({ a, users }: { a: Assumptions; users: number }) {
  const r = estimateLoad(users, a);
  const rows: [string, string][] = [
    ["Requisições no pico", `${r.rps.toFixed(1)} por segundo`],
    ["Consultas ao banco", `${r.dbQps.toFixed(1)} por segundo`],
    ["Uso da capacidade do banco", pct(Math.min(r.utilization, 9.99))],
    ["Conexões simultâneas ao banco", String(r.dbConnections)],
    ["Tempo de resposta (p95, estimado)", `${r.p95Ms} ms`],
  ];
  return (
    <div className="hud p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="font-extrabold">{a.label}</h2>
        <span className={`rounded px-2 py-0.5 text-xs font-extrabold ${badge[r.status]}`}>{label[r.status]}</span>
      </div>
      <dl className="space-y-1 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-line/50 pb-1">
            <dt className="text-muted">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 h-2 rounded bg-void">
        <div className={`h-2 rounded ${r.status === "ok" ? "bg-brand-light" : r.status === "atenção" ? "bg-cta" : "bg-accent"}`} style={{ width: `${Math.min(r.utilization, 1) * 100}%` }} />
      </div>
    </div>
  );
}

export default function Capacidade() {
  const [users, setUsers] = useState(60);
  const data = Array.from({ length: 20 }, (_, i) => {
    const u = (i + 1) * 5;
    return { usuarios: u, atual: estimateLoad(u, CURRENT).p95Ms, proposta: estimateLoad(u, PROPOSED).p95Ms };
  });
  return (
    <Guard route="/capacidade">
      <h1 className="text-3xl font-extrabold text-snow">Aguenta 60 usuários?</h1>
      <p className="mb-4 mt-1 max-w-3xl text-muted">Mova o controle e compare o que acontece com a estrutura que a Projep tinha e com a que propomos. É um <strong>modelo com premissas visíveis</strong>, não uma medição: o teste de carga real entra na fase com backend.</p>
      <div className="mb-6 hud p-4">
        <label className="font-extrabold">Usuários ao mesmo tempo no pico: {users}</label>
        <input type="range" min={1} max={100} value={users} onChange={(e) => setUsers(Number(e.target.value))} className="mt-2 w-full accent-brand-light" />
        <div className="flex justify-between text-xs text-muted"><span>1</span><span>60 (meta)</span><span>100</span></div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel a={CURRENT} users={users} />
        <Panel a={PROPOSED} users={users} />
      </div>
      <h2 className="mb-2 mt-8 text-lg font-extrabold">Tempo de resposta conforme cresce o número de usuários (ms)</h2>
      <LinesChart data={data} x="usuarios" series={[{ key: "atual", name: "Site atual", color: "#ff5a47" }, { key: "proposta", name: "Arquitetura proposta", color: "#3ddc97" }]} />
      <h2 className="mb-2 mt-8 text-lg font-extrabold">Premissas do modelo</h2>
      <table className="w-full hud text-sm">
        <thead><tr className="text-left font-mono text-xs uppercase text-muted"><th className="p-2">Premissa</th><th>Atual</th><th>Proposta</th></tr></thead>
        <tbody>
          {[
            ["Requisições por usuário por minuto", CURRENT.reqPerUserPerMin, PROPOSED.reqPerUserPerMin],
            ["Fator de pico", CURRENT.peakFactor, PROPOSED.peakFactor],
            ["Consultas por requisição", CURRENT.queriesPerReq, PROPOSED.queriesPerReq],
            ["Taxa de acerto do cache", pct(CURRENT.cacheHit), pct(PROPOSED.cacheHit)],
            ["Capacidade do banco (consultas/s)", CURRENT.dbMaxQps, PROPOSED.dbMaxQps],
          ].map(([k, a, b]) => (
            <tr key={String(k)} className="border-t border-line"><td className="p-2">{k}</td><td>{a}</td><td>{b}</td></tr>
          ))}
        </tbody>
      </table>
    </Guard>
  );
}

"use client";
import { useState } from "react";
import { Guard } from "@/components/Guard";
import { useMode } from "@/components/ModeProvider";
import { CountUp } from "@/components/Hud";
import { rawLeads, rawMeetings } from "@/data/sources";
import { dedupLeads, dedupMeetings } from "@/lib/dedup";
import { pct, rate } from "@/lib/metrics";

const stages = ["Lendo CRM…", "Lendo Google Ads…", "Lendo formulários…", "Normalizando e deduplicando…", "Pronto"];

export default function Integracao() {
  const { mode } = useMode();
  const [stage, setStage] = useState(-1);
  const done = stage === stages.length - 1;

  function sync() {
    setStage(0);
    stages.forEach((_, i) => setTimeout(() => setStage(i), i * 600));
  }

  const leads = dedupLeads(rawLeads);
  const meetings = dedupMeetings(rawMeetings);
  const rawNoShow = rate(rawMeetings.filter((m) => m.status === "no-show").length, rawMeetings.length);
  const cleanNoShow = rate(meetings.clean.filter((m) => m.status === "no-show").length, meetings.clean.length);
  const sem = mode === "sem";

  return (
    <Guard route="/integracao">
      <div className={`font-mono text-xs uppercase tracking-[0.25em] ${sem ? "text-accent-light" : "text-brand-light"}`}>Integração ao vivo</div>
      <h1 className="text-3xl font-extrabold text-snow">{sem ? "Os dados chegam assim hoje" : "Os mesmos dados, com o sistema"}</h1>
      <p className="mb-4 mt-1 max-w-3xl text-muted">
        Dados fictícios de três fontes, com os mesmos problemas de hoje: lead repetido, telefone em formatos diferentes, reunião contada duas vezes. A limpeza roda de verdade.
      </p>

      {sem ? (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="hud-bad p-4">
              <h2 className="mb-2 text-lg font-extrabold text-accent-light">{rawLeads.length} registros brutos, 3 fontes</h2>
              <ul className="space-y-1 text-sm">
                {rawLeads.map((l, i) => (
                  <li key={i} className="flex justify-between gap-2 border-b border-accent-light/15 pb-1 last:border-0">
                    <span>{l.name}</span>
                    <span className="text-muted">{l.email.trim() || l.phone || "sem contato"} · {l.source}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="hud-bad flicker p-5">
              <h2 className="text-lg font-extrabold text-accent-light">Duas fontes, dois números</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div><div className="text-sm text-muted">Relatório A (CRM + planilha)</div><div className="glow-bad font-mono text-4xl font-bold text-accent-light">{pct(rawNoShow)}</div></div>
                <div><div className="text-sm text-muted">Relatório B (reuniões únicas)</div><div className="glow-bad font-mono text-4xl font-bold text-accent-light">{pct(cleanNoShow)}</div></div>
              </div>
              <p className="mt-4 text-sm text-muted">Mesmo mês, mesma equipe. A diretoria precisa decidir se gasta energia reduzindo no-show e não sabe em qual número confiar. A diferença aqui é de {((rawNoShow - cleanNoShow) * 100).toFixed(0)} pontos.</p>
              <p className="mt-2 font-mono text-sm text-cta">Troque a chave para “Com o sistema”.</p>
            </section>
          </div>
        </>
      ) : (
        <>
          <button onClick={sync} disabled={stage >= 0 && !done} className="rounded-xl bg-cta px-5 py-2.5 font-extrabold text-void shadow-[0_0_18px_rgba(224,122,27,.45)] disabled:opacity-50">
            {done ? "Sincronizar de novo" : "Sincronizar agora"}
          </button>
          {stage >= 0 && <p className="mt-2 font-mono text-sm text-brand-light">{stages[stage]}</p>}

          {done && (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <section className="hud fade-up p-4">
                <h2 className="mb-2 text-lg font-extrabold text-brand-light">
                  <CountUp value={rawLeads.length} /> registros → <CountUp value={leads.clean.length} /> leads únicos
                </h2>
                <ul className="space-y-1 text-sm">
                  {leads.clean.map((l) => (
                    <li key={l.email + l.phone} className="flex flex-wrap justify-between gap-2 border-b border-line/50 pb-1 last:border-0">
                      <span className="font-semibold">{l.name}</span>
                      <span className="text-muted">{l.email || l.phone}</span>
                      <span className="text-xs text-brand-light">{l.sources.join(" + ")}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-muted">{leads.removed} duplicados unificados · {leads.rejected.length} registro rejeitado (sem e-mail e sem telefone).</p>
              </section>
              <section className="hud fade-up p-5" style={{ animationDelay: "200ms" }}>
                <h2 className="text-lg font-extrabold text-snow">Um número só</h2>
                <div className="mt-4 text-center">
                  <div className="text-sm text-muted">No-show, reuniões únicas ({meetings.clean.length})</div>
                  <div className="glow font-mono text-5xl font-bold text-brand-light"><CountUp value={cleanNoShow * 100} format={(n) => `${n.toFixed(1)}%`} /></div>
                </div>
                <p className="mt-4 text-sm text-muted">
                  Antes, a mesma reunião aparecia em duas fontes e o indicador chegava a {pct(rawNoShow)}. Com chave única, o número é um só e a decisão não depende de qual relatório chegou primeiro.
                </p>
              </section>
            </div>
          )}
        </>
      )}
    </Guard>
  );
}

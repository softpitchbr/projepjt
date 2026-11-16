"use client";
import { useState } from "react";
import { Guard } from "@/components/Guard";
import { rawLeads, rawMeetings } from "@/data/sources";
import { dedupLeads, dedupMeetings } from "@/lib/dedup";
import { pct, rate } from "@/lib/metrics";

const stages = ["Lendo CRM…", "Lendo Google Ads…", "Lendo formulários…", "Normalizando e deduplicando…", "Pronto"];

export default function Integracao() {
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

  return (
    <Guard route="/integracao">
      <h1 className="text-3xl font-extrabold text-ink">Integração ao vivo</h1>
      <p className="mb-4 mt-1 max-w-3xl text-muted">
        Dados fictícios de três fontes, com os mesmos problemas de hoje: lead repetido, telefone em formatos diferentes, reunião contada duas vezes. A limpeza abaixo roda de verdade.
      </p>
      <button
        onClick={sync}
        disabled={stage >= 0 && !done}
        className="rounded-xl bg-cta px-5 py-2.5 font-extrabold text-white disabled:opacity-50"
      >
        {done ? "Sincronizar de novo" : "Sincronizar agora"}
      </button>
      {stage >= 0 && <p className="mt-2 font-semibold text-brand">{stages[stage]}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-2 text-lg font-extrabold">Antes: {rawLeads.length} registros brutos</h2>
          <ul className="space-y-1 rounded-xl border border-line bg-white p-3 text-sm">
            {rawLeads.map((l, i) => (
              <li key={i} className="flex justify-between gap-2 border-b border-line/50 pb-1 last:border-0">
                <span>{l.name}</span>
                <span className="text-muted">{l.email.trim() || l.phone || "sem contato"} · {l.source}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-extrabold">Depois: {done ? `${leads.clean.length} leads únicos` : "aguardando sincronização"}</h2>
          {done && (
            <>
              <ul className="space-y-1 rounded-xl border border-brand bg-white p-3 text-sm">
                {leads.clean.map((l) => (
                  <li key={l.email + l.phone} className="flex flex-wrap justify-between gap-2 border-b border-line/50 pb-1 last:border-0">
                    <span className="font-semibold">{l.name}</span>
                    <span className="text-muted">{l.email || l.phone}</span>
                    <span className="text-xs text-brand">{l.sources.join(" + ")}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-muted">
                {leads.removed} duplicados unificados · {leads.rejected.length} registro rejeitado (sem e-mail e sem telefone).
              </p>
            </>
          )}
        </section>
      </div>

      {done && (
        <section className="mt-8 rounded-xl border border-line bg-white p-5">
          <h2 className="text-lg font-extrabold">O problema do no-show com dois números</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <div>
              <div className="text-sm text-muted">Somando CRM + planilha ({rawMeetings.length} linhas)</div>
              <div className="text-3xl font-extrabold text-accent">{pct(rawNoShow)}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Reuniões únicas ({meetings.clean.length})</div>
              <div className="text-3xl font-extrabold text-brand">{pct(cleanNoShow)}</div>
            </div>
            <div className="text-sm text-muted">
              A mesma reunião aparecia em duas fontes e inflava o indicador. Com uma chave única, o número é um só e a decisão não depende de qual relatório chegou primeiro.
            </div>
          </div>
        </section>
      )}
    </Guard>
  );
}

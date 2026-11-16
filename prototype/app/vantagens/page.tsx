"use client";
import { useState } from "react";
import { Guard } from "@/components/Guard";
import { KpiCard } from "@/components/KpiCard";
import { NumField } from "@/components/NumField";
import { SAVINGS_DEFAULTS } from "@/data/defaults";
import { computeSavings, type SavingsInput } from "@/lib/savings";
import { brl } from "@/lib/metrics";

const wins = [
  ["Decisão com dado confiável", "Um número só por indicador. A diretoria discute o plano de ação, não qual relatório está certo."],
  ["Integração entre setores", "Projetos, comercial e marketing enxergam o andamento uns dos outros sem esperar a RG."],
  ["Base para bonificação", "Metas e resultados por membro prontos para o sistema de bonificação de 2027."],
  ["Autonomia", "Código documentado e a Ana treinada para manter. A Projep não depende de uma pessoa só."],
  ["Menos ferramentas soltas", "Os mini-sites e parte do que se paga no Monday passam para um lugar só."],
];

export default function Vantagens() {
  const [v, setV] = useState<SavingsInput>(SAVINGS_DEFAULTS);
  const set = (k: keyof SavingsInput) => (n: number) => setV({ ...v, [k]: n });
  const r = computeSavings(v);
  return (
    <Guard route="/vantagens">
      <h1 className="text-3xl font-extrabold text-ink">Vantagens</h1>
      <p className="mb-4 mt-1 max-w-3xl text-muted">O que muda para a Projep. Os valores abaixo são <strong>estimativas</strong>: ajuste com os números reais e o resultado recalcula.</p>
      <div className="mb-8 grid gap-3 md:grid-cols-2">
        {wins.map(([t, d]) => (
          <div key={t} className="rounded-xl border border-line bg-white p-4">
            <div className="font-extrabold text-brand">{t}</div>
            <p className="text-sm text-muted">{d}</p>
          </div>
        ))}
      </div>
      <h2 className="mb-3 text-xl font-extrabold">Quanto isso vale por ano (estimado)</h2>
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <NumField label="Custo anual do Monday (R$)" value={v.toolCostYear} onChange={set("toolCostYear")} hint="valor de exemplo, preencher" />
        <NumField label="Valor da hora do time (R$)" value={v.hourValue} onChange={set("hourValue")} />
        <NumField label="Horas de relatório por mês, hoje" value={v.reportHoursMonth} onChange={set("reportHoursMonth")} />
        <NumField label="Horas de relatório por mês, depois" value={v.reportHoursMonthAfter} onChange={set("reportHoursMonthAfter")} />
        <NumField label="Reuniões por mês" value={v.meetingsPerMonth} onChange={set("meetingsPerMonth")} />
        <NumField label="Minutos por reunião, hoje" value={v.meetingMinutesBefore} onChange={set("meetingMinutesBefore")} />
        <NumField label="Minutos por reunião, depois" value={v.meetingMinutesAfter} onChange={set("meetingMinutesAfter")} />
        <NumField label="Pessoas por reunião" value={v.people} onChange={set("people")} />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Ferramentas" value={brl(r.toolYear)} delta="por ano" />
        <KpiCard label="Relatórios" value={brl(r.reportYear)} delta="por ano" />
        <KpiCard label="Reuniões" value={`${Math.round(r.meetingHoursYear)} h`} delta="horas por ano" />
        <KpiCard label="Total estimado" value={brl(r.totalYear)} delta="por ano" />
      </div>
    </Guard>
  );
}

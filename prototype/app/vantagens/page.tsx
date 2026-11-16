"use client";
import { useState } from "react";
import { Guard } from "@/components/Guard";
import { useMode } from "@/components/ModeProvider";
import { CountUp } from "@/components/Hud";
import { NumField } from "@/components/NumField";
import { SAVINGS_DEFAULTS } from "@/data/defaults";
import { computeSavings, totalHoursYear, type SavingsInput } from "@/lib/savings";
import { brl } from "@/lib/metrics";

type Row = { what: string; sem: string; com: string; src: "citado" | "estimativa" };

const rows: Row[] = [
  { what: "Indicador de no-show", sem: "2 relatórios, 2 números (cerca de 15 pontos de diferença)", com: "1 número, vindo de uma chave única", src: "citado" },
  { what: "Visibilidade dos projetos", sem: "Só na RG, a cada ~15 dias", com: "Em tempo real, para todos os setores", src: "citado" },
  { what: "Reunião setorial", sem: "1h30", com: "~45 min, com os dados já na tela", src: "citado" },
  { what: "Queda do sistema", sem: "Banco estoura o limite sem aviso", com: "Alerta antes do limite, backup diário", src: "citado" },
  { what: "Ferramentas", sem: "Monday + mini-sites por setor", com: "Um sistema só", src: "citado" },
  { what: "Relatórios e slides da RG", sem: "~20 h/mês montando à mão", com: "~4 h/mês, gerados do sistema", src: "estimativa" },
  { what: "Manutenção", sem: "Depende de quem criou (saindo)", com: "Documentado, com a Ana treinada", src: "citado" },
];

export default function Vantagens() {
  const { mode } = useMode();
  const [v, setV] = useState<SavingsInput>(SAVINGS_DEFAULTS);
  const set = (k: keyof SavingsInput) => (n: number) => setV({ ...v, [k]: n });
  const r = computeSavings(v);
  const hours = totalHoursYear(v);
  const sem = mode === "sem";

  return (
    <Guard route="/vantagens">
      <div className={`font-mono text-xs uppercase tracking-[0.25em] ${sem ? "text-accent-light" : "text-brand-light"}`}>Vantagens</div>
      <h1 className="text-3xl font-extrabold text-snow">{sem ? "O que a Projep perde por ano sem o sistema" : "O que a Projep ganha com o sistema"}</h1>
      <p className="mb-5 mt-1 max-w-3xl text-muted">
        Itens marcados <span className="font-mono text-xs text-brand-light">CITADO</span> vieram da reunião; <span className="font-mono text-xs text-cta">ESTIMATIVA</span> são valores de partida para a Projep corrigir.
      </p>

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <div className={`${sem ? "hud-bad" : "hud"} fade-up p-5 text-center`}>
          <div className="font-mono text-xs uppercase tracking-widest text-muted">{sem ? "Horas gastas por ano" : "Horas devolvidas ao time por ano"}</div>
          <div className={`font-mono text-5xl font-bold ${sem ? "glow-bad text-accent-light" : "glow text-brand-light"}`}><CountUp value={hours} format={(n) => `${Math.round(n).toLocaleString("pt-BR")} h`} /></div>
          <div className="text-xs text-muted">em relatórios e reuniões</div>
        </div>
        <div className={`${sem ? "hud-bad" : "hud"} fade-up p-5 text-center`} style={{ animationDelay: "150ms" }}>
          <div className="font-mono text-xs uppercase tracking-widest text-muted">{sem ? "Custo escondido por ano" : "Economia estimada por ano"}</div>
          <div className={`font-mono text-5xl font-bold ${sem ? "glow-bad text-accent-light" : "glow text-brand-light"}`}><CountUp value={r.totalYear} format={(n) => brl(n)} /></div>
          <div className="text-xs text-muted">ferramentas + horas do time</div>
        </div>
        <div className={`${sem ? "hud-bad" : "hud"} fade-up p-5 text-center`} style={{ animationDelay: "300ms" }}>
          <div className="font-mono text-xs uppercase tracking-widest text-muted">Indicadores com números conflitantes</div>
          <div className={`font-mono text-5xl font-bold ${sem ? "glow-bad text-accent-light" : "glow text-brand-light"}`}>{sem ? "2" : "1"}</div>
          <div className="text-xs text-muted">{sem ? "dois relatórios, dois valores" : "fonte única da verdade"}</div>
        </div>
      </div>

      <div className="hud overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono text-xs uppercase text-muted">
              <th className="p-3">Tema</th><th className="text-accent-light">Sem o sistema</th><th className="text-brand-light">Com o sistema</th><th>Origem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((x) => (
              <tr key={x.what} className="border-t border-line">
                <td className="p-3 font-semibold">{x.what}</td>
                <td className="text-accent-light/90">{x.sem}</td>
                <td className="text-brand-light">{x.com}</td>
                <td className={`font-mono text-[10px] uppercase ${x.src === "citado" ? "text-brand-light" : "text-cta"}`}>{x.src}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-extrabold text-snow">Ajuste as premissas (estimativas)</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <NumField label="Custo anual do Monday (R$)" value={v.toolCostYear} onChange={set("toolCostYear")} hint="valor de exemplo, preencher" />
        <NumField label="Valor da hora do time (R$)" value={v.hourValue} onChange={set("hourValue")} />
        <NumField label="Horas de relatório por mês, hoje" value={v.reportHoursMonth} onChange={set("reportHoursMonth")} />
        <NumField label="Horas de relatório por mês, depois" value={v.reportHoursMonthAfter} onChange={set("reportHoursMonthAfter")} />
        <NumField label="Reuniões por mês" value={v.meetingsPerMonth} onChange={set("meetingsPerMonth")} />
        <NumField label="Minutos por reunião, hoje" value={v.meetingMinutesBefore} onChange={set("meetingMinutesBefore")} />
        <NumField label="Minutos por reunião, depois" value={v.meetingMinutesAfter} onChange={set("meetingMinutesAfter")} />
        <NumField label="Pessoas por reunião" value={v.people} onChange={set("people")} />
      </div>
    </Guard>
  );
}

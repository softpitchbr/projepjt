"use client";
import { useState } from "react";
import { Guard } from "@/components/Guard";
import { commercialMonths } from "@/data/commercial";
import { marketingMonths } from "@/data/marketing";
import { brl } from "@/lib/metrics";

export default function Relatorios() {
  const [on, setOn] = useState(false);
  const c = commercialMonths[commercialMonths.length - 1];
  const m = marketingMonths[marketingMonths.length - 1];
  const slides = [
    { t: "Resultado do mês", b: `Faturamento ${brl(c.revenue)} (meta ${brl(c.goalRevenue)})` },
    { t: "Marketing", b: `${m.leads} leads, ${m.qualified} qualificados` },
    { t: "Comercial", b: `${c.sales} vendas, ${c.noShows} no-shows` },
  ];
  return (
    <Guard route="/relatorios">
      <h1 className="mb-4 text-2xl font-extrabold text-snow">Relatórios</h1>
      <button className="mb-4 rounded-xl bg-cta px-5 py-2.5 font-extrabold text-white hover:opacity-90" onClick={() => setOn(true)}>Gerar slides da RG (simulação)</button>
      {on && <div className="grid gap-4 md:grid-cols-3">{slides.map((s) => <div key={s.t} className="aspect-video rounded-lg border bg-panel p-4 shadow"><h2 className="font-bold">{s.t}</h2><p className="mt-2 text-sm">{s.b}</p></div>)}</div>}
    </Guard>
  );
}

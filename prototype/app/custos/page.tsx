"use client";
import { useState } from "react";
import { Guard } from "@/components/Guard";
import { KpiCard } from "@/components/KpiCard";
import { NumField } from "@/components/NumField";
import { SAVINGS_DEFAULTS } from "@/data/defaults";
import { TIERS, monthlyCostBrl, paybackMonths, projection } from "@/lib/costs";
import { computeSavings } from "@/lib/savings";
import { brl } from "@/lib/metrics";

export default function Custos() {
  const [tier, setTier] = useState(0);
  const [usd, setUsd] = useState(5.5);
  const [supportHours, setSupportHours] = useState(4);
  const [supportRate, setSupportRate] = useState(80);
  const [growth, setGrowth] = useState(10);
  const [initial, setInitial] = useState(0);

  const t = TIERS[tier];
  const infra = monthlyCostBrl(t, usd);
  const support = supportHours * supportRate;
  const monthly = infra + support;
  const savingsMonth = computeSavings(SAVINGS_DEFAULTS).totalYear / 12;
  const payback = paybackMonths(initial, savingsMonth, monthly);

  return (
    <Guard route="/custos">
      <h1 className="text-3xl font-extrabold text-ink">Quanto custa manter</h1>
      <p className="mb-4 mt-1 max-w-3xl text-muted">
        Estimativa de ordem de grandeza (preços de tabela aproximados, em dólar, convertidos pela cotação abaixo). Os valores finais virão na proposta, com a cotação do dia. Não inclui o valor do desenvolvimento.
      </p>
      <div className="mb-6 grid gap-2 md:grid-cols-3">
        {TIERS.map((x, i) => (
          <button key={x.name} onClick={() => setTier(i)} className={`rounded-xl border p-4 text-left ${tier === i ? "border-brand bg-brand text-white" : "border-line bg-white hover:border-brand"}`}>
            <div className="text-lg font-extrabold">{x.name}</div>
            <div className="text-2xl font-extrabold">{brl(monthlyCostBrl(x, usd))}<span className="text-sm font-semibold">/mês</span></div>
            <div className={`text-sm ${tier === i ? "text-white/90" : "text-muted"}`}>{x.description}</div>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-line bg-white p-4">
          <h2 className="mb-2 font-extrabold">O que está incluído ({t.name})</h2>
          <ul className="space-y-1 text-sm">
            {t.usd.map((i) => <li key={i.label} className="flex justify-between"><span>{i.label}</span><span className="text-muted">US$ {i.value}/mês</span></li>)}
            {t.brl.map((i) => <li key={i.label} className="flex justify-between"><span>{i.label}</span><span className="text-muted">R$ {i.value}/mês</span></li>)}
          </ul>
        </section>
        <section className="grid grid-cols-2 gap-3">
          <NumField label="Cotação do dólar (R$)" value={usd} step={0.1} onChange={setUsd} />
          <NumField label="Reajuste anual (%)" value={growth} onChange={setGrowth} hint="crescimento de uso e preços" />
          <NumField label="Horas de suporte por mês" value={supportHours} onChange={setSupportHours} hint="manutenção e ajustes" />
          <NumField label="Valor da hora de suporte (R$)" value={supportRate} onChange={setSupportRate} />
          <div className="col-span-2">
            <NumField label="Investimento inicial (R$)" value={initial} step={500} onChange={setInitial} hint="a definir na proposta; deixe 0 se ainda não existe" />
          </div>
        </section>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-extrabold">Quanto a Projep gasta com o tempo</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Infra por mês" value={brl(infra)} />
        <KpiCard label="Suporte por mês" value={brl(support)} />
        <KpiCard label="Em 12 meses" value={brl(projection(12, monthly, growth / 100))} />
        <KpiCard label="Em 24 meses" value={brl(projection(24, monthly, growth / 100))} />
      </div>

      <div className="mt-4 rounded-xl border border-line bg-white p-5">
        <div className="text-sm text-muted">Economia estimada por mês (premissas padrão da tela Vantagens, sem edições): {brl(savingsMonth)}</div>
        <div className="mt-1 text-lg font-extrabold">
          {payback === null
            ? "Com esses números a economia não cobre o custo mensal."
            : payback === 0
              ? "Sem investimento inicial informado: a economia estimada já supera o custo mensal desde o primeiro mês."
              : `O investimento inicial se paga em cerca de ${payback} meses.`}
        </div>
      </div>

      <h2 className="mb-2 mt-8 text-xl font-extrabold">Linha do tempo estimada</h2>
      <ol className="space-y-2 text-sm">
        <li className="rounded-xl border border-line bg-white p-3"><strong>Mês 0:</strong> implantação (investimento inicial, a definir na proposta).</li>
        <li className="rounded-xl border border-line bg-white p-3"><strong>Meses 1 a 12:</strong> custo mensal de infra e suporte, como acima.</li>
        <li className="rounded-xl border border-line bg-white p-3"><strong>Cerca do mês 12:</strong> revisar plano. Subir de faixa só se o uso passar de ~80 usuários ou o volume de dados crescer muito; senão, o custo se mantém.</li>
      </ol>
    </Guard>
  );
}

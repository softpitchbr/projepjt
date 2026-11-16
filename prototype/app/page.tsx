"use client";
import { useState } from "react";
import { Guard } from "@/components/Guard";
import { useMode } from "@/components/ModeProvider";

const steps = [
  { t: "Fontes", s: "CRM, Google Ads, Monday, formulários", d: "Os dados continuam nascendo onde o time já trabalha. Ninguém precisa mudar de ferramenta para alimentar o sistema." },
  { t: "Ingestão", s: "Conectores automáticos", d: "Um conector por fonte puxa os dados em horários agendados. Acabou a rotina de exportar, jogar na IA e colar em outro lugar. Trocar de CRM é trocar um conector." },
  { t: "Validação", s: "Deduplicação e regras", d: "Telefones e e-mails são normalizados, o mesmo lead vindo de três fontes vira um só e registros sem contato são rejeitados. Veja rodando em Integração ao vivo." },
  { t: "Banco único", s: "Postgres gerenciado, com backup", d: "Fonte única da verdade, em plano pago com pool de conexões, backups automáticos e restrições de unicidade. É o que impede o caso de dois relatórios com dois números diferentes." },
  { t: "Dashboards", s: "Por perfil de acesso", d: "Consultor vê seus números, gerente vê o time, diretoria vê tudo. Cache para respostas rápidas mesmo com todo mundo logado na RG." },
];

const guards = [
  { t: "Banco gerenciado pago", d: "O site anterior caiu por limite de plano gratuito. Aqui o plano é dimensionado para a Projep, com alerta antes de chegar perto do limite." },
  { t: "Pool de conexões", d: "Muitos usuários compartilham poucas conexões. É assim que 60 pessoas ao mesmo tempo não derrubam o banco." },
  { t: "Cache nos dashboards", d: "A maior parte das telas lê dados já calculados. Só uma fração das requisições chega ao banco." },
  { t: "Monitoramento e backup", d: "Alerta de queda e de limite, backup diário e plano de restauração documentado. Se algo falhar, sabemos onde olhar." },
];

const tools = [
  { n: "CRM", manual: "exporta planilha" },
  { n: "Google Ads", manual: "print / relatório" },
  { n: "Monday", manual: "digita à mão" },
  { n: "Planilhas", manual: "cola na IA" },
  { n: "WhatsApp", manual: "repasse de projetos" },
  { n: "Mini-sites", manual: "um por setor" },
];

const pains = [
  ["Site comercial fora do ar", "O banco estourou o limite do plano gratuito e ninguém soube achar o gargalo."],
  ["Dois relatórios, dois números", "Duas taxas de no-show com cerca de 15 pontos de diferença: qual está certa?"],
  ["Projetos só na RG", "Quem não está em projetos espera até 15 dias para saber como andam."],
  ["Reuniões longas", "Setorial de 1h30 e directs que tomam a tarde inteira, para recontar contexto."],
  ["Dependência de uma pessoa", "O sistema foi feito por quem está saindo; ninguém mantém."],
];

function Sem() {
  return (
    <>
      <div className="hud-bad flicker p-5">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent-light">Hoje · sem o sistema</div>
        <div className="mt-3 grid gap-2 md:grid-cols-6">
          {tools.map((x) => (
            <div key={x.n} className="rounded-lg border border-accent-light/40 bg-void/50 p-3 text-center">
              <div className="font-extrabold text-snow">{x.n}</div>
              <div className="mt-1 font-mono text-[11px] text-accent-light">✋ {x.manual}</div>
            </div>
          ))}
        </div>
        <div className="my-4 flex items-center gap-3 font-mono text-xs text-accent-light">
          <div className="broken-line flex-1" /> ✕ copiar, colar, conferir ✕ <div className="broken-line flex-1" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="shake rounded-lg border border-accent-light/50 p-3 text-center"><div className="text-xs text-muted">Relatório A</div><div className="glow-bad font-mono text-3xl font-bold text-accent-light">28,6%</div></div>
          <div className="shake rounded-lg border border-accent-light/50 p-3 text-center"><div className="text-xs text-muted">Relatório B</div><div className="glow-bad font-mono text-3xl font-bold text-accent-light">18,8%</div></div>
          <div className="rounded-lg border border-cta/60 bg-cta/10 p-3 text-center"><div className="text-xs text-muted">Decisão da diretoria</div><div className="font-mono text-xl font-bold text-cta">no escuro?</div></div>
        </div>
      </div>
      <h2 className="mb-3 mt-8 text-xl font-extrabold text-snow">O que isso custa hoje <span className="font-mono text-xs font-normal text-muted">(citado na reunião)</span></h2>
      <div className="grid gap-3 md:grid-cols-2">
        {pains.map(([t, d]) => (
          <div key={t} className="hud-bad fade-up p-4">
            <div className="font-extrabold text-accent-light">{t}</div>
            <p className="text-sm text-muted">{d}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Com() {
  const [sel, setSel] = useState(0);
  return (
    <>
      <div className="grid gap-2 md:grid-cols-5">
        {steps.map((s, i) => (
          <button
            key={s.t}
            onClick={() => setSel(i)}
            className={`rounded-xl border p-4 text-left ${sel === i ? "border-brand-light bg-brand-light/15 text-snow shadow-[0_0_18px_rgba(61,220,151,.35)]" : "border-line bg-panel text-snow hover:border-brand-light/60"}`}
          >
            <div className="text-xs font-semibold opacity-70">Etapa {i + 1}</div>
            <div className="text-lg font-extrabold">{s.t}</div>
            <div className="text-sm text-muted">{s.s}</div>
          </button>
        ))}
      </div>
      <div className="flow-line mt-4" />
      <div key={sel} className="hud fade-up mt-4 p-5 text-lg">
        <div className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-brand-light">Etapa {sel + 1} · {steps[sel].t}</div>
        {steps[sel].d}
      </div>

      <h2 className="mb-3 mt-10 text-xl font-extrabold text-snow">Por que o sistema não cai com 60 usuários</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {guards.map((g) => (
          <div key={g.t} className="hud fade-up p-4">
            <div className="font-extrabold text-brand-light">{g.t}</div>
            <p className="text-sm text-muted">{g.d}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ComoFunciona() {
  const { mode } = useMode();
  return (
    <Guard route="/">
      <div className={`font-mono text-xs uppercase tracking-[0.25em] ${mode === "sem" ? "text-accent-light" : "text-brand-light"}`}>Arquitetura</div>
      <h1 className="text-3xl font-extrabold text-snow">{mode === "sem" ? "Como a Projep trabalha com dados hoje" : "Como o sistema funciona"}</h1>
      <p className="mb-6 mt-1 max-w-3xl text-muted">
        {mode === "sem"
          ? "Cada setor criou sua solução. Os dados passam por muitas mãos antes de chegar à decisão. Use a chave acima para ver como fica com o sistema."
          : "Um único lugar para todos os dados da Projep, com integração automática e números em que a diretoria pode confiar para decidir. Clique nas etapas."}
      </p>
      {mode === "sem" ? <Sem /> : <Com />}
      <p className="mt-6 text-sm text-muted">Este protótipo usa dados fictícios e não tem backend. O backend e o teste de carga medido entram na fase seguinte, depois da contratação.</p>
    </Guard>
  );
}

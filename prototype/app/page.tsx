"use client";
import { useState } from "react";
import { Guard } from "@/components/Guard";

const steps = [
  { t: "Fontes", s: "CRM, Google Ads, Monday, formulários", d: "Os dados continuam nascendo onde o time já trabalha. Ninguém precisa mudar de ferramenta para alimentar o sistema." },
  { t: "Ingestão", s: "Conectores automáticos", d: "Um conector por fonte puxa os dados em horários agendados. Acabou a rotina de exportar, jogar na IA e colar em outro lugar. Trocar de CRM é trocar um conector." },
  { t: "Validação", s: "Deduplicação e regras", d: "Telefones e e-mails são normalizados, o mesmo lead vindo de três fontes vira um só e registros sem contato são rejeitados. Veja rodando em Integração ao vivo." },
  { t: "Banco único", s: "Postgres gerenciado, com backup", d: "Fonte única da verdade, em plano pago com pool de conexões, backups automáticos e restrições de unicidade. É o que impede o caso de dois relatórios com dois números diferentes." },
  { t: "Dashboards", s: "Por perfil de acesso", d: "Consultor vê seus números, gerente vê o time, diretoria vê tudo. Cache para respostas rápidas mesmo com todo mundo logado na RG." },
];

const guards = [
  { t: "Banco gerenciado pago", d: "O site anterior caiu por limite de plano gratuito. Aqui o plano é dimensionado para a Progep, com alerta antes de chegar perto do limite." },
  { t: "Pool de conexões", d: "Muitos usuários compartilham poucas conexões. É assim que 60 pessoas ao mesmo tempo não derrubam o banco." },
  { t: "Cache nos dashboards", d: "A maior parte das telas lê dados já calculados. Só uma fração das requisições chega ao banco." },
  { t: "Monitoramento e backup", d: "Alerta de queda e de limite, backup diário e plano de restauração documentado. Se algo falhar, sabemos onde olhar." },
];

export default function ComoFunciona() {
  const [sel, setSel] = useState(0);
  return (
    <Guard route="/">
      <h1 className="text-3xl font-extrabold text-ink">Como o sistema funciona</h1>
      <p className="mb-6 mt-1 max-w-3xl text-muted">Um único lugar para todos os dados da Progep, com integração automática e números em que a diretoria pode confiar para decidir. Clique nas etapas.</p>
      <div className="grid gap-2 md:grid-cols-5">
        {steps.map((s, i) => (
          <button
            key={s.t}
            onClick={() => setSel(i)}
            className={`rounded-xl border p-4 text-left ${sel === i ? "border-brand bg-brand text-white" : "border-line bg-white hover:border-brand"}`}
          >
            <div className="text-xs font-semibold opacity-70">Etapa {i + 1}</div>
            <div className="text-lg font-extrabold">{s.t}</div>
            <div className={`text-sm ${sel === i ? "text-white/90" : "text-muted"}`}>{s.s}</div>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-line bg-white p-5 text-lg">{steps[sel].d}</div>

      <h2 className="mb-3 mt-10 text-xl font-extrabold text-ink">Por que o sistema não cai com 60 usuários</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {guards.map((g) => (
          <div key={g.t} className="rounded-xl border border-line bg-white p-4">
            <div className="font-extrabold text-brand">{g.t}</div>
            <p className="text-sm text-muted">{g.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">Este protótipo usa dados fictícios e não tem backend. O backend e o teste de carga medido entram na fase seguinte, depois da contratação.</p>
    </Guard>
  );
}

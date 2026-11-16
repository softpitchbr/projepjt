# Protótipo clicável Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Protótipo navegável do sistema de gestão da Progep, com dados fictícios e visões por perfil.

**Architecture:** App Next.js (App Router) em `prototype/`, sem backend. Dados fictícios em `data/`, regras de cálculo puras em `lib/` (testáveis), perfil ativo em um Context React que filtra menu e conteúdo.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Recharts, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-16-prototipo-clicavel-design.md`

## Global Constraints

- Faixa fixa "Dados fictícios" em todas as telas.
- Perfis: `consultor`, `gerente`, `diretoria`.
- Sem backend, banco, login real ou integrações; CRM chamado apenas de "CRM".
- Dimensionamento do sistema real: 60 usuários (dados fictícios devem listar entre 40 e 60 membros).
- Idioma da interface: português do Brasil.

## Review Focus

- Divisão por zero em taxas (zero reuniões marcadas) retorna 0, não NaN.
- Perfil sem permissão acessando URL direta de tela restrita vê aviso de acesso negado.
- Troca de perfil na tela atual mantém a rota quando permitida.
- Lista de membros vazia não quebra o ranking.
- Mobile estreito: menu lateral recolhe sem quebrar o layout.

---

### Task 1: Scaffold, layout e perfis

**Files:**
- Create: `prototype/` (Next.js + Tailwind + Vitest), `prototype/lib/roles.ts`, `prototype/components/RoleProvider.tsx`, `prototype/components/Sidebar.tsx`, `prototype/components/DemoBanner.tsx`, `prototype/app/layout.tsx`
- Test: `prototype/lib/roles.test.ts`

**Interfaces:**
- Produces: `type Role = "consultor" | "gerente" | "diretoria"`; `canAccess(role: Role, route: string): boolean`; `useRole(): { role: Role; setRole(r: Role): void }`; `menuFor(role: Role): { label: string; href: string }[]`.

- [ ] **Step 1:** Escrever teste: `canAccess("consultor", "/")` é `false`, `canAccess("diretoria", "/")` é `true`, `canAccess("gerente", "/pessoas")` é `false`.
- [ ] **Step 2:** Rodar `npx vitest run lib/roles.test.ts`; esperado: FAIL (módulo inexistente).
- [ ] **Step 3:** Criar o projeto com `create-next-app` (TypeScript, Tailwind, App Router), instalar `recharts` e `vitest`; implementar `roles.ts` com tabela de rotas por perfil.
- [ ] **Step 4:** Implementar Provider, Sidebar (seletor de perfil, recolhe em tela estreita) e DemoBanner no layout.
- [ ] **Step 5:** Rodar o teste; esperado: PASS. Commit `feat: scaffold e perfis`.

### Task 2: Dados fictícios e cálculos

**Files:**
- Create: `prototype/data/members.ts`, `prototype/data/commercial.ts`, `prototype/data/marketing.ts`, `prototype/data/projects.ts`, `prototype/lib/metrics.ts`
- Test: `prototype/lib/metrics.test.ts`

**Interfaces:**
- Produces: `rate(part: number, total: number): number` (0 quando `total` é 0); `noShowRate(m: Meetings): number`; `vsAverage(values: number[], v: number): number`; `crossFunnel(mkt: MarketingMonth, com: CommercialMonth): { planned: number; actual: number }[]`; dados exportados: `members: Member[]` (40 a 60), `commercialMonths`, `marketingMonths`, `projects`.

- [ ] **Step 1:** Testes: `rate(1, 0) === 0`; `rate(15, 100) === 0.15`; `vsAverage([]...)` não quebra; `members.length` entre 40 e 60.
- [ ] **Step 2:** Rodar `npx vitest run lib/metrics.test.ts`; esperado: FAIL.
- [ ] **Step 3:** Implementar `metrics.ts` e os arquivos de dados com números plausíveis (no-show perto de 15%, trainees, projetado vs. realizado).
- [ ] **Step 4:** Rodar o teste; esperado: PASS. Commit `feat: dados e metricas`.

### Task 3: Visão geral e Comercial

**Files:**
- Create: `prototype/app/page.tsx`, `prototype/app/comercial/page.tsx`, `prototype/components/KpiCard.tsx`, `prototype/components/AccessDenied.tsx`

**Interfaces:**
- Consumes: `useRole`, `canAccess`, `commercialMonths`, `members`, `crossFunnel`, `rate`.
- Produces: `KpiCard({ label, value, delta? })`, `AccessDenied()`.

- [ ] **Step 1:** Visão geral (diretoria): KPIs consolidados, funil cruzado projetado vs. realizado, status dos setores.
- [ ] **Step 2:** Comercial: metas, conversão, no-show, ranking de membros vs. média; consultor vê só seus números, gerente vê o time.
- [ ] **Step 3:** Rotas restritas mostram `AccessDenied` conforme `canAccess`.
- [ ] **Step 4:** Rodar `npm run build`; esperado: sem erros. Commit `feat: visao geral e comercial`.

### Task 4: Marketing e Projetos

**Files:**
- Create: `prototype/app/marketing/page.tsx`, `prototype/app/projetos/page.tsx`

- [ ] **Step 1:** Marketing: leads, custo por lead, conversão, investimento mensal (gráficos Recharts).
- [ ] **Step 2:** Projetos: lista com andamento, responsável, sprint e notas de atualização, visível a todos os perfis.
- [ ] **Step 3:** `npm run build`; esperado: sem erros. Commit `feat: marketing e projetos`.

### Task 5: Pessoas e Relatórios

**Files:**
- Create: `prototype/app/pessoas/page.tsx`, `prototype/app/relatorios/page.tsx`

- [ ] **Step 1:** Pessoas/Bonificação (apenas diretoria): metas por membro e simulação de bonificação.
- [ ] **Step 2:** Relatórios: botão que "gera" prévia de slides com dados fictícios (mock, sem IA real).
- [ ] **Step 3:** `npm run build`; esperado: sem erros. Commit `feat: pessoas e relatorios`.

### Task 6: Verificação final

- [ ] **Step 1:** `npx vitest run` (todos passam), `npm run lint` e `npm run build` limpos.
- [ ] **Step 2:** Subir `npm run dev` e navegar as telas nos três perfis, conferindo faixa de dados fictícios, acesso negado e menu recolhido em tela estreita.
- [ ] **Step 3:** Adicionar `prototype/README.md` com como rodar. Commit `docs: readme do prototipo`.

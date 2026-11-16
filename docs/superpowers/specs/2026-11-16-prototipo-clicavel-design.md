# Protótipo clicável: desenho

Status: aguardando aprovação.

## Intenção
Mostrar à diretoria da Projep, na reunião 2, como será o sistema único de gestão, para validar telas, perfis e fluxos antes de construir. Por trás: a Projep quer **tomada de decisão com dados confiáveis** e visão integrada dos setores.

## Objetivos
- Protótipo navegável com dados fictícios, visual próximo do definitivo.
- Três visões por perfil (consultor, gerente, diretoria), trocáveis em um seletor.
- Telas: Visão geral (diretoria), Comercial, Marketing, Projetos, Pessoas/Bonificação, Relatórios (geração mock de slides).
- Comercial: metas, conversão, no-show, ranking de membros vs. média, funil cruzado projetado vs. realizado.
- Projetos: andamento, responsável, sprint, notas de atualização, visíveis a todos os setores.

## Não objetivos
- Sem backend, banco, login real ou integrações (CRM, Google Ads).
- Sem dados reais da Projep.
- Não é a base de produção; reaproveitar código é decisão posterior.

## Anti-objetivo
Os dados fictícios nunca podem ser confundidos com reais: faixa fixa "Dados fictícios" em todas as telas.

## Restrições
- Roda local (`npm run dev`) e pode gerar build estático para compartilhar.
- Dimensionamento do sistema real: até 60 usuários (o protótipo não testa carga).
- CRM tratado como genérico ("CRM"); Pipefy ou Ploomes a confirmar com a Projep.

## Abordagens
1. **Next.js + TypeScript + Tailwind + Recharts, mock local** (escolhida): mesma stack proposta para o real, gráficos de verdade, reaproveitável.
2. HTML/JS único: mais rápido, mas descartável e sem relação com a stack.
3. Figma: fácil de ajustar, mas sem gráficos reais nem navegação por perfil.

Escolhida pela proximidade com o sistema final. Decisão minha, não combinada.

## Decisões do builder
- Estrutura em `prototype/` dentro do repositório.
- Dados em `prototype/data/*.ts`, com números plausíveis (taxa de no-show, conversão, metas).
- Seletor de perfil muda menus e dashboards visíveis (RBAC simulado).
- Tema claro, layout com barra lateral.
- Verificação: build sem erros e navegação manual das telas.

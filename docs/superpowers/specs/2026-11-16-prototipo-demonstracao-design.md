# Protótipo como demonstração: adendo ao desenho

Status: aprovado pelo cliente em conversa ("estou de acordo"). Substitui o foco do desenho anterior: o protótipo deixa de ser só um conjunto de dashboards e passa a **explicar e provar** como o sistema funciona.

## Intenção
Na reunião 2, convencer a diretoria da Progep de que o sistema (1) aguenta 60 usuários, (2) integra as fontes de dados sem retrabalho nem duplicidade e (3) traz vantagens concretas, com uma demonstração que funciona.

## Telas novas (visíveis a todos os perfis)
1. **Como funciona** (landing): diagrama clicável das fontes (CRM, Google Ads, Monday, formulários) até ingestão, validação, banco único e dashboards por perfil.
2. **Integração ao vivo:** botão "Sincronizar" que carrega registros fictícios bagunçados; deduplicação e validação **rodam de verdade** no navegador e mostram antes e depois.
3. **Aguenta 60?:** simulador de 1 a 100 usuários. Modelo com premissas visíveis, comparando "site atual (plano gratuito, sem cache)" com "arquitetura proposta (banco gerenciado, pool de conexões, cache)".
4. **Vantagens:** antes x depois com entradas editáveis (custo do Monday, horas de relatório, duração de reuniões).

As telas de dashboard existentes continuam como "o resultado final" (Visão geral passa para `/visao-geral`).

## Não objetivos
- **Sem backend real.** Será criado só depois da venda do projeto (decisão do cliente).
- A carga de 60 usuários é um **modelo estimado**, não medido; a tela diz isso. Medição real (teste de carga) fica para a fase com backend.

## Anti-objetivo
Números de economia ou capacidade que pareçam medidos. Todo número de premissa aparece rotulado como estimativa e é editável.

## Decisões minhas (não combinadas)
- Lógica em `lib/` pura e testada: `dedup.ts`, `capacity.ts`, `savings.ts`.
- Premissas de capacidade (requisições por usuário, taxa de acerto de cache, limite do banco) ficam num único objeto exportado e visível na tela.

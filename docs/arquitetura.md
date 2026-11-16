# Arquitetura: proposta inicial (RASCUNHO)

> A reunião 1 apenas combinou que a Triângulo apresentaria stack e arquitetura na reunião 2. Este documento é um ponto de partida para discussão, não uma decisão. Stack, hospedagem e custos precisam ser validados pelo time de desenvolvimento da Triângulo.

## Princípios
- **Fonte única de dados** e integração automática, para eliminar extração manual e duplicidade.
- **Modular por setor** (comercial, marketing, projetos, GP, financeiro), com perfis de acesso.
- **Resiliência:** monitoramento, backups e restauração documentados; o módulo comercial tem prioridade.
- **Manutenível por quem não é desenvolvedor sênior:** documentação, padrões simples, treinamento da Ana.

## Camadas
1. **Front-end web** (possivelmente PWA): dashboards por perfil.
2. **API / back-end:** regras de negócio, autenticação, RBAC.
3. **Banco de dados relacional** com constraints de unicidade (evita duplicidade na origem) e migrações versionadas. Alternativas a comparar: Postgres gerenciado, Supabase em plano pago, Firebase.
4. **Camada de integração/ETL:** Pipefy, Google Ads, Monday (migração), formulários.
5. **Observabilidade:** logs, alertas de queda e de limite de armazenamento.
6. **IA (opcional):** geração de relatórios e slides, interpretação de dados.

## Pontos a decidir
- Banco e hospedagem (a falha anterior foi limite de banco no plano gratuito; o gargalo comum é volume de requisições, não armazenamento).
- Estratégia de backup, deduplicação e validação na ingestão.
- Modelo de perfis de acesso e permissões por dashboard.
- Migração dos dados e sites existentes (comercial, Mejús, funcionário do mês).

## Opções de custo (a levantar)
Três propostas do mesmo projeto, combinadas na reunião:
1. Com contrapartidas maiores
2. Com contrapartidas menores
3. Comercial puro (sem contrapartida)

Além disso, apresentar variações de infraestrutura (completa, intermediária, enxuta). Valores só após fechar o número de usuários (máx. 60) e escopo.

export type CostItem = { label: string; value: number };
export type Tier = { name: string; description: string; usd: CostItem[]; brl: CostItem[] };

// Valores de ordem de grandeza (preço de tabela aproximado). Validar com a cotação atual antes da proposta.
export const TIERS: Tier[] = [
  {
    name: "Enxuta",
    description: "Cobre 60 usuários com folga. Sem ambiente de testes.",
    usd: [
      { label: "Hospedagem do app", value: 20 },
      { label: "Banco Postgres gerenciado (com backup diário)", value: 25 },
    ],
    brl: [{ label: "Domínio", value: 4 }],
  },
  {
    name: "Intermediária",
    description: "Adiciona cache e monitoramento de erros e quedas.",
    usd: [
      { label: "Hospedagem do app", value: 20 },
      { label: "Banco Postgres gerenciado (com backup diário)", value: 25 },
      { label: "Cache gerenciado", value: 10 },
      { label: "Monitoramento de erros", value: 26 },
      { label: "Backup extra fora do provedor", value: 10 },
    ],
    brl: [{ label: "Domínio", value: 4 }],
  },
  {
    name: "Completa",
    description: "Banco dedicado, ambiente de testes e margem para crescer além de 100 usuários.",
    usd: [
      { label: "Hospedagem do app", value: 20 },
      { label: "Banco com recursos dedicados", value: 85 },
      { label: "Cache gerenciado", value: 10 },
      { label: "Monitoramento de erros", value: 26 },
      { label: "Backup extra fora do provedor", value: 10 },
      { label: "Ambiente de testes (staging)", value: 25 },
    ],
    brl: [{ label: "Domínio", value: 4 }],
  },
];

export function monthlyCostBrl(t: Tier, usdRate: number): number {
  return t.usd.reduce((s, i) => s + i.value, 0) * usdRate + t.brl.reduce((s, i) => s + i.value, 0);
}

// Custo acumulado em `months` meses, com reajuste anual (ex.: 0.1 = +10% a cada 12 meses).
export function projection(months: number, monthly: number, annualGrowth: number): number {
  let total = 0;
  for (let m = 0; m < months; m++) total += monthly * (1 + annualGrowth * Math.floor(m / 12));
  return total;
}

// Meses para a economia mensal líquida pagar o investimento inicial. null = nunca.
export function paybackMonths(initial: number, monthlySavings: number, monthlyCost: number): number | null {
  if (initial <= 0) return 0;
  const net = monthlySavings - monthlyCost;
  return net > 0 ? Math.ceil(initial / net) : null;
}

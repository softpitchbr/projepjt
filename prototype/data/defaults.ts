import type { SavingsInput } from "@/lib/savings";

// Premissas ESTIMADAS, para a Projep corrigir com os números reais.
export const SAVINGS_DEFAULTS: SavingsInput = {
  toolCostYear: 6000,
  reportHoursMonth: 20,
  reportHoursMonthAfter: 4,
  hourValue: 25,
  meetingsPerMonth: 8,
  meetingMinutesBefore: 90,
  meetingMinutesAfter: 45,
  people: 6,
};

import { TIERS, monthlyCostBrl } from "@/lib/costs";

// Custo mensal de operar o sistema (faixa Enxuta + 4 h de suporte a R$ 80/h), igual aos padrões da tela Custos.
export const RUN_COST_MONTH = monthlyCostBrl(TIERS[0], 5.5) + 4 * 80;

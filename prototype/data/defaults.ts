import type { SavingsInput } from "@/lib/savings";

// Premissas ESTIMADAS, para a Progep corrigir com os números reais.
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

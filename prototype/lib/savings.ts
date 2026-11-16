export type SavingsInput = {
  toolCostYear: number;
  reportHoursMonth: number;
  reportHoursMonthAfter: number;
  hourValue: number;
  meetingsPerMonth: number;
  meetingMinutesBefore: number;
  meetingMinutesAfter: number;
  people: number;
};

export function computeSavings(i: SavingsInput) {
  const toolYear = i.toolCostYear;
  const reportYear = Math.max(0, i.reportHoursMonth - i.reportHoursMonthAfter) * 12 * i.hourValue;
  const meetingHoursYear = (Math.max(0, i.meetingMinutesBefore - i.meetingMinutesAfter) / 60) * i.meetingsPerMonth * 12 * i.people;
  return { toolYear, reportYear, meetingHoursYear, totalYear: toolYear + reportYear + meetingHoursYear * i.hourValue };
}

export function totalHoursYear(i: SavingsInput): number {
  return Math.max(0, i.reportHoursMonth - i.reportHoursMonthAfter) * 12 + computeSavings(i).meetingHoursYear;
}

export function hoursBefore(i: SavingsInput): number {
  return i.reportHoursMonth * 12 + (i.meetingMinutesBefore / 60) * i.meetingsPerMonth * 12 * i.people;
}

export function hoursAfter(i: SavingsInput): number {
  return i.reportHoursMonthAfter * 12 + (i.meetingMinutesAfter / 60) * i.meetingsPerMonth * 12 * i.people;
}

// Hoje: ferramenta paga + horas do time. Depois: a ferramenta é substituída; entram horas restantes + custo de operar o sistema.
export function yearCostBefore(i: SavingsInput): number {
  return i.toolCostYear + hoursBefore(i) * i.hourValue;
}

export function yearCostAfter(i: SavingsInput, runCostMonth: number): number {
  return hoursAfter(i) * i.hourValue + runCostMonth * 12;
}

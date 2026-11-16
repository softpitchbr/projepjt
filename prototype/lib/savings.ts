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

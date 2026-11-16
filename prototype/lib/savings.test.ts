import { describe, it, expect } from "vitest";
import { computeSavings } from "./savings";

describe("computeSavings", () => {
  it("soma ferramenta, relatórios e reuniões", () => {
    const r = computeSavings({
      toolCostYear: 6000, reportHoursMonth: 20, reportHoursMonthAfter: 4, hourValue: 30,
      meetingsPerMonth: 8, meetingMinutesBefore: 90, meetingMinutesAfter: 45, people: 6,
    });
    expect(r.toolYear).toBe(6000);
    expect(r.reportYear).toBe((20 - 4) * 12 * 30);
    expect(r.meetingHoursYear).toBe(((90 - 45) / 60) * 8 * 12 * 6);
    expect(r.totalYear).toBe(r.toolYear + r.reportYear + r.meetingHoursYear * 30);
  });
  it("depois pior que antes não gera economia negativa", () => {
    const r = computeSavings({
      toolCostYear: 0, reportHoursMonth: 2, reportHoursMonthAfter: 5, hourValue: 30,
      meetingsPerMonth: 1, meetingMinutesBefore: 30, meetingMinutesAfter: 60, people: 1,
    });
    expect(r.reportYear).toBe(0);
    expect(r.meetingHoursYear).toBe(0);
  });
});

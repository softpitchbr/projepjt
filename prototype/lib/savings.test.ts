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

import { totalHoursYear } from "./savings";

describe("totalHoursYear", () => {
  it("soma horas de relatório e de reunião por ano", () => {
    const i = {
      toolCostYear: 0, reportHoursMonth: 20, reportHoursMonthAfter: 4, hourValue: 30,
      meetingsPerMonth: 8, meetingMinutesBefore: 90, meetingMinutesAfter: 45, people: 6,
    };
    const r = computeSavings(i);
    expect(totalHoursYear(i)).toBe((20 - 4) * 12 + r.meetingHoursYear);
  });
  it("não fica negativo", () => {
    expect(totalHoursYear({ toolCostYear: 0, reportHoursMonth: 1, reportHoursMonthAfter: 9, hourValue: 1, meetingsPerMonth: 1, meetingMinutesBefore: 10, meetingMinutesAfter: 30, people: 1 })).toBe(0);
  });
});

import { hoursBefore, hoursAfter, yearCostBefore, yearCostAfter } from "./savings";

describe("custo antes e depois", () => {
  const i = {
    toolCostYear: 6000, reportHoursMonth: 20, reportHoursMonthAfter: 4, hourValue: 25,
    meetingsPerMonth: 8, meetingMinutesBefore: 90, meetingMinutesAfter: 45, people: 6,
  };
  it("horas antes e depois", () => {
    expect(hoursBefore(i)).toBe(20 * 12 + (90 / 60) * 8 * 12 * 6);
    expect(hoursAfter(i)).toBe(4 * 12 + (45 / 60) * 8 * 12 * 6);
  });
  it("sem custo de operação, antes - depois = economia bruta", () => {
    expect(yearCostBefore(i) - yearCostAfter(i, 0)).toBeCloseTo(computeSavings(i).totalYear);
  });
  it("com o sistema, o custo de operação mensal entra no ano", () => {
    expect(yearCostAfter(i, 500)).toBe(hoursAfter(i) * 25 + 6000);
  });
  it("o custo da ferramenta antiga some depois (substituída)", () => {
    expect(yearCostBefore(i)).toBe(6000 + hoursBefore(i) * 25);
  });
});

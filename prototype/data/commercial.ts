import { members } from "./members";

export type CommercialMonth = {
  month: string;
  meetingsScheduled: number;
  noShows: number;
  proposals: number;
  sales: number;
  revenue: number;
  goalRevenue: number;
  planned: { meetings: number; held: number; proposals: number; sales: number };
};

export const commercialMonths: CommercialMonth[] = [
  { month: "Jul", meetingsScheduled: 62, noShows: 12, proposals: 24, sales: 7, revenue: 31000, goalRevenue: 34000, planned: { meetings: 65, held: 55, proposals: 26, sales: 8 } },
  { month: "Ago", meetingsScheduled: 70, noShows: 11, proposals: 28, sales: 9, revenue: 38000, goalRevenue: 36000, planned: { meetings: 68, held: 58, proposals: 27, sales: 8 } },
  { month: "Set", meetingsScheduled: 74, noShows: 13, proposals: 30, sales: 10, revenue: 42000, goalRevenue: 40000, planned: { meetings: 72, held: 62, proposals: 29, sales: 9 } },
  { month: "Out", meetingsScheduled: 66, noShows: 14, proposals: 25, sales: 8, revenue: 35000, goalRevenue: 42000, planned: { meetings: 75, held: 65, proposals: 30, sales: 10 } },
  { month: "Nov", meetingsScheduled: 78, noShows: 12, proposals: 33, sales: 11, revenue: 47000, goalRevenue: 44000, planned: { meetings: 78, held: 67, proposals: 32, sales: 10 } },
];

export type MemberResult = { memberId: number; name: string; meetings: number; noShow: number; sales: number };

export const memberResults: MemberResult[] = members
  .filter((m) => m.sector === "Comercial")
  .map((m, i) => ({ memberId: m.id, name: m.name, meetings: 8 + ((i * 5) % 9), noShow: (i * 3) % 4, sales: (i * 7) % 5 }));

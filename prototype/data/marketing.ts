export type MarketingMonth = { month: string; spend: number; leads: number; plannedLeads: number; qualified: number };

export const marketingMonths: MarketingMonth[] = [
  { month: "Jul", spend: 2000, leads: 168, plannedLeads: 180, qualified: 62 },
  { month: "Ago", spend: 2000, leads: 195, plannedLeads: 190, qualified: 74 },
  { month: "Set", spend: 2000, leads: 210, plannedLeads: 200, qualified: 81 },
  { month: "Out", spend: 2000, leads: 188, plannedLeads: 210, qualified: 70 },
  { month: "Nov", spend: 2000, leads: 224, plannedLeads: 220, qualified: 88 },
];

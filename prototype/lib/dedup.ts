export type RawLead = { source: string; name: string; email: string; phone: string };
export type Lead = { name: string; email: string; phone: string; sources: string[] };
export type RawMeeting = { id: string; status: "marcada" | "realizada" | "no-show"; source: string };

export function normalizeEmail(e: string): string {
  return e.trim().toLowerCase();
}

export function normalizePhone(p: string): string {
  const d = p.replace(/\D/g, "");
  return d.length > 11 && d.startsWith("55") ? d.slice(2) : d;
}

export function dedupLeads(raws: RawLead[]): { clean: Lead[]; removed: number; rejected: RawLead[] } {
  const rejected: RawLead[] = [];
  const groups: Lead[] = [];
  let valid = 0;
  for (const r of raws) {
    const email = normalizeEmail(r.email);
    const phone = normalizePhone(r.phone);
    if (!email && !phone) {
      rejected.push(r);
      continue;
    }
    valid++;
    const hits = groups.filter((g) => (email && g.email === email) || (phone && g.phone === phone));
    if (hits.length === 0) {
      groups.push({ name: r.name, email, phone, sources: [r.source] });
      continue;
    }
    const [main, ...others] = hits;
    for (const o of others) {
      main.email ||= o.email;
      main.phone ||= o.phone;
      o.sources.forEach((s) => !main.sources.includes(s) && main.sources.push(s));
      groups.splice(groups.indexOf(o), 1);
    }
    main.email ||= email;
    main.phone ||= phone;
    if (!main.sources.includes(r.source)) main.sources.push(r.source);
  }
  return { clean: groups, removed: valid - groups.length, rejected };
}

export function dedupMeetings(raws: RawMeeting[]): { clean: RawMeeting[]; removed: number } {
  const byId = new Map<string, RawMeeting>();
  for (const m of raws) byId.set(m.id, m);
  return { clean: [...byId.values()], removed: raws.length - byId.size };
}

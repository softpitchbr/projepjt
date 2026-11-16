import { describe, it, expect } from "vitest";
import { normalizeEmail, normalizePhone, dedupLeads, dedupMeetings } from "./dedup";

describe("normalização", () => {
  it("email: tira espaços e caixa", () => {
    expect(normalizeEmail("  Ana@Gmail.COM ")).toBe("ana@gmail.com");
  });
  it("telefone: só dígitos, sem 55", () => {
    expect(normalizePhone("+55 (34) 99999-1111")).toBe("34999991111");
    expect(normalizePhone("34999991111")).toBe("34999991111");
  });
});

describe("dedupLeads", () => {
  it("junta o mesmo lead vindo de fontes diferentes", () => {
    const r = dedupLeads([
      { source: "CRM", name: "Ana", email: "ana@x.com", phone: "(34) 99999-1111" },
      { source: "Google Ads", name: "Ana S.", email: " ANA@x.com", phone: "" },
      { source: "Formulário", name: "Ana", email: "", phone: "34999991111" },
    ]);
    expect(r.clean).toHaveLength(1);
    expect(r.clean[0].sources.sort()).toEqual(["CRM", "Formulário", "Google Ads"]);
    expect(r.removed).toBe(2);
  });
  it("registro sem email e sem telefone é rejeitado", () => {
    const r = dedupLeads([{ source: "CRM", name: "Sem contato", email: "", phone: "" }]);
    expect(r.clean).toHaveLength(0);
    expect(r.rejected).toHaveLength(1);
  });
  it("lista vazia não quebra", () => {
    expect(dedupLeads([])).toEqual({ clean: [], removed: 0, rejected: [] });
  });
});

describe("dedupMeetings", () => {
  it("mesma reunião em duas fontes conta uma vez; o último status vence", () => {
    const r = dedupMeetings([
      { id: "r1", status: "marcada", source: "CRM" },
      { id: "r1", status: "no-show", source: "Planilha" },
      { id: "r2", status: "realizada", source: "CRM" },
    ]);
    expect(r.clean).toHaveLength(2);
    expect(r.clean.find((m) => m.id === "r1")?.status).toBe("no-show");
  });
});

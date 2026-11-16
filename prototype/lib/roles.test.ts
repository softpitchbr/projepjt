import { describe, it, expect } from "vitest";
import { canAccess, menuFor } from "./roles";

describe("roles", () => {
  it("consultor não acessa a visão geral", () => {
    expect(canAccess("consultor", "/visao-geral")).toBe(false);
  });
  it("diretoria acessa a visão geral", () => {
    expect(canAccess("diretoria", "/visao-geral")).toBe(true);
  });
  it("gerente não acessa pessoas", () => {
    expect(canAccess("gerente", "/pessoas")).toBe(false);
  });
  it("menu do consultor não inclui pessoas", () => {
    expect(menuFor("consultor").some((m) => m.href === "/pessoas")).toBe(false);
  });
  it("todos os perfis acessam as telas de demonstração", () => {
    for (const r of ["consultor", "gerente", "diretoria"] as const) {
      for (const p of ["/", "/integracao", "/capacidade", "/vantagens"]) expect(canAccess(r, p)).toBe(true);
    }
  });
});

describe("custos", () => {
  it("consultor não vê custos; gerente e diretoria veem", () => {
    expect(canAccess("consultor", "/custos")).toBe(false);
    expect(canAccess("gerente", "/custos")).toBe(true);
    expect(canAccess("diretoria", "/custos")).toBe(true);
  });
});

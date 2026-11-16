import { describe, it, expect } from "vitest";
import { canAccess, menuFor } from "./roles";

describe("roles", () => {
  it("consultor não acessa a visão geral", () => {
    expect(canAccess("consultor", "/")).toBe(false);
  });
  it("diretoria acessa a visão geral", () => {
    expect(canAccess("diretoria", "/")).toBe(true);
  });
  it("gerente não acessa pessoas", () => {
    expect(canAccess("gerente", "/pessoas")).toBe(false);
  });
  it("menu do consultor não inclui pessoas", () => {
    expect(menuFor("consultor").some((m) => m.href === "/pessoas")).toBe(false);
  });
});

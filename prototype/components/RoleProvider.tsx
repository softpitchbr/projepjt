"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Role } from "@/lib/roles";

const Ctx = createContext<{ role: Role; setRole: (r: Role) => void } | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("diretoria");
  return <Ctx.Provider value={{ role, setRole }}>{children}</Ctx.Provider>;
}

export function useRole() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useRole fora do RoleProvider");
  return v;
}

"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

export type Mode = "sem" | "com";

const Ctx = createContext<{ mode: Mode; setMode: (m: Mode) => void } | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("sem");
  return <Ctx.Provider value={{ mode, setMode }}>{children}</Ctx.Provider>;
}

export function useMode() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMode fora do ModeProvider");
  return v;
}

"use client";
import { useEffect, useState, type ReactNode } from "react";
import type { Insight, Level } from "@/lib/insights";

export function HudPanel({ title, children, className = "", delay = 0 }: { title?: string; children: ReactNode; className?: string; delay?: number }) {
  return (
    <section className={`hud fade-up p-4 ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {title && <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-light">{title}</h2>}
      {children}
    </section>
  );
}

export function CountUp({ value, format = (n: number) => String(Math.round(n)), ms = 1100 }: { value: number; format?: (n: number) => string; ms?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = reduced ? 1 : Math.min(1, (t - t0) / ms);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return <>{format(n)}</>;
}

const TONE = { ok: "#3ddc97", "atenção": "#e07a1b", risco: "#ff6b9a" } as const;

// Medidor em anel. `fraction` 0..1 (pode passar de 1, o anel trava em 100%).
export function Gauge({ fraction, level, children, label, sub }: { fraction: number; level: Level; children: ReactNode; label: string; sub?: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(Math.max(0, Math.min(1, fraction))));
    return () => cancelAnimationFrame(id);
  }, [fraction]);
  const r = 52;
  const c = 2 * Math.PI * r;
  const color = TONE[level];
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(61,220,151,0.12)" strokeWidth="8" />
          <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - shown)}
            style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(.2,.8,.2,1)", filter: `drop-shadow(0 0 6px ${color})` }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold" style={{ color }}>{children}</div>
      </div>
      <div className="mt-2 text-sm font-extrabold text-snow">{label}</div>
      {sub && <div className="text-xs text-muted">{sub}</div>}
    </div>
  );
}

const BADGE = {
  ok: "border-brand-light/40 bg-brand-light/10 text-brand-light",
  "atenção": "border-cta/50 bg-cta/10 text-cta",
  risco: "border-accent-light/50 bg-accent-light/10 text-accent-light",
} as const;
const LABEL = { ok: "OK", "atenção": "ATENÇÃO", risco: "RISCO" } as const;

export function InsightRow({ i, delay }: { i: Insight; delay: number }) {
  return (
    <li className="fade-up rounded-lg border border-line/60 bg-void/40 p-3" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-2">
        <span className={`rounded border px-1.5 py-0.5 font-mono text-[10px] font-bold ${BADGE[i.level]}`}>{LABEL[i.level]}</span>
        <span className="font-extrabold text-snow">{i.title}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{i.detail}</p>
      {i.level !== "ok" && <p className="mt-1 text-sm text-brand-light">→ {i.action}</p>}
    </li>
  );
}

export function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("pt-BR"));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
      <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-brand-light" /> AO VIVO · {t}
    </span>
  );
}

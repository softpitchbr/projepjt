"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMode } from "./ModeProvider";
import { useRole } from "./RoleProvider";
import { menuFor } from "@/lib/roles";

const MODE_PAGES = ["/", "/integracao", "/vantagens"];

function useDemoSteps() {
  const { role } = useRole();
  return menuFor(role).filter((m) => m.group === "Demonstração");
}

export function DemoTop() {
  const path = usePathname();
  const steps = useDemoSteps();
  const { mode, setMode } = useMode();
  const idx = steps.findIndex((s) => s.href === path);
  if (idx === -1) return null;
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <ol className="flex items-center gap-1 font-mono text-xs">
        {steps.map((s, i) => (
          <li key={s.href}>
            <Link href={s.href} className={`flex h-7 w-7 items-center justify-center rounded-full border ${i === idx ? "border-brand-light bg-brand-light/20 text-brand-light" : i < idx ? "border-brand-light/40 text-brand-light/70" : "border-line text-muted"}`} title={s.label}>
              {i + 1}
            </Link>
          </li>
        ))}
        <li className="ml-2 uppercase tracking-widest text-muted">Etapa {idx + 1} de {steps.length}</li>
      </ol>
      {MODE_PAGES.includes(path) && (
        <div className="flex overflow-hidden rounded-full border border-line font-mono text-xs font-bold uppercase" role="group" aria-label="Modo">
          <button onClick={() => setMode("sem")} className={`px-4 py-2 ${mode === "sem" ? "bg-accent-light/20 text-accent-light shadow-[0_0_16px_rgba(255,107,154,.4)]" : "text-muted"}`}>Sem o sistema</button>
          <button onClick={() => setMode("com")} className={`px-4 py-2 ${mode === "com" ? "bg-brand-light/20 text-brand-light shadow-[0_0_16px_rgba(61,220,151,.4)]" : "text-muted"}`}>Com o sistema</button>
        </div>
      )}
    </div>
  );
}

export function DemoBottom() {
  const path = usePathname();
  const steps = useDemoSteps();
  const idx = steps.findIndex((s) => s.href === path);
  if (idx === -1) return null;
  const prev = steps[idx - 1];
  const next = steps[idx + 1];
  return (
    <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
      {prev ? <Link href={prev.href} className="rounded-lg border border-line px-4 py-2 font-semibold text-snow/80 hover:border-brand-light/60">← {prev.label}</Link> : <span />}
      {next ? (
        <Link href={next.href} className="rounded-lg bg-cta px-5 py-2 font-extrabold text-void shadow-[0_0_18px_rgba(224,122,27,.45)] hover:opacity-90">Próximo: {next.label} →</Link>
      ) : (
        <Link href="/visao-geral" className="rounded-lg bg-brand-light px-5 py-2 font-extrabold text-void shadow-[0_0_18px_rgba(61,220,151,.45)] hover:opacity-90">Ver o resultado final →</Link>
      )}
    </div>
  );
}

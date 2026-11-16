export function KpiCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="hud fade-up p-4">
      <div className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</div>
      <div className="glow mt-1 font-mono text-2xl font-bold text-brand-light">{value}</div>
      {delta && <div className="text-xs text-muted">{delta}</div>}
    </div>
  );
}

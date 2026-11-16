export function KpiCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="text-sm text-muted">{label}</div>
      <div className="text-2xl font-extrabold text-ink">{value}</div>
      {delta && <div className="text-xs text-muted">{delta}</div>}
    </div>
  );
}

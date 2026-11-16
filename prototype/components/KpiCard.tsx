export function KpiCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {delta && <div className="text-xs text-slate-500">{delta}</div>}
    </div>
  );
}

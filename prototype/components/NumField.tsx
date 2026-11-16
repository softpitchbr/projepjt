"use client";

export function NumField({ label, value, onChange, step = 1, hint }: { label: string; value: number; onChange: (v: number) => void; step?: number; hint?: string }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-ink">{label}</span>
      <input
        type="number"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        className="mt-1 w-full rounded-xl border border-line bg-white p-2"
      />
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

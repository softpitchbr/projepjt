"use client";

export function NumField({ label, value, onChange, step = 1, hint }: { label: string; value: number; onChange: (v: number) => void; step?: number; hint?: string }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-snow">{label}</span>
      <input
        type="number"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        className="mt-1 w-full rounded-lg border border-line bg-void p-2 font-mono text-snow"
      />
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

"use client";
import { Guard } from "@/components/Guard";
import { projects } from "@/data/projects";
import { pct } from "@/lib/metrics";

const color = { "No prazo": "bg-green-100 text-green-800", "Atenção": "bg-amber-100 text-amber-800", "Atrasado": "bg-red-100 text-red-800" } as const;

export default function Projetos() {
  return (
    <Guard route="/projetos">
      <h1 className="mb-4 text-2xl font-bold">Projetos</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{p.client}</h2>
              <span className={`rounded px-2 py-0.5 text-xs ${color[p.status]}`}>{p.status}</span>
            </div>
            <p className="text-sm text-slate-500">Gerente: {p.manager} · {p.sprint}</p>
            <div className="my-2 h-2 rounded bg-slate-200"><div className="h-2 rounded bg-blue-600" style={{ width: pct(p.progress) }} /></div>
            <ul className="list-disc pl-5 text-sm">{p.notes.map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
        ))}
      </div>
    </Guard>
  );
}

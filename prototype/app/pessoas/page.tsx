"use client";
import { useState } from "react";
import { Guard } from "@/components/Guard";
import { memberResults } from "@/data/commercial";
import { brl } from "@/lib/metrics";

export default function Pessoas() {
  const [perSale, setPerSale] = useState(50);
  return (
    <Guard route="/pessoas">
      <h1 className="mb-4 text-2xl font-bold">Pessoas e bonificação</h1>
      <label className="mb-4 block text-sm">Bônus por venda (R$): <input type="number" min={0} className="ml-2 w-24 rounded border p-1" value={perSale} onChange={(e) => setPerSale(Math.max(0, Number(e.target.value) || 0))} /></label>
      <table className="w-full rounded-lg border border-slate-200 bg-white text-sm">
        <thead><tr className="text-left"><th className="p-2">Membro</th><th>Vendas</th><th>Bonificação simulada</th></tr></thead>
        <tbody>{memberResults.map((m) => <tr key={m.memberId} className="border-t border-slate-100"><td className="p-2">{m.name}</td><td>{m.sales}</td><td>{brl(m.sales * perSale)}</td></tr>)}</tbody>
      </table>
    </Guard>
  );
}

"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts";

type Series = { key: string; name: string; color: string };

export function BarsChart({ data, x, series }: { data: object[]; x: string; series: Series[] }) {
  return (
    <div className="h-64 hud p-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(61,220,151,0.12)" />
          <XAxis dataKey={x} stroke="#8fa89a" tick={{ fill: "#8fa89a" }} /><YAxis stroke="#8fa89a" tick={{ fill: "#8fa89a" }} /><Tooltip contentStyle={{ background: "#0c1c14", border: "1px solid rgba(61,220,151,.3)", borderRadius: 8, color: "#e8f3ec" }} cursor={{ fill: "rgba(61,220,151,.06)" }} /><Legend />
          {series.map((s) => <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} />)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LinesChart({ data, x, series }: { data: object[]; x: string; series: Series[] }) {
  return (
    <div className="h-64 hud p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(61,220,151,0.12)" />
          <XAxis dataKey={x} stroke="#8fa89a" tick={{ fill: "#8fa89a" }} /><YAxis stroke="#8fa89a" tick={{ fill: "#8fa89a" }} /><Tooltip contentStyle={{ background: "#0c1c14", border: "1px solid rgba(61,220,151,.3)", borderRadius: 8, color: "#e8f3ec" }} cursor={{ fill: "rgba(61,220,151,.06)" }} /><Legend />
          {series.map((s) => <Line key={s.key} dataKey={s.key} name={s.name} stroke={s.color} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts";

type Series = { key: string; name: string; color: string };

export function BarsChart({ data, x, series }: { data: object[]; x: string; series: Series[] }) {
  return (
    <div className="h-64 rounded-xl border border-line bg-white p-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={x} /><YAxis /><Tooltip /><Legend />
          {series.map((s) => <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} />)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LinesChart({ data, x, series }: { data: object[]; x: string; series: Series[] }) {
  return (
    <div className="h-64 rounded-xl border border-line bg-white p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={x} /><YAxis /><Tooltip /><Legend />
          {series.map((s) => <Line key={s.key} dataKey={s.key} name={s.name} stroke={s.color} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

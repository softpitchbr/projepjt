"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useRole } from "./RoleProvider";
import { ROLES, canAccess, menuFor, type Role } from "@/lib/roles";

export function Sidebar() {
  const { role, setRole } = useRole();
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function change(r: Role) {
    setRole(r);
    if (!canAccess(r, path)) router.push(menuFor(r)[0].href);
  }

  return (
    <aside className="border-b border-slate-200 bg-slate-900 text-slate-100 md:min-h-screen md:w-60 md:border-b-0">
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold">Projepjt</span>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
      </div>
      <div className={`${open ? "block" : "hidden"} px-4 pb-4 md:block`}>
        <label className="mb-1 block text-xs uppercase text-slate-400">Perfil</label>
        <select
          className="mb-4 w-full rounded bg-slate-800 p-2"
          value={role}
          onChange={(e) => change(e.target.value as Role)}
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        <nav className="flex flex-col gap-1">
          {menuFor(role).map((m) => (
            <Link
              key={m.href}
              href={m.href}
              onClick={() => setOpen(false)}
              className={`rounded px-3 py-2 ${path === m.href ? "bg-slate-700" : "hover:bg-slate-800"}`}
            >
              {m.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

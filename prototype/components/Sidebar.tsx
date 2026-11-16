"use client";
import Image from "next/image";
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
  const items = menuFor(role);
  const groups = [...new Set(items.map((i) => i.group))];

  function change(r: Role) {
    setRole(r);
    if (!canAccess(r, path)) router.push(menuFor(r)[0].href);
  }

  return (
    <aside className="border-r border-line bg-void/80 backdrop-blur md:min-h-screen md:w-64 md:shrink-0">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Image src="/projep-simbolo.png" alt="Projep Jr" width={27} height={43} priority style={{ filter: "drop-shadow(0 0 8px rgba(224,122,27,.6))" }} />
          <div className="leading-tight">
            <div className="text-lg font-extrabold text-snow">Projep Jr</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-light">Centro de comando</div>
          </div>
        </div>
        <button className="text-snow md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
      </div>
      <div className={`${open ? "block" : "hidden"} px-4 pb-4 md:block`}>
        <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted">Ver como</label>
        <select className="mb-4 w-full rounded-lg border border-line bg-void p-2 font-semibold text-snow" value={role} onChange={(e) => change(e.target.value as Role)}>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value} className="bg-void text-snow">{r.label}</option>
          ))}
        </select>
        {groups.map((g) => (
          <div key={g} className="mb-3">
            <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">{g}</div>
            <nav className="flex flex-col gap-1">
              {items.filter((i) => i.group === g).map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg border px-3 py-2 font-semibold ${path === m.href ? "border-brand-light/60 bg-brand-light/10 text-brand-light" : "border-transparent text-snow/80 hover:border-line hover:bg-white/5"}`}
                >
                  {m.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}

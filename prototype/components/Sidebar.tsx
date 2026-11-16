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

  function change(r: Role) {
    setRole(r);
    if (!canAccess(r, path)) router.push(menuFor(r)[0].href);
  }

  return (
    <aside className="bg-ink text-white md:min-h-screen md:w-64">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Image src="/projep-simbolo.png" alt="Projep Jr" width={27} height={43} priority />
          <div className="leading-tight">
            <div className="text-lg font-extrabold">Projep Jr</div>
            <div className="text-xs text-line">Sistema de gestão</div>
          </div>
        </div>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
      </div>
      <div className={`${open ? "block" : "hidden"} px-4 pb-4 md:block`}>
        <label className="mb-1 block text-xs font-semibold uppercase text-line">Perfil</label>
        <select
          className="mb-4 w-full rounded-xl bg-white/10 p-2 font-semibold"
          value={role}
          onChange={(e) => change(e.target.value as Role)}
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value} className="text-ink">{r.label}</option>
          ))}
        </select>
        <nav className="flex flex-col gap-1">
          {menuFor(role).map((m) => (
            <Link
              key={m.href}
              href={m.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-3 py-2 font-semibold ${path === m.href ? "bg-brand" : "hover:bg-white/10"}`}
            >
              {m.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

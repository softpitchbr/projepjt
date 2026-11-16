"use client";
import type { ReactNode } from "react";
import { useRole } from "./RoleProvider";
import { canAccess } from "@/lib/roles";
import { AccessDenied } from "./AccessDenied";

export function Guard({ route, children }: { route: string; children: ReactNode }) {
  const { role } = useRole();
  return canAccess(role, route) ? <>{children}</> : <AccessDenied />;
}

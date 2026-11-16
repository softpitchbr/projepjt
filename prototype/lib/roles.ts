export type Role = "consultor" | "gerente" | "diretoria";

export const ROLES: { value: Role; label: string }[] = [
  { value: "consultor", label: "Consultor" },
  { value: "gerente", label: "Gerente" },
  { value: "diretoria", label: "Diretoria" },
];

const ALL: Role[] = ["consultor", "gerente", "diretoria"];

const ROUTES: { label: string; href: string; roles: Role[] }[] = [
  { label: "Visão geral", href: "/", roles: ["diretoria"] },
  { label: "Comercial", href: "/comercial", roles: ALL },
  { label: "Marketing", href: "/marketing", roles: ["gerente", "diretoria"] },
  { label: "Projetos", href: "/projetos", roles: ALL },
  { label: "Pessoas", href: "/pessoas", roles: ["diretoria"] },
  { label: "Relatórios", href: "/relatorios", roles: ["gerente", "diretoria"] },
];

export function canAccess(role: Role, route: string): boolean {
  const r = ROUTES.find((x) => x.href === route);
  return r ? r.roles.includes(role) : false;
}

export function menuFor(role: Role): { label: string; href: string }[] {
  return ROUTES.filter((r) => r.roles.includes(role)).map(({ label, href }) => ({ label, href }));
}

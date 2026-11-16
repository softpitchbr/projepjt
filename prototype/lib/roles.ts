export type Role = "consultor" | "gerente" | "diretoria";

export const ROLES: { value: Role; label: string }[] = [
  { value: "consultor", label: "Consultor" },
  { value: "gerente", label: "Gerente" },
  { value: "diretoria", label: "Diretoria" },
];

const ALL: Role[] = ["consultor", "gerente", "diretoria"];

export type MenuItem = { label: string; href: string; group: "Demonstração" | "Resultado final" };

const ROUTES: (MenuItem & { roles: Role[] })[] = [
  { label: "Como funciona", href: "/", roles: ALL, group: "Demonstração" },
  { label: "Integração ao vivo", href: "/integracao", roles: ALL, group: "Demonstração" },
  { label: "Aguenta 60 usuários?", href: "/capacidade", roles: ALL, group: "Demonstração" },
  { label: "Vantagens", href: "/vantagens", roles: ALL, group: "Demonstração" },
  { label: "Custos", href: "/custos", roles: ["gerente", "diretoria"], group: "Demonstração" },
  { label: "Visão geral", href: "/visao-geral", roles: ["diretoria"], group: "Resultado final" },
  { label: "Comercial", href: "/comercial", roles: ALL, group: "Resultado final" },
  { label: "Marketing", href: "/marketing", roles: ["gerente", "diretoria"], group: "Resultado final" },
  { label: "Projetos", href: "/projetos", roles: ALL, group: "Resultado final" },
  { label: "Pessoas", href: "/pessoas", roles: ["diretoria"], group: "Resultado final" },
  { label: "Relatórios", href: "/relatorios", roles: ["gerente", "diretoria"], group: "Resultado final" },
];

export function canAccess(role: Role, route: string): boolean {
  const r = ROUTES.find((x) => x.href === route);
  return r ? r.roles.includes(role) : false;
}

export function menuFor(role: Role): MenuItem[] {
  return ROUTES.filter((r) => r.roles.includes(role)).map(({ label, href, group }) => ({ label, href, group }));
}

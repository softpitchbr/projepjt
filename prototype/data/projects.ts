export type Project = { id: number; client: string; manager: string; sprint: string; progress: number; status: "No prazo" | "Atenção" | "Atrasado"; notes: string[] };

export const projects: Project[] = [
  { id: 1, client: "Cliente Alfa", manager: "Ana Silva", sprint: "Sprint 3 de 6", progress: 0.5, status: "No prazo", notes: ["Diagnóstico entregue", "Reunião de alinhamento na quinta"] },
  { id: 2, client: "Cliente Beta", manager: "Bruno Souza", sprint: "Sprint 5 de 6", progress: 0.82, status: "No prazo", notes: ["Validação final com o cliente"] },
  { id: 3, client: "Cliente Gama", manager: "Caio Lima", sprint: "Sprint 2 de 5", progress: 0.3, status: "Atenção", notes: ["Cliente demorou a enviar dados"] },
  { id: 4, client: "Cliente Delta", manager: "Daniela Costa", sprint: "Sprint 1 de 4", progress: 0.15, status: "Atrasado", notes: ["Reagendar kickoff"] },
];

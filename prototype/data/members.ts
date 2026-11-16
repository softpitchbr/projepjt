export type Sector = "Comercial" | "Marketing" | "Projetos" | "Gestão de Pessoas" | "Recursos";
export type Member = { id: number; name: string; sector: Sector; level: "consultor" | "gerente" | "diretor"; trainee: boolean };

const first = ["Ana","Bruno","Caio","Daniela","Eduardo","Fernanda","Gabriel","Helena","Igor","Julia","Kaua","Larissa","Marcos","Natalia","Otavio","Paula","Rafael","Sofia","Thiago","Vitoria"];
const last = ["Silva","Souza","Lima","Costa","Alves","Rocha","Dias","Melo","Pinto","Nunes"];
const sectors: Sector[] = ["Comercial","Comercial","Comercial","Marketing","Projetos","Projetos","Gestão de Pessoas","Recursos"];

export const members: Member[] = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  name: `${first[i % first.length]} ${last[(i * 3) % last.length]}`,
  sector: sectors[i % sectors.length],
  level: i % 12 === 0 ? "gerente" : "consultor",
  trainee: i >= 33,
}));

import type { RawLead, RawMeeting } from "@/lib/dedup";

export const rawLeads: RawLead[] = [
  { source: "CRM", name: "Mariana Alves", email: "mariana@padariaboa.com", phone: "(34) 99811-2200" },
  { source: "Google Ads", name: "Mariana A.", email: " Mariana@PadariaBoa.com ", phone: "" },
  { source: "Formulário", name: "Mariana Alves", email: "", phone: "+55 34 99811-2200" },
  { source: "CRM", name: "Roberto Dias", email: "roberto@dias.eng.br", phone: "34 99777-4411" },
  { source: "Formulário", name: "Roberto Dias", email: "ROBERTO@dias.eng.br", phone: "" },
  { source: "Google Ads", name: "Clínica Sorriso", email: "contato@clinicasorriso.com", phone: "" },
  { source: "CRM", name: "Clínica Sorriso", email: "contato@clinicasorriso.com", phone: "(34) 3333-8000" },
  { source: "CRM", name: "Paulo Mendes", email: "paulo@mendes.com", phone: "34988880000" },
  { source: "Google Ads", name: "Lead sem contato", email: "", phone: "" },
  { source: "Formulário", name: "Juliana Prado", email: "ju.prado@gmail.com", phone: "(34) 99655-1010" },
  { source: "Google Ads", name: "Juliana Prado", email: "ju.prado@gmail.com", phone: "" },
  { source: "CRM", name: "Tecnomec Ltda", email: "vendas@tecnomec.com.br", phone: "" },
];

const ids = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10", "m11", "m12", "m13", "m14", "m15", "m16"];

export const rawMeetings: RawMeeting[] = [
  ...ids.map(
    (id): RawMeeting => ({
      id,
      source: "CRM",
      status: ["m2", "m7", "m11"].includes(id) ? "no-show" : ["m14", "m15", "m16"].includes(id) ? "marcada" : "realizada",
    }),
  ),
  { id: "m2", status: "no-show", source: "Planilha" },
  { id: "m7", status: "no-show", source: "Planilha" },
  { id: "m11", status: "no-show", source: "Planilha" },
  { id: "m5", status: "realizada", source: "Planilha" },
  { id: "m9", status: "realizada", source: "Planilha" },
];

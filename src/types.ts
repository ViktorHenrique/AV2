export type TipoAeronave = "COMERCIAL" | "MILITAR";

export interface Peca {
  id: string;
  nome: string;
  tipo: "NACIONAL" | "IMPORTADA";
  fornecedor?: string;
  status: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA";
}

export interface Etapa {
  id: string;
  nome: string;
  prazoDias: number;
  status: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA";
  funcionariosIds: string[];
}

export interface Funcionario {
  id: string;
  nome: string;
  matricula?: string;
  telefone?: string;
  usuario?: string;
  nivel?: "ADMINISTRADOR" | "ENGENHEIRO" | "OPERADOR";
}

export interface Teste {
  id: string;
  codigoAeronave: string;
  tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
  resultado: "APROVADO" | "REPROVADO";
}

export interface Aeronave {
  codigo: string;
  modelo: string;
  tipo: TipoAeronave;
  capacidade: number;
  alcanceKm: number;
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];
}

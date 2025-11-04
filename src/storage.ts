import { Aeronave, Funcionario } from "./types";

const KEY_AERONAVES = "av2_aeronaves";
const KEY_FUNCIONARIOS = "av2_funcionarios";

export const saveAeronaves = (list: Aeronave[]) => {
  localStorage.setItem(KEY_AERONAVES, JSON.stringify(list));
};

export const loadAeronaves = (): Aeronave[] => {
  const raw = localStorage.getItem(KEY_AERONAVES);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Aeronave[];
  } catch {
    return [];
  }
};

export const saveFuncionarios = (list: Funcionario[]) => {
  localStorage.setItem(KEY_FUNCIONARIOS, JSON.stringify(list));
};

export const loadFuncionarios = (): Funcionario[] => {
  const raw = localStorage.getItem(KEY_FUNCIONARIOS);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Funcionario[];
  } catch {
    return [];
  }
};

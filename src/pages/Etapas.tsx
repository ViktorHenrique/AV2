import React, { useEffect, useState } from "react";
import { loadAeronaves, loadFuncionarios, saveAeronaves } from "../storage";
import { Aeronave, Etapa, Funcionario } from "../types";
import { v4 as uuidv4 } from "uuid";

export default function Etapas() {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [selectedAeronave, setSelectedAeronave] = useState<string>("");
  const [novaEtapa, setNovaEtapa] = useState({
    nome: "",
    prazoDias: 7,
    status: "PENDENTE" as "PENDENTE" | "ANDAMENTO" | "CONCLUIDA",
    funcionarioId: "",
  });

  useEffect(() => {
    const savedA = loadAeronaves();
    if (savedA.length) setAeronaves(savedA);
    const savedF = loadFuncionarios();
    if (savedF.length) setFuncionarios(savedF);
  }, []);

  function persist(newList: Aeronave[]) {
    setAeronaves(newList);
    saveAeronaves(newList);
  }

  function handleAddEtapa() {
    if (!selectedAeronave) return alert("Selecione uma aeronave primeiro.");
    if (!novaEtapa.nome.trim()) return alert("Informe o nome da etapa.");

    const nova: Etapa = {
      id: uuidv4(),
      nome: novaEtapa.nome,
      prazoDias: Number(novaEtapa.prazoDias),
      status: novaEtapa.status,
      funcionariosIds: novaEtapa.funcionarioId
        ? [novaEtapa.funcionarioId]
        : [],
    };

    const atualizadas = aeronaves.map((a) =>
      a.codigo === selectedAeronave
        ? { ...a, etapas: [...a.etapas, nova] }
        : a
    );

    persist(atualizadas);

    setNovaEtapa({
      nome: "",
      prazoDias: 7,
      status: "PENDENTE",
      funcionarioId: "",
    });
  }

  function toggleStatus(aCodigo: string, eId: string) {
    const atualizadas = aeronaves.map((a) => {
      if (a.codigo !== aCodigo) return a;
      const etapas = a.etapas.map((et) => {
        if (et.id !== eId) return et;
        if (et.status === "PENDENTE") return { ...et, status: "ANDAMENTO" };
        if (et.status === "ANDAMENTO") return { ...et, status: "CONCLUIDA" };
        return { ...et, status: "PENDENTE" };
      });
      return { ...a, etapas };
    });
    persist(atualizadas);
  }

  function assocFuncionario(aCodigo: string, eId: string, fId: string) {
    if (!fId) return;
    const atualizadas = aeronaves.map((a) => {
      if (a.codigo !== aCodigo) return a;
      const etapas = a.etapas.map((et) => {
        if (et.id !== eId) return et;
        if (!et.funcionariosIds.includes(fId)) {
          return { ...et, funcionariosIds: [...et.funcionariosIds, fId] };
        }
        return et;
      });
      return { ...a, etapas };
    });
    persist(atualizadas);
  }

  return (
    <div>
      <div className="card header">
        <h3 style={{ color: "#fff" }}>Gerenciar Etapas</h3>
        <div className="small">
          Cadastre e associe etapas às aeronaves existentes
        </div>
      </div>

      <div className="card">
        <h3 style={{ color: "#fff" }}>Selecionar Aeronave</h3>
        <select
          className="input"
          value={selectedAeronave}
          onChange={(e) => setSelectedAeronave(e.target.value)}
        >
          <option value="">-- Selecione uma aeronave --</option>
          {aeronaves.map((a) => (
            <option key={a.codigo} value={a.codigo}>
              {a.codigo} — {a.modelo}
            </option>
          ))}
        </select>
      </div>

      {selectedAeronave && (
        <div className="card">
          <h3 style={{ color: "#fff" }}>Cadastrar Nova Etapa</h3>
          <div className="form-row" style={{ flexWrap: "wrap" }}>
            <input
              className="input"
              placeholder="Nome da etapa"
              value={novaEtapa.nome}
              onChange={(e) =>
                setNovaEtapa({ ...novaEtapa, nome: e.target.value })
              }
            />
            <input
              type="number"
              className="input"
              placeholder="Prazo (dias)"
              value={novaEtapa.prazoDias}
              onChange={(e) =>
                setNovaEtapa({
                  ...novaEtapa,
                  prazoDias: Number(e.target.value),
                })
              }
            />
            <select
              className="input"
              value={novaEtapa.status}
              onChange={(e) =>
                setNovaEtapa({
                  ...novaEtapa,
                  status: e.target.value as Etapa["status"],
                })
              }
            >
              <option value="PENDENTE">Pendente</option>
              <option value="ANDAMENTO">Em Andamento</option>
              <option value="CONCLUIDA">Concluída</option>
            </select>

            <select
              className="input"
              value={novaEtapa.funcionarioId}
              onChange={(e) =>
                setNovaEtapa({ ...novaEtapa, funcionarioId: e.target.value })
              }
            >
              <option value="">-- Associar Funcionário --</option>
              {funcionarios.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome}
                </option>
              ))}
            </select>

            <button className="btn" onClick={handleAddEtapa}>
              Adicionar Etapa
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h3 style={{ color: "#fff" }}>Etapas Cadastradas</h3>
        {selectedAeronave ? (
          (() => {
            const aeronave = aeronaves.find(
              (a) => a.codigo === selectedAeronave
            );
            if (!aeronave || aeronave.etapas.length === 0)
              return <div className="small">Nenhuma etapa cadastrada.</div>;

            return (
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Prazo (dias)</th>
                    <th>Status</th>
                    <th>Funcionários</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {aeronave.etapas.map((e) => (
                    <tr key={e.id}>
                      <td>{e.nome}</td>
                      <td>{e.prazoDias}</td>
                      <td>{e.status}</td>
                      <td>
                        {e.funcionariosIds.length === 0
                          ? "—"
                          : e.funcionariosIds
                              .map(
                                (id) =>
                                  funcionarios.find((f) => f.id === id)?.nome ||
                                  id
                              )
                              .join(", ")}
                      </td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => toggleStatus(aeronave.codigo, e.id)}
                        >
                          Alternar Status
                        </button>
                        {" "}
                        <select
                          className="input"
                          onChange={(ev) =>
                            assocFuncionario(
                              aeronave.codigo,
                              e.id,
                              ev.target.value
                            )
                          }
                        >
                          <option value="">+ Associar Funcionário</option>
                          {funcionarios.map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.nome}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()
        ) : (
          <div className="small">Selecione uma aeronave para visualizar.</div>
        )}
      </div>
    </div>
  );
}
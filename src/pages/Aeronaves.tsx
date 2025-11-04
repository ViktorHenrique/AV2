import React, { useEffect, useState } from "react";
import { Aeronave, Peca, Etapa, Teste } from "../types";
import { loadAeronaves, saveAeronaves } from "../storage";
import { v4 as uuidv4 } from "uuid";

function emptyAeronave(): Aeronave {
  return {
    codigo: "",
    modelo: "",
    tipo: "COMERCIAL",
    capacidade: 0,
    alcanceKm: 0,
    pecas: [],
    etapas: [],
    testes: [],
  };
}

export default function Aeronaves() {
  const [list, setList] = useState<Aeronave[]>([]);
  const [form, setForm] = useState<Aeronave>(() => emptyAeronave());
  const [selected, setSelected] = useState<Aeronave | null>(null);

  useEffect(() => {
    const saved = loadAeronaves();
    if (saved.length) setList(saved);
  }, []);

  useEffect(() => {
    saveAeronaves(list);
  }, [list]);

  function handleAdd() {
    if (!form.codigo.trim()) return alert("Código obrigatório");
    if (list.find((a) => a.codigo === form.codigo))
      return alert("Código duplicado");
    setList((s) => [...s, { ...form, pecas: [], etapas: [], testes: [] }]);
    setForm(emptyAeronave());
  }

  function addPecaTo(a: Aeronave) {
    const nome = prompt("Nome da peça") || "";
    if (!nome) return;
    const tipo = (prompt("Tipo: NACIONAL ou IMPORTADA", "NACIONAL") ||
      "NACIONAL") as "NACIONAL" | "IMPORTADA";
    const p: Peca = {
      id: uuidv4(),
      nome,
      tipo,
      fornecedor: "Fornecedor X",
      status: "EM_PRODUCAO",
    };
    setList((s) =>
      s.map((it) =>
        it.codigo === a.codigo ? { ...it, pecas: [...it.pecas, p] } : it
      )
    );
    setSelected({ ...a, pecas: [...a.pecas, p] });
  }

  function addEtapaTo(a: Aeronave) {
    const nome = prompt("Nome da etapa") || "";
    const prazo = Number(prompt("Prazo em dias", "7") || "7");
    if (!nome) return;
    const e: Etapa = {
      id: uuidv4(),
      nome,
      prazoDias: prazo,
      status: "PENDENTE",
      funcionariosIds: [],
    };
    setList((s) =>
      s.map((it) =>
        it.codigo === a.codigo ? { ...it, etapas: [...it.etapas, e] } : it
      )
    );
    setSelected({ ...a, etapas: [...a.etapas, e] });
  }

  function addTesteTo(a: Aeronave) {
    const tipo = (prompt(
      "Tipo de teste (ELETRICO/HIDRAULICO/AERODINAMICO)",
      "ELETRICO"
    ) || "ELETRICO") as any;
    const res = (prompt("Resultado (APROVADO/REPROVADO)", "APROVADO") ||
      "APROVADO") as any;
    const t: Teste = { id: uuidv4(), tipo, resultado: res };
    setList((s) =>
      s.map((it) =>
        it.codigo === a.codigo ? { ...it, testes: [...it.testes, t] } : it
      )
    );
    setSelected({ ...a, testes: [...a.testes, t] });
  }

  return (
    <div>
      <div className="card">
        <h3 style={{ color: "#fff" }}>Cadastrar Aeronave</h3>

        <div className="form-row" style={{ flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>
              Código da Aeronave
            </label>
            <input
              className="input"
              placeholder="Ex: A001"
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>
              Modelo
            </label>
            <input
              className="input"
              placeholder="Ex: ATR-72"
              value={form.modelo}
              onChange={(e) => setForm({ ...form, modelo: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>Tipo</label>
            <select
              className="input"
              value={form.tipo}
              onChange={(e) =>
                setForm({ ...form, tipo: e.target.value as Aeronave["tipo"] })
              }
            >
              <option value="COMERCIAL">Comercial</option>
              <option value="MILITAR">Militar</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>
              Capacidade
            </label>
            <input
              type="number"
              className="input"
              placeholder="Número de passageiros"
              value={form.capacidade}
              onChange={(e) =>
                setForm({ ...form, capacidade: Number(e.target.value) })
              }
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>
              Alcance (km)
            </label>
            <input
              type="number"
              className="input"
              placeholder="Ex: 5000"
              value={form.alcanceKm}
              onChange={(e) =>
                setForm({ ...form, alcanceKm: Number(e.target.value) })
              }
            />
          </div>

          <button className="btn" onClick={handleAdd} style={{ alignSelf: "end" }}>
            Adicionar
          </button>
        </div>
      </div>

      <div className="card">
        <div className="header">
          <h3 style={{ color: "#fff" }}>Aeronaves Cadastradas</h3>
        </div>

        {list.length === 0 ? (
          <div className="small">Nenhuma aeronave cadastrada.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>Capacidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.codigo}>
                  <td>{a.codigo}</td>
                  <td>{a.modelo}</td>
                  <td>{a.tipo}</td>
                  <td>{a.capacidade} passageiros</td>
                  <td>
                    <button className="btn" onClick={() => setSelected(a)}>
                      Detalhes
                    </button>{" "}
                    <button className="btn" onClick={() => addPecaTo(a)}>
                      + Peça
                    </button>{" "}
                    <button className="btn" onClick={() => addEtapaTo(a)}>
                      + Etapa
                    </button>{" "}
                    <button className="btn" onClick={() => addTesteTo(a)}>
                      + Teste
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className="card">
          <h3 style={{ color: "#fff" }}>
            Detalhes - {selected.codigo}
          </h3>
          <div className="small">
            {selected.modelo} — {selected.tipo}
          </div>

          <h4 style={{ color: "#fff" }}>Peças</h4>
          {selected.pecas.length === 0 ? (
            <div className="small">Nenhuma peça</div>
          ) : (
            <ul>
              {selected.pecas.map((p) => (
                <li key={p.id}>
                  {p.nome} — {p.tipo} — {p.status}
                </li>
              ))}
            </ul>
          )}

          <h4 style={{ color: "#fff" }}>Etapas</h4>
          {selected.etapas.length === 0 ? (
            <div className="small">Nenhuma etapa</div>
          ) : (
            <ul>
              {selected.etapas.map((e) => (
                <li key={e.id}>
                  {e.nome} — {e.status} — prazo {e.prazoDias} dias
                </li>
              ))}
            </ul>
          )}

          <h4 style={{ color: "#fff" }}>Testes</h4>
          {selected.testes.length === 0 ? (
            <div className="small">Nenhum teste</div>
          ) : (
            <ul>
              {selected.testes.map((t) => (
                <li key={t.id}>
                  {t.tipo} — {t.resultado}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
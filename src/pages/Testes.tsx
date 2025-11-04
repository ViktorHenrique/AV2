import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Teste } from "../types";

export default function Testes() {
  const [testes, setTestes] = useState<Teste[]>([
    { id: uuidv4(), codigoAeronave: "XA-100", tipo: "ELETRICO", resultado: "APROVADO" },
    { id: uuidv4(), codigoAeronave: "XA-100", tipo: "HIDRAULICO", resultado: "REPROVADO" },
    { id: uuidv4(), codigoAeronave: "ZC-250", tipo: "AERODINAMICO", resultado: "APROVADO" },
  ]);

  const [novoTeste, setNovoTeste] = useState<Omit<Teste, "id">>({
    codigoAeronave: "",
    tipo: "ELETRICO",
    resultado: "APROVADO",
  });

  function handleAdd() {
    if (!novoTeste.codigoAeronave.trim()) {
      alert("Código da aeronave é obrigatório");
      return;
    }

    const novoRegistro: Teste = { id: uuidv4(), ...novoTeste };
    setTestes((prev) => [...prev, novoRegistro]);
    setNovoTeste({ codigoAeronave: "", tipo: "ELETRICO", resultado: "APROVADO" });
  }

  return (
    <div>
      <div className="card header">
        <h3 style={{ color: "#fff" }}>Registrar Testes</h3>
        <div className="small">Adicione e visualize os testes realizados nas aeronaves</div>
      </div>

      <div className="card">
        <div className="form-row">
          <input
            className="input"
            placeholder="Código da Aeronave"
            value={novoTeste.codigoAeronave}
            onChange={(e) => setNovoTeste({ ...novoTeste, codigoAeronave: e.target.value })}
          />
          <select
            className="input"
            value={novoTeste.tipo}
            onChange={(e) => setNovoTeste({ ...novoTeste, tipo: e.target.value as Teste["tipo"] })}
          >
            <option value="ELETRICO">Elétrico</option>
            <option value="HIDRAULICO">Hidráulico</option>
            <option value="AERODINAMICO">Aerodinâmico</option>
          </select>
          <select
            className="input"
            value={novoTeste.resultado}
            onChange={(e) => setNovoTeste({ ...novoTeste, resultado: e.target.value as Teste["resultado"] })}
          >
            <option value="APROVADO">Aprovado</option>
            <option value="REPROVADO">Reprovado</option>
          </select>
          <button className="btn" onClick={handleAdd}>Adicionar</button>
        </div>
      </div>

      <div className="card">
        {testes.length === 0 ? (
          <div className="small">Nenhum teste cadastrado</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Código Aeronave</th>
                <th>Tipo</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {testes.map((t) => (
                <tr key={t.id}>
                  <td>{t.codigoAeronave}</td>
                  <td>{t.tipo}</td>
                  <td>{t.resultado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
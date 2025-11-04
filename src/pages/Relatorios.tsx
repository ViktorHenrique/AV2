import React, { useEffect, useState } from "react";
import { loadAeronaves } from "../storage";
import { Aeronave } from "../types";

export default function Relatorios() {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([
    {
      codigo: "A320",
      modelo: "ATR-72",
      tipo: "COMERCIAL",
      capacidade: 180,
      alcanceKm: 5000,
      pecas: [{ id: "p1", nome: "Turbina X", tipo: "NACIONAL", fornecedor: "Fornecedor X", status: "EM_PRODUCAO" }],
      etapas: [{ id: "e1", nome: "Inspeção Inicial", prazoDias: 7, status: "PENDENTE", funcionariosIds: ["f1"] }],
      testes: [{ id: "t1", codigoAeronave: "A320", tipo: "ELETRICO", resultado: "APROVADO" }],
    }
  ]);

  useEffect(()=> {
    const saved = loadAeronaves();
    if(saved.length) setAeronaves(saved);
  }, []);

  function gerar(a: Aeronave) {
    const txt = [
      `=== RELATÓRIO AERONAVE ${a.codigo} ===`,
      `Modelo: ${a.modelo}`,
      `Tipo: ${a.tipo}`,
      `Capacidade: ${a.capacidade} pax`,
      `Alcance: ${a.alcanceKm} km`,
      "",
      "Peças:",
      ...(a.pecas.length ? a.pecas.map(p=>`- ${p.nome} (${p.tipo}) : ${p.status}`) : ["Nenhuma peça"]),
      "",
      "Etapas:",
      ...(a.etapas.length ? a.etapas.map(e=>`- ${e.nome} : ${e.status} (prazo ${e.prazoDias}d)`) : ["Nenhuma etapa"]),
      "",
      "Testes:",
      ...(a.testes.length ? a.testes.map(t=>`- ${t.tipo} : ${t.resultado}`) : ["Nenhum teste"])
    ].join("\n");

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const aLink = document.createElement("a");
    aLink.href = url;
    aLink.download = `relatorio_${a.codigo}.txt`;
    aLink.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="card header">
        <h3 style={{color:"#fff"}}>Relatórios</h3>
        <div className="small">Gere e baixe relatórios em .txt</div>
      </div>

      <div className="card">
        {aeronaves.length === 0 ? <div className="small">Nenhuma aeronave</div> : (
          aeronaves.map(a=>(
            <div key={a.codigo} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0"}}>
              <div>
                <strong style={{color:"#fff"}}>{a.codigo} — {a.modelo}</strong>
                <div className="small">{a.tipo} • {a.capacidade} pax</div>
              </div>
              <div>
                <button className="btn" onClick={()=>gerar(a)}>Gerar relatório</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
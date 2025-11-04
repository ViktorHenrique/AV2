import React, { useEffect, useState } from "react";
import { Aeronave, Peca } from "../types";
import { loadAeronaves, saveAeronaves } from "../storage";
import { v4 as uuidv4 } from "uuid";

export default function Pecas() {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([
    {
      codigo: "A320",
      modelo: "ATR-72",
      tipo: "COMERCIAL",
      capacidade: 180,
      alcanceKm: 5000,
      pecas: [{ id: "p1", nome: "Turbina X", tipo: "NACIONAL", fornecedor: "Fornecedor X", status: "EM_PRODUCAO" }],
      etapas: [],
      testes: []
    }
  ]);
  const [selected, setSelected] = useState<Aeronave | null>(null);

  useEffect(()=> {
    const saved = loadAeronaves();
    if(saved.length) setAeronaves(saved);
  }, []);

  function addPeca(a: Aeronave) {
    const nome = prompt("Nome da peça") || "";
    if(!nome) return;
    const tipo = (prompt("Tipo: NACIONAL ou IMPORTADA", "NACIONAL") || "NACIONAL") as "NACIONAL" | "IMPORTADA";
    const p: Peca = { id: uuidv4(), nome, tipo, fornecedor: "Fornecedor X", status: "EM_PRODUCAO" };
    const arr = aeronaves.map(it => it.codigo === a.codigo ? {...it, pecas:[...it.pecas, p]} : it);
    setAeronaves(arr);
    setSelected({...a, pecas: [...a.pecas, p]});
    saveAeronaves(arr);
  }

  return (
    <div>
      <div className="card header">
        <h3 style={{color:"#fff"}}>Gerenciar Peças</h3>
        <div className="small">Escolha uma aeronave para ver e adicionar peças</div>
      </div>

      <div className="card">
        {aeronaves.map(a => (
          <div key={a.codigo} style={{marginBottom:12}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div>
                <strong style={{color:"#fff"}}>{a.codigo} — {a.modelo}</strong>
                <div className="small">{a.tipo} • {a.capacidade} pax</div>
              </div>
              <div>
                <button className="btn" onClick={()=>addPeca(a)}>+ Peça</button>{" "}
                <button className="btn" onClick={()=>setSelected(a)}>Detalhes</button>
              </div>
            </div>

            {selected && selected.codigo === a.codigo && (
              <div style={{marginTop:8}}>
                {selected.pecas.length === 0 ? <div className="small">Nenhuma peça</div> :
                  <ul>
                    {selected.pecas.map(p => <li key={p.id}>{p.nome} — {p.tipo} — {p.status}</li>)}
                  </ul>
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
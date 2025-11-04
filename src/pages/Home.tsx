import React from "react";

export default function Home() {
  return (
    <div className="container">
      <div className="card header">
        <div>
          <h2 style={{ color: "#fff" }}>Bem-vindo ao AeroCode</h2>
          <div className="small">
            Gerencie aeronaves, peças, etapas, testes e gere relatórios.
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ color: "#fff" }}>Como usar</h3>
        <ol>
          <li>Vá em <b>Aeronaves</b> para cadastrar uma aeronave.</li>
          <li>Cadastre funcionários em <b>Funcionários</b>.</li>
          <li>Adicione etapas e peças em <b>Aeronaves</b> (detalhes).</li>
          <li>Use <b>Etapas</b> para associar funcionários e mudar status.</li>
          <li>Em <b>Relatórios</b> gere e baixe o relatório.</li>
        </ol>
      </div>
    </div>
  );
}
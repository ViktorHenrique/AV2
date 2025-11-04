import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { loadFuncionarios, saveFuncionarios } from "../storage";

type NivelPermissao = "ADMIN" | "GERENTE" | "OPERADOR";

interface Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
  nivelPermissao: NivelPermissao;
}

export default function Funcionarios() {
  const [list, setList] = useState<Funcionario[]>([]);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    usuario: "",
    senha: "",
    nivelPermissao: "OPERADOR" as NivelPermissao,
  });

  useEffect(() => {
    const saved = loadFuncionarios();
    if (saved.length) setList(saved);
  }, []);

  useEffect(() => {
    saveFuncionarios(list);
  }, [list]);

  function add() {
    if (!form.nome.trim()) return alert("Informe o nome do funcionário.");
    if (!form.usuario.trim()) return alert("Informe um nome de usuário.");
    if (!form.senha.trim()) return alert("Informe uma senha.");

    const f: Funcionario = { id: uuidv4(), ...form };
    setList((s) => [...s, f]);
    setForm({
      nome: "",
      telefone: "",
      endereco: "",
      usuario: "",
      senha: "",
      nivelPermissao: "OPERADOR",
    });
  }

  return (
    <div>
      <div className="card">
        <h3 style={{ color: "#fff" }}>Cadastrar Funcionário</h3>

        <div className="form-row" style={{ flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>Nome</label>
            <input
              className="input"
              placeholder="Nome completo"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>Telefone</label>
            <input
              className="input"
              placeholder="Ex: (12) 99999-9999"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>Endereço</label>
            <input
              className="input"
              placeholder="Endereço completo"
              value={form.endereco}
              onChange={(e) => setForm({ ...form, endereco: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>Usuário</label>
            <input
              className="input"
              placeholder="Usuário"
              value={form.usuario}
              onChange={(e) => setForm({ ...form, usuario: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>Senha</label>
            <input
              className="input"
              type="password"
              placeholder="Senha"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#fff", marginBottom: "4px" }}>Nível de Permissão</label>
            <select
              className="input"
              value={form.nivelPermissao}
              onChange={(e) =>
                setForm({
                  ...form,
                  nivelPermissao: e.target.value as NivelPermissao,
                })
              }
            >
              <option value="OPERADOR">Operador</option>
              <option value="GERENTE">Gerente</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <button className="btn" onClick={add} style={{ alignSelf: "end" }}>
            Adicionar
          </button>
        </div>
      </div>

      <div className="card">
        <h3 style={{ color: "#fff" }}>Lista de Funcionários</h3>
        {list.length === 0 ? (
          <div className="small">Nenhum funcionário cadastrado.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Usuário</th>
                <th>Nível</th>
              </tr>
            </thead>
            <tbody>
              {list.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.nome}</td>
                  <td>{f.telefone}</td>
                  <td>{f.endereco}</td>
                  <td>{f.usuario}</td>
                  <td>{f.nivelPermissao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [nome, setNome] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userName", nome);
    alert(`Bem-vindo, ${nome}!`);
    window.location.href = "/";
  };

  return (
    <div className="login-container">
      <h2>Login / Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
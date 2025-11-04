import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("userName");
    if (savedUser) setUserName(savedUser);
  }, []);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </button>

      {isOpen && (
        <div className="menu-content">
          <div className="top-section">
            <h2 className="menu-title">AeroCode</h2>

            <nav className="menu-links">
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                Home
              </Link>

              <Link
                to="/aeronaves"
                className={location.pathname === "/aeronaves" ? "active" : ""}
              >
                Aeronaves
              </Link>

              <Link
                to="/funcionarios"
                className={location.pathname === "/funcionarios" ? "active" : ""}
              >
                Funcionários
              </Link>

              <Link
                to="/etapas"
                className={location.pathname === "/etapas" ? "active" : ""}
              >
                Etapas
              </Link>

              <Link
                to="/pecas"
                className={location.pathname === "/pecas" ? "active" : ""}
              >
                Peças
              </Link>

              <Link
                to="/testes"
                className={location.pathname === "/testes" ? "active" : ""}
              >
                Testes
              </Link>

              <Link
                to="/relatorios"
                className={location.pathname === "/relatorios" ? "active" : ""}
              >
                Relatórios
              </Link>
            </nav>
          </div>

          <div className="bottom-section">
            {userName ? (
              <p>
                Olá, <strong>{userName}</strong>
              </p>
            ) : (
              <Link to="/login" className="login-link">
                Login / Cadastro
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
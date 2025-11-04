import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Aeronaves from "./pages/Aeronaves";
import Funcionarios from "./pages/Funcionarios";
import Etapas from "./pages/Etapas";
import Relatorios from "./pages/Relatorios";
import Pecas from "./pages/Pecas";
import Testes from "./pages/Testes";
import Login from "./pages/Login";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aeronaves" element={<Aeronaves />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/etapas" element={<Etapas />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/pecas" element={<Pecas />} />
            <Route path="/testes" element={<Testes />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
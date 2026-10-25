import { useState } from "react";
import { Link, Route, Routes } from "react-router";
import "./App.css";

import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Parceiros from "./pages/Parceiros";

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div>
      <header className="header">
        <Link to="/" className="logo" onClick={() => setMenuAberto(false)}>
          <img src="/logo.svg" alt="KidJourney" />
        </Link>

        <button
          className="menu-botao"
          type="button"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </button>

        <nav className={menuAberto ? "menu aberto" : "menu"}>
          <Link to="/" onClick={() => setMenuAberto(false)}>Início</Link>
          <Link to="/cadastro" onClick={() => setMenuAberto(false)}>Cadastro</Link>
          <Link to="/login" onClick={() => setMenuAberto(false)}>Entrar</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/parceiros" element={<Parceiros />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;



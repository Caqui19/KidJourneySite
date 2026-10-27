import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import { observarUsuario, validarPerfil } from "./auth";
import "./App.css";
import "./components/Header.css";
import "./components/Footer.css";

import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Parceiros from "./pages/Parceiros";
import EntrarParceiro from "./pages/EntrarParceiro";
import PoliticaSeguranca from "./pages/PoliticaSeguranca";
import RedefinirSenha from "./pages/RedefinirSenha";

function classeAtiva({ isActive }) {
  return isActive ? "active" : "";
}

function LinksDoMenu({ aoClicar, mostrarPolitica = false, usuario }) {
  const navegar = useNavigate();

  async function abrirParceiros(evento) {
    if (
      evento.button !== 0 ||
      evento.metaKey ||
      evento.ctrlKey ||
      evento.shiftKey ||
      evento.altKey
    ) {
      return;
    }

    evento.preventDefault();
    aoClicar?.();

    if (!usuario) {
      navegar("/parceiros");
      return;
    }

    try {
      await validarPerfil(usuario, "parceiro");
      navegar("/parceiros/entrar");
    } catch {
      navegar("/parceiros");
    }
  }

  return (
    <ul>
      <li>
        <NavLink to="/" end onClick={aoClicar} className={classeAtiva}>
          Início
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/parceiros"
          onClick={abrirParceiros}
          className={classeAtiva}
        >
          Parceiros
        </NavLink>
      </li>
      <li>
        <NavLink to="/forum" onClick={aoClicar} className={classeAtiva}>
          Fórum
        </NavLink>
      </li>
      {mostrarPolitica && (
        <li>
          <NavLink to="/politica-de-seguranca" className={classeAtiva}>
            Política de Segurança
          </NavLink>
        </li>
      )}
    </ul>
  );
}

function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const fecharMenu = () => setMenuAberto(false);
  const estaNoForum = useLocation().pathname === "/forum";
  const [estadoSessao, setEstadoSessao] = useState(null);
  const sessaoVerificada = estadoSessao?.estaNoForum === estaNoForum;
  const usuario = sessaoVerificada ? estadoSessao.usuario : null;
  const verificandoUsuario = estaNoForum && !sessaoVerificada;
  const esconderCabecalho = estaNoForum && !verificandoUsuario && !!usuario;

  useEffect(() => {
    return observarUsuario((usuarioAtual) => {
      setEstadoSessao({ estaNoForum, usuario: usuarioAtual });
    }, estaNoForum ? "cliente" : null);
  }, [estaNoForum]);

  return (
    <>
      {!esconderCabecalho && (
        <header>
          <Link to="/">
            <img src="/logo.svg" alt="Logo do KidJourney" />
          </Link>

          <nav>
            <LinksDoMenu usuario={usuario} />
          </nav>

          <button
            id="hamburguer"
            type="button"
            onClick={() => setMenuAberto(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </header>
      )}
      {!esconderCabecalho && menuAberto && (
        <div id="menu">
          <div>
            <Link to="/" onClick={fecharMenu}>
              <img src="/logo.svg" alt="Logo do KidJourney" />
            </Link>
            <button id="fechar-menu" type="button" onClick={fecharMenu}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <hr />

          <nav>
            <LinksDoMenu aoClicar={fecharMenu} usuario={usuario} />
          </nav>
        </div>
      )}

      <main className={esconderCabecalho ? "sem-header" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/parceiros/entrar" element={<EntrarParceiro />} />
          <Route
            path="/fale-conosco"
            element={<Navigate to="/parceiros" replace />}
          />
          <Route
            path="/cadastro"
            element={<Navigate to="/parceiros" replace />}
          />
          <Route
            path="/politica-de-seguranca"
            element={<PoliticaSeguranca />}
          />
          <Route path="/forum" element={<Forum />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        </Routes>
      </main>

      <footer>
        <div>
          <Link to="/">
            <img src="/logo.svg" alt="Logo do KidJourney" />
          </Link>
          <p>Mais confiança para cuidar, mais saúde para crescer.</p>

          <ul>
            <li>
              <a
                href="https://www.instagram.com/kid_journey7/"
                target="_blank"
                rel="noreferrer"
                title="@kid_journey7"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/kid-journey-7784bb42b/"
                target="_blank"
                rel="noreferrer"
                title="Kid Journey"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UC4-t3PTB4bUpeRWDEZHvk7Q"
                target="_blank"
                rel="noreferrer"
                title="@KidJourney7"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>
        </div>

        <hr id="footerHr" />

        <nav>
          <LinksDoMenu mostrarPolitica usuario={usuario} />
        </nav>
      </footer>
    </>
  );
}

export default App;

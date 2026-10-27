import { useEffect, useState } from "react";
import { Link } from "react-router";
import { entrarUsuario, observarUsuario, sairUsuario } from "../../auth";
import "./Forum.css";

function Forum() {
  const [usuario, setUsuario] = useState(null);
  const [verificando, setVerificando] = useState(true);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    return observarUsuario((usuarioAtual, erro) => {
      setUsuario(usuarioAtual);
      setVerificando(false);
      if (erro) {
        setTipoMensagem("erro");
        setMensagem(erro.message);
      }
    }, "cliente");
  }, []);

  async function fazerLogin(evento) {
    evento.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      await entrarUsuario(email.trim(), senha, "cliente");
    } catch (erro) {
      const mensagens = {
        "auth/invalid-email": "Confira se o e-mail está escrito corretamente.",
        "auth/invalid-credential": "E-mail ou senha incorretos.",
        "auth/wrong-password": "E-mail ou senha incorretos.",
        "auth/user-not-found": "Não existe uma conta com esse e-mail.",
        "auth/role-not-allowed":
          "Esta conta não tem perfil de cliente para acessar o Fórum.",
        "auth/too-many-requests":
          "Muitas tentativas. Tente novamente mais tarde.",
      };

      setTipoMensagem("erro");
      setMensagem(
        mensagens[erro.code] || "Não foi possível entrar na conta agora.",
      );
    } finally {
      setCarregando(false);
    }
  }

  async function sair() {
    await sairUsuario();
    setMensagem("");
  }

  if (verificando) {
    return (
      <section className="forum-page">
        <div className="forum-caixa">
          <p>Verificando sua conta...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="forum-page">
      <div className="forum-caixa">
        <span className="forum-icone" aria-hidden="true">
          <i
            className={usuario ? "fa-solid fa-comments" : "fa-solid fa-lock"}
          ></i>
        </span>

        {usuario ? (
          <>
            <h1>Fórum KidJourney</h1>
            <p>
              Você está conectado como <strong>{usuario.email}</strong>.
            </p>
            <p>O conteúdo do fórum ainda está em desenvolvimento.</p>
            <button className="forum-botao" type="button" onClick={sair}>
              Sair da conta
            </button>
          </>
        ) : (
          <>
            <h1>Entre para acessar o fórum</h1>
            <p>Faça login na sua conta para entrar no fórum.</p>

            <form className="forum-formulario" onSubmit={fazerLogin}>
              <div>
                <label htmlFor="forum-email">
                  E-mail{" "}
                  <span className="campo-obrigatorio" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="forum-email"
                  type="email"
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  placeholder="Seu e-mail"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="forum-senha">
                  Senha{" "}
                  <span className="campo-obrigatorio" aria-hidden="true">
                    *
                  </span>
                </label>
                <div className="forum-senha-campo">
                  <input
                    id="forum-senha"
                    type={senhaVisivel ? "text" : "password"}
                    value={senha}
                    onChange={(evento) => setSenha(evento.target.value)}
                    placeholder="Sua senha"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    className="forum-mostrar-senha"
                    type="button"
                    onClick={() => setSenhaVisivel(!senhaVisivel)}
                    aria-label={
                      senhaVisivel ? "Ocultar senha" : "Mostrar senha"
                    }
                    title={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                  >
                    <span className="material-icons">
                      {senhaVisivel ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
                <Link className="forum-esqueceu-senha" to="/redefinir-senha">
                  Esqueceu a senha?
                </Link>
              </div>

              {mensagem && (
                <p
                  className="forum-mensagem"
                  data-tipo={tipoMensagem}
                  role="status"
                  aria-live="polite"
                >
                  {mensagem}
                </p>
              )}

              <button
                className="forum-botao"
                type="submit"
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <p className="forum-cadastro">
              Ainda não tem uma conta?{" "}
              <Link to="/#cadastro">Cadastre-se</Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default Forum;

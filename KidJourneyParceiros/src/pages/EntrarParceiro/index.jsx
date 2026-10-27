import { useEffect, useState } from "react";
import { Link } from "react-router";
import { entrarUsuario, observarUsuario, sairUsuario } from "../../auth";
import "./EntrarParceiro.css";

function EntrarParceiro() {
  const [usuario, setUsuario] = useState(null);
  const [verificando, setVerificando] = useState(true);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    return observarUsuario((usuarioAtual, erro) => {
      setUsuario(usuarioAtual);
      setVerificando(false);
      if (erro)
        setMensagem("Esta conta não está cadastrada como parceira aprovada.");
    }, "parceiro");
  }, []);

  async function entrar(evento) {
    evento.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      await entrarUsuario(email.trim(), senha, "parceiro");
    } catch (erro) {
      const mensagens = {
        "auth/invalid-email": "Confira se o e-mail está escrito corretamente.",
        "auth/invalid-credential": "E-mail ou senha incorretos.",
        "auth/wrong-password": "E-mail ou senha incorretos.",
        "auth/user-not-found": "Não encontramos uma conta com esse e-mail.",
        "auth/role-not-allowed":
          "Esta conta não está cadastrada como parceira aprovada.",
        "auth/too-many-requests":
          "Muitas tentativas. Tente novamente mais tarde.",
      };

      setMensagem(
        mensagens[erro.code] || "Não foi possível entrar na plataforma agora.",
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
      <section className="entrar-parceiro-page">
        <div className="entrar-parceiro-caixa">
          <p>Verificando sua conta...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="entrar-parceiro-page">
      <div className="entrar-parceiro-caixa">
        <span className="entrar-parceiro-icone" aria-hidden="true">
          <i
            className={usuario ? "fa-solid fa-user-check" : "fa-solid fa-lock"}
          ></i>
        </span>

        {usuario ? (
          <>
            <h1>Área do parceiro</h1>
            <p>
              Você entrou como <strong>{usuario.email}</strong>.
            </p>
            <p>
              A área para publicar recomendações e divulgar serviços está em
              desenvolvimento.
            </p>
            <button
              className="entrar-parceiro-botao"
              type="button"
              onClick={sair}
            >
              Sair da conta
            </button>
          </>
        ) : (
          <>
            <h1>Entrar na plataforma</h1>
            <p>
              Use o e-mail e a senha enviados pela equipe KidJourney, ou se já é
              parceiro a algum tempo, entre com suas credenciais.
            </p>

            <form className="entrar-parceiro-formulario" onSubmit={entrar}>
              <div>
                <label htmlFor="parceiro-login-email">
                  E-mail{" "}
                  <span className="campo-obrigatorio" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="parceiro-login-email"
                  type="email"
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  placeholder="Seu e-mail"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="parceiro-login-senha">
                  Senha{" "}
                  <span className="campo-obrigatorio" aria-hidden="true">
                    *
                  </span>
                </label>
                <div className="entrar-parceiro-senha">
                  <input
                    id="parceiro-login-senha"
                    type={senhaVisivel ? "text" : "password"}
                    value={senha}
                    onChange={(evento) => setSenha(evento.target.value)}
                    placeholder="Sua senha"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    className="entrar-parceiro-mostrar-senha"
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
                <Link
                  className="entrar-parceiro-esqueceu"
                  to="/redefinir-senha?origem=parceiros"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              {mensagem && (
                <p
                  className="entrar-parceiro-mensagem"
                  role="alert"
                  aria-live="polite"
                >
                  {mensagem}
                </p>
              )}

              <button
                className="entrar-parceiro-botao"
                type="submit"
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </>
        )}

      </div>
    </section>
  );
}

export default EntrarParceiro;

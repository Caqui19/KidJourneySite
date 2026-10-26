import { useState } from "react";
import { Link } from "react-router";
import { cadastrarUsuario } from "../auth";
import "./ClientSignupForm.css";

function ClientSignupForm() {
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  async function cadastrar(evento) {
    evento.preventDefault();

    const formulario = evento.currentTarget;
    const dados = new FormData(formulario);
    const nome = dados.get("nome").trim();
    const email = dados.get("email").trim();
    const senha = dados.get("senha");
    const politicaAceita = dados.get("politicaSeguranca") === "on";

    setMensagem("");
    setCarregando(true);

    try {
      await cadastrarUsuario({ nome, email, senha, politicaAceita });

      formulario.reset();
      setTipoMensagem("sucesso");
      setMensagem("Cadastro realizado! Agora você pode entrar no app.");
    } catch (erro) {
      const mensagens = {
        "auth/email-already-in-use":
          "Esse e-mail já está cadastrado. Entre na sua conta.",
        "auth/invalid-email": "Confira se o e-mail está escrito corretamente.",
        "auth/weak-password": "A senha precisa ter pelo menos 8 caracteres.",
        "terms/not-accepted":
          "Aceite a Política de Segurança para criar sua conta.",
      };

      setTipoMensagem("erro");
      setMensagem(
        mensagens[erro.code] || "Não foi possível concluir o cadastro agora.",
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form id="cliente-cadastro-form" onSubmit={cadastrar}>
      <div className="inputContainer">
        <label htmlFor="cliente-nome">
          Nome{" "}
          <span className="campo-obrigatorio" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="cliente-nome"
          name="nome"
          type="text"
          placeholder="Nome"
          required
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="cliente-email">
          E-mail{" "}
          <span className="campo-obrigatorio" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="cliente-email"
          name="email"
          type="email"
          placeholder="Endereço de e-mail"
          required
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="cliente-senha">
          Senha{" "}
          <span className="campo-obrigatorio" aria-hidden="true">
            *
          </span>
        </label>
        <div className="senha-campo">
          <input
            id="cliente-senha"
            name="senha"
            type={senhaVisivel ? "text" : "password"}
            minLength="8"
            placeholder="Senha"
            required
          />
          <button
            className="mostrar-senha"
            type="button"
            onClick={() => setSenhaVisivel(!senhaVisivel)}
            aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
            title={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
          >
            <span className="material-icons">
              {senhaVisivel ? "visibility" : "visibility_off"}
            </span>
          </button>
        </div>
      </div>

      <div className="inputContainer">
        <div className="termoContainer">
          <input
            id="cliente-politica-seguranca"
            type="checkbox"
            name="politicaSeguranca"
            required
          />
          <label htmlFor="cliente-politica-seguranca">Li e aceito a </label>
          <Link to="/politica-de-seguranca">Política de Segurança</Link>
          <span className="campo-obrigatorio" aria-hidden="true">
            *
          </span>
        </div>
      </div>

      {mensagem && (
        <p
          className="cadastroMensagem"
          data-tipo={tipoMensagem}
          role="status"
          aria-live="polite"
        >
          {mensagem}
        </p>
      )}
      <button className="submit" type="submit" disabled={carregando}>
        {carregando ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}

export default ClientSignupForm;

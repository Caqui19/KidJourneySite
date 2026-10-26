import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { redefinirSenha } from "../../auth";
import "./RedefinirSenha.css";

function RedefinirSenha() {
  const [parametros] = useSearchParams();
  const veioDosParceiros = parametros.get("origem") === "parceiros";
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviarLink(evento) {
    evento.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      await redefinirSenha(email.trim());
      setTipoMensagem("sucesso");
      setMensagem("Se houver uma conta com esse e-mail, enviaremos o link para redefinir a senha.");
    } catch (erro) {
      const mensagens = {
        "auth/invalid-email": "Confira se o e-mail está escrito corretamente.",
        "auth/user-not-found": "Não encontramos uma conta com esse e-mail.",
      };

      setTipoMensagem("erro");
      setMensagem(mensagens[erro.code] || "Não foi possível enviar o link agora.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="redefinir-page">
      <div className="redefinir-caixa">
        <span className="redefinir-icone" aria-hidden="true">
          <i className="fa-solid fa-lock"></i>
        </span>
        <h1>Redefinir senha</h1>
        <p>
          Informe o e-mail da sua conta. Vamos enviar um link para você criar
          uma nova senha.
        </p>

        <form className="redefinir-formulario" onSubmit={enviarLink}>
          <div>
            <label htmlFor="redefinir-email">
              E-mail <span className="campo-obrigatorio" aria-hidden="true">*</span>
            </label>
            <input
              id="redefinir-email"
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              placeholder="Seu e-mail"
              autoComplete="email"
              required
            />
          </div>

          {mensagem && (
            <p
              className="redefinir-mensagem"
              data-tipo={tipoMensagem}
              role="status"
              aria-live="polite"
            >
              {mensagem}
            </p>
          )}

          <button className="redefinir-botao" type="submit" disabled={carregando}>
            {carregando ? "Enviando..." : "Enviar link"}
          </button>
        </form>

        <Link className="redefinir-voltar" to={veioDosParceiros ? "/parceiros/entrar" : "/forum"}>
          {veioDosParceiros ? "Voltar para a plataforma" : "Voltar para o login"}
        </Link>
      </div>
    </section>
  );
}

export default RedefinirSenha;


import { useState } from "react";
import { Link } from "react-router";
import { ativarPremium, entrarUsuario } from "../../auth";
import "./Premium.css";

const beneficios = [
  {
    icone: "fa-solid fa-utensils",
    titulo: "Registros de alimentação",
    texto:
      "Anote as refeições e os horários para acompanhar melhor a rotina alimentar da criança.",
  },
  {
    icone: "fa-solid fa-moon",
    titulo: "Registros de sono",
    texto:
      "Registre quando a criança dorme e acorda e acompanhe o tempo de descanso ao longo do dia.",
  },
  {
    icone: "fa-solid fa-calendar-days",
    titulo: "Relatório diário",
    texto:
      "Veja uma comparação visual dos registros com referências do app e confira sugestões para a rotina.",
  },
];

function Premium() {
  const [etapa, setEtapa] = useState("plano");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(evento) {
    evento.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      const usuarioAtual = await entrarUsuario(email.trim(), senha, "cliente");
      setUsuario(usuarioAtual);
      setEtapa("pagamento");
    } catch (erro) {
      const mensagens = {
        "auth/invalid-email": "Confira se o e-mail está escrito corretamente.",
        "auth/invalid-credential": "E-mail ou senha incorretos.",
        "auth/wrong-password": "E-mail ou senha incorretos.",
        "auth/user-not-found": "Não encontramos uma conta com esse e-mail.",
        "auth/role-not-allowed": "Entre com uma conta de cliente do KidJourney.",
        "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
      };

      setMensagem(mensagens[erro.code] || "Não foi possível entrar na sua conta.");
    } finally {
      setCarregando(false);
    }
  }

  async function confirmarPagamento() {
    if (!usuario) {
      setMensagem("Entre na sua conta para continuar.");
      setEtapa("login");
      return;
    }

    setMensagem("");
    setCarregando(true);

    try {
      await ativarPremium(usuario);
      setEtapa("sucesso");
    } catch {
      setMensagem(
        "Não foi possível atualizar sua conta. Confira as permissões do Firestore.",
      );
    } finally {
      setCarregando(false);
    }
  }

  if (etapa === "login") {
    return (
      <section className="premium-page premium-etapa-page">
        <div className="premium-fluxo">
          <span className="premium-login-icone" aria-hidden="true">
            <i className="fa-solid fa-lock"></i>
          </span>
          <p className="premium-etiqueta">KIDJOURNEY PREMIUM</p>
          <h1>Entre na sua conta</h1>
          <p>Use o e-mail e a senha cadastrados no KidJourney.</p>

          <form className="premium-login" onSubmit={entrar}>
            <div>
              <label htmlFor="premium-email">
                E-mail <span className="campo-obrigatorio" aria-hidden="true">*</span>
              </label>
              <input
                id="premium-email"
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="Seu e-mail"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label htmlFor="premium-senha">
                Senha <span className="campo-obrigatorio" aria-hidden="true">*</span>
              </label>
              <div className="premium-senha-campo">
                <input
                  id="premium-senha"
                  type={senhaVisivel ? "text" : "password"}
                  value={senha}
                  onChange={(evento) => setSenha(evento.target.value)}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  required
                />
                <button
                  className="premium-mostrar-senha"
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
              <Link
                className="premium-esqueceu-senha"
                to="/redefinir-senha"
              >
                Esqueceu a senha?
              </Link>
            </div>
            {mensagem && (
              <p className="premium-mensagem" role="alert">
                {mensagem}
              </p>
            )}
            <button className="premium-botao" type="submit" disabled={carregando}>
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <button
            className="premium-voltar"
            type="button"
            onClick={() => setEtapa("plano")}
          >
            Voltar ao plano
          </button>
        </div>
      </section>
    );
  }

  if (etapa === "pagamento") {
    return (
      <section className="premium-page premium-etapa-page">
        <div className="premium-fluxo premium-fluxo-pagamento">
          <p className="premium-etiqueta">KIDJOURNEY PREMIUM</p>
          <h1>Pagamento via Pix</h1>
          <p>Plano mensal · R$ 14,90</p>
          <p className="premium-conta-atual">
            Conta: <strong>{usuario?.displayName || usuario?.email}</strong>
          </p>
          <p>Toque no QR Code para concluir a contratação.</p>
          <button
            className="premium-qr-botao"
            type="button"
            onClick={confirmarPagamento}
            disabled={carregando}
            aria-label="Confirmar pagamento via Pix"
          >
            <img src="/qrcode.png" alt="" />
          </button>
          {mensagem && (
            <p className="premium-mensagem" role="alert">
              {mensagem}
            </p>
          )}
          <button
            className="premium-voltar"
            type="button"
            onClick={() => setEtapa("login")}
          >
            Voltar ao login
          </button>
        </div>
      </section>
    );
  }

  if (etapa === "sucesso") {
    const nomeUsuario = usuario?.displayName || usuario?.email;

    return (
      <section className="premium-page premium-etapa-page">
        <div className="premium-fluxo premium-fluxo-sucesso">
          <span className="premium-sucesso-icone" aria-hidden="true">
            <i className="fa-solid fa-check"></i>
          </span>
          <p className="premium-etiqueta">KIDJOURNEY PREMIUM</p>
          <h1>Assinatura ativada</h1>
          <p>
            {nomeUsuario}, sua conta agora é Premium.
          </p>
          <p className="premium-sucesso-status">Premium: ativo</p>
          <Link className="premium-botao" to="/">
            Voltar ao início
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="premium-page">
      <div className="premium-conteudo">
        <div className="premium-apresentacao">
          <div className="premium-texto">
            <p className="premium-etiqueta">KIDJOURNEY PREMIUM</p>
            <h1>
              Acompanhe a rotina de alimentação e sono da sua criança na palma
              da sua mão.
            </h1>
            <p className="premium-descricao">
              Registre alimentação e sono e veja um relatório diário com
              informações adaptadas à idade e às especificidades da criança.
            </p>
            <a className="premium-botao" href="#premium-recursos">
              Conheça os benefícios
            </a>
          </div>
        </div>

        <section className="premium-recursos" id="premium-recursos">
          <div className="premium-titulo-secao">
            <p className="premium-etiqueta">O QUE VOCÊ ENCONTRA</p>
            <h2>Recursos para acompanhar cada dia</h2>
            <p>
              Os registros ajudam a visualizar a rotina e a entender melhor os
              cuidados de cada criança.
            </p>
          </div>

          <div className="premium-lista">
            {beneficios.map((beneficio) => (
              <article className="premium-card" key={beneficio.titulo}>
                <span className="premium-card-icone" aria-hidden="true">
                  <i className={beneficio.icone}></i>
                </span>
                <h3>{beneficio.titulo}</h3>
                <p>{beneficio.texto}</p>
              </article>
            ))}
          </div>
          <p className="premium-nota">
            O relatório considera a idade e as especificidades cadastradas da
            criança.
          </p>
        </section>

        <section className="premium-valor" id="premium-valor">
          <div>
            <p className="premium-etiqueta">PLANO MENSAL</p>
            <h2>KidJourney Premium</h2>
            <p>
              Registros de alimentação e sono com acompanhamento diário da
              rotina da criança.
            </p>
          </div>

          <div className="premium-preco">
            <p>
              <strong>R$ 14,90</strong>
              <span>/ mês</span>
            </p>
          </div>

          <div className="premium-acao">
            <button
              className="premium-botao"
              type="button"
              onClick={() => setEtapa("login")}
            >
              Torne-se Premium
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Premium;

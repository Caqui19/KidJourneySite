import { useEffect, useRef, useState } from "react";
import { updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import "./PainelParceiro.css";

const opcoesEspecificidade = [
  "Alergia à Proteína do Leite de Vaca (APLV)",
  "Alergia a ovo",
  "Alergia a soja",
  "Alergia a trigo",
  "Alergia a amendoim ou castanhas",
  "Alergia a peixes ou frutos do mar",
  "Alergia a outro alimento",
  "Intolerância à lactose",
  "Intolerância à frutose",
  "Doença celíaca",
  "Diabetes tipo 1",
  "Refluxo gastroesofágico",
  "Constipação crônica",
  "Outra condição com dieta orientada por profissional",
  "Seletividade alimentar",
  "Neofobia alimentar",
  "Dificuldade de mastigação",
  "Dificuldade de deglutição",
  "Reflexo de gag sensível",
  "Introdução alimentar",
  "Dificuldade para comer durante a dentição",
  "Vegetarianismo",
  "Veganismo",
  "Evita açúcar adicionado",
];

function novaPublicacao(tipo = "recomendacao") {
  return {
    tipo,
    titulo: "",
    categoria: tipo === "publicidade" ? "Produto" : "Alimentação",
    faixaEtaria: "Início: 0 a 5 meses",
    etapa: "Todas as etapas",
    especificidades: [],
    texto: "",
    status: "Rascunho",
    link: "",
  };
}

function prepararDadosFormulario(publicacao) {
  return {
    tipo: publicacao.tipo,
    titulo: publicacao.titulo,
    categoria: publicacao.categoria,
    faixaEtaria: publicacao.faixaEtaria,
    etapa: publicacao.etapa,
    especificidades: publicacao.especificidades || [],
    texto: publicacao.texto,
    status: publicacao.status,
    link: publicacao.link || "",
  };
}

function rotuloTipo(tipo) {
  return tipo === "publicidade" ? "Publicidade" : "Recomendação";
}

function formatarDataHora(data) {
  if (!data) return "Ainda não publicada";

  const dataPublicacao = data.toDate ? data.toDate() : new Date(data);
  const dataFormatada = dataPublicacao.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const horaFormatada = dataPublicacao.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${dataFormatada} às ${horaFormatada}`;
}

function DescricaoPublicacao({ texto }) {
  const [expandida, setExpandida] = useState(false);
  const [temMais, setTemMais] = useState(false);
  const textoMedicao = useRef(null);

  useEffect(() => {
    const elemento = textoMedicao.current;
    if (!elemento) return;

    const observador = new ResizeObserver(() => {
      setTemMais(elemento.scrollHeight > elemento.clientHeight + 1);
    });

    observador.observe(elemento);
    return () => observador.disconnect();
  }, [texto]);

  return (
    <div className="painel-descricao-publicacao">
      <p className="painel-descricao-medicao" ref={textoMedicao} aria-hidden="true">
        {texto}
      </p>
      <p
        className={`painel-publicacao-texto ${expandida ? "expandida" : ""}`}
      >
        {texto}
      </p>
      {temMais && (
        <button
          className="painel-ler-mais"
          type="button"
          aria-expanded={expandida}
          onClick={() => setExpandida(!expandida)}
        >
          {expandida ? "Ler menos" : "Ler mais"}
        </button>
      )}
    </div>
  );
}

function FormularioPublicacao({ publicacao, aoFechar, aoSalvar }) {
  const [dados, setDados] = useState(
    publicacao ? prepararDadosFormulario(publicacao) : novaPublicacao(),
  );
  const [mensagemErro, setMensagemErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  function atualizar(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  function alternarEspecificidade(especificidade) {
    const jaSelecionada = dados.especificidades.includes(especificidade);
    const especificidades = jaSelecionada
      ? dados.especificidades.filter((item) => item !== especificidade)
      : [...dados.especificidades, especificidade];

    atualizar("especificidades", especificidades);
  }

  async function enviar(evento) {
    evento.preventDefault();
    setMensagemErro("");
    setSalvando(true);

    try {
      await aoSalvar(dados);
    } catch (erro) {
      console.error("Erro ao salvar publicação:", erro);
      setMensagemErro("Não foi possível salvar a publicação. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="painel-modal-fundo" onMouseDown={aoFechar}>
      <section
        className="painel-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="painel-modal-titulo"
        onMouseDown={(evento) => evento.stopPropagation()}
      >
        <div className="painel-modal-topo">
          <div>
            <h2 id="painel-modal-titulo">
              {publicacao ? "Editar publicação" : "Criar publicação"}
            </h2>
          </div>
          <button
            className="painel-fechar"
            type="button"
            onClick={aoFechar}
            aria-label="Fechar formulário"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form className="painel-formulario" onSubmit={enviar}>
          <label>
            Tipo de publicação
            <select
              value={dados.tipo}
              onChange={(evento) => {
                const tipo = evento.target.value;
                setDados((atual) => ({
                  ...atual,
                  tipo,
                  categoria: tipo === "publicidade" ? "Produto" : "Alimentação",
                }));
              }}
            >
              <option value="recomendacao">Recomendação</option>
              <option value="publicidade">Publicidade</option>
            </select>
          </label>

          <label>
            Título
            <input
              value={dados.titulo}
              onChange={(evento) => atualizar("titulo", evento.target.value)}
              placeholder="Dê um título para a publicação"
              required
            />
          </label>

          <div className="painel-campos-duplos">
            <label>
              Categoria
              <select
                value={dados.categoria}
                onChange={(evento) =>
                  atualizar("categoria", evento.target.value)
                }
              >
                <option>Alimentação</option>
                <option>Desenvolvimento</option>
                <option>Saúde</option>
                <option>Produto</option>
                <option>Serviço</option>
              </select>
            </label>
            <label>
              Faixa etária
              <select
                value={dados.faixaEtaria}
                onChange={(evento) =>
                  atualizar("faixaEtaria", evento.target.value)
                }
              >
                <option>Início: 0 a 5 meses</option>
                <option>Introdução alimentar: 6 a 8 meses</option>
                <option>Ampliação alimentar: 9 a 11 meses</option>
                <option>Transição para a comida da família: 1 a 2 anos</option>
                <option>Autonomia: 2 a 3 anos</option>
                <option>Pré-escolar: 3 a 5 anos</option>
              </select>
            </label>
          </div>

          <label>
            Etapa
            <select
              value={dados.etapa}
              onChange={(evento) => atualizar("etapa", evento.target.value)}
            >
              <option>Todas as etapas</option>
              <option>Primeiros passos</option>
              <option>Alimentação complementar</option>
              <option>Desenvolvimento infantil</option>
            </select>
          </label>

          <fieldset className="painel-especificidades">
            <legend>Especificidades atendidas</legend>
            <p>Se não marcar nenhuma, a publicação será geral.</p>
            <div>
              {opcoesEspecificidade.map((especificidade) => (
                <label key={especificidade}>
                  <input
                    type="checkbox"
                    checked={dados.especificidades.includes(especificidade)}
                    onChange={() => alternarEspecificidade(especificidade)}
                  />
                  {especificidade}
                </label>
              ))}
            </div>
          </fieldset>

          <label>
            Descrição
            <textarea
              value={dados.texto}
              onChange={(evento) => atualizar("texto", evento.target.value)}
              placeholder="Escreva o conteúdo da publicação"
              rows="4"
              required
            />
          </label>

          {dados.tipo === "publicidade" && (
            <label>
              Link do produto ou serviço
              <input
                type="url"
                value={dados.link}
                onChange={(evento) => atualizar("link", evento.target.value)}
                placeholder="https://"
              />
              <small className="painel-aviso-link">
                Tenha responsabilidade ao divulgar e confira o link e as
                informações antes de publicar.
              </small>
            </label>
          )}

          <label>
            Situação
            <select
              value={dados.status}
              onChange={(evento) => atualizar("status", evento.target.value)}
            >
              <option>Rascunho</option>
              <option>Publicado</option>
            </select>
          </label>

          {mensagemErro && (
            <p className="painel-erro" role="alert">
              {mensagemErro}
            </p>
          )}

          <div className="painel-modal-acoes">
            <button
              className="painel-botao-secundario"
              type="button"
              onClick={aoFechar}
            >
              Cancelar
            </button>
            <button className="painel-botao" type="submit" disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar publicação"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function DetalhesPublicacao({ publicacao, profissaoAutor, aoFechar }) {
  return (
    <div className="painel-modal-fundo" onMouseDown={aoFechar}>
      <section
        className="painel-modal painel-modal-detalhes"
        role="dialog"
        aria-modal="true"
        aria-labelledby="painel-detalhes-titulo"
        onMouseDown={(evento) => evento.stopPropagation()}
      >
        <div className="painel-modal-topo">
          <div>
            <p className="painel-etiqueta">{rotuloTipo(publicacao.tipo)}</p>
            <h2 id="painel-detalhes-titulo">{publicacao.titulo}</h2>
          </div>
          <button
            className="painel-fechar"
            type="button"
            onClick={aoFechar}
            aria-label="Fechar detalhes"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="painel-detalhes-corpo">
          <p>{publicacao.texto}</p>
          <div className="painel-detalhes-meta">
            <span>{publicacao.categoria}</span>
            <span>{publicacao.faixaEtaria}</span>
            <span>{publicacao.etapa}</span>
            <span>
              <i className="fa-solid fa-calendar-days"></i>
              {publicacao.dataPublicacao
                ? `Publicada em ${formatarDataHora(publicacao.dataPublicacao)}`
                : "Ainda não publicada"}
            </span>
            <span>
              <i className="fa-solid fa-user-doctor"></i>
              {publicacao.autorNome} • {profissaoAutor}
            </span>
          </div>
          <div className="painel-tags">
            {publicacao.especificidades.length ? (
              publicacao.especificidades.map((item) => (
                <span key={item}>{item}</span>
              ))
            ) : (
              <span>Todas as crianças</span>
            )}
          </div>
          {publicacao.link && (
            <a
              href={publicacao.link}
              target="_blank"
              rel="noreferrer"
              title={publicacao.link}
            >
              {publicacao.link}
            </a>
          )}
        </div>
        <div className="painel-modal-acoes">
          <button className="painel-botao" type="button" onClick={aoFechar}>
            Fechar
          </button>
        </div>
      </section>
    </div>
  );
}

function ConfirmarExclusao({ publicacao, aoFechar, aoExcluir }) {
  const [mensagemErro, setMensagemErro] = useState("");
  const [excluindo, setExcluindo] = useState(false);

  async function excluir() {
    setMensagemErro("");
    setExcluindo(true);

    try {
      await aoExcluir();
    } catch (erro) {
      console.error("Erro ao excluir publicação:", erro);
      setMensagemErro("Não foi possível excluir a publicação. Tente novamente.");
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <div className="painel-modal-fundo" onMouseDown={aoFechar}>
      <section
        className="painel-modal painel-modal-exclusao"
        role="dialog"
        aria-modal="true"
        aria-labelledby="painel-exclusao-titulo"
        onMouseDown={(evento) => evento.stopPropagation()}
      >
        <h2 id="painel-exclusao-titulo">Excluir publicação?</h2>
        <p>
          <span className="painel-titulo-exclusao">
            “{publicacao.titulo}”
          </span>
        </p>
        {mensagemErro && (
          <p className="painel-erro" role="alert">
            {mensagemErro}
          </p>
        )}
        <div className="painel-modal-acoes">
          <button
            className="painel-botao-secundario"
            type="button"
            onClick={aoFechar}
          >
            Cancelar
          </button>
          <button
            className="painel-botao-perigo"
            type="button"
            onClick={excluir}
            disabled={excluindo}
          >
            {excluindo ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </section>
    </div>
  );
}

function PainelParceiro({ usuario, aoSair }) {
  const [publicacoes, setPublicacoes] = useState([]);
  const [carregandoPublicacoes, setCarregandoPublicacoes] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState("");
  const [erroAcao, setErroAcao] = useState("");
  const [perfilParceiro, setPerfilParceiro] = useState(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [salvandoNome, setSalvandoNome] = useState(false);
  const [erroNome, setErroNome] = useState("");
  const [publicandoId, setPublicandoId] = useState("");
  const [aba, setAba] = useState("todas");
  const [busca, setBusca] = useState("");
  const [filtroEspecificidade, setFiltroEspecificidade] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todas");
  const [modal, setModal] = useState("");
  const [selecionada, setSelecionada] = useState(null);

  const nomeAutor =
    perfilParceiro?.nome ||
    usuario.displayName ||
    usuario.email?.split("@")[0] ||
    "Parceiro";
  const profissaoAutor = perfilParceiro?.profissao || "Profissional parceiro";

  useEffect(() => {
    const consulta = query(
      collection(db, "publicacoes"),
      where("autorId", "==", usuario.uid),
    );

    return onSnapshot(
      consulta,
      (resultado) => {
        const publicacoesRecebidas = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));

        publicacoesRecebidas.sort(
          (a, b) =>
            (b.atualizadoEm?.toMillis?.() || 0) -
            (a.atualizadoEm?.toMillis?.() || 0),
        );

        setPublicacoes(publicacoesRecebidas);
        setCarregandoPublicacoes(false);
        setErroCarregamento("");
      },
      (erro) => {
        console.error("Erro ao carregar publicações:", erro);
        setErroCarregamento(
          "Não foi possível carregar suas publicações. Tente novamente mais tarde.",
        );
        setCarregandoPublicacoes(false);
      },
    );
  }, [usuario.uid]);

  useEffect(() => {
    let componenteAtivo = true;

    getDoc(doc(db, "usuarios", usuario.uid))
      .then((documento) => {
        if (componenteAtivo) {
          setPerfilParceiro(documento.exists() ? documento.data() : {});
        }
      })
      .catch((erro) => {
        console.error("Erro ao carregar perfil do parceiro:", erro);
        if (componenteAtivo) setPerfilParceiro({});
      });

    return () => {
      componenteAtivo = false;
    };
  }, [usuario.uid]);

  function abrirEdicaoNome() {
    setNomeEditado(nomeAutor);
    setErroNome("");
    setModal("nome");
  }

  async function salvarNome(evento) {
    evento.preventDefault();

    const nome = nomeEditado.trim();
    if (!nome) {
      setErroNome("Informe seu nome.");
      return;
    }

    setSalvandoNome(true);
    setErroNome("");

    try {
      await updateDoc(doc(db, "usuarios", usuario.uid), { nome });
      setPerfilParceiro((atual) => ({ ...atual, nome }));
      await updateProfile(usuario, { displayName: nome }).catch((erro) => {
        console.warn("O nome foi salvo, mas não sincronizado com o perfil de acesso.", erro);
      });
      setModal("");
    } catch (erro) {
      console.error("Erro ao atualizar o nome do parceiro:", erro);
      setErroNome("Não foi possível atualizar seu nome. Tente novamente.");
    } finally {
      setSalvandoNome(false);
    }
  }

  const publicacoesFiltradas = publicacoes.filter((publicacao) => {
    const combinaAba = aba === "todas" || publicacao.tipo === aba;
    const combinaBusca =
      (publicacao.titulo || "").toLowerCase().includes(busca.toLowerCase()) ||
      (publicacao.categoria || "").toLowerCase().includes(busca.toLowerCase()) ||
      (publicacao.texto || "").toLowerCase().includes(busca.toLowerCase());
    const combinaEspecificidade =
      !filtroEspecificidade ||
      !publicacao.especificidades?.length ||
      publicacao.especificidades.includes(filtroEspecificidade);
    const combinaStatus =
      filtroStatus === "todas" || publicacao.status === filtroStatus;

    return combinaAba && combinaBusca && combinaEspecificidade && combinaStatus;
  });

  function abrirFormulario(publicacao = null) {
    setSelecionada(publicacao);
    setModal("formulario");
  }

  async function salvarPublicacao(dados) {
    setErroAcao("");

    const publicacaoSalva = {
      ...dados,
      autorId: usuario.uid,
      autorNome: nomeAutor,
      autorProfissao: profissaoAutor,
      dataPublicacao:
        dados.status === "Publicado"
          ? selecionada?.dataPublicacao || serverTimestamp()
          : null,
      atualizadoEm: serverTimestamp(),
    };

    if (selecionada) {
      await updateDoc(doc(db, "publicacoes", selecionada.id), publicacaoSalva);
    } else {
      await addDoc(collection(db, "publicacoes"), {
        ...publicacaoSalva,
        visualizacoes: 0,
        criadoEm: serverTimestamp(),
      });
    }

    setModal("");
    setSelecionada(null);
  }

  async function excluirPublicacao() {
    await deleteDoc(doc(db, "publicacoes", selecionada.id));
    setModal("");
    setSelecionada(null);
  }

  async function publicarPublicacao(publicacao) {
    setErroAcao("");
    setPublicandoId(publicacao.id);

    try {
      await updateDoc(doc(db, "publicacoes", publicacao.id), {
        status: "Publicado",
        dataPublicacao: publicacao.dataPublicacao || serverTimestamp(),
        atualizadoEm: serverTimestamp(),
      });
    } catch (erro) {
      console.error("Erro ao publicar conteúdo:", erro);
      setErroAcao("Não foi possível publicar o conteúdo. Tente novamente.");
    } finally {
      setPublicandoId("");
    }
  }

  function abrirCriacao() {
    setSelecionada(null);
    setModal("formulario");
  }

  return (
    <section className="painel-parceiro-page">
      <div className="painel-parceiro">
        <div className="painel-cabecalho">
          <div>
            <h1>Painel do parceiro</h1>
            <p className="painel-introducao">
              Organize suas recomendações e divulgações para as famílias.
            </p>
          </div>
          <div className="painel-conta">
            <span className="painel-avatar">
              <i className="fa-solid fa-user-doctor"></i>
            </span>
            <div className="painel-identificacao">
              <div className="painel-nome-linha">
                <strong className="painel-nome">{nomeAutor}</strong>
                <button
                  className="painel-editar-nome-link"
                  type="button"
                  onClick={abrirEdicaoNome}
                >
                  Editar nome
                </button>
              </div>
              <span className="painel-email">{usuario.email}</span>
            </div>
            <button
              className="painel-sair"
              type="button"
              onClick={aoSair}
              aria-label="Sair da conta"
              title="Sair da conta"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>

        <section className="painel-lista-container">
          <div className="painel-lista-topo">
            <div>
              <h2>Publicações</h2>
            </div>
            <button
              className="painel-botao"
              type="button"
              onClick={abrirCriacao}
            >
              <i className="fa-solid fa-plus"></i>
              Criar publicação
            </button>
          </div>

          {erroAcao && (
            <p className="painel-erro" role="alert">
              {erroAcao}
            </p>
          )}

          <div className="painel-filtros">
            <div
              className="painel-abas"
              role="tablist"
              aria-label="Tipo de publicação"
            >
              {[
                ["todas", "Todas"],
                ["recomendacao", "Recomendações"],
                ["publicidade", "Publicidades"],
              ].map(([valor, texto]) => (
                <button
                  key={valor}
                  className={aba === valor ? "selecionada" : ""}
                  type="button"
                  role="tab"
                  aria-selected={aba === valor}
                  onClick={() => setAba(valor)}
                >
                  {texto}
                </button>
              ))}
            </div>

            <div className="painel-filtros-campos">
              <label className="painel-busca">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  value={busca}
                  onChange={(evento) => setBusca(evento.target.value)}
                  placeholder="Buscar publicação"
                  aria-label="Buscar publicação"
                />
              </label>
              <select
                value={filtroEspecificidade}
                onChange={(evento) =>
                  setFiltroEspecificidade(evento.target.value)
                }
                aria-label="Filtrar por especificidade"
              >
                <option value="">Todas as especificidades</option>
                {opcoesEspecificidade.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <select
                value={filtroStatus}
                onChange={(evento) => setFiltroStatus(evento.target.value)}
                aria-label="Filtrar por situação"
              >
                <option value="todas">Todas as situações</option>
                <option>Publicado</option>
                <option>Rascunho</option>
              </select>
            </div>
          </div>

          {carregandoPublicacoes ? (
            <div className="painel-vazio">
              <p>Carregando publicações...</p>
            </div>
          ) : erroCarregamento ? (
            <div className="painel-vazio">
              <p className="painel-erro" role="alert">
                {erroCarregamento}
              </p>
            </div>
          ) : publicacoesFiltradas.length ? (
            <div className="painel-publicacoes">
              {publicacoesFiltradas.map((publicacao) => (
                <article className="painel-publicacao" key={publicacao.id}>
                  <div className="painel-publicacao-topo">
                    <div className="painel-publicacao-identificacao">
                      <span
                        className={`painel-tipo painel-tipo-${publicacao.tipo}`}
                      >
                        {rotuloTipo(publicacao.tipo)}
                      </span>
                      <span
                        className="painel-publicacao-separador"
                        aria-hidden="true"
                      >
                        &bull;
                      </span>
                      <span className="painel-status">
                        {publicacao.status === "Publicado" ? "Publicada" : "Rascunho"}
                      </span>
                    </div>
                    <button
                      className="painel-botao-publicar"
                      type="button"
                      disabled={
                        publicacao.status === "Publicado" ||
                        publicandoId === publicacao.id
                      }
                      onClick={() => publicarPublicacao(publicacao)}
                    >
                      {publicacao.status === "Publicado"
                        ? "Já Publicado"
                        : publicandoId === publicacao.id
                          ? "Publicando..."
                          : "Publicar"}
                    </button>
                  </div>
                  <h3>{publicacao.titulo}</h3>
                  <p className="painel-categoria">{publicacao.categoria}</p>
                  <DescricaoPublicacao texto={publicacao.texto} />
                  <div className="painel-publicacao-meta">
                    <span>
                      <i className="fa-solid fa-child"></i>
                      {publicacao.faixaEtaria}
                    </span>
                    <span>
                      <span className="material-icons">visibility</span>
                      {publicacao.visualizacoes} visualizações
                    </span>
                    <span>
                      <i className="fa-solid fa-calendar-days"></i>
                      {publicacao.dataPublicacao
                        ? `Publicada em ${formatarDataHora(publicacao.dataPublicacao)}`
                        : "Ainda não publicada"}
                    </span>
                    <span>
                      <i className="fa-solid fa-user-doctor"></i>
                      {publicacao.autorNome} • {profissaoAutor}
                    </span>
                  </div>
                  <div className="painel-tags">
                    {publicacao.especificidades?.length ? (
                      publicacao.especificidades.map((item) => (
                        <span key={item}>{item}</span>
                      ))
                    ) : (
                      <span>Todas as crianças</span>
                    )}
                  </div>
                  <div className="painel-acoes-publicacao">
                    <div className="painel-acoes-esquerda">
                      <button
                        type="button"
                        onClick={() => {
                          setSelecionada(publicacao);
                          setModal("visualizar");
                        }}
                      >
                        Visualizar
                      </button>
                    </div>
                    <div className="painel-acoes-direita">
                      <button
                        className="painel-acao-excluir"
                        type="button"
                        onClick={() => {
                          setSelecionada(publicacao);
                          setModal("excluir");
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i> Excluir
                      </button>
                      <button
                        type="button"
                        onClick={() => abrirFormulario(publicacao)}
                      >
                        <i className="fa-solid fa-pen"></i> Edição
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="painel-vazio">
              {publicacoes.length > 0 && (
                <span>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              )}
              <h3>
                {publicacoes.length
                  ? "Nenhuma publicação encontrada"
                  : "Você ainda não tem publicações"}
              </h3>
              <p>
                {publicacoes.length
                  ? "Altere os filtros ou crie uma nova publicação."
                  : "Suas publicações aparecerão aqui. Crie uma para começar."}
              </p>
            </div>
          )}
        </section>
      </div>

      {modal === "formulario" && (
        <FormularioPublicacao
          key={selecionada?.id || "nova-publicacao"}
          publicacao={selecionada}
          aoFechar={() => setModal("")}
          aoSalvar={salvarPublicacao}
        />
      )}
      {modal === "nome" && (
        <div
          className="painel-modal-fundo"
          onMouseDown={() => setModal("")}
        >
          <section
            className="painel-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="painel-editar-nome-titulo"
            onMouseDown={(evento) => evento.stopPropagation()}
          >
            <div className="painel-modal-topo">
              <h2 id="painel-editar-nome-titulo">Editar nome</h2>
              <button
                className="painel-fechar"
                type="button"
                onClick={() => setModal("")}
                aria-label="Fechar edição do nome"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form className="painel-formulario" onSubmit={salvarNome}>
              <label htmlFor="painel-nome-parceiro">Nome</label>
              <input
                id="painel-nome-parceiro"
                value={nomeEditado}
                onChange={(evento) => setNomeEditado(evento.target.value)}
                maxLength={80}
                autoFocus
                required
              />
              {erroNome && (
                <p className="painel-erro" role="alert">
                  {erroNome}
                </p>
              )}
              <div className="painel-modal-acoes">
                <button
                  className="painel-botao-secundario"
                  type="button"
                  onClick={() => setModal("")}
                >
                  Cancelar
                </button>
                <button className="painel-botao" type="submit" disabled={salvandoNome}>
                  {salvandoNome ? "Salvando..." : "Salvar nome"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
      {modal === "visualizar" && selecionada && (
        <DetalhesPublicacao
          publicacao={selecionada}
          profissaoAutor={profissaoAutor}
          aoFechar={() => setModal("")}
        />
      )}
      {modal === "excluir" && selecionada && (
        <ConfirmarExclusao
          publicacao={selecionada}
          aoFechar={() => setModal("")}
          aoExcluir={excluirPublicacao}
        />
      )}
    </section>
  );
}

export default PainelParceiro;

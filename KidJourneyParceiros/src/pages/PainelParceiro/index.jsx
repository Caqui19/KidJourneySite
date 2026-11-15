import { useEffect, useRef, useState } from "react";
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

const publicacoesIniciais = [
  {
    id: 1,
    tipo: "recomendacao",
    titulo: "Ideias para uma rotina alimentar",
    categoria: "Alimentação",
    faixaEtaria: "1 a 3 anos",
    etapa: "Alimentação complementar",
    especificidades: ["Seletividade alimentar"],
    texto:
      "Este conteúdo de demonstração apresenta uma orientação mais completa para as famílias. O profissional pode explicar os pontos principais, considerar a etapa de desenvolvimento e indicar como a recomendação se relaciona às necessidades da criança. Cada família pode adaptar esse momento à sua rotina e observar como a criança responde. Quando a descrição passar de cinco linhas, o card mostra apenas o início e permite abrir o restante em “Ler mais”.",
    status: "Publicado",
    dataPublicacao: new Date(Date.now() - 86400000).toISOString(),
    autorNome: "Camila Oliveira",
    autorProfissao: "Nutricionista",
    visualizacoes: 128,
  },
  {
    id: 2,
    tipo: "recomendacao",
    titulo: "Acompanhamento do desenvolvimento",
    categoria: "Desenvolvimento",
    faixaEtaria: "0 a 5 anos",
    etapa: "Primeiros passos",
    especificidades: [],
    texto:
      "Uma orientação geral pode ser adaptada ao perfil e à etapa de cada criança.",
    status: "Rascunho",
    dataPublicacao: null,
    autorNome: "Marcos Andrade",
    autorProfissao: "Pediatra",
    visualizacoes: 0,
  },
  {
    id: 3,
    tipo: "publicidade",
    titulo: "Consulta nutricional infantil",
    categoria: "Serviço",
    faixaEtaria: "Todas as idades",
    etapa: "Todas as etapas",
    especificidades: ["Doença celíaca", "Alergia a outro alimento"],
    texto: "Atendimento personalizado para apoiar a alimentação da criança.",
    status: "Publicado",
    dataPublicacao: new Date(Date.now() - 3600000).toISOString(),
    autorNome: "Juliana Martins",
    autorProfissao: "Nutricionista",
    visualizacoes: 84,
    link: "https://exemplo.com/consulta",
  },
];

function novaPublicacao(tipo = "recomendacao") {
  return {
    tipo,
    titulo: "",
    categoria: tipo === "publicidade" ? "Produto" : "Alimentação",
    faixaEtaria: "0 a 5 anos",
    etapa: "Todas as etapas",
    especificidades: [],
    texto: "",
    status: "Rascunho",
    dataPublicacao: null,
    autorNome: "",
    autorProfissao: "",
    link: "",
    visualizacoes: 0,
  };
}

function rotuloTipo(tipo) {
  return tipo === "publicidade" ? "Publicidade" : "Recomendação";
}

function formatarDataHora(data) {
  if (!data) return "Ainda não publicada";

  const dataPublicacao = new Date(data);
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
    publicacao ? { ...publicacao } : novaPublicacao(),
  );

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

  function enviar(evento) {
    evento.preventDefault();
    aoSalvar(dados);
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
                <option>0 a 5 anos</option>
                <option>0 a 6 meses</option>
                <option>6 a 12 meses</option>
                <option>1 a 3 anos</option>
                <option>3 a 5 anos</option>
                <option>Todas as idades</option>
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

          <div className="painel-modal-acoes">
            <button
              className="painel-botao-secundario"
              type="button"
              onClick={aoFechar}
            >
              Cancelar
            </button>
            <button className="painel-botao" type="submit">
              Salvar publicação
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function DetalhesPublicacao({ publicacao, aoFechar }) {
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
              {publicacao.autorNome} • {publicacao.autorProfissao}
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
  return (
    <div className="painel-modal-fundo" onMouseDown={aoFechar}>
      <section
        className="painel-modal painel-modal-exclusao"
        role="dialog"
        aria-modal="true"
        aria-labelledby="painel-exclusao-titulo"
        onMouseDown={(evento) => evento.stopPropagation()}
      >
        <span className="painel-alerta-icone">
          <i className="fa-solid fa-trash-can"></i>
        </span>
        <h2 id="painel-exclusao-titulo">Excluir publicação?</h2>
        <p>“{publicacao.titulo}” será removida desta demonstração.</p>
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
            onClick={aoExcluir}
          >
            Excluir
          </button>
        </div>
      </section>
    </div>
  );
}

function PainelParceiro({ usuario, aoSair }) {
  const [publicacoes, setPublicacoes] = useState(publicacoesIniciais);
  const [aba, setAba] = useState("todas");
  const [busca, setBusca] = useState("");
  const [filtroEspecificidade, setFiltroEspecificidade] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todas");
  const [modal, setModal] = useState("");
  const [selecionada, setSelecionada] = useState(null);
  const nomeAutor =
    usuario.displayName || usuario.email?.split("@")[0] || "Parceiro";
  const profissaoAutor = usuario.profissao || "Profissional parceiro";

  const publicacoesFiltradas = publicacoes.filter((publicacao) => {
    const combinaAba = aba === "todas" || publicacao.tipo === aba;
    const combinaBusca =
      publicacao.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      publicacao.categoria.toLowerCase().includes(busca.toLowerCase()) ||
      publicacao.texto.toLowerCase().includes(busca.toLowerCase());
    const combinaEspecificidade =
      !filtroEspecificidade ||
      !publicacao.especificidades.length ||
      publicacao.especificidades.includes(filtroEspecificidade);
    const combinaStatus =
      filtroStatus === "todas" || publicacao.status === filtroStatus;

    return combinaAba && combinaBusca && combinaEspecificidade && combinaStatus;
  });

  function abrirFormulario(publicacao = null) {
    setSelecionada(publicacao);
    setModal("formulario");
  }

  function salvarPublicacao(dados) {
    const publicacaoSalva = {
      ...dados,
      autorNome: selecionada?.autorNome || nomeAutor,
      autorProfissao: selecionada?.autorProfissao || profissaoAutor,
      dataPublicacao:
        dados.status === "Publicado"
          ? selecionada?.dataPublicacao || new Date().toISOString()
          : null,
    };

    if (selecionada) {
      setPublicacoes((atual) =>
        atual.map((item) =>
          item.id === selecionada.id ? { ...item, ...publicacaoSalva } : item,
        ),
      );
    } else {
      setPublicacoes((atual) => [
        { ...publicacaoSalva, id: Date.now() },
        ...atual,
      ]);
    }

    setModal("");
    setSelecionada(null);
  }

  function excluirPublicacao() {
    setPublicacoes((atual) =>
      atual.filter((item) => item.id !== selecionada.id),
    );
    setModal("");
    setSelecionada(null);
  }

  function publicarPublicacao(id) {
    setPublicacoes((atual) =>
      atual.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Publicado",
              dataPublicacao: item.dataPublicacao || new Date().toISOString(),
              autorNome: item.autorNome || nomeAutor,
              autorProfissao: item.autorProfissao || profissaoAutor,
            }
          : item,
      ),
    );
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
              <strong className="painel-nome">
                {usuario.displayName || usuario.email.split("@")[0]}
              </strong>
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

          {publicacoesFiltradas.length ? (
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
                      disabled={publicacao.status === "Publicado"}
                      onClick={() => publicarPublicacao(publicacao.id)}
                    >
                      {publicacao.status === "Publicado" ? "Já Publicado" : "Publicar"}
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
                      {publicacao.autorNome} • {publicacao.autorProfissao}
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
              <span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <h3>Nenhuma publicação encontrada</h3>
              <p>Altere os filtros ou crie uma nova publicação.</p>
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
      {modal === "visualizar" && selecionada && (
        <DetalhesPublicacao
          publicacao={selecionada}
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

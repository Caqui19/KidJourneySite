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

          <p className="premium-aviso">
            A assinatura ainda está em desenvolvimento e não está disponível
            para contratação.
          </p>
        </section>
      </div>
    </section>
  );
}

export default Premium;

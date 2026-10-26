import "./PoliticaSeguranca.css";

function PoliticaSeguranca() {
  return (
    <section className="politica-page">
      <div className="politica-conteudo">
        <p className="politica-etiqueta">KIDJOURNEY</p>
        <h1>Política de Segurança</h1>
        <p className="politica-introducao">
          A Política de Segurança explica quais dados o site usa, para que eles
          são usados e como você pode falar com a equipe sobre suas informações.
        </p>

        <span className="politica-aviso">Em desenvolvimento...</span>

        <section>
          <h2>Seus direitos</h2>
          <p>
            Você pode pedir informações sobre seus dados, solicitar correção ou
            exclusão e retirar seu consentimento quando aplicável. Para fazer um
            pedido, escreva para o contato abaixo. Esses direitos aparecem no
            artigo 18 da Lei Geral de Proteção de Dados (LGPD).
          </p>
          <a
            href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
            target="_blank"
            rel="noreferrer"
          >
            Ler a Lei Geral de Proteção de Dados
          </a>
          <span className="divisor-links">|</span>
          <a
            href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares"
            target="_blank"
            rel="noreferrer"
          >
            Ver os direitos do titular na ANPD
          </a>
        </section>

        <section>
          <h2>Contato</h2>
          <p>
            Para dúvidas ou solicitações sobre seus dados, envie um e-mail para{" "}
            <a href="mailto:kidjourneycontato@gmail.com">
              kidjourneycontato@gmail.com
            </a>
            .
          </p>
        </section>

        <p className="politica-data">
          Última atualização: 26 de outubro de 2026.
        </p>
      </div>
    </section>
  );
}

export default PoliticaSeguranca;

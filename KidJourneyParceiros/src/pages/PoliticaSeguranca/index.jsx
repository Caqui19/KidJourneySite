import "./PoliticaSeguranca.css";

function PoliticaSeguranca() {
  return (
    <section className="politica-page">
      <div className="politica-conteudo">
        <p className="politica-etiqueta">KIDJOURNEY</p>
        <h1>Política de Segurança</h1>
        <p className="politica-introducao">
          Esta página explica quais informações são utilizadas no site e no
          aplicativo KidJourney, para quais finalidades e como entrar em contato
          com a equipe sobre seus dados.
        </p>

        <section>
          <h2>Informações utilizadas</h2>
          <p>
            Para criar e acessar uma conta, são utilizados nome e endereço de
            e-mail. No aplicativo, o responsável também pode cadastrar nome,
            sexo, idade, data de nascimento e especificidades da criança. Quando
            utiliza esses recursos, pode registrar informações sobre alimentação,
            sono e anotações.
          </p>
          <p>
            Algumas especificidades e registros podem revelar informações de
            saúde. Esses dados são utilizados para organizar o perfil da criança
            e adequar as recomendações exibidas no aplicativo. O cadastro deve
            ser realizado pelo responsável, considerando o melhor interesse da
            criança, conforme a{" "}
            <a
              href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
              target="_blank"
              rel="noreferrer"
            >
              Lei Geral de Proteção de Dados Pessoais
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Como as informações são utilizadas</h2>
          <ul>
            <li>criar e manter a conta e permitir a autenticação;</li>
            <li>organizar os dados da criança cadastrada pelo responsável;</li>
            <li>adequar recomendações à idade e às especificidades informadas;</li>
            <li>armazenar anotações e registros escolhidos pelo usuário;</li>
            <li>analisar solicitações de parceria e responder aos contatos.</li>
          </ul>
          <p>
            O aceite da Política de Segurança é solicitado durante o cadastro e
            registrado junto às informações da conta.
          </p>
        </section>

        <section>
          <h2>Armazenamento e serviços utilizados</h2>
          <p>
            O Firebase Authentication é utilizado para autenticação e
            recuperação de senha. Perfis, dados de crianças, anotações, registros
            e publicações são armazenados no Cloud Firestore. As permissões de
            acesso são definidas pelas regras do Firestore e pelo perfil da
            conta.
          </p>
          <p>
            O Firebase informa que seus serviços utilizam HTTPS para proteger os
            dados durante a transmissão e que o Cloud Firestore e o Firebase
            Authentication oferecem criptografia em repouso. Mais informações
            estão disponíveis na página de{" "}
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              rel="noreferrer"
            >
              privacidade e segurança do Firebase
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Solicitações de parceria e contatos</h2>
          <p>
            As informações e os documentos enviados pelo formulário de parceria,
            assim como as mensagens do formulário de contato, são encaminhados
            pelo FormSubmit ao e-mail da equipe do KidJourney. A equipe utiliza
            esses dados para analisar a solicitação e responder ao remetente.
            Segundo o FormSubmit, os envios ficam armazenados por 30 dias e os
            arquivos anexados não ficam disponíveis no arquivo de envios. Leia a{" "}
            <a
              href="https://formsubmit.co/privacy.pdf"
              target="_blank"
              rel="noreferrer"
            >
              política de privacidade do FormSubmit
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Publicações e acesso</h2>
          <p>
            Publicações feitas por parceiros aprovados podem ser consultadas por
            usuários autenticados. Rascunhos e ferramentas de edição ficam
            associados à conta do parceiro responsável. Os parceiros não
            recebem acesso aos perfis privados ou aos registros das crianças.
          </p>
        </section>

        <section>
          <h2>Seus direitos e contato</h2>
          <p>
            As informações da conta e do aplicativo são mantidas enquanto forem
            necessárias para disponibilizar os recursos utilizados. O usuário
            pode solicitar confirmação do tratamento, acesso, correção ou
            exclusão dos dados e, quando aplicável, revogar o consentimento,
            conforme os direitos previstos na LGPD. A equipe analisará cada
            solicitação e responderá pelo contato informado.
          </p>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento
            das informações, envie uma mensagem para{" "}
            <span className="politica-email">kidjourneycontato@gmail.com</span>.
          </p>
          <a
            href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares"
            target="_blank"
            rel="noreferrer"
          >
            Consulte os direitos do titular na ANPD
          </a>
        </section>

        <p className="politica-data">
          Última atualização: 19 de novembro de 2026.
        </p>
      </div>
    </section>
  );
}

export default PoliticaSeguranca;

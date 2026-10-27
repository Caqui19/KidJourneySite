import { Link } from "react-router";
import "./CadastroParceiroForm.css";

function CadastroParceiroForm() {
  function enviarCadastro(evento) {
    evento.preventDefault();

    const dados = new FormData(evento.currentTarget);
    const documentos = Array.from(dados.getAll("documentos"))
      .map((arquivo) => arquivo.name)
      .filter((nome) => nome)
      .join(", ");

    const corpo = [
      "Solicitação de parceria KidJourney",
      "",
      "Nome: " + dados.get("nome"),
      "E-mail: " + dados.get("email"),
      "WhatsApp: " + dados.get("whatsapp"),
      "Área profissional: " + dados.get("profissao"),
      "Conselho: " + dados.get("conselho"),
      "Registro ou certificação: " + dados.get("registro"),
      "Documentos selecionados: " + documentos,
      "Política de Segurança aceita: sim",
      "",
      "Mensagem:",
      dados.get("mensagem"),
    ].join("\n");

    const assunto = encodeURIComponent("Solicitação de parceria KidJourney");
    const mensagem = encodeURIComponent(corpo);

    window.location.href =
      "mailto:kidjourneycontato@gmail.com?subject=" +
      assunto +
      "&body=" +
      mensagem;
  }

  return (
    <form id="cadastro-parceiro-form" onSubmit={enviarCadastro}>
      <div className="inputContainer">
        <label htmlFor="parceiro-nome">
          Nome completo{" "}
          <span className="campo-obrigatorio" aria-hidden="true">
            *
          </span>
        </label>
        <input
          type="text"
          id="parceiro-nome"
          name="nome"
          placeholder="Seu nome"
          required
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="parceiro-email">
          E-mail{" "}
          <span className="campo-obrigatorio" aria-hidden="true">
            *
          </span>
        </label>
        <input
          type="email"
          id="parceiro-email"
          name="email"
          placeholder="Endereço de e-mail"
          required
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="parceiro-profissao">
          Área profissional{" "}
          <span className="campo-obrigatorio" aria-hidden="true">
            *
          </span>
        </label>
        <select
          id="parceiro-profissao"
          name="profissao"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Escolha uma opção
          </option>
          <option>Nutricionista</option>
          <option>Pediatra</option>
          <option>Fonoaudiólogo(a)</option>
          <option>Psicólogo(a)</option>
          <option>Terapeuta ocupacional</option>
          <option>Outro profissional</option>
        </select>
      </div>

      <div className="inputContainer">
        <label htmlFor="parceiro-conselho">
          Conselho profissional (se houver)
        </label>
        <input
          type="text"
          id="parceiro-conselho"
          name="conselho"
          placeholder="Ex.: CRN, CRM"
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="parceiro-registro">
          Número de registro ou certificação{" "}
          <span className="campo-obrigatorio" aria-hidden="true">
            *
          </span>
        </label>
        <input type="text" id="parceiro-registro" name="registro" required />
      </div>

      <div className="inputContainer">
        <label htmlFor="parceiro-documentos">
          Certificados e comprovantes{" "}
          <span className="campo-obrigatorio" aria-hidden="true">
            *
          </span>
        </label>
        <input
          type="file"
          id="parceiro-documentos"
          name="documentos"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          required
        />
        <small>Anexe os arquivos manualmente ao e-mail que será aberto.</small>
      </div>

      <div className="inputContainer">
        <label htmlFor="parceiro-mensagem">
          Conte sobre seu interesse na parceria{" "}
          <span className="campo-obrigatorio" aria-hidden="true">
            *
          </span>
        </label>
        <textarea id="parceiro-mensagem" name="mensagem" rows="4" required />
      </div>

      <div className="termos-parceiro">
        <input
          id="parceiro-politica-seguranca"
          type="checkbox"
          name="politicaSeguranca"
          required
        />
        <label htmlFor="parceiro-politica-seguranca">Li e aceito a </label>
        <Link to="/politica-de-seguranca">Política de Segurança</Link>
        <span className="campo-obrigatorio" aria-hidden="true">
          *
        </span>
      </div>

      <button className="submit" type="submit">
        Enviar solicitação
      </button>
    </form>
  );
}

export default CadastroParceiroForm;

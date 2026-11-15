import { useState } from "react";
import { Link } from "react-router";
import "./CadastroParceiroForm.css";

function CadastroParceiroForm() {
  const [erroDocumentos, setErroDocumentos] = useState("");

  function validarFormulario(evento) {
    const formulario = evento.currentTarget;
    formulario.elements._replyto.value = formulario.elements.email.value.trim();

    const arquivos = Array.from(formulario.elements.documentos.files);
    const tamanhoTotal = arquivos.reduce(
      (total, arquivo) => total + arquivo.size,
      0,
    );

    if (tamanhoTotal > 10 * 1024 * 1024) {
      evento.preventDefault();
      setErroDocumentos("Os arquivos devem somar no máximo 10 MB.");
      return;
    }

    setErroDocumentos("");
  }

  return (
    <form
      id="cadastro-parceiro-form"
      action="https://formsubmit.co/kidjourneycontato@gmail.com"
      method="POST"
      encType="multipart/form-data"
      onSubmit={validarFormulario}
    >
      <input type="hidden" name="_replyto" value="" />
      <input
        type="hidden"
        name="_subject"
        value="Solicitação de parceria KidJourney"
      />
      <input
        type="hidden"
        name="_next"
        value={`${window.location.origin}/parceiros?solicitacao=recebida#solicitacao-parceria`}
      />
      <input type="hidden" name="_template" value="table" />
      <input
        className="campo-anti-spam"
        type="text"
        name="_honey"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

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
        <small>Envie PDF, JPG ou PNG. Tamanho máximo total: 10 MB.</small>
        {erroDocumentos && (
          <small className="erro-documentos" role="alert">
            {erroDocumentos}
          </small>
        )}
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

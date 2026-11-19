import "./SiteContactForm.css";

function SiteContactForm() {
  function prepararEnvio(evento) {
    const formulario = evento.currentTarget;
    formulario.elements._replyto.value = formulario.elements.email.value.trim();
  }

  return (
    <form
      action="https://formsubmit.co/kidjourneycontato@gmail.com"
      method="POST"
      onSubmit={prepararEnvio}
    >
      <input type="hidden" name="_replyto" value="" />
      <input
        type="hidden"
        name="_subject"
        value="Contato pelo site KidJourney"
      />
      <input
        type="hidden"
        name="_next"
        value={`${window.location.origin}/?contato=recebido#fale-conosco`}
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
        <label htmlFor="contato-nome">
          Nome <span className="campo-obrigatorio" aria-hidden="true">*</span>
        </label>
        <input
          id="contato-nome"
          name="nome"
          type="text"
          placeholder="Nome"
          required
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="contato-email">
          E-mail <span className="campo-obrigatorio" aria-hidden="true">*</span>
        </label>
        <input
          id="contato-email"
          name="email"
          type="email"
          placeholder="Endereço de e-mail"
          required
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="contato-mensagem">
          Mensagem <span className="campo-obrigatorio" aria-hidden="true">*</span>
        </label>
        <textarea id="contato-mensagem" name="mensagem" placeholder="Mensagem" required />
      </div>

      <button className="submit" type="submit">
        Enviar
      </button>
    </form>
  );
}

export default SiteContactForm;


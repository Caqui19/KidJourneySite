import "./SiteContactForm.css";

function SiteContactForm() {
  function enviarMensagem(evento) {
    evento.preventDefault();

    const dados = new FormData(evento.currentTarget);
    const assunto = encodeURIComponent("Contato pelo site KidJourney");
    const corpo = encodeURIComponent(`Contato pelo site KidJourney

Nome: ${dados.get("nome")}
E-mail: ${dados.get("email")}

Mensagem:
${dados.get("mensagem")}`);

    window.location.href = `mailto:kidjourneycontato@gmail.com?subject=${assunto}&body=${corpo}`;
  }

  return (
    <form onSubmit={enviarMensagem}>
      <div className="inputContainer">
        <label htmlFor="contato-nome">Nome <span className="campo-obrigatorio" aria-hidden="true">*</span></label>
        <input
          id="contato-nome"
          name="nome"
          type="text"
          placeholder="Nome"
          required
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="contato-email">E-mail <span className="campo-obrigatorio" aria-hidden="true">*</span></label>
        <input
          id="contato-email"
          name="email"
          type="email"
          placeholder="Endereço de e-mail"
          required
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="contato-mensagem">Mensagem <span className="campo-obrigatorio" aria-hidden="true">*</span></label>
        <textarea id="contato-mensagem" name="mensagem" placeholder="Mensagem" required />
      </div>

      <button className="submit" type="submit">Enviar</button>
    </form>
  );
}

export default SiteContactForm;


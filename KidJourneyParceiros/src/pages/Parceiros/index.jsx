import { Link } from "react-router";
import CadastroParceiroForm from "../../components/CadastroParceiroForm";
import "./Parceiros.css";

function Parceiros() {
  return (
    <section className="parceiros-page">
      <div className="parceiros-layout">
        <div className="parceiros-apresentacao">
          <p className="parceiros-etiqueta">KIDJOURNEY PARA PROFISSIONAIS</p>
          <h1>Seu conhecimento ajuda as famílias a crescer.</h1>
          <p className="parceiros-descricao">
            Nutricionistas, pediatras e outros profissionais podem compartilhar
            recomendações e apresentar seus produtos ou serviços no aplicativo.
          </p>

          <div className="parceiros-beneficios">
            <article>
              <span>01</span>
              <div>
                <h2>Compartilhe recomendações</h2>
                <p>Publique conteúdos e orientações para apoiar as famílias.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h2>Divulgue seu trabalho</h2>
                <p>Apresente seus produtos e serviços dentro do app.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h2>Receba seu acesso</h2>
                <p>Após a análise, nossa equipe envia seus dados de login por e-mail.</p>
              </div>
            </article>
          </div>
        </div>

        <div className="parceiros-formulario">
          <div className="parceiros-entrar">
            <p>Já é parceiro?</p>
            <Link to="/parceiros/entrar">Entrar na plataforma</Link>
          </div>

          <div className="parceiros-formulario-titulo">
            <p className="parceiros-etiqueta">VAMOS CONVERSAR</p>
            <h2>Solicite uma parceria</h2>
            <p>Conte sobre sua área e envie os documentos que comprovam sua formação.</p>
          </div>
          <CadastroParceiroForm />
        </div>
      </div>
    </section>
  );
}

export default Parceiros;

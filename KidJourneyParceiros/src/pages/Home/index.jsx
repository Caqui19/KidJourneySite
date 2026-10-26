import { Link } from "react-router";
import ClientSignupForm from "../../components/ClientSignupForm";
import SiteContactForm from "../../components/SiteContactForm";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="home-hero">
        <h1>Mais confiança para cuidar, mais saúde para crescer.</h1>
        <img src="/logo.svg" alt="Logo do KidJourney" />
      </section>

      <section className="site-content">
        <img className="logoMain" src="/logo.svg" alt="Logo do KidJourney" />

        <div className="mvvContainer">
          <div>
            <article>
              <h3>Missão</h3>
              <p>
                Ajudar pais e mães de primeira viagem a promoverem uma
                alimentação saudável e um desenvolvimento infantil adequado por
                meio de acompanhamento personalizado e orientação confiável para
                cada fase da criança.
              </p>
            </article>
            <article>
              <h3>Visão</h3>
              <p>
                Ser a principal plataforma digital de acompanhamento infantil
                personalizado da América Latina, transformando a forma como
                famílias cuidam da saúde, nutrição e desenvolvimento de suas
                crianças desde os primeiros anos de vida.
              </p>
            </article>
          </div>

          <article>
            <h3>Valores</h3>
            <ol>
              <li>
                <p>
                  Cuidado humanizado: o bem-estar das crianças e das famílias
                  vem primeiro.
                </p>
              </li>
              <li>
                <p>
                  Personalização: cada criança é única e precisa de atenção
                  adequada à sua fase.
                </p>
              </li>
              <li>
                <p>
                  Confiança: compartilhamos informações seguras e responsáveis.
                </p>
              </li>
              <li>
                <p>
                  Simplicidade: criamos uma experiência fácil e acolhedora para
                  as famílias.
                </p>
              </li>
              <li>
                <p>
                  Desenvolvimento saudável: incentivamos bons hábitos desde os
                  primeiros anos.
                </p>
              </li>
              <li>
                <p>Empatia: apoiamos pais e mães sem julgamentos.</p>
              </li>
            </ol>
          </article>
          <hr />
        </div>

        <h2 className="subtitulo">Conheça nossa liderança</h2>
        <div className="liderancaContainer">
          <article>
            <div>
              <img src="/alvaro.jpg" alt="Alvaro Takeshi" />
              <h3>Alvaro Takeshi</h3>
            </div>
            <p>Ajuda com o design técnico e a organização do projeto.</p>
          </article>
          <article>
            <div>
              <img src="/andre.jpg" alt="André Luís" />
              <h3>André Luís</h3>
            </div>
            <p>
              Contribui com o design, a documentação, as ideias e a divulgação
              do projeto.
            </p>
          </article>
          <article>
            <div>
              <img src="/denis.jpg" alt="Denis de Lucas" />
              <h3>Denis de Lucas</h3>
            </div>
            <p>
              Idealizou o projeto e atuou no design, pesquisa de campo e análise
              de dados.
            </p>
          </article>
          <article>
            <div>
              <img src="/isaac.jpg" alt="Isaac Oliveira" />
              <h3>Isaac Oliveira</h3>
            </div>
            <p>
              Cuida do desenvolvimento e da organização da parte técnica do
              aplicativo.
            </p>
          </article>
          <article>
            <div>
              <img src="/joao.jpg" alt="João Vitor" />
              <h3>João Vitor</h3>
            </div>
            <p>
              Contribui com o design, a documentação, as ideias e a divulgação
              do projeto.
            </p>
          </article>
          <hr />
        </div>

        <h2 className="subtitulo" id="app">
          Nosso aplicativo
        </h2>
        <div className="appContainer">
          <div>
            <p>
              Muitas famílias têm dificuldade em encontrar orientações
              confiáveis e personalizadas sobre alimentação e saúde infantil. O
              KidJourney oferece conteúdos e recomendações adaptados ao perfil e
              à fase de cada criança, ajudando a promover hábitos saudáveis de
              forma prática.
            </p>
            <div className="appLojas">
              <img src="/google.svg" alt="Google Play" />
              <img src="/apple.svg" alt="App Store" />
            </div>
          </div>
          <img
            className="appImage"
            src="/celularApp.svg"
            alt="Telas do aplicativo KidJourney"
          />
        </div>

        <section className="parceiros-convite">
          <div className="parceiros-convite-texto">
            <p className="parceiros-etiqueta">KIDJOURNEY PARA PROFISSIONAIS</p>
            <h2>Seu conhecimento pode fazer parte da jornada.</h2>
            <p>
              Nutricionistas, pediatras e outros profissionais podem
              compartilhar recomendações e apresentar seu trabalho às famílias.
            </p>
          </div>
          <div className="parceiros-convite-destaque">
            <p>Profissionais e famílias, lado a lado.</p>
            <Link className="parceiros-convite-botao" to="/parceiros">
              Conheça a área de parceiros
            </Link>
          </div>
        </section>

        <div className="linha">
          <hr />
        </div>

        <h2 className="subtitulo">
          Comece hoje a cuidar da alimentação e do bem-estar do seu filho.
        </h2>
        <div className="cadastroContainer">
          <p>
            Crie sua conta para acompanhar conteúdos e recomendações no
            aplicativo.
          </p>
          <ClientSignupForm />
        </div>

        <div className="linha">
          <hr />
        </div>
        <h2 className="subtitulo">
          Faça parte da nossa comunidade de famílias
        </h2>
        <div className="forumContainer">
          <p>
            Acompanhe recomendações, compartilhe experiências e encontre apoio
            durante a jornada de cuidado e desenvolvimento da sua criança.
          </p>
          <a href="/forum">Entre no Fórum</a>
        </div>
        <hr />
      </section>

      <section className="contact-content">
        <div className="primeiroContainer">
          <div>
            <h2>
              <i className="fa-solid fa-location-dot"></i> Localização
            </h2>
            <p>
              Praça Miguel Ortega, 135 – Parque Assunção, Taboão da Serra – SP,
              06754-160
            </p>
          </div>
          <div>
            <h2>
              <i className="fa-solid fa-envelope"></i> Endereço de e-mail
            </h2>
            <p>
              <a href="mailto:kidjourneycontato@gmail.com">
                kidjourneycontato@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="segundoContainer">
          <h1>Fale conosco</h1>
          <SiteContactForm />
        </div>
      </section>
    </>
  );
}

export default Home;

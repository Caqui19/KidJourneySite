import { Link } from "react-router";
import ClientSignupForm from "../../components/ClientSignupForm";
import SiteContactForm from "../../components/SiteContactForm";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-copy">
          <h1>Mais confiança para cuidar, mais saúde para crescer.</h1>
          <p className="home-hero-descricao">
            Acompanhe a alimentação, a saúde e o desenvolvimento da sua criança
            desde os primeiros passos, com orientação e apoio em cada etapa.
          </p>
          <div className="home-hero-acoes">
            <a className="home-hero-botao" href="#titulo-cadastro">
              Começar agora
            </a>
            <a className="home-hero-link" href="#app">
              Conheça o aplicativo <i className="fa-solid fa-arrow-down"></i>
            </a>
          </div>
        </div>

        <div className="home-hero-visual">
          <img src="/logo.svg" alt="Logo do KidJourney" />
        </div>
      </section>

      <hr />

      <section className="site-content">
        <div className="home-section-heading">
          <p className="home-etiqueta">NOSSO PROPÓSITO</p>
          <h2 className="subtitulo">
            Orientação e acolhimento para os primeiros passos
          </h2>
          <p>
            Conheça os princípios que guiam o KidJourney e apoiam as famílias no
            início dessa jornada.
          </p>
        </div>

        <div className="mvvContainer">
          <div>
            <article>
              <div className="mvv-card-topo">
                <span>
                  <i className="fa-solid fa-bullseye"></i>
                </span>
                <h3>Missão</h3>
              </div>
              <p>
                Ajudar pais e mães de primeira viagem a promoverem uma
                alimentação saudável e um desenvolvimento infantil adequado por
                meio de acompanhamento personalizado e orientação confiável para
                os primeiros passos de cada criança.
              </p>
            </article>
            <article>
              <div className="mvv-card-topo">
                <span>
                  <i className="fa-solid fa-eye"></i>
                </span>
                <h3>Visão</h3>
              </div>
              <p>
                Ser a principal plataforma digital de acompanhamento infantil
                personalizado da América Latina, apoiando as famílias no começo
                da jornada de saúde, nutrição e desenvolvimento infantil.
              </p>
            </article>
          </div>

          <article>
            <div className="mvv-card-topo">
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
              <h3>Valores</h3>
            </div>
            <ol>
              <li>
                <p>
                  Cuidado humanizado: o bem-estar das crianças e de suas
                  famílias vem primeiro.
                </p>
              </li>
              <li>
                <p>
                  Personalização: cada criança é única e precisa de atenção
                  adequada em cada etapa da jornada.
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
                  primeiros passos.
                </p>
              </li>
              <li>
                <p>Empatia: apoiamos pais e mães sem julgamentos.</p>
              </li>
            </ol>
          </article>
          <hr />
        </div>

        <div className="home-section-heading">
          <p className="home-etiqueta">NOSSO TIME</p>
          <h2 className="subtitulo">Conheça nossa liderança</h2>
          <p>As pessoas que trabalham para tirar o KidJourney do papel.</p>
        </div>
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

        <div className="home-section-heading home-section-heading-app">
          <p className="home-etiqueta" id="app">
            NOSSO APP
          </p>
          <h2 className="subtitulo">Nosso aplicativo</h2>
        </div>
        <div className="appContainer">
          <div>
            <p>
              Muitas famílias têm dificuldade em encontrar orientações
              confiáveis e personalizadas sobre alimentação e saúde infantil. O
              KidJourney oferece conteúdos e recomendações adaptados ao perfil e
              à etapa de cada criança, apoiando as famílias nos primeiros passos
              para criar hábitos saudáveis.
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
              compartilhar recomendações e apresentar seu trabalho às famílias
              no início da jornada de cuidado.
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

        <h2 className="subtitulo" id="titulo-cadastro">
          Comece a cuidar da alimentação e do bem-estar do seu filho.
        </h2>
        <div className="cadastroContainer">
          <p>
            Crie sua conta para receber conteúdos e recomendações que apoiam os
            primeiros passos do cuidado.
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
            nos primeiros passos da jornada de cuidado e desenvolvimento da sua
            criança.
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
            <p>kidjourneycontato@gmail.com</p>
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
